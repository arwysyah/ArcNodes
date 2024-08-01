/**
 * Creates a virtual node (vNode) or renders a component.
 *
 * If the `type` parameter is a function, it assumes the function is a component class
 * and creates an instance of it with the provided `props`. It then calls the
 * component's `render` method to get the virtual node.
 *
 * If the `type` parameter is a string, it creates a virtual node with the given type,
 * properties (`props`), and children. The children are flattened into a single array.
 *
 * @param {string|Function} type - The type of the virtual node. Can be an HTML tag name
 *                                  (e.g., "div", "span") or a component class.
 * @param {Object} [props={}] - An object containing properties and attributes for the
 *                               virtual node. Event handlers should be functions.
 * @param {...(string|Object|Function)} [children] - Child nodes or text content for the
 *                                                   virtual node. Can be strings,
 *                                                   virtual nodes, or components.
 * @returns {Object} The virtual node representing the HTML element or component.
 *
 * @example
 * // Creating a virtual node for a <button> element
 * const buttonVNode = elem("button", { onClick: handleClick }, "Click me");
 *
 * // Creating a virtual node for a custom component
 * const customComponentVNode = elem(MyComponent, { someProp: "value" });
 */
// createElement.js
export function elem(type, props = {}, ...children) {
  if (typeof type === "function") {
    const component = new type(props);
    return component.render();
  }

  // Handle HTML tags
  return { type, props, children: children.flat() };
}
