
import { router } from '../../src/index.js';
import App from './app.js'
import FeatureComponent from "./feature";
import Game from "./game.js";


// DEFAULT without router
// document.addEventListener("DOMContentLoaded", () => {
//   const root = document.getElementById("root");
//   if (root) {
//     renderComponentByName("App", root);
//   } 
// });


// With Router
router.setInitialRoute("/",App)
router.addRoute("/features",FeatureComponent)
router.addRoute("/game",Game)
router.onStart()