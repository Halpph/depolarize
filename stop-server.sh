#!/bin/bash

# Depolarize - Server Stop Script
# This script stops any running local web server

PORT=8000

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Depolarize Server Stop ===${NC}"
echo ""

# Find process ID using the port
echo -e "${YELLOW}Checking for processes on port ${PORT}...${NC}"
PID=$(lsof -ti:$PORT 2>/dev/null)

if [ ! -z "$PID" ]; then
    echo -e "${YELLOW}Found process(es) on port ${PORT}: ${PID}${NC}"
    echo -e "${YELLOW}Killing process(es)...${NC}"
    kill -9 $PID 2>/dev/null
    sleep 1

    # Verify the process is killed
    PID=$(lsof -ti:$PORT 2>/dev/null)
    if [ -z "$PID" ]; then
        echo -e "${GREEN}✓ Server stopped successfully${NC}"
    else
        echo -e "${RED}✗ Failed to stop server${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}No process found on port ${PORT}${NC}"
    echo -e "${GREEN}✓ Server is not running${NC}"
fi

echo ""
