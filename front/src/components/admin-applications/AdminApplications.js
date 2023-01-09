import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AdminApplication} from "./admin-aplication/AdminAplication";
import {Navigate} from "react-router-dom";
import {filterApplications} from "../../redux/actions/actions";

export function AdminApplications() {
    let {isAuth} = useSelector(state => state.userReducer);

    const {establishments, admin_application} = useSelector(state => state.establishmentReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filterApplications(establishments.filter(value => value.pending)));
    }, [establishments]);

    return (<div>
        {isAuth ? admin_application.map(value => {
            return <AdminApplication
                key={value.establishment_id} item={value}/>
        }) : <Navigate to={'/'}/>}
    </div>)
}