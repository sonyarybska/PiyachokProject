import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

export function AuthRequest({children}) {
    const {isForbidden} = useSelector(state => state.userReducer);
    const location = useLocation();

    if (isForbidden) {
        return <Navigate to={'/auth'} state={location}/>
    }
    return children;
}