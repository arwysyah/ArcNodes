import { render } from "../core/render.js";
import { stateRegister } from "../examples/index.js";

export function renderComponents() {
  const container = document.getElementById("root");
  container.innerHTML = "";
  stateRegister.currentComponents.forEach((ComponentClass) => {
    const component = new ComponentClass();
    render(component, container);
  });
}
