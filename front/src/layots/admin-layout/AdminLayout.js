import {Link, Outlet} from "react-router-dom";
import './AdminLayout.css'

export function AdminLayout(){
    return(
        <div className={'admin-menu-container'}>
            <div className={'admin-options'}>
                <Link to={''}>My application</Link>
                <Link to={'users'}>Users</Link>
            </div>
            <Outlet/>
        </div>
    )
}