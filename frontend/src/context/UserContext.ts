import { Dispatch, SetStateAction, createContext } from 'react';
import User from '../models/User';

interface IUserContext {
  user: User | null;
  setUser?: Dispatch<SetStateAction<User | null>>;
}

const placeHolderUser = new User('id', 'name', 'email', false);

const UserContext = createContext<IUserContext>({ user: null });

export default UserContext;
