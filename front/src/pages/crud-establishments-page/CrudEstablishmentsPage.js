import { Route, Routes} from "react-router-dom";
import './CrudEstablishmentsPage.css';

import {CreateFormEstablishments, UsersEstablishments} from "../../components/index";
import {UsersEstablishmentsLayout} from "../../layots/index";

export function CrudEstablishmentsPage() {
    return (
        <div>
            <div>
                <Routes>
                    <Route path={"/*"} element={<UsersEstablishmentsLayout/>}>
                        <Route path={"*"} element={<UsersEstablishments/>}/>
                        <Route path={'create'} element={<CreateFormEstablishments/>}/>
                        <Route path={'update'} element={<CreateFormEstablishments/>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    )
}