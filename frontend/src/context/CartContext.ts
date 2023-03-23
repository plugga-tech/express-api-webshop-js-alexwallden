import { Dispatch, SetStateAction, createContext } from "react";
import Order from "../models/Order";

interface ICartContext {
  order: Order | null;
  setUser?: Dispatch<SetStateAction<string | null>>;
  setOrder?: Dispatch<SetStateAction<Order | null>>;
  setProducts?: Dispatch<SetStateAction<{productId: string, quantity: number}[] | null>>;
}

const CartContext = createContext<ICartContext>({order: null})

export default CartContext