import User from "./User";

type ServerResponse = {
  success: boolean;
  message: string;
  body?: User | Product[] | any;
}

export default ServerResponse