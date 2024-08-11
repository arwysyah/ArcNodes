import { renderComponentByName } from "arc-nodes";
import "./app.js"; // Ensure this path is correct

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  if (root) {
    renderComponentByName("App", root);
  } 
});
