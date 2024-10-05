# ArcNodes
[![npm version](https://badge.fury.io/js/arc-nodes.svg)](https://badge.fury.io/js/arc-nodes)

ArcNodes is an experimental minimalist and simplified UI Framework for creating web applications using pure JavaScript. It includes core concepts of components, state management and utilizing streamlined content rendering for a straightforward development experience.. This documentation provides an overview of how to use ArcNodes, including installation, basic usage, and advanced features.


---

**DISCLAIMER:** This framework is made and maintained by someone who has never been a web developer—just a programmer with limited experience, not yet at a senior level, who enjoys messing around with code for fun. As a result, you might find this framework frustrating, with numerous oddities and quirks—those are bugs, not features. If you encounter any issues and want to fix them, your contributions would be genuinely appreciated!

---
## Features

- Component-based architecture
- State management
- Dynamic rendering and nested components

## Getting Started

## Installation

To install ArcNodes, use npm:
```bash
npm install -g arc-nodes
```

To create project by ArcNodes, use npm:

```bash
npm exec create-arcnode <project-name>
or
npx create-arcnode <project-name>
```

# example

```bash
npm exec create-arcnode my-app
or
npm create-arcnode my-app
```

Run the server:

```bash
npm start
```

## Getting Started

Create a basic project structure with the following:

```plaintext
my-project/
├── src/
│   └── app.js
│   └── index.js
├── index.html
└── package.json
```

# Arc Component System

Welcome to the Arc Component System! This guide will help you understand how to use the component system, manage nested components, pass props, and leverage the lifecycle methods provided.

## Table of Contents

- [Introduction](#introduction)
- [Basic Usage](#basic-usage)
- [Breaking Changes](#breaking-changes)
- [Function Binding with params](#function-binding-with-parameters)
- [Unique Component Keys (deprecated)](#unique-component-keys-deprecated)
- [Nested Components](#nested-components)
- [Passing Props](#passing-props)
- [Handling Event Handlers in `map` with Function IDs](#handling-event-handlers-in-map-with-function-ids)
- [Styling](#styling)
- [CSS File Import](#css-file-import-support)
- [Lifecycle Methods](#lifecycle-methods)
- [Flatlist](#flatlist-component)
- [List Rendering](#listcontainer-list-rendering)
- [Routing System](#routing-system-usage)

## Introduction

The Arc Component System allows you to create, register, and render components with a simple and flexible API. It provides a way to manage component state, handle updates, and manage nested components with an easy-to-understand lifecycle.

## Basic Usage

### Creating a Component

To create a new component, extend the `ArcComponent` class and define the `render` method. Use the static `registerComponent` method to register the component with a name.

```javascript
import { ArcComponent, html } from "arc-nodes";
export default class MyComponent extends ArcComponent {
  constructor(props) {
    super(props);
    this.mutableState = {};
  }

  render() {
    return html`
      <div>
        <p>${this.props.message}</p>
      </div>
    `;
  }
}

// Register the component
MyComponent.registerComponent("MyComponent");
```

---


---

# ArcNodes Framework: Breaking Changes and Migration Guide

## Breaking Changes

### 1. From Tag-Based to Instance-Based Component Creation

**Previous Approach:**

In earlier versions of ArcNodes, components were instantiated and rendered using HTML-like tags directly in the `render()` method. For example:

```html
<my-component></my-component>
```

**New Approach:**

In the current version, components are instantiated as JavaScript classes and then used within the `render()` method. This change improves flexibility and control over component creation and lifecycle management.

**Migration Steps:**

1. **Update Component Instantiation:**

   Instead of using tags, instantiate components as JavaScript classes. For example, if you previously used:

   ```html
   <my-component></my-component>
   ```

   You should now create an instance of the component class:

   ```js
   const MyComponent = new MyComponentClass();
   ```

2. **Update Component Usage:**

   Replace the old tag-based component rendering with the new instance-based approach. For instance, the following example demonstrates how to use the `App` component:

   **Old Code:**

   ```html
   <app></app>
   ```

   **New Code:**

   ```js
   const appComponent = new App();
   html`<div>${appComponent.run()}</div>`;
   ```

   Here's how to render the `App` component with the new approach:

   ```js
   import { App } from "arc-nodes";
   import Test from "./test"; // Ensure the path is correct

   export default class App extends ArcComponent {
     constructor(props) {
       super(props);
       this.mutableState = {
         count: 0,
         message: "Welcome to ArcNodes!",
       };
       this.handleClick = this.handleClick.bind(this);
     }

     handleClick() {
       this.applyChanges((prev) => ({
         count: prev.count + 1,
         message: `You've clicked ${prev.count + 1} time(s)!`,
       }));
       console.log(this.mutableState.count);
     }

     render() {
       const Tests = new Test({ click: this.handleClick });

       return html`
         <div class="app-container">
           <h1>${this.mutableState.message}</h1>
           <div id="test-container">${Tests.run()};</div>
           <button onclick=${this.handleClick}>Click Me</button>
           <p>You've clicked ${this.mutableState.count} time(s)!</p>
         </div>
       `;
     }
   }

   App.registerComponent("app");
   ```

Certainly! Here's a section you can include in the README to emphasize the advantages of the new approach, particularly regarding the ability to pass functions with state or callbacks between components:

---

3. **Enhanced Prop Handling with Functions**

The new approach allows for more sophisticated prop handling, particularly when it comes to passing functions between components. This change brings several benefits:

- **Stateful Callbacks**: You can now pass functions that maintain internal state or manage complex interactions. For example, a child component can receive a callback function from its parent, which might rely on the parent's internal state. This allows for more dynamic and interactive components.

  ```javascript
  // Parent Component
  handleClick() {
    this.applyChanges((prev) => ({
      count: prev.count + 1,
      message: `You've clicked ${prev.count + 1} time(s)!`,
    }));
  }

  render() {
    const childComponent = new ChildComponent({
      onClick: this.handleClick,
    });
    return html`
      <div>
        ${childComponent.run()}
      </div>
    `;
  }
  ```

- **Direct Callback Invocation**: Child components can invoke parent callbacks directly, ensuring that state updates or actions are handled seamlessly. This creates a more natural and intuitive flow of data and actions between parent and child components.

  ```javascript
  // Child Component
  handleClick() {
    this.props.onClick(); // Invoke parent's callback
  }

  render() {
    return html`
      <button onclick=${this.handleClick}>Click Me</button>
    `;
  }
  ```

#### 2. **Improved Component Instantiation**

Switching to component instantiation provides several operational benefits:

- **Explicit Component Control**: Instantiating components directly provides explicit control over component lifecycle and interaction. This makes it easier to manage and debug complex component trees.

- **Flexibility in Component Management**: The ability to create and manage component instances programmatically offers greater flexibility in component configuration and integration, allowing for more dynamic and customizable UIs.

- **Enhanced Readability and Maintainability**: By following the object-oriented approach of component instantiation, the code becomes more readable and maintainable. Each component's behavior and interactions are encapsulated within its class, promoting better organization and clarity.

## Summary

The new version of ArcNodes introduces a more flexible and controlled way of managing components. By switching from tag-based to instance-based component creation, you gain greater control over component lifecycle and state management and props. Ensure that all components are instantiated correctly and that names are unique to avoid conflicts.


---
---

### Function Binding with Parameters

In your framework, you can bind functions to HTML elements and pass parameters to them using the `action-arg` attribute. This allows you to dynamically pass data to your event handlers directly from your HTML templates.

#### Example Usage

Consider the following example where you want to bind a click event to a function and pass an object as a parameter:

```javascript
class TestComponent extends ArcComponent {
  constructor() {
    super();
    this.handleTestClick = this.handleTestClick.bind(this);
  }

  handleTestClick(params) {
    // Access the passed parameter
    console.log('Click From Test', params);

    // Perform additional actions
    this.props.passProps(params);
  }

  render() {
    return html`
      <div>
        Hello World
        <div
          style="height:100px; color:blue;"
          onclick=${this.handleTestClick}
          action-arg=${JSON.stringify({ Data: 'B' })}
        ></div>
      </div>
    `;
  }
}
```

#### How It Works

1. **Function Binding**: The function `handleTestClick` is bound to the `onclick` event of the `<div>` element.

2. **Passing Parameters**: The `action-arg` attribute is used to pass parameters to the function. The value is expected to be a JSON string, which will be parsed and passed to the function as a parameter.

   ```html
   <div onclick=${this.handleTestClick} action-arg=${JSON.stringify({ Data: 'B' })}></div>
   ```

   - If the `action-arg` is malformed or cannot be parsed, the function will still be bound to the event, but no parameters will be passed.
  
3. **Accessing Parameters**: Inside the `handleTestClick` function, you can access the parameters via the `params` argument. This allows you to perform actions based on the data passed.

   ```javascript
   handleTestClick(params) {
     console.log('Click From Test', params); // Outputs: { Data: 'B' }
     this.props.passProps(params); // Pass the params to another function or component
   }
   ```

#### Important Notes

- **Global Functions**: The function referenced in the `onclick` attribute must be globally accessible via the `window` object. This is automatically handled by the `html` template function, which registers functions globally.

- **JSON Stringify**: Always use `JSON.stringify` to convert objects into strings for the `action-arg` attribute. This ensures that the data is correctly passed and parsed.

---
## Unique Component Keys (Deprecated)

**Note:** As of the latest update, the `componentKey` is automatically injected based on the component name if you declared componet with instance. You no longer need to manually specify `componentKey` in your component templates except with tag. This change simplifies component management and ensures that each instance of your component is uniquely identified without requiring additional configuration.

### Previous Requirement

Previously, when declaring a component with a tag, you had to specify a `componentKey` that matched the component name:
example:
```html
<Game componentKey="Game"></Game>
```

### Current Approach

With the latest update, you no longer need to include the `componentKey`. The system will automatically handle it based on the component name.

```javascript
const GameComponent = new Game();
html`${GameComponent.run()}`;
```


When working with nested components, the way you declare them affects the use of `componentKey`.

### Declaring with a Tag

If you declare a component using a tag, you should ensure that the `componentKey` matches the tag name or the registered component name. For example:

```html
<Game componentKey="Game"></Game>
```

Here, `componentKey` should be the same as the tag name or the registered name of the component.

### Declaring with an Instance

When you declare a component using an instance, you do not need to specify a `componentKey`. For instance:

```javascript
const GameComponent = new Game();
html`${GameComponent.run()}`;
```

In this case, the `componentKey` is managed automatically, and you do not need to declare it separately.

---

This update streamlines component management and ensures consistent behavior across different component declarations.

## Nested Components

### Defining Nested Components

Nested components can be included in the `render` method of another component. Ensure that all components are registered before rendering.

```javascript
import { ArcComponent, html } from "arc-nodes";
import MyChildComponent from "./MyChildComponent.js";    // Import child component

export default class ParentComponent extends ArcComponent {

  render() {
    return html`
      <div>
        <h1>Parent Component</h1>
        <MyChildComponent/>
      </div>
    `;
  }
}

OR

import { ArcComponent, html } from "arc-nodes";
import "./MyChildComponent.js";    // Import child component

export default class ParentComponent extends ArcComponent {

  render() {
    return html`
      <div>
        <h1>Parent Component</h1>
        <MyChildComponent></MyChildComponent>
      </div>
    `;
  }
}

// Register the component
ParentComponent.registerComponent("ParentComponent");
```

### Rendering Nested Components

Nested components will be automatically rendered if their parent component is rendered using `renderComponent` with `componentKey`.

## Passing Props

In ArcNodes, props are string with lowercase (at least for now ) you can pass props as JSON strings. This approach ensures that complex objects and arrays are handled consistently. .

### Defining Props

Props can be passed to components using attributes in the HTML. Inside the component, access props via `this.props`.

```javascript
import { ArcComponent, html } from "arc-nodes";
import ChildComponent from "./ChildComponent.js"; /

export default class ParentComponent extends ArcComponent {

  constructor(props) {
    super(props);
    this.mutableState = { count: 0, items: [{ name: "Item 1" }, { name: "Item 2" }] };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.applyChanges({ count: this.mutableState.count + 1 });
  }

  render() {
    const countProps = this.mutableState.count;
    const itemsProps = this.mutableState.items;
      const Children = new ChildComponent({count:countProps,item:itemsProps})

    return html`
      <div>
        <h1>Parent Component</h1>
        <button onclick=${this.handleClick}>Increase Count</button>
      ${Children.run()}

      </div>
    `;
  }

  initialize() {
    console.log("Parent component initialized");
  }

  onDidUpdate(prevProps, prevState) {
    console.log("Parent component updated");
  }

  onDestroy() {
    console.log("Parent component destroyed");
  }
}

// Register the component
ParentComponent.registerComponent("ParentComponent");
```

### Using Props

When using the component, pass props as attributes:

```javascript
const MyComponent = new Component({ name: "Arwy" });
return html`${MyComponent.run()}`;
```


---

## Handling Event Handlers in `map` with Function IDs

When mapping over arrays to create dynamic HTML elements with event handlers, it is essential to manage these handlers correctly to ensure that events are handled as expected. For this purpose, you can use unique function IDs to bind your event handlers. This approach helps in associating the correct handler function with each HTML element.

### Example Usage

In your code, you can use the following pattern to bind event handlers when iterating over an array:

```javascript

handleFocus(params){
  console.log(params)
}
const list = this.mutableState.item
  .map((el, index) => {
   
    const functionName = getFunctionName(this.handleFocus);

    return html`
      <p
        onclick=${functionId}  // Assign the function ID to the onclick event
        action-arg=${index}
        class=${this.mutableState.focus == index ? "downloads" : "inaction"}
      >
        ${el.content}
      </p>`;
  })
  .join("");
```

### Explanation

- **Function ID Creation**: Each function ID is generated using the index from the `map` method, ensuring that each handler function is unique.
- **Binding the Function**: The `handleFocus` method is bound to the current index using `bind`, and the resulting function is assigned to a global variable with the generated function ID.
- **Assigning the Handler**: The `onclick` attribute of the HTML element is set to the function ID, which allows the corresponding handler function to be called when the event is triggered.

This pattern ensures that each HTML element has its own unique event handler, which can help avoid issues related to event handling conflicts or unintended behavior.

### Notes

- Ensure that `window[functionId]` is appropriately cleaned up if you are dynamically adding and removing elements to prevent memory leaks or conflicts with other parts of your code.
- Consider refactoring this approach if the global scope management becomes cumbersome, or if the number of dynamically created handlers becomes large.

---

### Styling

When using the component, styling can be used such as:

- Inline styles are useful for applying styles directly within the component. This is ideal for simple, component-specific styling.
- You can define styles within the component using the <style> tag. These styles will be scoped to the component and will not affect other components.

```javascript
class ChildComponent extends ArcComponent {
  constructor() {
    super();
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.mutableState = {
      counter1: 0,
      counter2: "loading",
    };
  }
  handleClick1() {
    console.log("clicked1");
    this.applyChanges({
      counter1: this.mutableState.counter1 + 1,
    });
  }
  handleClick2() {
    console.log("clicked2");
    this.applyChanges({
      counter2: "Done",
    });
  }
  initialize() {
    this.applyChanges({
      counter2: "playing",
    });
  }

  render() {
    return html` <style>
        .styled-text {
          color: blue;
          font-size: 18px;
          border: 1px solid black;
          padding: 10px;
        }
      </style>

      <div>
        <div style="color: red; font-size: 20px;">
          This is a styled component with inline styles.
        </div>
        <button onclick=${this.handleClick1}>
          clicked ${this.mutableState.counter1}
        </button>
        <button onclick=${this.handleClick2}>click2</button>

        <p class="styled-text">${this.mutableState.counter1}</p>
        <p>${this.mutableState.counter2}</p>
      </div>`;
  }
}
ChildComponent.registerComponent("ChildComponent");
```

---

## CSS File Import Support

`ArcNodes` provides built-in support for importing CSS files directly into your components, allowing you to style your application seamlessly. This feature helps you manage your component-specific styles more effectively and keep your CSS modular.

### How to Import CSS Files

To use CSS files with `ArcNodes`, follow these steps:

1. **Create Your CSS File:**

   Create a CSS file with your desired styles. For example, `styles.css`:

   ```css
   .app-container {
     background-color: #f0f0f0;
     padding: 20px;
     border: 1px solid #ccc;
   }
   ```

2. **Import the CSS File in Your Component:**

   In your ArcNodes component file, import the CSS file at the top of your file. For example:

   ```javascript
   import "./styles.css";

   class MyComponent extends ArcComponent {
     render() {
       return html`
         <div class="app-container">Hello, this is my styled component!</div>
       `;
     }
   }

   MyComponent.registerComponent("MyComponent");
   ```

3. **Use Your Component:**

   Now you can use your component in your application, and the styles will be applied automatically.

### Benefits of Using CSS File Import

- **Modularity:** Keep your styles organized and maintainable by separating them into individual CSS files.
- **Scoped Styles:** Apply styles specific to components without affecting other parts of your application.
- **Ease of Use:** Directly import CSS files in your component files for quick styling changes.

---

## Lifecycle Methods

### Overview

Lifecycle methods in Arc Component System are used to hook into various stages of a component's lifecycle. Here's how they work:

- `initialize()`: Called once when the component is first created.
- `onDidUpdate(prevProps, prevState)`: Called whenever the component updates.
- `onDestroy()`: Called just before the component is removed from the DOM.

### Example Usage

```javascript
import { ArcComponent, html } from "arc-nodes";

export default class MyComponent extends ArcComponent {
  initialize() {
    console.log("Component initialized");
  }

  onDidUpdate(prevProps, prevState) {
    console.log("Component updated");
  }

  onDestroy() {
    console.log("Component destroyed");
  }

  render() {
    return html`
      <div>
        <p>${this.props.message}</p>
      </div>
    `;
  }
}

// Register the component
MyComponent.registerComponent("MyComponent"); // written as  <MyComponent/ > or <MyComponent></MyComponent> later
```

## Example

Here's a complete example demonstrating the usage of a parent component with nested child components, passing props, and utilizing lifecycle methods.

### Parent Component

```javascript
import { ArcComponent, html } from "arc-nodes";
import ChildComponent from "./ChildComponent";

export default class ParentComponent extends ArcComponent {
  constructor(props) {
    super(props);
    this.mutableState = { count: 0 };
  }

  handleClick = () => {
    this.applyChanges({ count: this.mutableState.count + 1 });
  };

  render() {
    const Children = new ChildComponent({ count: this.mutableState.count });
    return html`
      <div>
        <h1>Parent Component</h1>
        <button onclick=${this.handleClick}>Increase Count</button>
        ${Children.run()}
      </div>
    `;
  }

  initialize() {
    console.log("Parent component initialized");
  }

  onDidUpdate(prevProps, prevState) {
    console.log("Parent component updated");
  }

  onDestroy() {
    console.log("Parent component destroyed");
  }
}

// Register the component
ParentComponent.registerComponent("ParentComponent");
```

### Child Component

```javascript
import { ArcComponent, html } from "arc-nodes";

export default class ChildComponent extends ArcComponent {
  render() {
    return html`
      <div>
        <p>Count in child: ${this.props.count}</p>
      </div>
    `;
  }

  initialize() {
    console.log("Child component initialized");
  }

  onDidUpdate(prevProps, prevState) {
    console.log("Child component updated");
  }

  onDestroy() {
    console.log("Child component destroyed");
  }
}

// Register the component
ChildComponent.registerComponent("ChildComponent");
```

---

### Flatlist Component

#### Overview

The `Flatlist` component is a utility function designed to render a list of items as HTML. It allows for customization through class names, inline styles, and a unique key for the component. The component accepts an array of data and a function to render each item in the list.

#### Parameters

- **data** (`Array`):

  - An array of data items to be rendered.
  - Default value: `[]`.
  - Each item in the array is passed to the `renderItem` function for rendering.

- **renderItem** (`Function`):

  - A function responsible for rendering each item in the list.
  - This function receives an object with a single key `item`, representing the current data item, and the index of the item as arguments.
  - Returns an HTML string for each item.

- **options** (`Object`):
  - An optional configuration object for customizing the list rendering.
  - Default value: `{}`.
  - **options.className** (`string`):
    - A string to be used as the `class` attribute of the container `<div>`.
    - Default value: `""`.
  - **options.style** (`Object`):
    - An object representing inline CSS styles for the container `<div>`.
    - Default value: `{}`.
  - **options.componentKey** (`string`):
    - A unique identifier for the component, which is set as a `data-key` attribute on the container `<div>`.
    - Default value: `"Flatlist"`.

#### Returns

- **HTML string**: The function returns an HTML string representing the list, wrapped in a `<div>` element with the specified class name, styles, and component key.

#### Usage Example

Here’s an example of how to use the `Flatlist` component:

```javascript
const items = [
  {
    content: "Home",
    route: "header",
  },
  {
    content: "Documentation",
    route: "documentation",
  },
  {
    content: "Game",
    route: "game",
  },
  {
    content: "Source",
  },
];
class HeaderComponent extends ArcComponent {
  constructor() {
    super();
    this.mutableState = {
      focus: 0,
      item: items,
    };
  }
  handleFocus(params) {
    this.applyChanges({ focus: params });
  }

  render() {
    const listContainer = Flatlist({
      options: {
        className: "container",
      },
      data: this.mutableState.item,
      renderItem: ({ item }, index) =>
        html`<p
          class=${this.mutableState.focus == index ? "downloads" : "inaction"}
        >
          ${item.content}
        </p> `,
    });

    return html`
      <header class="header">
        <div class="container" id="header">
          <div class="logo">
            <img src="../public/logo.png" alt="Giant Logo" />
          </div>
          <nav>
            <ul>
              ${listContainer}
            </ul>
          </nav>
        </div>
      </header>
    `;
  }
}

HeaderComponent.registerComponent("HeaderComponent");

export default HeaderComponent;
```

#### Explanation

- **data**: An array of objects where each object represents an item in the list.
- **renderItem**: A function that generates the HTML for each item. In this example, it returns a `<div>` containing an item name and description.
- **options**: Configures the container's class, style, and component key. The list will be wrapped in a `<div>` with these attributes.
- **listHTML**: The resulting HTML string from the `Flatlist` function, ready to be inserted into the DOM.

# ListContainer (List rendering)

```javascript
import { ListContainer } from "arc-nodes";
```

## API

### `ListContainer(items, options = {})`

Display a container element with a list of items.

#### Parameters

- **items** (`Array`): The list of items to display. Each item can be a value or an object specifying the tag and attributes.
- **options** (`Object`, optional): Configuration options for the container.
  - **className** (`string`, optional): CSS class for the container. Default is `'list-container'`.
  - **attributes** (`Object`, optional): Additional attributes to set on the container. For example, `{ id: 'my-container' }`.
  - **style** (`Object`, optional): Inline styles to apply to the container. For example, `{ backgroundColor: 'lightgray' }`.
  - **itemRenderer** (`Function`, optional): Function to render each item. Receives the item as an argument and returns a DOM element. Default is a function that creates `<li>` elements for objects and text nodes for primitive values.

#### Returns

- **HTMLElement**: The container element with the list of items.

## Usage

### Basic Usage

```javascript
import { ListContainer } from "arc-nodes";

// Create a container with basic items
const items = ["Item 1", "Item 2", "Item 3"];
const container = ListContainer(items, {
  className: "my-list-container",
});
document.body.appendChild(container);
```

### Usage in ArcComponent

Here’s how to use `ListContainer` in an `ArcComponent`:

```javascript
import { ArcComponent, html, ListContainer } from "arc-nodes";
import "./css/child.css";

export default class Child extends ArcComponent {
  constructor(props) {
    super(props);
    this.mutableState = {
      count: this.props.counter || 0,
    };
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleIncrement() {
    this.props.handle(); // Call a function passed as a prop
  }

  customItemRenderer(item) {
    const element = document.createElement("div");
    element.textContent = item.content || item;
    element.style.color = item.color || "black";
    return element;
  }

  render() {
    // Create a list container with dynamic items
    const listContainer = ListContainer(this.props.items || [], {
      className: this.props.containerClass || "list-container",
      attributes: this.props.containerAttributes || {},
      style: this.props.containerStyle || {},
      itemRenderer: this.customItemRenderer, // Pass custom renderer
    });

    return html`
      <div class="child-container">
        <h1 class="child-title">Child Component</h1>
        <p class="child-counter">Counter: ${this.mutableState.count}</p>
        ${listContainer}
        <button class="child-button" onclick=${this.handleIncrement}>
          Increment
        </button>
      </div>
    `;
  }
}
```

### Advanced Usage

#### Using a Custom Renderer

```javascript
import { ListContainer } from "arc-nodes";

// Custom renderer function
function customItemRenderer(item) {
  const element = document.createElement("div");
  element.textContent = item.content || item;
  element.style.color = item.color || "black";
  return element;
}

// Create a container with custom item rendering
const items = [
  { content: "Item 1", color: "red" },
  { content: "Item 2", color: "blue" },
  "Item 3", // Fallback for default rendering
];
const container = ListContainer(items, {
  className: "my-custom-list-container",
  style: { padding: "10px" },
  itemRenderer: customItemRenderer,
});
document.body.appendChild(container);
```

#### Applying Inline Styles and Attributes

```javascript
import { ListContainer } from "arc-nodes";

// Create a container with custom styles and attributes
const items = ["Item 1", "Item 2", "Item 3"];
const container = ListContainer(items, {
  className: "styled-list-container",
  attributes: { "data-role": "list" },
  style: { border: "1px solid black", padding: "5px" },
});
html`<div>
  ${container}
  <div></div>
</div>`;
```

## Notes

- The `itemRenderer` function should return a valid DOM element.
- The default renderer creates `<li>` elements for objects with a `tag` property and text nodes for primitive values. Customize it as needed.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Routing System Usage

### Router

The `Router` class in your framework enables easy route management and navigation between different components in your application. Below is a step-by-step guide on how to set up and use the router.

### 1. Import the Router

Start by importing the router from your framework. You'll also import the components you want to associate with specific routes.

```javascript
index.js;
import { router } from "arc-nodes";
import HomeComponent from "./components/HomeComponent";
import AboutComponent from "./components/AboutComponent";
```

### 2. Set the Initial Route

To define the route that should be displayed when the application first loads, use the `setInitialRoute` method. This method requires a path and the corresponding component.

```javascript
// Set the initial route
router.setInitialRoute("/home", HomeComponent);
```

### 3. Define Routes

Use the `addRoute` method to map specific paths to components. Each route should have a unique path (e.g., `/home`) and the corresponding component that should be rendered when that path is accessed.

```javascript
// Define your routes
router.addRoute("/home", HomeComponent);
router.addRoute("/about", AboutComponent);
```


### 4. Start the Router

After defining your routes and setting the initial route, call `onStart` to initialize the router and render the initial component.

```javascript
router.onStart();
```

### 5. Navigate Programmatically

You can navigate to different routes programmatically using the `navigate` method. Pass the path of the route you want to navigate to.

```javascript
// Navigate to a route programmatically
router.navigate("/about");
```

### Example

Here’s how everything comes together in your `index.js`:

```javascript
import { router } from "arc-nodes";
import HomeComponent from "./components/HomeComponent";
import AboutComponent from "./components/AboutComponent";

// Set the initial route
router.setInitialRoute("/home", HomeComponent);
// Define your routes
router.addRoute("/home", HomeComponent);
router.addRoute("/about", AboutComponent);



// Start the router
router.onStart();

// Navigate to a route programmatically
router.navigate("/about");
```

### Summary

- **`addRoute(path, component)`**: Adds a route to the router.
- **`setInitialRoute(path, component)`**: Sets the initial route to be displayed when the application loads.
- **`onStart()`**: Initializes the router and renders the initial component.
- **`navigate(path)`**: Programmatically navigates to a specified route.

---

## DEVELOPMENT

### Prerequisites

To run this project, you'll need:

- A web browser
- A local web server (optional, for better experience)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/arwysyah/ArcNodes.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd ArcNodes/example
   npm install
   ```


---

## Troubleshooting: EMFILE Error

If you encounter the following error:

```
Error: EMFILE: too many open files, watch '/path/to/file'
```

This error typically occurs when the system runs out of file watchers due to too many open files or watchers. This is a common issue in Node.js applications, particularly when using tools that watch for file changes.

### Solution

To resolve this issue, you can try the following steps one by one :

1. **Install Dependencies** (Suggestion)

   Run the following command to ensure all your project dependencies are correctly installed by reinstall node modules:

   ```bash
   npm install
   ```

2. **Increase File Watcher Limits**

   If the problem persists, you may need to increase the number of file watchers allowed by your system. On Unix-based systems (e.g., Linux, macOS), you can do this by increasing the `fs.inotify.max_user_watches` limit:

   - **Linux:**

     ```bash
     sudo sysctl fs.inotify.max_user_watches=524288
     sudo sysctl -p
     ```

   - **macOS:**

     On macOS, you can increase the file descriptor limit by modifying the `launchctl` configuration:

     ```bash
     sudo launchctl limit maxfiles 65536 200000
     ```

   Restart your development environment after making these changes to apply them.

3. **Check for Excessive Watchers**

   Ensure that your development tools and processes are not creating excessive watchers. Review your project configuration and dependencies to optimize file watching.

4. **Restart Your Development Environment**

   Sometimes, simply restarting your development environment or machine can resolve temporary issues with file watchers.

---

## Note

This framework is a work-in-progress and not yet complete. It aims to mimic some of React's functionality using pure JavaScript. Some features may be incomplete or not fully tested. Use it for educational purposes or for experimentation.
