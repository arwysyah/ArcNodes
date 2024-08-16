import { html,ArcComponent } from '../../src';
import marked from "marked";
import "./css/styles.css";

class Documentation extends ArcComponent {
  constructor(props) {
    super(props);
    this.mutableState = {
      content: "",
    };
  }

  async getReadme() {
    await fetch("/node_modules/arc-nodes/README.md")
      .then((response) => response.text())
      .then((markdown) => {
        const htmlContent = marked.parse(markdown);

        this.applyChanges({ content: htmlContent });
      })
      .catch((error) => console.error("Error fetching README.md:", error));
  }

  initialize() {
    this.getReadme();
  }
  render() {
    return html`
      <div class="readme-container" id="documentation">
        ${this.mutableState.content}
      </div>
    `;
  }
}

Documentation.registerComponent("Documentation");
export default Documentation;
