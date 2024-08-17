/**
 * Injects a `componentKey` attribute into the first top-level HTML element
 * found in the provided HTML string.
 *
 * This function is used to ensure that each component's top-level HTML element
 * is associated with a unique `componentKey`, facilitating easier identification
 * and interaction within a component-based architecture.
 *
 * @param {string} html - The HTML string in which the `componentKey` attribute should be injected.
 * @param {string} componentKey - The unique key or identifier to be injected as an attribute
 *                                into the top-level HTML element.
 * @returns {string} The modified HTML string with the `componentKey` attribute injected
 *                   into the first top-level HTML element.
 *
 * @example
 * const htmlString = `
 *   <div class="main-content">
 *     <p>Main Component</p>
 *   </div>
 * `;
 *
 * const componentKey = "MainComponent";
 * const modifiedHtml = injectComponentKey(htmlString, componentKey);
 * console.log(modifiedHtml);
 * // Output:
 * // <div componentKey="MainComponent" class="main-content">
 * //   <p>Main Component</p>
 * // </div>
 */
const injectComponentKey = (html, componentKey) => {
  return html.replace(/<([a-z][\w-]*)([^>]*)>/i, (_, tagName, rest) => {
    return `<${tagName} componentKey="${componentKey}"${rest}>`;
  });
};

export {injectComponentKey}