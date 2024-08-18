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

    this.mutableState = {
      focus: 0,
      item: items,
    };
    // this.handleFocus = this.handleFocus.bind(this);
  }
  handleFocus = (params) => {
    this.applyChanges({ focus: params });
     if(params == items.length-1){
       window.open("https://github.com/arwysyah/ArcNodes", '_blank', 'noopener,noreferrer');
     }

     const targetElement = document.getElementById(items[params]["route"]);

     if (targetElement) {
       targetElement.scrollIntoView({ behavior: "smooth" });
     }
     if(items[params]["content"]== "Game"){

       router.navigate(items[params]["route"])
     }
  };

  render() {
    const list = this.mutableState.item
      .map((el, index) => {
        const functionId = `function_${index}`;
        window[functionId] = this.handleFocus.bind(this, index);

        return html`<p
          onclick=${functionId}
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
