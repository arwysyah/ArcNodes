/**
 * Gets the name of a function, stripping off any "bound " prefix if present.
 * If the function does not have a name, a random string is generated.
 *
 * @param {Function} fn - The function whose name is to be retrieved.
 * @returns {string} The name of the function, or a random string if the function has no name.
 */
export const getFunctionName = fn => {
  const boundPrefix = /^bound\s+/;
  const name = fn.name
    ? fn.name.replace(boundPrefix, '')
    : `func_${Math.random().toString(36).substring(2)}`;
  return name;
};

/**
 * Checks a string for invalid patterns such as comments that may be used for malicious code.
 * Throws an error if any invalid patterns are detected.
 *
 * @param {string} text - The text to be checked.
 * @returns {string} The text if no invalid patterns are found.
 * @throws {Error} Throws an error if invalid patterns are detected.
 */
const checkForInvalidPatterns = text => {
  if (text.includes("//") || text.includes("<!--")) {
    throw new Error("Invalid code pattern detected in HTML template");
  }
  return text;
};

/**
 * A template literal tag function that processes strings and values to generate HTML-safe strings.
 * Handles escaping of HTML characters and serialization of functions and objects. 
 *
 * @param {TemplateStringsArray} strings - The array of template strings.
 * @param {...(string|number|Object|Array|Function|Node)} values - The values to be interpolated into the template.
 * @returns {string} The processed HTML string with escaped values and serialized functions.
 */
export function html(strings, ...values) {
  const escapeHtml = text => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const processedValues = values.map(value => {
    if (typeof value === 'function') {
      const functionName = getFunctionName(value);
    //   if (window[functionName]) {
    //     throw new Error(`A ${functionName} function with this name already exists globally. Please use a different name.`);
    // }
      window[functionName] = value;
      return functionName;
    }
    if (typeof value === 'string') {
      checkForInvalidPatterns(value);
      return value;
    }
    if (value === undefined || value === null) {
      return '';
    }
    if (Array.isArray(value)) {
      return value
        .map(item => {
          if (typeof item === 'string') {
            return escapeHtml(item);
          }
          if (item instanceof Node) {
            return item.outerHTML;
          }
          return '';
        })
        .join('');
    }
    if (typeof value === 'object' && !(value instanceof Node)) {
      return `${encodeURIComponent(JSON.stringify(value))}`;
    }
    if (value instanceof Node) {
      return value.outerHTML;
    }
    return escapeHtml(JSON.stringify(value));
  });

  return strings.reduce((acc, str, i) => {
    return (
      acc + str + (processedValues[i] !== undefined ? processedValues[i] : '')
    );
  }, '');
}
