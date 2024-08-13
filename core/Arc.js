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
    this.props = props || {};
    this.mutableState = {};
    this.renderedHtml = "";
    this.isInitialized = false;
    if (!this.constructor.componentName) {
      this.constructor.componentName = this.constructor.name.toLowerCase();
    }
  }
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
   * @param {object} newState - The new state to merge with the current state.
   */
  applyChanges(newState) {
    this.mutableState = { ...this.mutableState, ...newState };
    this.update();
  }

  /**
   * Updates the component by rendering new HTML and invoking lifecycle methods.
   * @private
   */
  update() {
    const prevProps = this.props;
    const prevState = { ...this.mutableState };

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
    this.onRefresh(prevProps, prevState);
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
  onRefresh(prevProps, prevState) {}

  /**
   * Lifecycle hook called before the component is removed from the DOM.
   * Can be overridden by subclasses to define cleanup logic.
   */
  onCleanup() {}

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
