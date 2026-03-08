import express from 'express';

import { createNewUser, loginUser, logoutUser, getUserInfo } from '../controllers/users';
import { validateAccount as userVal } from "../utilities/usersValidation";
import { validateLogin as loginVal } from '../utilities/usersValidation';
import { Util } from "../utilities/index"

export const router = express.Router();

router.post("/", 
  userVal.createAccountRules(),
  userVal.passwordRules(),
  userVal.checkAccountData,
  Util.handleErrors(createNewUser)
);

router.post("/login",
  loginVal.loginRules(),
  loginVal.checkLoginData,
  Util.handleErrors(loginUser),
);

router.get("/logout",
  Util.handleErrors(logoutUser)
);

router.get("/", 
  Util.handleErrors(getUserInfo)
)