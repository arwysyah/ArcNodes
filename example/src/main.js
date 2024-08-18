import { html, ArcComponent } from "../../src";
import HeaderComponent from "./header";
import HeroComponent from "./hero";
import FeatureComponent from "./feature";

import "./css/styles.css";
import Documentation from "./documentation";


export default class MainContainerComponent extends ArcComponent {
  render() {
  
    const Header = new HeaderComponent()
    const Hero= new HeroComponent()
    const Docs= new Documentation()
    return html`
      <div componentKey="Main">
       ${Header.run()}
        ${Hero.run()}
        ${Docs.run()}
        <section
          class="features-section"
          id="feat"
          componentKey="features-section"
        >
        </section>
      </div>
    `;
  }
}
MainContainerComponent.registerComponent("Main");
