import ArcComponent from "../core/Arc.js";
import { html } from "../core/htmlParser.js";

export default class ChildComponent extends ArcComponent {
  render() {
    console.log("ChildComponent props:", this.props);
    return html`
      <div data-component="child-component">
        <p>${this.props.message}</p>
        <p>Count: ${this.props.count}</p>
      </div>
    `;
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
  // onInitialize() {
  //   super.onInitialize();
  //   console.log("ChildComponent initialized with props:", this.props);
  // }
}
ChildComponent.registerComponent("child-component");
