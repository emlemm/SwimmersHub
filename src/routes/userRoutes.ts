import express from 'express';

import { createNewUser, loginUser } from '../controllers/users';
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
  Util.handleErrors(loginUser)
);
