import Arc from "../core/Component.js";
import { elem } from "../core/createElement.js";

import ArcTag from "../core/element.js";
import ComponentC from "./ComponentC.js";
import NestedComponent from "./componentChild.js";

export default class ComponentA extends Arc.Component {
  constructor(props) {
    super(props);
    this.state = { text: "This is Component A" };
  }

  componentDidMount() {
    console.log("this is didmount");
    setTimeout(() => {
      this.setState({ text: "Component A has updated!" });
    }, 10000);
  }

  handleClick = () => {
    this.setState({ text: "Button was clicked!" });
  };

  render() {
    const handleClick = () => alert("Clicked!");
    const button = ArcTag.button({
      onClick: handleClick,
      children: ["Click me"],
    });
    const p = ArcTag.p({ class: "text", children: ["This is a paragraph."] });
    const img = ArcTag.img({
      src: "../public/audio.png",
      alt: "Image description",
    });

    // Return a div containing the text and the button
    return elem(
      "div",
      null,
      this.state.text,
      button,
      img,
      p,
      elem(NestedComponent),
      elem(ComponentC),
    );
    // return div(image(../public/audio.png"));
  }
}
