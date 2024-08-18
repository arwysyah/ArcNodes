import { ArcComponent, html } from "../../src";
import MainContainerComponent from "./main";

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
    this.applyChanges({
      count: this.mutableState.count + 1,
      message: `You've clicked ${this.mutableState.count + 1} time(s)!`,
    });
  }
  initialize() {
    console.log("Component initialized");
  }

  onDidUpdate(prevProps, prevState) {
    console.log("Component updated", prevProps, prevState);
  }

  onDestroy() {
    console.log("Component destroyed");
  }

  render() {
    const Main = new MainContainerComponent();
    return html` <div class="app-container">${Main.run()}</div> `;
  }
}

App.registerComponent("app");
