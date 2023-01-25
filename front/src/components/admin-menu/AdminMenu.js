import {Link, Route, Routes} from "react-router-dom";
import {AdminApplications} from "../admin-applications/AdminApplications";
import './AdminMenu.css';
import {Users} from "../users/Users";
import {UserInfo} from "../user-info/UserInfo";

export function AdminMenu() {
    return (
        <div className={'admin-menu-container'}>
            <div className={'admin-options'}>
                <Link to={''}>My application</Link>
                <Link to={'users'}>Users</Link>
            </div>
            <div className={'option-page'}>
                <Routes>
                    <Route path={''} element={<AdminApplications/>}/>
                    <Route path={'users'} element={<Users/>}/>
                    <Route path={'users/:id'} element={<UserInfo/>}/>
                </Routes>
            </div>
        </div>
    )
}