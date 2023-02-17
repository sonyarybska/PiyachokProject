import {NavLink} from "react-router-dom";
import './UserMenu.css'

export function UserMenu({user, logoutResponse}) {

    return (
        <div>
            <div className={'icon'}>
                <nav  className={'nav-menu'}>
                    <li className={'profile'}>
                        <span>My profile</span>
                        <ul className={'list'}>
                            <li>
                                <div className={'profile_info'}>
                                    <img alt={'avatar'} src={user?.picture}/>
                                    <div>
                                        <div id={'name'}>{user?.name}</div>
                                        <div id={'email'}>{user?.email}</div>
                                    </div>
                                </div>
                            </li>
                            <div className={'list-links'}>
                                <p style={{color:'464444',margin:0, fontWeight:700}}>My profile:</p>

                                <NavLink style={({ isActive }) => ({
                                    color: isActive ? 'white' : 'black',
                                    background: isActive ? 'black' : 'white',
                                })} to={'my-establishments'}>
                                    <li>My establishments</li>
                                </NavLink>
                                <NavLink style={({ isActive }) => ({
                                    color: isActive ? 'white' : 'black',
                                    background: isActive ? 'black' : 'white',
                                })}  to={'admin-page'}>
                                    {user?.admin && <li>Admin page</li>}
                                </NavLink>
                                <NavLink style={({ isActive }) => ({
                                    color: isActive ? 'white' : 'black',
                                    background: isActive ? 'black' : 'white',
                                })}  to={'my-reviews'} state={{user_id: user?.user_id}}>
                                    {<li>My reviews</li>}
                                </NavLink>
                                <NavLink style={({ isActive }) => ({
                                    color: isActive ? 'white' : 'black',
                                    background: isActive ? 'black' : 'white',
                                })}  to={'favorites'}>
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