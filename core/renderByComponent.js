import ArcComponent from "./Arc";
import { mountNestedComponents } from "./mountNestedComponent";
import { setupEventListeners } from "./setupEventListener";

/**
 * Renders a component by its name and mounts it into the specified container.
 * This function will:
 * 1. Retrieve the component class based on the provided name.
 * 2. Create an instance of the component.
 * 3. Render the component's HTML into the container.
 * 4. Set up event listeners for the component.
 * 5. Recursively mount any nested components within the container.
 * 6. Call the component's `initialize` lifecycle method.
 *
 * @param {string} name - The name of the component to render. This name should match a registered component in `ArcComponent`.
 * @param {HTMLElement} container - The container element where the component will be rendered. It should be a valid DOM element.
 * @throws {Error} Throws an error if the component is not found.
 */
export function renderComponentByName(name, container) {
  // Retrieve the component class from the global registry
  const Component = ArcComponent.getComponent(name);

  // Check if the component was found
  if (!Component) {
    console.error(`Component ${name} not found`);
    return;
  }

  // Create an instance of the component
  const instance = new Component();

  // Render the component's HTML into the container
  container.innerHTML = instance.render();

  // Set up event listeners for the component
  setupEventListeners(container, instance);

  // Recursively mount any nested components within the container
  mountNestedComponents(container);

  // Call the component's initialize lifecycle method
  instance.initialize();
}
