import {Route, Routes} from "react-router-dom";

import {AdminApplications, UserInfo, Users} from "../../components/index";
import {AdminLayout} from "../../layots/index";

export function AdminMenu() {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<AdminLayout/>}>
                    <Route index element={<AdminApplications/>}/>
                    <Route path={'users'} element={<Users/>}/>
                    <Route path={'users/:id'} element={<UserInfo/>}/>
                </Route>
            </Routes>
        </div>
    )
}