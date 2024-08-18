import { ArcComponent, html } from "arc-nodes";
import "./css/child.css";

export default class Child extends ArcComponent {
  constructor(props) {
    super(props);
    this.mutableState = {
      count: this.props.counter,
    };
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleIncrement() {
    this.applyChanges((prev) => ({
      count: prev.count + 1,
    }));
  }
  updateParentCounter = () => {
    this.props.incrementCounter();
  };

  initialize() {
    console.log("Child initialized");
  }

  render() {
    return html`
      <div class="child-container">
        <h1 class="child-title">Child Component</h1>
        <p class="child-counter">Counter: ${this.mutableState.count}</p>
        <button class="child-button" onclick=${this.handleIncrement}>
          Increment Child
        </button>
        <div style="height:20px;"></div>
        <button class="child-button" onclick=${this.updateParentCounter}>
          Increment from child to Parent
        </button>
      </div>
    `;
  }
}

Child.registerComponent("Child");
