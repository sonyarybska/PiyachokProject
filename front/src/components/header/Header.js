import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef} from "react";

import {setAuth, setValue} from "../../redux/actions/actions";
import {login, logout} from "../../services/auth.service";
import {UserMenu} from "../user-menu/UserMenu";


export function Header() {
    const {isAuth, user} = useSelector(state => state.userReducer);
    const {search_value} = useSelector(state => state.establishmentReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (search_value.length) {
            navigate({pathname: '/', search: `?search_value=${search_value}`});
        }
        else {
            navigate({pathname:'/'});
        }
    }

    const onChange = (e) => {
        dispatch(setValue(e.target.value))
    }

    const btn = JSON.parse(localStorage.getItem('button'));

    useEffect(() => {
        dispatch(setAuth(btn));
    }, [btn, dispatch]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleCallbackResponse = (res) => {
        dispatch(login(res.credential));
    };

    const logoutResponse = async () => {
        google.accounts.id.disableAutoSelect();
        await dispatch(logout());
        return true;
    }

    const divRef = useRef(null);

    useEffect(() => {
        /*global google*/
        if (window.google && divRef.current) {
            google.accounts.id.initialize({
                client_id: "940956205344-jq5i1r0avmeajjv9enjo46luepi52o1t.apps.googleusercontent.com",
                callback: handleCallbackResponse,
            })
            google.accounts.id.renderButton(
                divRef.current,
                {theme: 'outline', size: 'large'}
            )
        }

    }, [isAuth]);

    return (
        <div className={'header'}>
            <div className={'container'}>
                <Link to={'/'}>
                    <div className={'logo_title'}>
                        <div className={'title'}>Piyachok</div>
                        <img className={'logo'} src='/wine.png' alt=""/>
                    </div>
                </Link>


                <form className={"find_form"} onSubmit={onSubmit}>
                    <input onChange={onChange} type="text" placeholder="Искать здесь..."/>
                </form>

                {!isAuth && <div ref={divRef}></div>}

                {isAuth && <UserMenu user={user}  logoutResponse={logoutResponse}/>}

            </div>
        </div>

    )
}