import ArcComponent from "./Arc";
import { setupEventListeners } from "./setupEventListener";

/**
 * Mounts nested components within the given container element.
 * It looks for elements that match registered component names and initializes them.
 * Also sets up event listeners and recursively mounts nested components.
 *
 * @param {HTMLElement} container - The container element to search for nested components.
 */
export function mountNestedComponents(container) {
  // Select all elements within the container
  const elements = container.querySelectorAll("*");

  elements.forEach((el) => {
    // Get the component name from the tag name
    const name = el.tagName.toLowerCase();
    // Retrieve the component class from the global registry
    const Component = ArcComponent.getComponent(name);

    if (Component) {
      // Collect properties from element attributes
      const props = {};

      // Create an instance of the component and render it
      const instance = new Component(props);
      el.innerHTML = instance.render();
      instance.initialize();

      // Recursively mount nested components
      mountNestedComponents(el);
      // Set up event listeners for the component
      setupEventListeners(el, instance);
    }
  });
}
