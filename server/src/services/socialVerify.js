/**
 * socialVerify.js
 * - For MVP we accept manual verification (proof screenshot / analytics link)
 * - Later integrate YouTube Data API / Instagram Graph API or 3rd party providers
 */

module.exports = {
  // Example API: checkFollowers(platform, handle) -> returns a number or throws
  checkFollowers: async (platform, handle) => {
    // not implemented: return null so admin manual verification required
    return null;
  }
};
