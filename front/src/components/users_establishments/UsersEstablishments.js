import './UsersEstablishments.css';
import {
    Route,
    Routes,
    NavLink
} from "react-router-dom";
import {Approved} from "./approved/Approved";
import {Rejected} from "./rejected/Rejected";
import {Pending} from "./pending/Pending";


export function UsersEstablishments() {

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
                    <Route path={"/*"}
                           element={<Approved/>}/>
                    <Route path={"/rejected"}
                           element={<Rejected/>}/>
                    <Route path={"/pending"}
                           element={<Pending/>}/>
                </Routes>
            </div>

        </div>

    )
}