import Arc from "../core/Component";
import { elem } from "../core/createElement";

export default class Home extends Arc.Component {
  constructor(props) {
    super(props);
    this.state = { message: "Welcome to the Home Page" };
  }

  render() {
    return elem(
      "div",
      null,
      String(this.state.message), // Ensure the state property is a string
    );
  }
}
