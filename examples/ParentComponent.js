import Component from "../core/Component.js";
import { registerComponent } from "../core/ComponentRegistry.js";

registerComponent();
class ParentComponent extends Component {
  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}

registerComponent("parentcomponent", ParentComponent);
export default ParentComponent;
