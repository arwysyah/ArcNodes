import Arc from "../core/Component.js";
import { elem } from "../core/createElement.js";
import Canvas from "./canvas.js";

export default class ComponentC extends Arc.Component {
  render() {
    return elem("div", null, elem(Canvas));
  }
}
