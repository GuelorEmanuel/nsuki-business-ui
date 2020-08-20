import { createTransform } from "redux-persist";
import environment from "environment";
import UserModel from "../stores/auth/models/users/UserModel";
import IAuthState from "../stores/auth/models/IAuthState";

import EffectUtility from "utilities/EffectUtility";

const TransformCredentials = createTransform(
  (inboundState: IAuthState, key): any => {
    return {
      ...inboundState,
      user: undefined
    };
  },
  (outboundState: any, key) => {
    return {
      ...outboundState,
      user: fetchUser(outboundState.token)
    };
  },
  {
    whitelist: ["authentication"]
  }
);
const fetchUser = (token: string) => {
  // Fetch the user data from some service
  // ...
  const endpoint: string = environment.api.users.replace(":id", token);

  return EffectUtility.getToModel<UserModel>(UserModel, endpoint, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export default TransformCredentials;
