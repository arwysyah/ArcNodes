import Arc from "../core/Component";
import { elem } from "../core/createElement";
import ArcTag from "../core/element";
const myCanvas = ArcTag.canvas({
  id: "my-canvas",
  class: "dynamic-canvas",
  width: 400,
  height: 300,
});
class Canvas extends Arc.Component {
  constructor() {
    super();
    this.state = {
      isLoding: true,
    };
  }

  componentDidMount() {
    console.log("did mount");
    this.builCanvas();
  }
  builCanvas() {
    console.log("build canvas");
    let canvas = document.getElementById("my-canvas");
    console.log("ny ca", canvas);
    if (canvas) {
      this.setState({ isLoading: false });
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "green";
      ctx.fillRect(5, 5, 210, 100);
    }
  }
  render() {
    console.log(this.state.isLoding);
    // Create a <canvas> element with width, height, and optional id

    console.log(document.getSelection());

    return myCanvas;
  }
}

export default Canvas;
