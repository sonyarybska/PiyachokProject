import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

export function AuthRequest({children}) {
    const {user} = useSelector(state => state.userReducer);
    const location = useLocation();

    if (!user.name) {
        return <Navigate to={'/auth'} state={location}/>
    }
    return children;
}