/**
 * Commission Distribution Helper
 * Handles referral commission distribution logic
 */

import { Users } from "@/app/config/Models/Users/users";
import { Transaction } from "@/app/config/Models/Transaction/transaction";

/**
 * Build referral chain for a user
 * @param {string} userId - User ID to build chain for
 * @param {number} maxLevels - Maximum levels to build (default: 7)
 * @returns {Array} Array of user objects in referral chain
 */
export const buildReferralChain = async (userId, maxLevels = 7) => {
  const referralChain = [];
  let currentRef = userId;

  while (currentRef && referralChain.length < maxLevels) {
    const refUser = await Users.findById(currentRef);
    if (refUser) {
      referralChain.push(refUser);
      currentRef = refUser.referrerId;
    } else {
      break;
    }
  }

  return referralChain;
};

/**
 * Distribute commissions to referral levels
 * @param {Object} params - Distribution parameters
 * @returns {Object} Distribution results
 */
export const distributeCommissions = async ({
  freshUser,
  distributable,
  levelPercentages,
  source,
  transactionDescription,
  validateRecipients = true
}) => {
  const distributedTo = [];
  let totalDistributed = 0;

  // Build referral chain
  const referralChain = await buildReferralChain(freshUser.referrerId, levelPercentages.length);

  console.log(`[Commission Distribution] User: ${freshUser.username}, Source: ${source}`);
  console.log(`[Commission Distribution] Distributable Amount: ${distributable}`);
  console.log(`[Commission Distribution] Referral Chain Length: ${referralChain.length}`);
  console.log(`[Commission Distribution] Level Percentages:`, levelPercentages);

  // Distribute to each level
  for (let i = 0; i < referralChain.length && i < levelPercentages.length; i++) {
    const recipient = referralChain[i];
    const levelPercent = levelPercentages[i] || 0;
    const amount = (levelPercent / 100) * distributable;

    if (amount > 0) {
      // Check if recipient should receive commission
      let shouldReceive = true;
      
      if (validateRecipients) {
        // Optional: Add validation logic here
        // For example, check if user is registered/activated
        shouldReceive = recipient.is_registered;
      }

      if (shouldReceive) {
        // Update recipient balance
        recipient.accountBalance += amount;
        await recipient.save();

        // Create transaction record
        await Transaction.create({
          userId: recipient._id,
          senderId: freshUser._id,
          type: "commission",
          amount,
          description: `${transactionDescription} Level ${i + 1}`,
          postbalance: recipient.accountBalance,
        });

        distributedTo.push({
          level: i + 1,
          user: recipient._id,
          username: recipient.username,
          amount,
          percentage: levelPercent
        });

        totalDistributed += amount;

        console.log(`[Commission Distribution] Level ${i + 1}: ${recipient.username} received ${amount} (${levelPercent}%)`);
      } else {
        console.log(`[Commission Distribution] Level ${i + 1}: ${recipient.username} not eligible, amount ${amount} goes to company`);
        return { distributedTo, totalDistributed, remainingAmount: amount };
      }
    }
  }

  // Calculate remaining amount
  const remainingAmount = distributable - totalDistributed;

  console.log(`[Commission Distribution] Total Distributed: ${totalDistributed}`);
  console.log(`[Commission Distribution] Remaining to Company: ${remainingAmount}`);

  return { distributedTo, totalDistributed, remainingAmount };
};

/**
 * Validate commission settings
 * @param {Object} settings - Commission settings
 * @returns {Object} Validation result
 */
export const validateCommissionSettings = (settings) => {
  const errors = [];

  if (!settings) {
    errors.push("Commission settings not found");
    return { isValid: false, errors };
  }

  if (!settings.price || settings.price <= 0) {
    errors.push("Invalid price setting");
  }

  if (!settings.commission || settings.commission < 0 || settings.commission > 100) {
    errors.push("Invalid commission percentage");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Calculate commission amounts
 * @param {number} totalAmount - Total amount
 * @param {number} companyPercent - Company commission percentage
 * @param {Array} levelPercentages - Level commission percentages
 * @returns {Object} Calculated amounts
 */
export const calculateCommissionAmounts = (totalAmount, companyPercent, levelPercentages) => {
  const companyAmount = (companyPercent / 100) * totalAmount;
  const distributable = totalAmount - companyAmount;

  const levelAmounts = levelPercentages.map(percent => (percent / 100) * distributable);

  return {
    totalAmount,
    companyAmount,
    distributable,
    levelAmounts,
    totalLevelAmount: levelAmounts.reduce((sum, amount) => sum + amount, 0)
  };
};

/**
 * Log commission distribution details
 * @param {Object} details - Distribution details
 */
export const logCommissionDistribution = (details) => {
  console.log("=== COMMISSION DISTRIBUTION LOG ===");
  console.log(`User: ${details.userId}`);
  console.log(`Source: ${details.source}`);
  console.log(`Total Amount: ${details.totalAmount}`);
  console.log(`Company Commission: ${details.companyAmount}`);
  console.log(`Distributable: ${details.distributable}`);
  console.log(`Distributed To:`, details.distributedTo);
  console.log(`Total Distributed: ${details.totalDistributed}`);
  console.log(`Remaining to Company: ${details.remainingAmount}`);
  console.log("===================================");
}; 