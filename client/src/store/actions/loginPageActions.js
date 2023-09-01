import { login } from "../../socket-connection/socketConn";

export const proceedWithLogin = (data) => {
  login(data);
};
