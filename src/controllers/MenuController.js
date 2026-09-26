import { DishModel } from '../models/DishModel';

export class MenuController {
  constructor(setState) {
    this.setState = setState;
  }

  static getInitialState() {
    return {
      selectedCategory: 'all',
      searchQuery: '',
      cartItems: [],
      dishes: DishModel.getDishes(),
      categories: DishModel.getCategories()
    };
  }

  setCategory(categoryId) {
    this.setState(prevState => ({
      ...prevState,
      selectedCategory: categoryId
    }));
  }

  setSearchQuery(query) {
    this.setState(prevState => ({
      ...prevState,
      searchQuery: query
    }));
  }

  addToCart(dish) {
    this.setState(prevState => {
      const existingIndex = prevState.cartItems.findIndex(item => item.id === dish.id);
      let updatedCart = [...prevState.cartItems];

      if (existingIndex > -1) {
        updatedCart[existingIndex].quantity += 1;
      } else {
        updatedCart.push({ ...dish, quantity: 1 });
      }

      return { ...prevState, cartItems: updatedCart };
    });
  }

  updateQuantity(dishId, delta) {
    this.setState(prevState => {
      const updatedCart = prevState.cartItems
        .map(item => {
          if (item.id === dishId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);

      return { ...prevState, cartItems: updatedCart };
    });
  }

  clearCart() {
    this.setState(prevState => ({ ...prevState, cartItems: [] }));
  }
}