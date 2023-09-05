import axios from "axios";
import { API_ROUTES, APP_ROUTES } from "@/utils/routers";
import { exportResults } from "@/utils/api";

import { URL } from "@/axios";
import { SignupAuth ,LoginParams } from "@/types/model/auth";


export const login = async (payload:LoginParams) =>
  exportResults(await axios.post(`${URL}${API_ROUTES.LOGIN}`, payload));


export const signup = async (payload:SignupAuth) => 
  exportResults(await axios.post(`${URL}${API_ROUTES.SIGNUP}`, payload));
