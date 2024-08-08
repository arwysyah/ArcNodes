/**
 * Sets up event listeners for elements within the specified container that have `data-action` attributes.
 * The function will look for elements with `data-action` attributes and bind the corresponding
 * methods from the component instance to the `click` event of those elements.
 *
 * @param {HTMLElement} container - The container element within which to find elements with `data-action` attributes.
 * @param {object} instance - The component instance whose methods will be bound to the event handlers.
 * @throws {TypeError} Throws an error if the `instance` is not an object or if the handler method is not a function.
 */
export function setupEventListeners(container, instance) {
  // Select all elements within the container that have a data-action attribute
  const elements = container.querySelectorAll("[data-action]");

  elements.forEach((element) => {
    // Get the action name from the data-action attribute
    const action = element.getAttribute("data-action");
    // Retrieve the corresponding handler method from the instance
    const handler = instance[action];

    // Check if the handler exists and is a function
    if (handler && typeof handler === "function") {
      // Bind the handler to the instance and attach it to the click event
      element.addEventListener("click", handler.bind(instance));
    } else {
      // Warn if no handler is found or if the handler is not a function
      console.warn(`No handler found for action: ${action}`);
    }
  });
}
