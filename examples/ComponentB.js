import Arc from "../core/Component.js";
import { elem } from "../core/createElement.js";

export default class ComponentB extends Arc.Component {
  constructor(props) {
    super(props);
    this.state = { text: "This is Component B" };
  }

  componentDidMount() {
    // Simulate state update after mounting
    setTimeout(() => {
      this.setState({ text: "Component B has updated!" });
    }, 2000);
  }

  render() {
    return elem("div", null, this.state.text);
  }
}
