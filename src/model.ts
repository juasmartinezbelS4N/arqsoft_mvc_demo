export const PIZZA_SIZE = ["small", "medium", "big"] as const;
export const PIZZA_INGRIDIENTS = [
  "pepperoni",
  "pineapple",
  "mushrooms",
  "coffee",
] as const;
export const PIZZA_DOUGH = ["regular", "cheese"] as const;

export type Ingridients = (typeof PIZZA_INGRIDIENTS)[number]; // 'pepperoni' | 'pineaple' | 'mushrooms' | 'coffee' 
export type Dough = (typeof PIZZA_DOUGH)[number];
export type Size = (typeof PIZZA_SIZE)[number];

export class PizzaModel {
  ingredients: Ingridients;
  dough: Dough;
  size: Size;
  finalPrice: number;

  prices = {
    ingredients: {
      pepperoni: 5000,
      pineapple: 4000,
      mushrooms: 6000,
      coffee: 7000,
    },
    dough: {
      regular: 10000,
      cheese: 20000,
    },
    size: {
      small: 5000,
      medium: 10000,
      big: 20000,
    },
  };

  constructor(size: Size, dough: Dough, ingredients: Ingridients) {
    this.ingredients = ingredients;
    this.dough = dough;
    this.size = size;
    this.finalPrice = this.setPizzaPrice();
  }

  setPizzaPrice(): number{
    const prices = this.prices;
    return prices.ingredients[this.ingredients] + prices.size[this.size] + prices.dough[this.dough];
  }

  getPizza() {
    return {
      ingredients: this.ingredients,
      dough: this.dough,
      size: this.size,
      finalPrice: this.finalPrice,
    };
  }
}
