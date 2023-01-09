import './CrudEstablishmentsPage.css';
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import {CreateFormEstablishments} from "../create-form-establishments/CreateFormEstablishments";
import {useSelector} from "react-redux";
import {UsersEstablishments} from "../users_establishments/UsersEstablishments";

export function CrudEstablishmentsPage() {
    let {isAuth} = useSelector(state => state.userReducer);

    let showConfirm=()=>{
        console.log('hello');
    }

    return (
        isAuth ? <div>
            <div >
                <div className={'menu'}>
                    <NavLink to={''}>
                        <div>
                            My establishments
                        </div>
                    </NavLink>

                    <NavLink to={'create'}>
                        <div>
                            Create new establishment
                        </div>
                    </NavLink>
                </div>
                <div>
                    <Routes>
                        <Route path={'/*'} element={<UsersEstablishments/>}/>
                        <Route path={'/create'}  onLeave={showConfirm} element={<CreateFormEstablishments/>}/>
                        <Route path={'/update'}  onLeave={showConfirm} element={<CreateFormEstablishments/>}/>
                    </Routes>
                </div>

            </div>
        </div> : <Navigate to={'/'}/>
    )
}