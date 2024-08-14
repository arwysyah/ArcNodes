// import { ArcComponent, html } from "../../src";
// import './css/child.css'; // Import the CSS file for Child component

// export default class Child extends ArcComponent {
//   constructor(props) {
//     super(props);
//     this.mutableState = {
//       count: Number(this.props.counter),
//     };
//     this.handleIncrement = this.handleIncrement.bind(this);
//   }

//   handleIncrement() {
//     console.log("called")
//     this.applyChanges((prev) => ({
//       count: prev.count + 1,
//     }));
//   }

//   initialize() {
//     console.log("Child initialized");
//   }

//   render() {
//     console.log(this.props)
//     const items = this.props.items // Parse items from props

//     return html`
//       <div class="child-container">
//         <h1 class="child-title">Child Component</h1>
//         <p class="child-counter">
//           Counter: ${this.mutableState.count}
//         </p>
//         <button class="child-button" data-action="handleIncrement">Increment</button>

//       </div>
//     `;
//   }
// }

// Child.registerComponent("Child");
