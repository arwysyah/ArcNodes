// import "../examples/ChildComponent.js"; // Ensure components are registered
// import "../examples/ParentComponent.js";
// import { html } from "../core/htmlParser.js";
//
// document.addEventListener("DOMContentLoaded", () => {
//   const container = document.getElementById("root");
//
//   // Render the HTML with dynamic component handling
//   const content = html`
//     <parentcomponent>
//       <childcomponent prop1="value1" prop2="value2">
//         <span>Child Content</span>
//       </childcomponent>
//     </parentcomponent>
//   `;
//
//   container.innerHTML = ""; // Clear the container
//   if (content instanceof Node) {
//     container.appendChild(content);
//   } else {
//     console.error("Content is not a valid DOM node");
//   }
// });
//
import { renderComponentByName } from "../core/renderByComponent.js";
import "./App.js"; // Ensure this path is correct

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  if (root) {
    renderComponentByName("App", root);
  } else {
    console.error("Root element not found");
  }
});
