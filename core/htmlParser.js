
/**
 * A template literal tag function to process HTML template strings.
 * This function safely escapes HTML entities, handles various data types, and
 * converts objects to attribute strings for easy embedding within HTML.
 * It also supports embedding functions as event handlers by creating global function IDs.
 *
 * @param {Array<string>} strings - The literal strings in the template.
 * @param {...*} values - The values to be interpolated into the template.
 * @returns {string} The fully processed HTML string.
 */
export function html(strings, ...values) {
 
 /**
   * Escapes special HTML characters in a string to prevent XSS attacks and
   * ensure that HTML is correctly displayed in the browser.
   *
   * @param {string} text - The text to be escaped.
   * @returns {string} The escaped HTML string.
   */
  const escapeHtml = (text) => {
    return text
      .replace(/&/g, "&amp;") // Replace '&' with '&amp;'
      .replace(/</g, "&lt;") // Replace '<' with '&lt;'
      .replace(/>/g, "&gt;") // Replace '>' with '&gt;'
      .replace(/"/g, "&quot;") // Replace '"' with '&quot;'
      .replace(/'/g, "&#039;"); // Replace '\'' with '&#039;'
  };

  /**
   * Processes each value in the template to handle different types:
   * - Strings are returned as-is.
   * - Numbers, booleans, and objects are JSON.stringified.
   * - Functions are returned as global function IDs.
   * - DOM nodes are converted to their HTML string representation.
   * - Undefined and null values are converted to empty strings.
   *
   * @param {Array<*>} values - The values to be processed.
   * @returns {Array<string>} An array of processed values as strings.
   */

  const processedValues = values.map((value, i) => {
    if (typeof value === "function") {
      const functionName = value.name.replace(/^bound\s+/, "");
      // Use a unique function ID for each function
      const functionId = functionName;
      // Store function in global scope for retrieval
      window[functionId] = value;
      return functionId;
    }
    if (typeof value === "string") {
      // Return string values directly
      // return escapeHtml(value);
      return value;
    }
    if (value === undefined || value === null) {
      return "";
    }
    if (Array.isArray(value)) {
      // Handle arrays by mapping over their elements
      return value
        .map((item) => {
          if (typeof item === "string") {
            return escapeHtml(item);
          }
          if (item instanceof Node) {
            return item.outerHTML;
          }
          return "";
        })
        .join("");
    }
    if (typeof value === "object" && !(value instanceof Node)) {
      return `${encodeURIComponent(JSON.stringify(value))}`;
    }
    if (value instanceof Node) {
      // Convert DOM nodes to their outer HTML string
      return value.outerHTML;
    }
    return escapeHtml(JSON.stringify(value));
  });

  /**
   * Rebuilds the template string by interleaving the processed values with the literal strings.
   * Ensures that each value is placed in the correct position within the final HTML output.
   *
   * @param {Array<string>} strings - The literal strings from the template.
   * @param {Array<string>} processedValues - The processed values.
   * @returns {string} The final HTML string.
   */
  return strings.reduce(
    (acc, str, i) =>
      acc + str + (processedValues[i] !== undefined ? processedValues[i] : ""),
    "",
  );
}