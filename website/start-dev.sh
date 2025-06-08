#!/bin/bash

echo "Starting Resume Website with Text Chunker..."

# Start Flask backend in background
cd backend
source venv/bin/activate
python api/app.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start React frontend
cd ../website
npm start &
FRONTEND_PID=$!

echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait

# Clean up processes
kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
