import { html,ArcComponent, Flatlist, router } from '../../src';

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
    // this.customItemRenderer = this.customItemRenderer.bind(this);
  }
  handleFocus(params) {
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
  }

  render() {
    const listContainer = Flatlist({
      options: {
        className: "container",
      },
      data: this.mutableState.item,
      renderItem: ({ item }, index) =>
        html`<p
          data-action="handleFocus"
          class=${this.mutableState.focus == index ? "downloads" : "inaction"}
          action-params=${index}
        >
          ${item.content}
        </p> `,
    });

    return html`
      <header class="header">
        <div class="container" id="header">
      
          <div class="logo">
            <img src="../public/logo.png" alt="Arcnodes Logo" />
          </div>
          <nav>
            <ul>
              ${listContainer}
            </ul>
          </nav>
        </div>
      </header>
    `;
  }
}

HeaderComponent.registerComponent("header-component");

export default HeaderComponent;
