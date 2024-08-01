const Arc = {};

/**
 * Base class for creating UI components.
 *
 * @class
 */
Arc.Component = class {
  constructor(props) {
    this.props = props;
    this.state = {};
    this.dom = null;
    this.vNode = null;
  }

  /**
   * Updates the component's state and re-renders it.
   *
   * @param {Object} newState - The new state to merge with the current state.
   */
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.update();
  }

  /**
   * Re-renders the component and applies patches to the DOM.
   */
  update() {
    const oldVNode = this.vNode;
    this.vNode = this.render();
    const patches = this.diff(oldVNode, this.vNode);
    this.dom = this.applyPatches(this.dom, patches);
  }

  /**
   * Mounts the component by calling componentDidMount.
   */
  mount() {
    this.componentDidMount();
  }

  /**
   * Lifecycle method called after the component is mounted.
   */
  componentDidMount() {}

  /**
   * Lifecycle method called before the component is unmounted.
   */
  componentWillUnmount() {}

  /**
   * Renders the component's virtual node. Must be implemented by subclasses.
   *
   * @throws {Error} Throws an error if not implemented by subclass.
   * @returns {Object} The virtual node representing the component.
   */
  render() {
    throw new Error("render() must be implemented");
  }

  /**
   * Computes the difference (patch) between old and new virtual nodes.
   *
   * @param {Object|string} oldNode - The old virtual node.
   * @param {Object|string} newNode - The new virtual node.
   * @returns {Object|null} The patch object describing the differences, or null if no differences.
   */
  diff(oldNode, newNode) {
    if (oldNode === newNode) return null;

    if (typeof newNode === "string" || typeof oldNode === "string") {
      if (newNode !== oldNode) return { type: "REPLACE", newNode };
      return null;
    }

    if (oldNode.type !== newNode.type) {
      return { type: "REPLACE", newNode };
    }

    const patch = { type: "UPDATE", props: [], children: [] };

    const allProps = { ...oldNode.props, ...newNode.props };
    Object.keys(allProps).forEach((key) => {
      if (oldNode.props[key] !== newNode.props[key]) {
        patch.props.push({ key, value: newNode.props[key] });
      }
    });

    const maxLength = Math.max(
      oldNode.children.length,
      newNode.children.length,
    );
    for (let i = 0; i < maxLength; i++) {
      patch.children.push(this.diff(oldNode.children[i], newNode.children[i]));
    }

    return patch;
  }

  /**
   * Applies patches to a DOM element.
   *
   * @param {HTMLElement} dom - The DOM element to update.
   * @param {Object} patches - The patch object describing the changes.
   * @returns {HTMLElement} The updated DOM element.
   */
  applyPatches(dom, patches) {
    if (!patches) return dom;

    if (patches.type === "REPLACE") {
      const newDom = this.createDomElement(patches.newNode);
      dom.replaceWith(newDom);
      return newDom;
    }

    if (patches.type === "UPDATE") {
      patches.props.forEach(({ key, value }) => {
        if (key.startsWith("on") && typeof value === "function") {
          dom[key.toLowerCase()] = value;
        } else {
          dom.setAttribute(key, value);
        }
      });

      patches.children.forEach((patch, i) => {
        this.applyPatches(dom.childNodes[i], patch);
      });

      return dom;
    }
  }

  /**
   * Creates a DOM element from a virtual node.
   *
   * @param {Object|string} vNode - The virtual node to create a DOM element from.
   * @returns {HTMLElement|Text} The created DOM element or text node.
   */
  createDomElement(vNode) {
    if (typeof vNode === "string") {
      return document.createTextNode(vNode);
    }

    if (typeof vNode.type === "function") {
      // Create an instance of the component with its props
      const component = new vNode.type(vNode.props);

      // Render the component to get the virtual node
      const renderedVNode = component.render();

      // Mount the component (call componentDidMount if necessary)
      component.mount();

      // Recursively create the DOM element for the rendered virtual node
      return (component.dom = this.createDomElement(renderedVNode));
    }

    const element = document.createElement(vNode.type);

    // Set attributes and event handlers
    for (const [key, value] of Object.entries(vNode.props || {})) {
      if (key.startsWith("on") && typeof value === "function") {
        element[key.toLowerCase()] = value;
      } else {
        element.setAttribute(key, value);
      }
    }

    // Recursively append child elements
    vNode.children.forEach((child) => {
      element.appendChild(this.createDomElement(child));
    });

    return element;
  }
};

// Export Arc object as default
export default Arc;
