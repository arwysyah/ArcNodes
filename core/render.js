/**
 * Renders a component and appends its DOM representation to a container element.
 *
 * This function takes a component instance, generates its virtual node (vNode) by
 * calling the component's `render` method, creates the corresponding DOM element
 * using the `createDomElement` method, and appends this DOM element to the specified
 * container. It then updates the component's `dom` and `vNode` properties and
 * calls `component.mount()` to trigger any lifecycle methods such as `componentDidMount`.
 *
 * @param {Arc.Component} component - The component instance to be rendered. This should
 *                                     be an instance of a class that extends `Arc.Component`.
 * @param {HTMLElement} container - The DOM element to which the component's rendered
 *                                   DOM element will be appended.
 *
 * @throws {Error} Throws an error if the `component` does not have a `render` method.
 *
 * @example
 * // Assuming MyComponent is a class that extends Arc.Component
 * const myComponent = new MyComponent({ someProp: "value" });
 * const container = document.getElementById("root");
 * render(myComponent, container);
 */
export function render(component, container) {
  if (typeof component.render !== "function") {
    throw new Error("Component must have a render() method.");
  }

  const vNode = component.render();
  const dom = component.createDomElement(vNode);
  container.appendChild(dom);
  component.dom = dom;
  component.vNode = vNode;
  component.mount(); // Call componentDidMount after initial render
}
