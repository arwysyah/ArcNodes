import { ArcComponent, html } from 'arc-nodes';
import './css/child.css'; 

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

  initialize() {
    console.log("Child initialized");
  }

  render() {


    return html`
      <div class="child-container">
        <h1 class="child-title">Child Component</h1>
        <p class="child-counter">
          Counter: ${this.mutableState.count}
        </p>
        <button class="child-button" data-action="handleIncrement">Increment</button>

      </div>
    `;
  }
}

Child.registerComponent("Child");
