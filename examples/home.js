import Arc from "../core/Component";
import { elem } from "../core/createElement";
import ArcTag from "../core/element";
// export default class Home extends Arc.Component {
//   constructor(props) {
//     super(props);
//     this.router = props.router;
//   }
//   render() {
//     const handleNavigate = () => this.router.navigate("/about");
//     const handleClick = () => alert("clicked");
//     const button = ArcTag.button({
//       onClick: handleNavigate,
//       children: ["navigate to Component A"],
//     });
//     const p = ArcTag.p({ class: "text", children: ["This is home page"] });
//
//     return elem(
//       "div",
//       null,
//       this.state.text,
//       button,
//
//       p,
//     );
//   }
// }
//
export default class Home extends Arc.Component {
  constructor(props) {
    super(props);
    this.state = { message: "Welcome to the Home Page" };
  }

  render() {
    return elem(
      "div",
      null,
      String(this.state.message), // Ensure the state property is a string
    );
  }
}
