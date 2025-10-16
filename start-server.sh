#!/bin/bash

# Depolarize - Server Start Script
# This script starts a local web server (without killing existing ones)

PORT=8000
SERVER_TYPE=""

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Depolarize Server Start ===${NC}"
echo ""

# Check if port is already in use
PID=$(lsof -ti:$PORT 2>/dev/null)
if [ ! -z "$PID" ]; then
    echo -e "${RED}✗ Port ${PORT} is already in use by process ${PID}${NC}"
    echo -e "${YELLOW}Use './restart-server.sh' to restart the server${NC}"
    echo -e "${YELLOW}Or use './stop-server.sh' to stop it first${NC}"
    exit 1
fi

# Function to start Python HTTP server
start_python_server() {
    echo -e "${YELLOW}Starting Python HTTP server on port ${PORT}...${NC}"

    # Try Python 3 first, then Python 2
    if command -v python3 &> /dev/null; then
        python3 -m http.server $PORT &
        SERVER_TYPE="Python 3"
    elif command -v python &> /dev/null; then
        python -m SimpleHTTPServer $PORT &
        SERVER_TYPE="Python 2"
    else
        return 1
    fi

    sleep 1
    return 0
}

# Function to start PHP server
start_php_server() {
    echo -e "${YELLOW}Starting PHP built-in server on port ${PORT}...${NC}"
    php -S localhost:$PORT &
    SERVER_TYPE="PHP"
    sleep 1
    return 0
}

# Function to start Node.js http-server
start_node_server() {
    echo -e "${YELLOW}Starting Node.js http-server on port ${PORT}...${NC}"
    npx http-server -p $PORT &
    SERVER_TYPE="Node.js (http-server)"
    sleep 1
    return 0
}

# Try to start a server (in order of preference)
if command -v python3 &> /dev/null || command -v python &> /dev/null; then
    if start_python_server; then
        echo -e "${GREEN}✓ Server started successfully with ${SERVER_TYPE}${NC}"
    else
        echo -e "${RED}✗ Failed to start Python server${NC}"
        exit 1
    fi
elif command -v php &> /dev/null; then
    if start_php_server; then
        echo -e "${GREEN}✓ Server started successfully with ${SERVER_TYPE}${NC}"
    else
        echo -e "${RED}✗ Failed to start PHP server${NC}"
        exit 1
    fi
elif command -v node &> /dev/null; then
    if start_node_server; then
        echo -e "${GREEN}✓ Server started successfully with ${SERVER_TYPE}${NC}"
    else
        echo -e "${RED}✗ Failed to start Node.js server${NC}"
        exit 1
    fi
else
    echo -e "${RED}✗ No suitable server found${NC}"
    echo -e "${YELLOW}Please install one of: Python, PHP, or Node.js${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}Server is running!${NC}"
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}URL: http://localhost:${PORT}${NC}"
echo -e "${GREEN}Server Type: ${SERVER_TYPE}${NC}"
echo ""
echo -e "${YELLOW}To stop the server:${NC}"
echo -e "  ./stop-server.sh"
echo ""
