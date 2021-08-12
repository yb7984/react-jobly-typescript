import React from "react";
import { User } from "../models";

interface ContextState {
    loginUser: User | null,
    setLoginUser: any
}

//context for login user information
const UserContext: React.Context<ContextState> = React.createContext({} as ContextState);

export default UserContext;