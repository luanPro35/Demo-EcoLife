/**
 * Format a number as a score with a + sign if positive
 * @param {number} score - The score to format
 * @returns {string} - Formatted score string
 */
export const formatScore = (score) => {
  const roundedScore = Math.round(score);
  return roundedScore >= 0 ? `+${roundedScore}` : `${roundedScore}`;
};

/**
 * Format a date to a readable string
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  // If it's a Firestore timestamp, convert to JS Date
  const jsDate = date.toDate ? date.toDate() : new Date(date);
  
  return jsDate.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format a carbon footprint value to a readable string with units
 * @param {number} value - The carbon footprint value
 * @returns {string} - Formatted carbon footprint string
 */
export const formatCarbonFootprint = (value) => {
  const rounded = Math.round(value * 10) / 10;
  return `${rounded} kg CO₂e`;
};

/**
 * Format a percentage value
 * @param {number} value - The value to format as percentage
 * @param {number} total - The total value
 * @returns {string} - Formatted percentage string
 */
export const formatPercentage = (value, total) => {
  if (!total) return '0%';
  const percentage = Math.round((value / total) * 100);
  return `${percentage}%`;
};

/**
 * Get a color based on impact level
 * @param {string} impact - The impact level ('high', 'medium', 'low')
 * @returns {string} - Tailwind CSS color class
 */
export const getImpactColor = (impact) => {
  switch (impact?.toLowerCase()) {
    case 'high':
      return 'text-green-600';
    case 'medium':
      return 'text-yellow-600';
    case 'low':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

/**
 * Get a background color based on impact level
 * @param {string} impact - The impact level ('high', 'medium', 'low')
 * @returns {string} - Tailwind CSS background color class
 */
export const getImpactBgColor = (impact) => {
  switch (impact?.toLowerCase()) {
    case 'high':
      return 'bg-green-100';
    case 'medium':
      return 'bg-yellow-100';
    case 'low':
      return 'bg-red-100';
    default:
      return 'bg-gray-100';
  }
};

/**
 * Truncate a string if it's too long
 * @param {string} str - The string to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} - Truncated string
 */
export const truncateString = (str, maxLength = 100) => {
  if (!str) return '';
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
};