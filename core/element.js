import { elem } from "./createElement";

/**
 * Proxy handler to dynamically handle HTML tags.
 * Intercepts function calls for HTML tags and dynamically creates them.
 *
 * @type {ProxyHandler<Object>}
 */
const handler = {
  /**
   * Intercepts property access to dynamically create HTML elements.
   *
   * @param {Object} target - The target object being proxied.
   * @param {string} tagName - The name of the HTML tag or custom component.
   * @returns {Function} A function that creates the specified HTML tag or component.
   */
  get(target, tagName) {
    if (typeof tagName === "string") {
      return (props = {}, ...children) => {
        // Separate event handlers and regular props
        const { children: innerChildren = [], ...attributes } = props;
        return elem(tagName, attributes, ...innerChildren, ...children);
      };
    }
    return Reflect.get(target, tagName);
  },
};

/**
 * Proxy object for handling HTML tags dynamically.
 *
 * Usage:
 * ```javascript
 * const button = ArcTag.button({
 *   onClick: handleClick,
 *   class: "my-button",
 *   children: ["Click me"]
 * });
 * ```
 *
 * @type {Proxy}
 */
const ArcTag = new Proxy({}, handler);

// Export the Proxy as the default
export default ArcTag;
