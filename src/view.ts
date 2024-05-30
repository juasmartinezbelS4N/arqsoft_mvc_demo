export default class PizzaMenuDisplay {
  showMenuDisplay() {
    console.log("Bienvenido a la Pizzería");
    console.log("\x1b[36m%s\x1b[0m", "1. Añadir Pizza");
    console.log("\x1b[35m%s\x1b[0m", "2. Ver pedido actual");
    console.log("\x1b[32m%s\x1b[0m", "3. Pagar Pedido");
    console.log("\x1b[33m%s\x1b[0m", "4. Cancelar pedido");
    console.log("\x1b[34m%s\x1b[0m", "5. Salir");
  }

  chooseSizeDisplay() {
    console.log("Elija el tamaño");
    console.log("\x1b[36m%s\x1b[0m", "1. Pequeña");
    console.log("\x1b[36m%s\x1b[0m", "2. Mediana");
    console.log("\x1b[36m%s\x1b[0m", "3. Grande");
    console.log("\x1b[36m%s\x1b[0m", "4. Cancelar");
  }

  chooseDoughDisplay() {
    console.log("Elija el tipo de masa");
    console.log("\x1b[32m%s\x1b[0m", "1. Queso");
    console.log("\x1b[32m%s\x1b[0m", "2. Regular");
    console.log("\x1b[32m%s\x1b[0m", "3. Cancelar");
  }

  chooseIngridientsDisplay() {
    console.log("Elija el ingrediente");
    console.log("\x1b[35m%s\x1b[0m", "1. Pepperoni");
    console.log("\x1b[35m%s\x1b[0m", "2. Piña");
    console.log("\x1b[35m%s\x1b[0m", "3. Champiñones");
    console.log("\x1b[35m%s\x1b[0m", "4. Café");
    console.log("\x1b[35m%s\x1b[0m", "5. Cancelar");
  }

  displayCurrentOrder(index: number, description: string[]) {
    console.log(`\x1b[3${index + 2}m%s\x1b[0m`, `Pizza ${index + 1}`);
    description.forEach((text) => {
      console.log(`\x1b[3${index + 2}m%s\x1b[0m`, text);
    });
  }

  displayTotalPrice(totalPrice: number) {
    console.log("\n-------------------");
    console.log(`Precio final: $${totalPrice}`);
  }

  displayPayOrder(totalPrice: number) {
    console.log(
      `\x1b[32m%s\x1b[0m`,
      `¿Está seguro que desea pagar su orden total?`,
    );
    console.log(
      `\x1b[32m%s\x1b[0m`,
      `El costo final a pagar es de: $${totalPrice}`,
    );
  }

  displayCancelOrder() {
    console.log(
      `\x1b[31m%s\x1b[0m`,
      "¿Está seguro que desea cancelar su orden?",
    );
    console.log(
      `\x1b[31m%s\x1b[0m`,
      "Su carrito será vaciado y deberá volver a iniciar",
    );
  }

  showErrorMessage() {
    console.error("\x1b[31m%s\x1b[0m", "Por favor, elija una opción válida");
  }
}
