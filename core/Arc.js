import { mountNestedComponents } from "./mountNestedComponent";
import { setupEventListeners } from "./setupEventListener";

const components = {}; // Global registry for components

/**
 * Base class for creating components in the Arc Library.
 * Provides lifecycle methods, state management, and rendering capabilities.
 */
export default class ArcComponent {
  /**
   * @static
   * @type {string}
   * @description The name of the component. Set by the `registerComponent` method.
   */
  static componentName;

  /**
   * Creates an instance of ArcComponent.
   * @param {object} [props={}] - Initial properties for the component.
   */
  constructor(props) {
    this.props = this.parseProps(props || {});
    this.mutableState = {};
    this.renderedHtml = "";
    this.isInitialized = false;
    if (!this.constructor.componentName) {
      this.constructor.componentName = this.constructor.name.toLowerCase();
    }

  }

  /**
 * Parses and processes the properties (props) for the component.
 * This method converts JSON-encoded strings into their respective data types
 * and handles any values that fail to parse as JSON.
 *
 * @param {Object} props - An object containing properties as key-value pairs,
 * where values may be JSON-encoded strings.
 * 
 * @returns {Object} An object with properties where JSON-encoded strings
 * are parsed back into their original data types, and other values are used as-is.
 * 
 *  /** */

  parseProps(props) {
    const parsedProps = {};
    for (const [key, value] of Object.entries(props)) {
      try {
        parsedProps[key] = JSON.parse(value);
      } catch (e) {
        parsedProps[key] = value; 
      }
    }
    return parsedProps;
  }

  /**
   * Renders the component's content inside a container with a componentKey attribute.
   * @returns {string} The HTML string representing the component.
   */
  renderComponent() {
    const content = this.render();
    return `<div componentKey="${this.constructor.componentName}">${content}</div>`;
  }

  /**
   * Registers the component with a specified name in the global registry.
   * @static
   * @param {string} name - The name to register the component under.
   * @throws {Error} Throws an error if the name is not defined.
   */
  static registerComponent(name) {
    if (name) {
      this.componentName = name; // Set the component name
      components[name.toLowerCase()] = this;
    } else {
      throw Error("Component name is not defined");
    }
  }

  /**
   * Retrieves the component class from the global registry based on the name.
   * @static
   * @param {string} name - The name of the component to retrieve.
   * @returns {ArcComponent|undefined} The component class or `undefined` if not found.
   */
  static getComponent(name) {
    return components[name.toLowerCase()];
  }

  /**
   * Updates the component state and triggers a re-render.
   * @param {object|function} stateUpdater - Either a function that returns the new state or an object representing the new state.
   */
  applyChanges(stateUpdater) {
    const prevState = Array.isArray(this.mutableState)
    // Create a shallow copy of the array
      ? [...this.mutableState]   
      // Create a shallow copy of the object
      : { ...this.mutableState }; 

    // Determine the new state based on the type of stateUpdater
    const newState = typeof stateUpdater === 'function'
      ? stateUpdater(prevState)
      : stateUpdater;

    // Merge the new state with the existing state
    this.mutableState = Array.isArray(this.mutableState)
      ? [...newState]              
      : { ...this.mutableState, ...newState }; 

    this.update(prevState);
  }

  /**
   * Updates the component by rendering new HTML and invoking lifecycle methods.
   * @param {object} prevState - The previous state of the component.
   * @private
   */
  update(prevState) {
    const prevProps = this.props;
   

    this.renderedHtml = this.render();
    this.afterUpdate(prevProps, prevState);
    this.reRender();
  }

  /**
   * Re-renders the component by updating the HTML of its container, setting up event listeners,
   * and mounting nested components.
   * @private
   */
  reRender() {
    const container = this.getContainer();
    if (container) {
      container.innerHTML = this.renderedHtml;
      setupEventListeners(container, this);
      mountNestedComponents(container);
    }
  }

  /**
   * Retrieves the DOM element associated with the component based on its name.
   * @returns {HTMLElement|null} The DOM element or `null` if not found.
   * @private
   */
  getContainer() {
    return document.querySelector(
      `[componentKey="${this.constructor.componentName}"]`,
    );
  }

  /**
   * Initializes the component if it hasn't been initialized yet.
   * Calls the `onInit` lifecycle hook.
   */
  initialize() {
    if (!this.isInitialized) {
      this.isInitialized = true;
      this.onInit();
    }
  }

  /**
   * Called after the component is updated.
   * @param {object} prevProps - The previous properties of the component.
   * @param {object} prevState - The previous state of the component.
   */
  afterUpdate(prevProps, prevState) {
    this.onDidUpdate(prevProps, prevState);
  }

  /**
   * Called before the component is removed from the DOM.
   * Can be overridden to perform cleanup tasks.
   */
  beforeUnmount() {
    this.onCleanup();
  }

  /**
   * Lifecycle hook called when the component is first initialized.
   * Can be overridden by subclasses to define initialization logic.
   */
  onInit() {}

  /**
   * Lifecycle hook called after the component updates.
   * @param {object} prevProps - The previous properties of the component.
   * @param {object} prevState - The previous state of the component.
   */
  onDidUpdate(prevProps, prevState) {}

  /**
   * Lifecycle hook called before the component is removed from the DOM.
   * Can be overridden by subclasses to define cleanup logic.
   */
  onDestroy() {}

  /**
   * Must be implemented by subclasses to return the HTML string to render for the component.
   * @abstract
   * @throws {Error} Throws an error if not implemented by subclasses.
   * @returns {string} The HTML string to render.
   */
  render() {
    throw new Error("render() method must be implemented");
  }
}
