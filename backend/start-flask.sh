#!/bin/bash
echo "Killing process on port 5000..."
sudo kill -9 $(lsof -ti:5000) 2>/dev/null || echo "No process found on port 5000"
sleep 1
echo "Starting Flask app..."
python api/flaskapp.py
