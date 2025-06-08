from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import re
from datetime import datetime

load_dotenv()

app = Flask(__name__)

# Update CORS for production - allow your deployed frontend domain
CORS(app, origins=[
    "http://localhost:3000",  # Development
    "https://nikhilnedungadi.vercel.app",  # Production (update this)
    "https://*.vercel.app"  # Allow all Vercel subdomains
])

# Your existing Python functions
def break_paragraph(text, max_chars=2900):
    """Break a large paragraph into smaller chunks."""
    if len(text) <= max_chars:
        return [text]
    
    chunks = []
    current_pos = 0
    
    while current_pos < len(text):
        end_pos = current_pos + max_chars
        
        if end_pos >= len(text):
            chunks.append(text[current_pos:])
            break
        
        last_space = text.rfind(' ', current_pos, end_pos)
        
        if last_space == -1 or last_space <= current_pos:
            break_chars = ['.', '!', '?', ';', ':', ',']
            last_break = -1
            
            for char in break_chars:
                pos = text.rfind(char, current_pos, end_pos)
                if pos > last_break and pos > current_pos:
                    last_break = pos
            
            if last_break > current_pos:
                end_pos = last_break + 1
            else:
                end_pos = current_pos + max_chars
        else:
            end_pos = last_space
        
        chunk = text[current_pos:end_pos].strip()
        if chunk:
            chunks.append(chunk)
        
        current_pos = end_pos
        if current_pos < len(text) and text[current_pos] == ' ':
            current_pos += 1
    
    return chunks

def break_paragraph_simple(text, max_chars=2900):
    """Simpler version that only breaks at word boundaries."""
    words = text.split()
    chunks = []
    current_chunk = ""
    
    for word in words:
        if len(current_chunk) + len(word) + 1 > max_chars:
            if current_chunk:
                chunks.append(current_chunk.strip())
                current_chunk = word
            else:
                chunks.append(word)
        else:
            if current_chunk:
                current_chunk += " " + word
            else:
                current_chunk = word
    
    if current_chunk:
        chunks.append(current_chunk.strip())
    
    return chunks

def clean_transcript(text):
    """Clean video transcript text."""
    # Remove timestamp patterns
    text = re.sub(r'[\[\(]?\d{1,2}:\d{2}:\d{2}[\]\)]?', '', text)
    text = re.sub(r'[\[\(]?\d{1,2}:\d{2}[\]\)]?', '', text)
    
    # Remove speaker labels
    text = re.sub(r'^[A-Za-z\s]+\d*:\s*', '', text, flags=re.MULTILINE)
    
    # Normalize whitespace
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\n\s*\n', '\n', text)
    
    return text.strip()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'message': 'Flask server is running successfully',
        'port': os.environ.get('FLASK_RUN_PORT', '5001')
    })

@app.route('/api/chunk-text', methods=['POST'])
def chunk_text():
    """Process and chunk text."""
    try:
        if not request.is_json:
            return jsonify({'error': 'Request must be JSON'}), 400
        
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'No text provided'}), 400
        
        text = data['text']
        if not text or not text.strip():
            return jsonify({'error': 'Text cannot be empty'}), 400
        
        max_chars = data.get('max_chars', 2900)
        clean_text = data.get('clean_transcript', True)
        method = data.get('method', 'smart')  # 'smart' or 'simple'
        
        # Validate max_chars
        if not isinstance(max_chars, int) or max_chars <= 0:
            return jsonify({'error': 'max_chars must be a positive integer'}), 400
        
        if max_chars > 50000:
            return jsonify({'error': 'max_chars cannot exceed 50,000'}), 400
        
        original_length = len(text)
        
        if clean_text:
            text = clean_transcript(text)
            cleaned_length = len(text)
        else:
            cleaned_length = original_length
        
        if not text.strip():
            return jsonify({'error': 'Text is empty after cleaning'}), 400
        
        # Choose chunking method
        if method == 'simple':
            chunks = break_paragraph_simple(text, max_chars)
        else:
            chunks = break_paragraph(text, max_chars)
        
        chunk_sizes = [len(chunk) for chunk in chunks]
        avg_chunk_size = sum(chunk_sizes) / len(chunk_sizes) if chunks else 0
        
        response = {
            'success': True,
            'original_length': original_length,
            'cleaned_length': cleaned_length,
            'num_chunks': len(chunks),
            'target_size': max_chars,
            'method_used': method,
            'chunks': chunks,
            'chunk_sizes': chunk_sizes,
            'statistics': {
                'average_chunk_size': round(avg_chunk_size, 2),
                'largest_chunk': max(chunk_sizes) if chunks else 0,
                'smallest_chunk': min(chunk_sizes) if chunks else 0,
                'efficiency': round((cleaned_length / (len(chunks) * max_chars)) * 100, 2) if chunks else 0
            },
            'timestamp': datetime.now().isoformat()
        }
        
        return jsonify(response)
        
    except Exception as e:
        app.logger.error(f"Error in chunk_text: {str(e)}")
        return jsonify({
            'error': 'Internal server error occurred while processing text',
            'details': str(e) if app.debug else None
        }), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # Use FLASK_RUN_PORT environment variable, fallback to 5001
    port = int(os.environ.get('FLASK_RUN_PORT', 5001))
    host = os.environ.get('FLASK_RUN_HOST', '0.0.0.0')
    
    print(f"Starting Flask server on {host}:{port}")
    app.run(debug=True, host=host, port=port)
