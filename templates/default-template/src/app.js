import { ArcComponent, html } from "arc-nodes";

export default class App extends ArcComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      message: "Hello ~ArcNoder~!",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1, message: "button clicked" });
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

      <div componentKey="app" class="styled-text">
        <h1>${this.state.message}</h1>
        <button data-action="handleClick">Increase Count</button>
        <p>${this.state.clicked}</p>
        <div style="color: red; font-size: 20px;">
          This is a styled component with inline styles.
        </div>
      </div>
    `;
  }
}

App.registerComponent("app"); // register your component
