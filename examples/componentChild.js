import Arc from "../core/Component.js";
import { elem } from "../core/createElement.js";

export default class NestedComponent extends Arc.Component {
  render() {
    console.log(this.props);
    return elem(
      "div",
      { className: "nested" },
      `Nested Component ===> hi this is props from parent ${this.props.name}`,
    );
  }
}
