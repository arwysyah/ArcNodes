import { renderComponents } from "./renderComponent.js";

document.addEventListener("DOMContentLoaded", () => {
  renderComponents();
});

if (module.hot) {
  console.log("HOT HOT");
  module.hot.accept("./renderComponent", function () {
    console.log("Accepting the updated renderComponents module!");
    renderComponents(); // Re-render components on update
  });
}
