import { HashRouter, Routes, Route } from "react-router-dom";
import * as _ from "lodash";
import { Component } from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";

export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  title: string;
}
export interface CartItem {
  product: Product;
  quantity: number;
}

interface State {
  cartItems: CartItem[];
}

class App extends Component<{}, State> {
  state: State = {
    cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
  };

  addToCart(newItem: CartItem) {
    const newCartItems = [...this.state.cartItems];

    const existingItem = _.find(this.state.cartItems, function (item: CartItem) {
      return item.product.id == newItem.product.id;
    });
    if (existingItem) {
      existingItem.quantity += newItem.quantity;
    } else {
      newCartItems.push(newItem);
    }
    this.setState({ cartItems: newCartItems });
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  }

  render() {
    return (
      <HashRouter>
        <Header cartItems={this.state.cartItems} />
        <Routes>
          <Route
            path="/"
            element={<HomePage addToCart={(item) => this.addToCart(item)} />}
          />
        </Routes>
      </HashRouter>
    );
  }
}

export default App;
