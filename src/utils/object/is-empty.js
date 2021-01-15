/**
 * Checks if an argument is an empty object (no keys), empty array (no items) or empty string ('')
 *
 * @param obj
 * @returns {boolean}
 */
export default function isEmpty(obj) {
  if (obj === null || typeof obj === 'undefined') {
    return true;
  }
  if (typeof obj === 'string' && obj === '') {
    return true;
  }
  if (Array.isArray(obj) && !obj.length) {
    return true;
  }
  if (!Object.keys(obj).length) {
    return true;
  }

  return typeof obj === 'number' || typeof obj === 'boolean';
}
