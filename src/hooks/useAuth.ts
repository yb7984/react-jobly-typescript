import { useContext } from "react";
import UserContext from "../context/userContext";
import { useParams } from 'react-router-dom';
import { User } from "../models";

type AuthType = "login" | "none" | "admin" | "right-user";
interface ParamTypes {
    username: string
}

export interface UseAuth {
    loginUser: User | null,
    checkAuth: Function
}

const useAuth = (authType: AuthType = "login"): UseAuth => {

    const loginUser: User | null = useContext(UserContext).loginUser;
    const { username } = useParams<ParamTypes>();

    const checkAuth: Function = (): boolean => {

        if (authType === "none") {
            //not required login
            return true;
        }

        if (!loginUser) {
            //not login
            return false;
        }

        if (authType === "admin") {
            return loginUser.isAdmin;
        }

        if (authType === "right-user") {
            if (loginUser.isAdmin === true) {
                return true;
            }

            if (loginUser.username === username) {
                return true
            }

            return false;
        }

        if (authType === "login") {
            return !!loginUser;
        }

        return false;

    }
    return { loginUser, checkAuth };
}

export default useAuth;