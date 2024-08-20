// export function setupEventListeners(container, instance) {
//   if (!(container instanceof HTMLElement)) {
//     throw new TypeError("The container must be an instance of HTMLElement.");
//   }
//   if (typeof instance !== "object" || instance === null) {
//     throw new TypeError("The instance must be an object.");
//   }

//   // Select all elements within the container that have an onclick attribute
//   const elements = container.querySelectorAll("[onclick]");
  
//   elements.forEach((element) => {
//     const functionName = element.getAttribute("onclick");

//     if (!functionName) {
//       console.warn("No onclick attribute found on element:", element);
//       return;
//     }

//     // Retrieve the function from the instance using the function name
//     const handler = instance[functionName];
   

//     if (handler && typeof handler === "function") {
//       console.log(typeof handler,functionName,handler)
//       // Bind the handler to the instance and attach it to the click event
//       element.addEventListener("click", handler.bind(instance));
//     } else {
//       console.warn(`No function found for onclick attribute: ${functionName}`, handler);
//     }
//   });
// }

 // <---------------------------------------------------------------->
/**
 * Sets up event listeners on elements within a specified container based on their `onclick` attributes.
 * The function attaches event handlers to elements that specify a function name in their `onclick` attribute
 * and provides optional parameters through a custom `action-arg` attribute.
 *
 * @param {HTMLElement} container - The DOM element within which to search for elements with `onclick` attributes.
 * @param {Object} instance - The context (`this` value) to be used when invoking the event handlers.
 * @throws {TypeError} Throws an error if `container` is not an instance of `HTMLElement` or if `instance` is not an object or is `null`.
 *
 * @example
 * // Define a function in the global scope
 * function handleClick(param1, param2) {
 *   console.log(this, param1, param2);
 * }
 *
 * // Define a container and instance
 * const container = document.getElementById('myContainer');
 * const instance = { someData: 123 };
 *
 * // Set up event listeners
 * setupEventListeners(container, instance);
 *
 * // HTML Example:
 * // <div id="myContainer">
 * //   <button onclick="handleClick" action-arg='["value1", "value2"]'>Click Me</button>
 * // </div>
 */
export function setupEventListeners(container, instance) {
  if (!(container instanceof HTMLElement)) {
    throw new TypeError("The container must be an instance of HTMLElement.");
  }
  if (typeof instance !== "object" || instance === null) {
    throw new TypeError("The instance must be an object.");
  }

  // Select all elements within the container that have an onclick attribute
  var elements = container.querySelectorAll("[onclick]");
  elements.forEach(function (element) {
    var functionName = element.getAttribute("onclick");
    var handler = window[functionName];
    
    if (handler && typeof handler === "function") {
      // Get parameters from data-args attribute
      var params = element.getAttribute("action-arg");

      // Add event listener with handler and parameters
      element.addEventListener("click", function () {
        try {
          // Default to empty array if params is null or undefined
          var parsedParams = params ? JSON.parse(params) : [];
          
          if (Array.isArray(parsedParams)) {
            // If params is an array, call handler with spread syntax
            handler.apply(instance, parsedParams);
          } else {
            // If params is a single value (not an array), pass it directly
            handler.call(instance, parsedParams);
          }
        } catch (error) {
          handler.bind(instance);
        }
      });
    } else {
      console.warn("No function found for onclick attribute:", functionName);
    }
  });
}
