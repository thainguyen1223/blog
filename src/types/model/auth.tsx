import { UserModel } from "./users";

export interface SignupAuth {
  userName: string;
  lastName: string;
  email: string;
  password: string;
  account_type: string;
  gender: string;
  phone:string;
}

export interface LoginResponse {
  user: UserModel;
  accessToken: string;
}

export interface LoginParams {
  // id:string
	// userName: string;
	// lastName: string;
	email: string;
	password: string;
	// account_type: string;
	// gender: string;
	// phone:string;
}
