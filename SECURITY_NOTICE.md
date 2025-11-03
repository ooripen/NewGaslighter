# ⚠️ SECURITY NOTICE: .env File in Git History

## Issue Detected
The `.env` file containing Azure API credentials was previously committed to the git repository history (commit: ba48268).

## Current Status
- ✅ `.env` is now in `.gitignore`
- ✅ API key is not in any tracked files
- ⚠️ API key **IS** in git history

## Security Risk Level: **MEDIUM-HIGH**

### Why This Matters
Anyone with access to the repository (even if the file is later removed) can view historical commits and extract the API key.

## Recommended Actions

### IMMEDIATE (Required for Production)

#### Option 1: Rotate the API Key (RECOMMENDED)
1. Go to Azure Portal: https://portal.azure.com
2. Navigate to your Azure OpenAI resource (gaslighter.cognitiveservices.azure.com)
3. Go to "Keys and Endpoint"
4. Click "Regenerate Key 1" or "Regenerate Key 2"
5. Update your `.env` file with the new key
6. Test the connection again

#### Option 2: Restrict Key Permissions
1. In Azure Portal, configure the API key restrictions:
   - Limit to specific IP addresses
   - Set up request rate limits
   - Enable logging and monitoring

### LONG-TERM (Best Practices)

1. **Use Azure Key Vault**
   ```bash
   # Store secrets in Azure Key Vault instead of .env
   az keyvault secret set --vault-name YourVaultName \
     --name "AZURE-OPENAI-KEY" \
     --value "your-api-key"
   ```

2. **Remove Sensitive History** (Advanced)
   ```bash
   # WARNING: This rewrites git history - coordinate with team!
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env" \
     --prune-empty --tag-name-filter cat -- --all
   
   # Force push to remote
   git push origin --force --all
   ```

3. **Use Environment-Specific Secrets**
   - Development: Local `.env` (never commit)
   - Production: Azure App Service environment variables
   - CI/CD: GitHub Secrets or Azure DevOps variables

## For This Educational Project

Given this is an educational tool for **no2violence.co.il**, here are specific recommendations:

### If Deploying Soon (Urgent)
```bash
# 1. Regenerate the API key in Azure Portal NOW
# 2. Update .env with new key
# 3. Test the connection
node test-azure-api.js

# 4. Ensure .env is gitignored (already done)
git status  # Should NOT show .env
```

### If Still in Development
```bash
# 1. Create a new Azure OpenAI deployment with a fresh key
# 2. Update .env with new credentials
# 3. Keep monitoring for unauthorized usage
```

## Monitoring for Unauthorized Use

Check Azure Portal for:
- Unexpected API calls
- Unusual usage patterns
- Requests from unknown IPs
- High token consumption

## Current Credentials (As of Last Commit)

⚠️ **These credentials are COMPROMISED and should be rotated:**
- Endpoint: https://gaslighter.cognitiveservices.azure.com
- Deployment: Gaslighter
- API Key: c5148448403f4ed7abc374e856a308cd (EXPOSED in commit ba48268)

## Action Checklist

- [ ] Acknowledge this security issue
- [ ] Decide on remediation approach (rotate key vs. new deployment)
- [ ] Execute the chosen remediation
- [ ] Update `.env` with new credentials
- [ ] Test the integration again: `./verify-integration.sh`
- [ ] Confirm all tests pass with new credentials
- [ ] Set up Azure monitoring and alerts
- [ ] Document the incident and resolution

## Prevention for Future

1. ✅ **Never commit .env files** - Already in .gitignore
2. ✅ **Use .env.example** - Create template with placeholders
3. ✅ **Pre-commit hooks** - Add git hooks to prevent .env commits
4. ✅ **Secret scanning** - Enable GitHub secret scanning (if using GitHub)
5. ✅ **Code review** - Always review before pushing

## Questions?

If you need help rotating the API key or setting up Azure Key Vault, please refer to:
- [Azure Key Vault Documentation](https://docs.microsoft.com/azure/key-vault/)
- [Azure OpenAI Key Management](https://docs.microsoft.com/azure/cognitive-services/openai/)

---

**Report Generated:** November 3, 2025  
**Priority:** HIGH  
**Action Required:** Yes - Before production deployment
