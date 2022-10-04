import React from "react";
import { AuthService } from "../service/auth";

export const authService = new AuthService();
export const AuthContext = React.createContext(authService);
