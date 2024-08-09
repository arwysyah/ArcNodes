export default class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
    this.dom = null;
    this.vNode = null;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.update();
  }

  update() {
    const oldVNode = this.vNode;
    this.vNode = this.render();
    const patches = this.diff(oldVNode, this.vNode);
    this.dom = this.applyPatches(this.dom, patches);
  }

  mount() {
    this.componentDidMount();
    console.log(this.dom);
    // if (this.dom) {
    //   this.dom.querySelectorAll("[data-component]").forEach((el) => {
    //     const componentName = el.getAttribute("data-component");
    //     const ComponentClass = getComponent(componentName);
    //     const props = JSON.parse(el.getAttribute("data-props"));
    //     const childComponent = new ComponentClass(props);
    //     childComponent.dom = el;
    //     childComponent.mount();
    //     el.replaceWith(childComponent.dom);
    //   });
    // }
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    throw new Error("render() must be implemented");
  }

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

  createDomElement(vNode) {
    if (typeof vNode === "string") {
      return document.createTextNode(vNode);
    }

    if (typeof vNode.type === "function") {
      const component = new vNode.type(vNode.props);
      component.mount();
      return (component.dom = this.createDomElement(component.render()));
    }

    const element = document.createElement(vNode.type);
    for (const [key, value] of Object.entries(vNode.props || {})) {
      if (key.startsWith("on") && typeof value === "function") {
        element[key.toLowerCase()] = value;
      } else {
        element.setAttribute(key, value);
      }
    }

    vNode.children.forEach((child) => {
      element.appendChild(this.createDomElement(child));
    });

    return element;
  }
}
