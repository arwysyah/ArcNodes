import Arc from "../core/Component.js";
import { elem } from "../core/createElement.js";

export default class ComponentC extends Arc.Component {
  render() {
    return elem("div", null, "This is Component C");
  }
}
