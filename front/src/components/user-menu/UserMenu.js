import {NavLink} from "react-router-dom";

export function UserMenu({user, logoutResponse}){
    return(
        <div>
            <div className={'icon'}>
                <nav className={'nav-menu'}>
                    <li className={'profile'}>My profile
                        <ul className={'list'}>
                            <li>
                                <div className={'profile_info'}>
                                    <img alt={'avatar'} src={user.picture}/>
                                    <div>
                                        <div id={'name'}>{user.name}</div>
                                        <div id={'email'}>{user.email}</div>
                                    </div>
                                </div>
                            </li>
                            <div>My profile:
                                <NavLink to={'/my-establishments'}>
                                    <li>My establishments</li>
                                </NavLink>
                                <NavLink to={'/admin-page'}>
                                    {user.admin && <li>Admin page</li>}
                                </NavLink>
                                <NavLink to={'/my-reviews'} state={{user_id:user.user_id}}>
                                    {<li>My reviews</li>}
                                </NavLink>
                                <NavLink to={'/settings'}>
                                    {<li>Settings</li>}
                                </NavLink>
                                <NavLink to={'/favorites'}>
                                    {<li>My favorites</li>}
                                </NavLink>
                            </div>
                        </ul>
                    </li>
                </nav>
                <button onClick={logoutResponse}>Log out</button>
        </div>
        </div>
    )
}