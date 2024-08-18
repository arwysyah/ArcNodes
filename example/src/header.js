import { html, ArcComponent, Flatlist, router } from "../../src";

import "./css/styles.css";

const items = [
  {
    content: "Home",
    route: "header",
  },
  {
    content: "Documentation",
    route: "documentation",
  },
  {
    content: "Game",
    route: "game",
  },
  {
    content: "Source",
  },
];

class HeaderComponent extends ArcComponent {
  constructor() {
    super();
    console.log("HeaderComponent constructed");
    this.mutableState = {
      focus: 0,
      item: items,
    };
    // this.handleFocus = this.handleFocus.bind(this);
  }

  render() {
    const ha = (index) => {
      console.log("handleFocus called with index:", index);
      if (this.mutableState.focus !== index) {
        console.log("Changing focus state");
        this.applyChanges({ focus: index });
      }
    };
    const list = this.mutableState.item
      .map((el, index) => {
        console.log("Rendering item:", el, "at index:", index);

        return html`<p
          onclick=${() => ha(index)}
          class=${this.mutableState.focus == index ? "downloads" : "inaction"}
        >
          ${el.content}
        </p>`;
      })
      .join("");

    return html`
      <header class="header">
        <div class="container" id="header">
          <div class="logo">
            <img src="../public/logo.png" alt="Arcnodes Logo" />
          </div>
          <nav>
            <ul>
              ${list}
            </ul>
          </nav>
        </div>
      </header>
    `;
  }
}
HeaderComponent.registerComponent("HeaderComponent");
export default HeaderComponent;
