import PizzaController from "./controller";
import PizzaMenuDisplay from "./view";

const view = new PizzaMenuDisplay();
const restaurante = new PizzaController(view);

restaurante.showMenu();
