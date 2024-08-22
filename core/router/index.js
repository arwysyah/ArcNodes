import ArcComponent from '../Arc';
import { renderComponentByName } from '../renderByComponent';
// Router Version 0.0.56
class Router {
  constructor() {
    this.routes = {};
    this.initialRoute = '';
    window.addEventListener('hashchange', this.onStart.bind(this));
    window.addEventListener('popstate', this.onStart.bind(this));
  }

  /**
   * Adds a route to the router.
   * @param {string} path - The path for the route (e.g., '/home').
   * @param {ArcComponent} component - The component to render for the route.
   */
  addRoute(path, component) {
    this.routes[path] = component;
  }

  /**
   * Handles route changes and renders the appropriate component.
   */
  onStart() {
    const noEndpoint = '/';
    const path = window.location.hash.slice(1) || noEndpoint;

    if (path == noEndpoint) {
      const listOfPath = Object.entries(this.routes).map(([key, val]) => {
        const valueName = val.name;
        return { key, value: valueName, component: val };
      });
      const initialPath = listOfPath.filter(
        e => e.value == this.initialRoute
      )[0];

      this.navigate(initialPath.key, initialPath.component);
      return;
    }
    const slashRoute = path.includes(noEndpoint) ? path : noEndpoint + path;
    if (!this.routes[slashRoute]) {
      throw Error('There is no route detected, are you missing something');
    }
    const currentRoute = this.routes[slashRoute];
    const currentPath = this.getFunctionName(currentRoute);
    const component = ArcComponent.getComponent(currentPath);
    if (!this.initialRoute) {
      throw Error('ERROR : initialRoute not yet set');
    }
    if (component) {
      const root = document.getElementById('root');
      if (root) {
        const instance = new component();
        root.innerHTML = instance.renderComponent();
        instance.initialize();
        renderComponentByName(currentPath, root);
      }
    } else {
      if (path == noEndpoint || this.initialRoute) {
        renderComponentByName(this.initialRoute, root);
      }
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
    if (path == '/') {
      path = '/home'; // at leat for now ~/
    }
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
