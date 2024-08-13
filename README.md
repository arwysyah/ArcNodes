# ArcNodes

ArcNodes is an experimental minimalist and simplified UI lib for creating web applications using pure JavaScript. It includes core concepts of components, state management. This documentation provides an overview of how to use ArcNodes, including installation, basic usage, and advanced features.

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
npm create-arcnode <project-name>
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
- [Unique Component Keys](#unique-component-keys)
- [Nested Components](#nested-components)
- [Passing Props](#passing-props)
- [Styling](#styling)
- [Lifecycle Methods](#lifecycle-methods)
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
    this.state = {

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
MyComponent.registerComponent("my-component");
```

---



## Unique Component Keys

When pre-rendering your component and triggering the DOM, it is essential to add a `componentKey` attribute to ensure that each instance of your component is unique. The `componentKey` helps ArcNodes efficiently manage and update components, especially when dealing with child component and sure that is gonna rerender whenever setstae triggered.

### Example Usage of `componentKey`

Ensure that each component has a unique `componentKey` when rendering:

```javascript
import { ArcComponent, html } from "arc-nodes";

export default class MyComponent extends ArcComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return html`
      <div componentKey="MyComponent">
        <p>${this.props.message}</p>
        <button onclick="${this.handleClick}">Increase Count</button>
        <p>Count: ${this.state.count}</p>
      </div>
    `;
  }

  initialize() {
    console.log("Component initialized");
  }

  onUpdate(prevProps, prevState) {
    console.log("Component updated");
  }

  onDestroy() {
    console.log("Component destroyed");
  }
}

// Register the component
MyComponent.registerComponent("MyComponent");

OR 


import { ArcComponent, html } from "arc-nodes";
import ChildComponent from "./ChildComponent.js";

export default class MyComponent extends ArcComponent {
 constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return html`
      <div componentKey="MyComponent">
           <p>${this.props.message}</p>
        <button onclick="${this.handleClick}">Increase Count</button>
        <p>Count: ${this.state.count}</p>
      </div>
    `;
  }

  initialize() {
    console.log("Parent component initialized");
  }

  onUpdate(prevProps, prevState) {
    console.log("Parent component updated");
  }

  onDestroy() {
    console.log("Parent component destroyed");
  }
}

// Register the component
ParentComponent.registerComponent("MyComponent");
```


By including `componentKey` in your components, you ensure that each instance is correctly identified and managed within the DOM.
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

In ArcNodes, props are string with lowercase (at least for now ) you can pass props as JSON strings. This approach ensures that complex objects and arrays are handled consistently. Use JSON.stringify to convert objects and arrays into JSON strings before passing them as props.

### Defining Props

Props can be passed to components using attributes in the HTML. Inside the component, access props via `this.props`.

```javascript
import { ArcComponent, html } from "arc-nodes";
import ChildComponent from "./ChildComponent.js"; // Ensure the correct path

export default class ParentComponent extends ArcComponent {

  constructor(props) {
    super(props);
    this.state = { count: 0, items: [{ name: "Item 1" }, { name: "Item 2" }] };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    // Prepare JSON string props
    const countProps = this.state.count;
    const itemsProps = JSON.stringify(this.state.items);

    return html`
      <div>
        <h1>Parent Component</h1>
        <button onclick="${this.handleClick}">Increase Count</button>
        <ChildComponent count="${countProps}" items="${itemsProps}"/>

      </div>
    `;
  }

  initialize() {
    console.log("Parent component initialized");
  }

  onUpdate(prevProps, prevState) {
    console.log("Parent component updated");
  }

  onDestroy() {
    console.log("Parent component destroyed");
  }
}

// Register the component
ParentComponent.registerComponent("parent-component"); 
```

### Using Props

When using the component, pass props as attributes:

```html
<MyComponent message="Hello, World!" count="5"></MyComponent>
or 
<MyComponent message="Hello, World!" count="5"/>
```


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
    this.state = {
      counter1: 0,
      counter2: "loading",
    };
  }
  handleClick1() {
    console.log("clicked1");
    this.setState({
      counter1: this.state.counter1 + 1,
    });
  }
  handleClick2() {
    console.log("clicked2");
    this.setState({
      counter2: "Done",
    });
  }
  initialize() {
    this.setState({
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
          clicked ${this.state.counter1}
        </button>
        <button data-action="handleClick2">click2</button>

        <p class="styled-text">${this.state.counter1}</p>
        <p>${this.state.counter2}</p>
      </div>`;
  }
}
ChildComponent.registerComponent("ChildComponent");

```
## Lifecycle Methods

### Overview

Lifecycle methods in Arc Component System are used to hook into various stages of a component's lifecycle. Here's how they work:

- `initialize()`: Called once when the component is first created.
- `onUpdate(prevProps, prevState)`: Called whenever the component updates.
- `onDestroy()`: Called just before the component is removed from the DOM.

### Example Usage

```javascript
import { ArcComponent, html } from "arc-nodes";

export default class MyComponent extends ArcComponent {

  initialize() {
    console.log("Component initialized");
  }

  onUpdate(prevProps, prevState) {
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
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return html`
      <div>
        <h1>Parent Component</h1>
        <button data-action="handleClick">Increase Count</button>
        <child-component count="${this.state.count}"></child-component>
      </div>
    `;
  }

  initialize() {
    console.log("Parent component initialized");
  }

  onUpdate(prevProps, prevState) {
    console.log("Parent component updated");
  }

  onDestroy() {
    console.log("Parent component destroyed");
  }
}

// Register the component
ParentComponent.registerComponent("parent-component");
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

  onUpdate(prevProps, prevState) {
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

## Routing System Usage
### Router

The `Router` class in your library enables easy route management and navigation between different components in your application. Below is a step-by-step guide on how to set up and use the router.

### 1. Import the Router

Start by importing the router from your library. You'll also import the components you want to associate with specific routes.

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
   cd ArcNodes
   npm install
   ```

## Note

This library is a work-in-progress and not yet complete. It aims to mimic some of React's functionality using pure JavaScript. Some features may be incomplete or not fully tested. Use it for educational purposes or for experimentation.
