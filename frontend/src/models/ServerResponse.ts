import User from "./User";

type ServerResponse = {
  success: boolean;
  message: string;
  body?: User | Product[] | Category[] | any;
}

export default ServerResponse