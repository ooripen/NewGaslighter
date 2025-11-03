#!/bin/bash

# Azure Deployment Script for הגזלייטר
# This script builds and deploys the app to Azure App Service

set -e  # Exit on error

echo "╔═══════════════════════════════════════════════════════╗"
echo "║       Deploying הגזלייטר to Azure App Service         ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Configuration
RESOURCE_GROUP="AzureOpenAI"
APP_NAME="GaslighterSimulationApp"
SUBSCRIPTION_ID="92b6f6d1-e5fd-4134-a0ab-759e5508c2e2"

echo "🔐 Step 1: Security Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create a .env file with your Azure credentials."
    exit 1
fi

echo "⚠️  IMPORTANT: Have you rotated your API key? (see SECURITY_NOTICE.md)"
echo "Press ENTER to continue or CTRL+C to abort..."
read

echo ""
echo "🔨 Step 2: Building Application"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building production bundle..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed - dist folder not found!"
    exit 1
fi

echo "✅ Build successful!"
echo ""

echo "📦 Step 3: Preparing Deployment Package"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Create deployment package
cd dist
zip -r ../deployment.zip . > /dev/null
cd ..

echo "✅ Package created: deployment.zip"
echo ""

echo "☁️  Step 4: Deploying to Azure"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI not found!"
    echo "Install from: https://docs.microsoft.com/cli/azure/install-azure-cli"
    exit 1
fi

# Login check
echo "Checking Azure login status..."
if ! az account show &> /dev/null; then
    echo "Please login to Azure..."
    az login
fi

# Set subscription
echo "Setting subscription..."
az account set --subscription "$SUBSCRIPTION_ID"

# Deploy
echo "Deploying to App Service..."
az webapp deploy \
  --resource-group "$RESOURCE_GROUP" \
  --name "$APP_NAME" \
  --src-path deployment.zip \
  --type zip \
  --async false

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
else
    echo ""
    echo "❌ Deployment failed!"
    exit 1
fi

echo ""
echo "⚙️  Step 5: Configuring Environment Variables"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Load environment variables from .env
source .env

# Set environment variables in Azure
echo "Setting environment variables..."
az webapp config appsettings set \
  --resource-group "$RESOURCE_GROUP" \
  --name "$APP_NAME" \
  --settings \
    VITE_AZURE_AI_ENDPOINT="$VITE_AZURE_AI_ENDPOINT" \
    VITE_AZURE_AI_KEY="$VITE_AZURE_AI_KEY" \
  --output none

echo "✅ Environment variables configured!"
echo ""

echo "🔄 Step 6: Restarting App Service"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

az webapp restart \
  --resource-group "$RESOURCE_GROUP" \
  --name "$APP_NAME" \
  --output none

echo "✅ App Service restarted!"
echo ""

# Cleanup
rm deployment.zip

echo "╔═══════════════════════════════════════════════════════╗"
echo "║              ✅ DEPLOYMENT COMPLETE!                   ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo "Your app is now available at:"
echo "🌐 https://gaslightersimulationapp.azurewebsites.net"
echo ""
echo "Next steps:"
echo "1. Test the deployed app in your browser"
echo "2. Check Application Insights for any errors"
echo "3. Verify the Azure OpenAI integration works"
echo "4. Update the iframe URL on no2violence.co.il"
echo ""
echo "To view logs:"
echo "  az webapp log tail --resource-group $RESOURCE_GROUP --name $APP_NAME"
echo ""
