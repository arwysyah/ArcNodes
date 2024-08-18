import { injectComponentKey } from "./utils/componentKeyInjector";
import { setupEventListeners } from "./setupEventListener";
import { mountNestedComponents } from "./mountNestedComponent";
import { isEncoded } from "./utils/encoderChecker";
import { convertStringToFunction } from "./utils/functionConverter";

/**
 * Base class for Arc components.
 * This class provides the foundation for creating components with lifecycle methods,
 * state management, and rendering capabilities.
 */
export default class ArcComponent {
  /**
   * The name of the component. This is set automatically based on the class name.
   * @static
   * @type {string}
   */
  static componentName;

  /**
   * Initializes a new instance of the ArcComponent class.
   * @param {object} props - The initial properties for the component.
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
   * Runs the component, initializing it if necessary and rendering its HTML.
   * @returns {string} The rendered HTML of the component.
   */
  run() {
    this.initialize();
    this.renderedHtml = this.renderComponent();
    let container = this.getContainer();

    if (!container) {
      container = document.createElement("div");
      container.setAttribute("componentKey", this.constructor.componentName);
    }

    container.innerHTML = this.renderedHtml;

    this.reRender();
    return container.innerHTML;
  }

  /**
   * A static registry of component classes.
   * @static
   * @type {object}
   */
  static components = {};

  /**
   * Registers the component with a specified name in the global registry.
   * @static
   * @param {string} name - The name to register the component under.
   * @throws {Error} Throws an error if the name is not defined or if a component with the same name is already registered.
   */
  static registerComponent(name) {
    const lowerCaseName = name.toLowerCase();
    if (lowerCaseName in this.components) {
      throw new Error(`Component with name "${name}" is already registered`);
    }
    this.components[lowerCaseName] = this;
    this.componentName = name; // Optional, if needed
  }

  /**
   * Retrieves the component class from the global registry based on the name.
   * @static
   * @param {string} name - The name of the component to retrieve.
   * @returns {ArcComponent|undefined} The component class or `undefined` if not found.
   */
  static getComponent(name) {
    return this.components[name.toLowerCase()];
  }

  /**
   * Parses the properties passed to the component.
   * @param {object} props - The properties to parse.
   * @returns {object} The parsed properties.
   */
  parseProps(props) {
    const parsedProps = {};
    for (const [key, value] of Object.entries(props)) {
      parsedProps[key] = value; // Simplified for this context
    }
    return parsedProps;
  }

  /**
   * Renders the component's HTML, injecting a unique component key.
   * @returns {string} The rendered HTML with component key.
   */
  renderComponent() {
    const content = this.render();
    const componentKey = this.constructor.componentName || this.constructor.name;
    return injectComponentKey(content, componentKey);
  }

  /**
   * Updates the component state and triggers a re-render.
   * @param {object|function} stateUpdater - Either a function that returns the new state or an object representing the new state.
   */
  applyChanges(stateUpdater) {
    const prevState = Array.isArray(this.mutableState)
      ? // Create a shallow copy of the array
        [...this.mutableState]
      : // Create a shallow copy of the object
        {
          ...this.mutableState,
        };

    // Determine the new state based on the type of stateUpdater
    const newState =
      typeof stateUpdater === "function"
        ? stateUpdater(prevState)
        : stateUpdater;

    // Merge the new state with the existing state
    this.mutableState = Array.isArray(this.mutableState)
      ? [...newState]
      : {
          ...this.mutableState,
          ...newState,
        };

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
    this.onDestroy();
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
