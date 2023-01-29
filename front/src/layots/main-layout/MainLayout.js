import {Outlet} from "react-router-dom";
import {Header} from "../../components/index";

export function MainLayout(){
    return(
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}