/**
 * Tagged template literal function to parse HTML and props.
 *
 * @param {TemplateStringsArray} strings - The template strings array.
 * @param  {...any} values - The dynamic values to be interpolated.
 * @returns {Object} The virtual node representing the HTML structure.
 *//**
 * Convert an HTML element to a virtual node (vNode).
 *
 * @param {HTMLElement|Text} node - The DOM node to convert.
 * @returns {Object|string} The virtual node.
 */

import { Arc } from "./Arc.js";
export function html(strings, ...values) {
  const rawHtml = strings.reduce((result, string, i) => {
    const value = values[i];

    // If the value is a component, render it
    if (value instanceof Arc.Component) {
      return result + string + renderComponent(value);
    }

    return result + string + (value !== undefined ? value : "");
  }, "");

  const template = document.createElement("template");
  template.innerHTML = rawHtml.trim();
  const content = template.content.firstChild;

  // Convert to virtual node
  return convertToVNode(content);
}
function convertToVNode(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.nodeValue;
  }

  const type = node.tagName.toLowerCase();
  const props = {};

  for (const attr of node.attributes) {
    props[attr.name] = attr.value;
  }

  const children = Array.from(node.childNodes).map(convertToVNode);

  return { type, props, children };
}

/**
 * Render a component to a virtual node.
 *
 * @param {Arc.Component} component - The component instance to render.
 * @returns {string} The HTML string representing the component.
 */
function renderComponent(component) {
  const vNode = component.render();
  const element = document.createElement(vNode.type);

  for (const [key, value] of Object.entries(vNode.props || {})) {
    if (key.startsWith("on") && typeof value === "function") {
      element[key.toLowerCase()] = value;
    } else {
      element.setAttribute(key, value);
    }
  }

  vNode.children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      const childElement = renderComponent(new vNode.type(child.props));
      element.appendChild(childElement);
    }
  });

  return element.outerHTML;
}
