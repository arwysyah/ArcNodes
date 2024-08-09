import { ArcComponent, html } from "arc-nodes";

export default class App extends ArcComponent {
  render() {
    return html`<div>Hello, ArcNode!</div>`;
  }
}
App.registerComponent("app"); // register your component
