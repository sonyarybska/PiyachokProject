import {Route, Routes} from "react-router-dom";

import {StateEstablishmentsLayout} from "../../layots/index";
import {Approved} from "./approved/Approved";
import {Rejected} from "./rejected/Rejected";
import {Pending} from "./pending/Pending";

export function UsersEstablishments() {
    return (
        <div>
            <Routes>
                <Route path={""} element={<StateEstablishmentsLayout/>}>
                    <Route path={''} element={<Approved/>}/>
                    <Route path={"rejected"} element={<Rejected/>}/>
                    <Route path={"pending"} element={<Pending/>}/>
                </Route>
            </Routes>
        </div>

    )
}