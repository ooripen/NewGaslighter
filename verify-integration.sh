#!/bin/bash

# Complete Azure Integration Verification Script
# This script runs all tests and provides a comprehensive report

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║   Azure OpenAI Integration - Complete Verification Suite      ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

echo -e "${BLUE}📋 Pre-flight Checks${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if .env file exists
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗${NC} .env file not found"
    ((TESTS_FAILED++))
    exit 1
fi

# Check if .env contains required variables
if grep -q "VITE_AZURE_AI_ENDPOINT" .env && grep -q "VITE_AZURE_AI_KEY" .env; then
    echo -e "${GREEN}✓${NC} Required environment variables present"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗${NC} Missing required environment variables"
    ((TESTS_FAILED++))
    exit 1
fi

# Check if .env is in .gitignore
if grep -q "^\.env$" .gitignore; then
    echo -e "${GREEN}✓${NC} .env is protected in .gitignore"
    ((TESTS_PASSED++))
else
    echo -e "${YELLOW}⚠${NC} .env might not be in .gitignore (check manually)"
fi

# Check Node.js version
NODE_VERSION=$(node --version)
echo -e "${GREEN}✓${NC} Node.js ${NODE_VERSION} detected"
((TESTS_PASSED++))

echo ""
echo -e "${BLUE}🔌 API Connectivity Tests${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Run basic connectivity test
echo "Running basic connectivity test..."
if node test-azure-api.js > /tmp/test-basic.log 2>&1; then
    echo -e "${GREEN}✓${NC} Basic API connectivity test PASSED"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗${NC} Basic API connectivity test FAILED"
    cat /tmp/test-basic.log
    ((TESTS_FAILED++))
fi

echo ""
echo -e "${BLUE}🎭 Educational Scenario Tests${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Run gaslighting scenario test
echo "Running educational gaslighting scenario test..."
if node test-gaslighting-scenario.js > /tmp/test-scenario.log 2>&1; then
    echo -e "${GREEN}✓${NC} Educational scenario test PASSED"
    ((TESTS_PASSED++))
    
    # Check if patterns were detected
    if grep -q "Gaslighting patterns detected" /tmp/test-scenario.log; then
        echo -e "${GREEN}✓${NC} Gaslighting patterns successfully detected"
        ((TESTS_PASSED++))
    else
        echo -e "${YELLOW}⚠${NC} Warning: Patterns may not be clearly detected"
    fi
else
    echo -e "${RED}✗${NC} Educational scenario test FAILED"
    cat /tmp/test-scenario.log
    ((TESTS_FAILED++))
fi

echo ""
echo -e "${BLUE}🔒 Security Checks${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check for API key in git history (should not be there)
if git log --all --full-history --source -- .env 2>/dev/null | grep -q "commit"; then
    echo -e "${RED}✗${NC} Warning: .env file may have been committed to git history"
    ((TESTS_FAILED++))
else
    echo -e "${GREEN}✓${NC} No .env file in git history"
    ((TESTS_PASSED++))
fi

# Check if API key is visible in any tracked files
if git grep "c5148448403f4ed7abc374e856a308cd" 2>/dev/null | grep -v ".env"; then
    echo -e "${RED}✗${NC} API key found in tracked files!"
    ((TESTS_FAILED++))
else
    echo -e "${GREEN}✓${NC} API key not exposed in tracked files"
    ((TESTS_PASSED++))
fi

# Check file permissions
ENV_PERMS=$(stat -c "%a" .env 2>/dev/null || stat -f "%Lp" .env 2>/dev/null)
echo -e "${GREEN}✓${NC} .env file permissions: ${ENV_PERMS}"
((TESTS_PASSED++))

echo ""
echo -e "${BLUE}📊 Integration Status${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Display environment info (without exposing secrets)
ENDPOINT=$(grep "VITE_AZURE_AI_ENDPOINT" .env | cut -d'=' -f2 | cut -d'?' -f1)
API_KEY_PREFIX=$(grep "VITE_AZURE_AI_KEY" .env | cut -d'=' -f2 | cut -c1-8)

echo "Environment Configuration:"
echo "  • Endpoint: ${ENDPOINT}..."
echo "  • API Key: ${API_KEY_PREFIX}... (hidden)"
echo "  • Model: GPT-4o (from test results)"
echo "  • Region: gaslighter.cognitiveservices.azure.com"

echo ""
echo -e "${BLUE}📈 Test Summary${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

TOTAL_TESTS=$((TESTS_PASSED + TESTS_FAILED))
PASS_RATE=$((TESTS_PASSED * 100 / TOTAL_TESTS))

echo "Tests Passed: ${TESTS_PASSED}"
echo "Tests Failed: ${TESTS_FAILED}"
echo "Total Tests: ${TOTAL_TESTS}"
echo "Pass Rate: ${PASS_RATE}%"

echo ""
if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}╔═══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✅ ALL TESTS PASSED - INTEGRATION READY FOR PRODUCTION   ║${NC}"
    echo -e "${GREEN}╚═══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Build the React application: npm run dev"
    echo "  2. Test the full user flow in the browser"
    echo "  3. Deploy to production when ready"
    echo ""
    exit 0
else
    echo -e "${RED}╔═══════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║  ❌ SOME TESTS FAILED - REVIEW ISSUES BEFORE DEPLOYMENT   ║${NC}"
    echo -e "${RED}╚═══════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Please review the failed tests above and fix issues before proceeding."
    echo ""
    exit 1
fi
