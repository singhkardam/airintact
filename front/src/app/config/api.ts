import { environment } from "src/environments/environment";

export const baseUrl = environment.production ? "https://airintact.com" : "http://localhost:3000/api";
export const userIdUrl = baseUrl+"/users/user-id";
export const userSignUpUrl = baseUrl+"/users";
export const userLogInUrl = baseUrl+"/users/login";
export const accountUrl = baseUrl+"/users/update-account-details";
export const childrenOfUserUrl = baseUrl+"/users/children-of-user";
