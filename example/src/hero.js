import { html,ArcComponent } from '../../src';
import "./css/styles.css";
import { data_content } from "./data/content";
export default class HeroComponent extends ArcComponent {
  render() {
    return html`
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1>${data_content["hero-title"]}</h1>
            <p>${data_content["hero-content"]}</p>
            <ul class="features">
              <li>Component-based architecture</li>
              <li>State management</li>
              <li>Dynamic rendering and nested components</li>
            </ul>
            <a href="#" class="btn">Start Exploring Us</a>
          </div>
          <div class="hero-image"></div>
        </div>
      </section>
    `;
  }
}
HeroComponent.registerComponent("hero-component");
