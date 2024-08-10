import ArcComponent from "../core/Arc.js";
import { html } from "../core/htmlParser.js";
import "../examples/ChildComponent.js";
export default class App extends ArcComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      message: "This is a dynamic message",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("Button clicked");
    this.setState({ count: this.state.count + 1, message: "button clicked" });
  }
  onInit() {
    console.log("Component initialized");
  }

  onRefresh(prevProps, prevState) {
    console.log("Component updated");
  }

  onCleanup() {
    console.log("Component will unmount");
  }
  render() {
    console.log("App state:", this.state);
    return html`
      <style>
        .styled-text {
          color: blue;
          font-size: 18px;
          border: 1px solid black;
          padding: 10px;
        }
      </style>

      <div componentKey="app" class="styled-text">
        <h1>Hello, Arc Node!</h1>
        <button data-action="handleClick">Increase Count</button>
        <child-component
          message="${this.state.message}"
          count="${this.state.count}"
        ></child-component>
        <div style="color: red; font-size: 20px;">
          This is a styled component with inline styles.
        </div>
      </div>
    `;
  }
}

App.registerComponent("app");
