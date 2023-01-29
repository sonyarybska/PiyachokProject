import {Link, Outlet} from "react-router-dom";

export function UsersEstablishmentsLayout() {
    return (
        <div>
            <div className={'menu'}>
                <Link to={''}>
                    <div>
                        My establishments
                    </div>
                </Link>

                <Link to={'create'}>
                    <div>
                        Create new establishment
                    </div>
                </Link>
            </div>
            <Outlet/>
        </div>
    )
}