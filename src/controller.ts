import PizzaMenuDisplay from "./view";
import {
  PizzaModel,
  PIZZA_SIZE,
  PIZZA_INGRIDIENTS,
  PIZZA_DOUGH,
  Ingridients,
  Dough,
  Size,
} from "./model";
const readline = require("readline");

const DEFAULT_OPTION = 0;

export default class PizzaController {
  private view: PizzaMenuDisplay;
  private pizzas: PizzaModel[];
  private totalPrice: number;

  constructor(view: PizzaMenuDisplay) {
    this.view = view;
    this.pizzas = [];
    this.totalPrice = 0;
  }

  async showMenu() {
    console.clear();
    this.view.showMenuDisplay();
    const MAX_MENU_NUMBER = 5;
    const option = await this.validateMenuInput(
      DEFAULT_OPTION,
      MAX_MENU_NUMBER,
    );
    switch (option.toString()) {
      case "1":
        await this.buildPizza();
        await this.showMenu();
        return;
      case "2":
        await this.checkOrder();
        await this.showMenu();
        return;
      case "3":
        await this.payOrder();
        await this.showMenu();
        return;
      case "4":
        await this.cancelOrder();
        await this.showMenu();
        return;
      case "5":
        return;
      default:
        return;
    }
  }

  async buildPizza() {
    console.clear();
    this.view.chooseSizeDisplay();
    const MAX_SIZE_MENU_NUMBER = 4;
    const sizeOption = await this.validateMenuInput(
      DEFAULT_OPTION,
      MAX_SIZE_MENU_NUMBER,
    );
    if (sizeOption == MAX_SIZE_MENU_NUMBER) return;
    const size: Size = PIZZA_SIZE[sizeOption - 1];

    this.view.chooseDoughDisplay();
    const MAX_DOUGH_MENU_NUMBER = 3;
    const doughOption = await this.validateMenuInput(
      DEFAULT_OPTION,
      MAX_DOUGH_MENU_NUMBER,
    );
    if (doughOption == MAX_DOUGH_MENU_NUMBER) return;
    const dough: Dough = PIZZA_DOUGH[doughOption - 1];

    this.view.chooseIngridientsDisplay();
    const MAX_INGRIDIENTS_MENU_NUMBER = 5;
    const ingredientsOption = await this.validateMenuInput(
      DEFAULT_OPTION,
      MAX_INGRIDIENTS_MENU_NUMBER,
    );
    if (ingredientsOption == MAX_INGRIDIENTS_MENU_NUMBER) return;
    const ingredients: Ingridients = PIZZA_INGRIDIENTS[ingredientsOption - 1];

    const pizza = new PizzaModel(size, dough, ingredients);
    this.pizzas.push(pizza);
    this.updateTotalPrice(pizza.finalPrice + this.totalPrice);
    return;
  }

  async checkOrder() {
    this.pizzas.forEach((pizzaModel, index) => {
      const pizza = pizzaModel.getPizza();
      const description: string[] = [];
      description.push(`Tamaño: ${pizza.size.toLocaleUpperCase()}`);
      description.push(`Masa: ${pizza.dough.toLocaleUpperCase()}`);
      description.push(`Sabor: ${pizza.ingredients.toLocaleUpperCase()}`);
      description.push(`--------- Precio total: $${pizza.finalPrice}`);
      this.view.displayCurrentOrder(index, description);
    });

    this.view.displayTotalPrice(this.totalPrice);
    await this.validateAnyKey();
    return;
  }

  async payOrder() {
    this.view.displayPayOrder(this.totalPrice);
    const option = await this.validateConfirmation();
    if (option === "S") {
      this.updateTotalPrice(0);
      this.pizzas = [];
    }
    return;
  }

  async cancelOrder() {
    this.view.displayCancelOrder();
    const option = await this.validateConfirmation();
    if (option === "S") {
      this.updateTotalPrice(0);
      this.pizzas = [];
    }
    return;
  }

  private isValidOption(option: number, maxNumber: number) {
    return option >= 1 && option <= maxNumber;
  }

  private async validateMenuInput(
    option: number,
    maxNumber: number,
  ): Promise<number> {
    let selection = option;
    while (!this.isValidOption(selection, maxNumber)) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      const answer: number = await new Promise((resolve) =>
        rl.question("Elije una opción: ", (answer: number) => {
          if (!this.isValidOption(answer, maxNumber)) {
            this.view.showErrorMessage();
          }
          resolve(answer);
          rl.close();
        }),
      );
      selection = answer;
    }
    return selection;
  }

  private async validateAnyKey() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return await new Promise((resolve) =>
      rl.question(
        "Oprima cualquier tecla para continuar: ",
        (answer: number) => {
          rl.close();
          resolve(answer);
        },
      ),
    );
  }

  private async validateConfirmation() {
    let selection = "";
    const validation = (option: string) => option == "N" || option == "S";
    while (!validation(selection)) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      const answer: string = await new Promise((resolve) =>
        rl.question("Escriba S para sí o N para no: ", (answer: string) => {
          if (!validation(answer)) {
            this.view.showErrorMessage();
          }
          resolve(answer);
          rl.close();
        }),
      );
      selection = answer.toUpperCase();
    }
    return selection;
  }

  private updateTotalPrice(newPrice: number) {
    this.totalPrice = newPrice;
  }
}
