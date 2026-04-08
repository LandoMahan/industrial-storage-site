#!/bin/bash

# Render deployment script
# This script creates a new web service on Render and deploys the site

# You'll need to set RENDER_API_KEY environment variable
# Get it from: https://dashboard.render.com/account/api-tokens

if [ -z "$RENDER_API_KEY" ]; then
  echo "RENDER_API_KEY not set. Cannot deploy."
  exit 1
fi

REPO_URL="https://github.com/LandoMahan/industrial-storage-site"
SERVICE_NAME="industrial-storage"

# Check if service exists
SERVICE_ID=$(curl -s -H "Authorization: Bearer $RENDER_API_KEY" \
  "https://api.render.com/v1/services?name=$SERVICE_NAME" | \
  grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$SERVICE_ID" ]; then
  echo "Creating new Render service..."
  
  RESPONSE=$(curl -s -X POST \
    -H "Authorization: Bearer $RENDER_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"name\": \"$SERVICE_NAME\",
      \"ownerId\": null,
      \"type\": \"web_service\",
      \"repo\": \"$REPO_URL\",
      \"branch\": \"main\",
      \"region\": \"oregon\",
      \"plan\": \"free\",
      \"envSpecific\": false,
      \"envVars\": [
        {
          \"key\": \"PORT\",
          \"value\": \"3000\"
        }
      ],
      \"serviceDetails\": {
        \"env\": \"node\",
        \"buildCommand\": \"npm install\",
        \"startCommand\": \"npm start\",
        \"rootDir\": \"\"
      }
    }" \
    "https://api.render.com/v1/services")
  
  SERVICE_ID=$(echo "$RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
  echo "Service created with ID: $SERVICE_ID"
else
  echo "Service already exists with ID: $SERVICE_ID"
fi

# Trigger deployment
echo "Triggering deployment..."
curl -s -X POST \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  "https://api.render.com/v1/services/$SERVICE_ID/deploys"

echo "Deployment triggered. Check dashboard at https://dashboard.render.com"
