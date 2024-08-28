import { useAuthContext } from "./useAuthContext.js";
import { removeToken } from "../utils/authUtil.js";

const useLogout = () => {
    const { dispatch: authDispatch } = useAuthContext();

    const logout = () => {
        try {
            removeToken();
            authDispatch({ type: 'LOGOUT' });
        } catch (error) {
            console.error(error);
        }
        
    }

    return { logout };
}

export { useLogout };