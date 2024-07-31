import Arc from "../core/Component.js";
import { elem } from "../core/createElement.js";

export default class NestedComponent extends Arc.Component {
  render() {
    return elem("div", { className: "nested" }, "Nested Component");
  }
}
