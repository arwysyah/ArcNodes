# ArcNodes

ArcNodes is an experimental minimalist and simplified UI Framework for creating web applications using pure JavaScript. It includes core concepts of components, state management and utilizing streamlined content rendering for a straightforward development experience.. This documentation provides an overview of how to use ArcNodes, including installation, basic usage, and advanced features.

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
- [Unique Component Keys (deprecated)](#unique-component-keys-deprecated)
- [Nested Components](#nested-components)
- [Passing Props](#passing-props)
- [Function Props](#function)
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
    this.mutableState = {

    };
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



Here’s the revised README section with a note indicating that `componentKey` is now automatically injected:

---

## Unique Component Keys (Deprecated)

~~When pre-rendering your component and triggering the DOM, it is essential to add a `componentKey` that is equal to the Component Name attribute to ensure that each instance of your component is unique. The `componentKey` helps ArcNodes efficiently manage and update components, especially when dealing with child components and ensuring that they re-render whenever `setState` is triggered.~~

**Note:** As of the latest update, the `componentKey` is automatically injected based on the component name. You no longer need to manually specify `componentKey` in your component templates.


---


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

Nested components will be automatically rendered if their parent component is rendered using `renderComponent`.

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

    return html`
      <div>
        <h1>Parent Component</h1>
        <button data-action="handleClick">Increase Count</button>
        <ChildComponent count="${countProps}" items="${itemsProps}"/>

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

```html
<MyComponent message="Hello, World!" count="5"></MyComponent>
or 
<MyComponent message="Hello, World!" count="5"/>
```
## Function

#### Overview

The `data-action` and `action-params` attributes are powerful tools used in HTML to dynamically trigger JavaScript functions and pass parameters to them based on user interactions, such as clicks. These attributes are particularly useful in scenarios where you want to bind specific functions to elements and control the behavior of those functions through easily customizable parameters.

#### `data-action`

- **Purpose**: 
  - The `data-action` attribute is used to specify the name of a JavaScript function that should be executed when a user interacts with an HTML element, typically through a click event.
  
- **Usage Example**:
  ```html
  <p data-action="handleFocus">Click Me</p>
  ```
  - In this example, when the `<p>` element is clicked, the function `handleFocus` will be invoked.

#### `action-params`

- **Purpose**:
  - The `action-params` attribute is used in conjunction with `data-action` to pass specific parameters to the function being called.
  - The value of `action-params` is usually a string that represents the parameter(s) that should be passed to the function.
  
- **Usage Example**:
  ```html
  <p data-action="handleFocus" action-params="2">Click Me</p>
  ```
  - In this example, when the `<p>` element is clicked, the `handleFocus` function is called with `2` as its argument.

#### How It Works

1. **Event Binding**:
   - The `data-action` attribute identifies which function to call when the element is clicked.
   - JavaScript code (often through a helper function like `setupEventListeners`) detects the `data-action` attribute and binds the specified function to the element's click event.

2. **Passing Parameters**:
   - When the element is clicked, the value specified in the `action-params` attribute is passed as an argument to the function.
   - This allows the function to perform its tasks using the provided parameters.

#### Practical Example

Suppose you have a function called `handleFocus` in your JavaScript code, and you want it to perform different actions based on which navigation item is clicked:

```html
<!-- Navigation Items -->
<p data-action="handleFocus" action-params="0">Home</p>
<p data-action="handleFocus" action-params="1">Documentation</p>
<p data-action="handleFocus" action-params="2">Game</p>
<p data-action="handleFocus" action-params="3">Source</p>
```

In your JavaScript file:

```javascript
function handleFocus(params) {
  console.log(`Item ${params} was clicked`);
  // Additional logic based on params
}
```

- Clicking on "Home" calls `handleFocus(0)`.
- Clicking on "Documentation" calls `handleFocus(1)`.
- Clicking on "Game" calls `handleFocus(2)`.
- Clicking on "Source" calls `handleFocus(3)`.

This setup makes your code modular and easy to maintain, as you can control the behavior of your functions directly from the HTML structure.

#### Summary

- **`data-action`**: Specifies the function to be triggered on user interaction.
- **`action-params`**: Passes parameters to the triggered function, allowing for dynamic and context-sensitive function execution.
- Together, they provide a flexible and powerful way to manage event-driven functionality in your web application.

### Styling

When using the component, styling can be used  such as:
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
    return html`
<style>
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
        <button data-action="handleClick1">
          clicked ${this.mutableState.counter1}
        </button>
        <button data-action="handleClick2">click2</button>

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
   import './styles.css';
   
   class MyComponent extends ArcComponent {
     render() {
       return html`
         <div class="app-container">
           Hello, this is my styled component!
         </div>
       `;
     }
   }
   
   MyComponent.registerComponent("MyComponent")
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
import "./ChildComponent.js";

export default class ParentComponent extends ArcComponent {
  constructor(props) {
    super(props);
    this.mutableState = { count: 0 };
   
  }

  handleClick() {
    this.applyChanges({ count: this.mutableState.count + 1 });
  }

  render() {
    return html`
      <div>
        <h1>Parent Component</h1>
        <button data-action="handleClick">Increase Count</button>
        <child-component count="${this.mutableState.count}"></child-component>
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
ChildComponent.registerComponent("child-component");
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
          data-action="handleFocus"
          class=${this.mutableState.focus == index ? "downloads" : "inaction"}
          action-params=${index}
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
import { ListContainer } from 'arc-nodes';
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
import { ListContainer } from 'arc-nodes';

// Create a container with basic items
const items = ['Item 1', 'Item 2', 'Item 3'];
const container = ListContainer(items, {
  className: 'my-list-container',
});
document.body.appendChild(container);
```

### Usage in ArcComponent

Here’s how to use `ListContainer` in an `ArcComponent`:

```javascript
import { ArcComponent, html, ListContainer } from 'arc-nodes';
import './css/child.css';

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
    const element = document.createElement('div');
    element.textContent = item.content || item;
    element.style.color = item.color || 'black';
    return element;
  }

  render() {
    // Create a list container with dynamic items
    const listContainer = ListContainer(this.props.items || [], {
      className: this.props.containerClass || 'list-container',
      attributes: this.props.containerAttributes || {},
      style: this.props.containerStyle || {},
      itemRenderer: this.customItemRenderer, // Pass custom renderer
    });

    return html`
      <div class="child-container">
        <h1 class="child-title">Child Component</h1>
        <p class="child-counter">
          Counter: ${this.mutableState.count}
        </p>
        ${listContainer}
        <button class="child-button" data-action="handleIncrement">Increment</button>
      </div>
    `;
  }
}
```

### Advanced Usage

#### Using a Custom Renderer

```javascript
import { ListContainer } from 'arc-nodes';

// Custom renderer function
function customItemRenderer(item) {
  const element = document.createElement('div');
  element.textContent = item.content || item;
  element.style.color = item.color || 'black';
  return element;
}

// Create a container with custom item rendering
const items = [
  { content: 'Item 1', color: 'red' },
  { content: 'Item 2', color: 'blue' },
  'Item 3', // Fallback for default rendering
];
const container = ListContainer(items, {
  className: 'my-custom-list-container',
  style: { padding: '10px' },
  itemRenderer: customItemRenderer,
});
document.body.appendChild(container);
```

#### Applying Inline Styles and Attributes

```javascript
import { ListContainer } from 'arc-nodes';

// Create a container with custom styles and attributes
const items = ['Item 1', 'Item 2', 'Item 3'];
const container = ListContainer(items, {
  className: 'styled-list-container',
  attributes: { 'data-role': 'list' },
  style: { border: '1px solid black', padding: '5px' },
});
html`<div>${container}<div>`
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
index.js
import { router } from './router';
import HomeComponent from './components/HomeComponent';
import AboutComponent from './components/AboutComponent';
```

### 2. Define Routes

Use the `addRoute` method to map specific paths to components. Each route should have a unique path (e.g., `/home`) and the corresponding component that should be rendered when that path is accessed.

```javascript
// Define your routes
router.addRoute('/home', HomeComponent);
router.addRoute('/about', AboutComponent);
```

### 3. Set the Initial Route

To define the route that should be displayed when the application first loads, use the `setInitialRoute` method. This method requires a path and the corresponding component.

```javascript
// Set the initial route
router.setInitialRoute('/home', HomeComponent);
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
router.navigate('/about');
```

### Example

Here’s how everything comes together in your `index.js`:

```javascript
import { router } from './router';
import HomeComponent from './components/HomeComponent';
import AboutComponent from './components/AboutComponent';

// Define your routes
router.addRoute('/home', HomeComponent);
router.addRoute('/about', AboutComponent);

// Set the initial route
router.setInitialRoute('/home', HomeComponent);

// Start the router
router.onStart();

// Navigate to a route programmatically
router.navigate('/about');
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

## Note

This framework is a work-in-progress and not yet complete. It aims to mimic some of React's functionality using pure JavaScript. Some features may be incomplete or not fully tested. Use it for educational purposes or for experimentation.



