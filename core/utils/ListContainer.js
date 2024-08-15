/**
 * Creates a container element with a list of items.
 * @param {Array} items - The list of items to display.
 * @param {Object} [options={}] - Optional configuration for the container.
 * @param {string} [options.className='list-container'] - CSS class for the container.
 * @param {Object} [options.attributes={}] - Attributes to set on the container.
 * @param {Object} [options.style={}] - Inline styles for the container.
 * @param {Function} [options.itemCreator=createDefaultItem] - Function to create DOM elements from items.
 * @returns {HTMLElement} The container element with the list of items.
 */
/**
 * Creates a container element with a list of items.
 * @param {Array} items - The list of items to display.
 * @param {Object} [options={}] - Optional configuration for the container.
 * @param {string} [options.className='list-container'] - CSS class for the container.
 * @param {Object} [options.attributes={}] - Attributes to set on the container.
 * @param {Object} [options.style={}] - Inline styles for the container.
 * @param {Function} [options.itemRenderer=createDefaultItem] - Function to render each item.
 * @returns {HTMLElement} The container element with the list of items.
 */
export function ListContainer(items, options = {}) {
    if (!Array.isArray(items)) {
      throw new TypeError("Items must be an array");
    }
  
    // Default configuration
    const {
      className = "list-container",
      attributes = {},
      style = {},
      itemRenderer = createDefaultItem,
    } = options;
  
    // Create a container to hold the elements
    const container = document.createElement("div");
    container.className = className;
  
    // Apply inline styles to the container
    Object.assign(container.style, style);
  
    // Set any additional attributes on the container
    for (const [attr, value] of Object.entries(attributes)) {
      container.setAttribute(attr, value);
    }
  
    // Render items using the provided itemRenderer function
    items.forEach((item) => {
      const element = itemRenderer(item);
      container.appendChild(element);
    });
  
    return container;
  }
  
  /**
   * Default function to create DOM elements from item values.
   * @param {any} item - The item value.
   * @returns {HTMLElement} The created DOM element.
   */
  function createDefaultItem(item) {
    if (typeof item === "object" && item !== null) {
      const { tag = "li", content, ...attributes } = item;
      const element = document.createElement(tag);
  
      if (content) element.textContent = content;
  
      for (const [attr, value] of Object.entries(attributes)) {
        element.setAttribute(attr, value);
      }
  
      return element;
    }
    return document.createTextNode(item);
  }