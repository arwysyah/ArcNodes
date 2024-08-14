import { renderComponentByName } from "../../src";

import "./app.js"; 

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  if (root) {
    renderComponentByName("App", root);
  } 
});
