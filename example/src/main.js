import { html, ArcComponent } from "../../src";
import HeaderComponent from "./header";
import HeroComponent from "./hero";
import FeatureComponent from "./feature";

import "./css/styles.css";
import Documentation from "./documentation";

export default class MainContainerComponent extends ArcComponent {
  render() {
    const title = "Title";
    return html`
      <div componentKey="Main">
        <header-component componentKey="header-component"></header-component>
        <hero-component componentKey="Hero"></hero-component>
        <section
          class="features-section"
          id="feat"
          componentKey="features-section"
        >
          <Documentation componentKey="Documentation"></Documentation>
        </section>
      </div>
    `;
  }
}
MainContainerComponent.registerComponent("Main");
