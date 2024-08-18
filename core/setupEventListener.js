export function setupEventListeners(container, instance) {
  if (!(container instanceof HTMLElement)) {
    throw new TypeError("The container must be an instance of HTMLElement.");
  }

  if (typeof instance !== "object" || instance === null) {
    throw new TypeError("The instance must be an object.");
  }

  // Select all elements within the container that have an onclick attribute
  const elements = container.querySelectorAll("[onclick]");

  elements.forEach((element) => {
    const functionId = element.getAttribute("onclick");
    const handler = window[functionId];

    if (handler && typeof handler === "function") {
      // Bind the handler to the instance and attach it to the click event
      element.addEventListener("click", handler.bind(instance));
    } else {
      console.warn(`No function found for onclick attribute: ${functionId}`, handler);
    }
  });
}
