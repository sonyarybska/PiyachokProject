import {useEffect} from "react";
import {getUsersEstablishments} from "../../services/user.service";
import {decode} from "../../services/auth.service";
import './UsersEstablishments.css';
import {
    Route,
    Routes,
    NavLink
} from "react-router-dom";


import {useDispatch, useSelector} from "react-redux";
import {setUsersEstablishments} from "../../redux/actions/actions";
import {StateEstablishments} from "./state-establishments/StateEstablishments";

export function UsersEstablishments() {
    const {establishments} = useSelector(state => state.establishmentReducer);
    const dispatch = useDispatch();
    const {user_id} = decode();

    useEffect(() => {
        getUsersEstablishments(user_id).then(items => dispatch(setUsersEstablishments([...items.data.data])))
    }, [establishments]);


    return (
        <div className={'adv'}>
            <nav className={'columns'}>
                <div>
                    <NavLink to={'/my-establishments/'}>Approved</NavLink>
                </div>
                <div>
                    <NavLink to={'pending'}>Pending</NavLink>
                </div>
                <div>
                    <NavLink to={'rejected'}>Rejected</NavLink>
                </div>
            </nav>

            <div className={'hr'}></div>

            <div>
                <Routes>
                    <Route path={"/*"} element={<StateEstablishments state={"approved"}/>}/>
                    <Route path={"/rejected"} element={<StateEstablishments state={"rejected"}/>}/>
                    <Route path={"/pending"} element={<StateEstablishments state={"pending"}/>}/>
                </Routes>
            </div>

        </div>

    )
}