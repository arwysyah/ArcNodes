import ArcComponent from "../Arc";
import { renderComponentByName } from "../renderByComponent";

class Router {
  constructor() {
    this.routes = {};
    this.initialRoute = "";
    window.addEventListener("hashchange", this.onStart.bind(this));
    window.addEventListener("popstate", this.onStart.bind(this));
  }

  /**
   * Adds a route to the router.
   * @param {string} path - The path for the route (e.g., '/home', '/user/:id').
   * @param {ArcComponent} component - The component to render for the route.
   */
  addRoute(path, component) {
    // Convert the path to a regex pattern
    const routePattern = this.createRoutePattern(path);
    this.routes[routePattern] = { component, path };
  }

  /**
   * Creates a regex pattern from a route path.
   * @param {string} path - The path with potential parameters.
   * @returns {RegExp} - The generated regex pattern.
   */
  createRoutePattern(path) {
    const paramRegex = /:([a-zA-Z0-9_]+)/g;
    const regexString = path.replace(paramRegex, '([^\\/]+)');
    return new RegExp(`^${regexString}$`);
  }

  /**
   * Handles route changes and renders the appropriate component.
   */
  onStart() {
    const path = window.location.hash.slice(1) || "/";
    let matchedRoute = null;
    let params = {};

    // Match the current path with the routes
    for (const pattern of Object.keys(this.routes)) {
      const regex = new RegExp(pattern);
      const match = regex.exec(path);

      if (match) {
        matchedRoute = this.routes[pattern];
        params = this.extractParams(matchedRoute.path, match);
        break;
      }
    }

    if (!matchedRoute) {
      throw new Error("Route not found");
    }

    const componentClass = matchedRoute.component;
    const componentName = this.getFunctionName(componentClass);

    const component = ArcComponent.getComponent(componentName);
    if (!this.initialRoute) {
      throw Error("ERROR : initialRoute not yet set");
    }
    
    const root = document.getElementById("root");
    if (component && root) {
      const instance = new component(params); // Pass parameters to the component
      root.innerHTML = instance.renderComponent();
      instance.initialize();
      renderComponentByName(componentName, root);
    } else {
      if (path == "/" || this.initialRoute) {
        renderComponentByName(this.initialRoute, root);
      }
    }
  }

  /**
   * Extracts parameters from the matched route.
   * @param {string} path - The original route path with parameters.
   * @param {Array} match - The matched result from the regex.
   * @returns {object} - An object containing the route parameters.
   */
  extractParams(path, match) {
    const paramRegex = /:([a-zA-Z0-9_]+)/g;
    const paramNames = [];
    let result;

    while ((result = paramRegex.exec(path)) !== null) {
      paramNames.push(result[1]);
    }

    const params = {};
    paramNames.forEach((paramName, index) => {
      params[paramName] = this.parseParam(match[index + 1]);
    });

    return params;
  }

  /**
   * Parses a route parameter to determine its type (e.g., number, object).
   * @param {string} param - The route parameter to parse.
   * @returns {any} - The parsed parameter.
   */
  parseParam(param) {
    try {
      // Attempt to parse JSON for objects and arrays
      return JSON.parse(decodeURIComponent(param));
    } catch (e) {
      // If parsing fails, return the original string or number
      return isNaN(param) ? param : Number(param);
    }
  }

  /**
   * Extracts the name of a function.
   * @param {Function} fn - The function to extract the name from.
   * @returns {string|null} - The function name or null if not found.
   */
  getFunctionName(fn) {
    return fn.name || (fn.toString().match(/^function\s*([\w\$]+)/) || [])[1];
  }

  /**
   * Sets the initial route and adds it to the router.
   * @param {string} path - The path for the initial route.
   * @param {ArcComponent} component - The component to render for the initial route.
   */
  setInitialRoute(path, component) {
    const compName = this.getFunctionName(component);

    this.initialRoute = compName;
    this.addRoute(path, component);
  }

  /**
   * Navigates to a specific route programmatically.
   * @param {string} path - The path to navigate to (e.g., '/home').
   */
  navigate(path) {
    window.location.hash = path;
  }
}

export const router = new Router();
