
/**
 * Converts a string representation of a function into an actual function.
 *
 * @param {string} funcString - The string representation of the function.
 * @returns {Function} The actual function.
 * @throws Will throw an error if the string cannot be converted to a function.
 */
export function convertStringToFunction(funcString) {
    try {
      // Remove any surrounding whitespace
      funcString = funcString.trim();
  
      // Validate and format the function string
      if (
        !funcString.startsWith("function") &&
        !funcString.startsWith("() =>") &&
        !funcString.includes("function")
      ) {
        throw new Error("Unsupported function format");
      }
  
      // Convert function string to a function
      let formattedFunction;
  
      if (funcString.startsWith("function")) {
        // Regular function
        formattedFunction = new Function("return " + funcString)();
      } else if (
        funcString.startsWith("() =>") ||
        funcString.startsWith("function") ||
        funcString.includes("function")
      ) {
        // Arrow function or other function formats
        const body = funcString
          .replace(/^[^(]*\(/, "(") // Ensure the parentheses are preserved
          .replace(/^\s*|\s*$/, ""); // Trim extra spaces
        formattedFunction = new Function("return " + body)();
      } else {
        throw new Error("Unsupported function format");
      }
  
      if (typeof formattedFunction !== "function") {
        throw new Error("Conversion did not produce a function");
      }
  
      return formattedFunction;
    } catch (error) {
      throw new Error("Error converting string to function: " + error.message);
    }
  }