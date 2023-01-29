import {Link, Outlet} from "react-router-dom";
import './StateEstablishmentsLayout.css'

export function StateEstablishmentsLayout() {
    return (
        <div>
            <nav className={'columns'}>
                <div>
                    <Link to={''}>Approved</Link>
                </div>
                <div>
                    <Link to={'pending'}>Pending</Link>
                </div>
                <div>
                    <Link to={'rejected'}>Rejected</Link>
                </div>
            </nav>

            <div className={'hr'}></div>

            <Outlet/>
        </div>
    )
}