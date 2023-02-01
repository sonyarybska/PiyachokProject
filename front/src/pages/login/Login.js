import {useEffect, useRef} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import './Login.css';

import {login} from "../../services/auth.service";
import {setForbidden} from "../../redux/actions/actions";

export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const divRef = useRef(null);

    const handleCallbackResponse = (res) => {
         dispatch(login(res.credential)).finally(()=>{
             dispatch(setForbidden(false));
         });
         return navigate("/", {replace: true})
    };

    useEffect(() => {
        /*global google*/
        if (window?.google && divRef?.current) {
            google?.accounts?.id?.initialize({
                client_id: "940956205344-jq5i1r0avmeajjv9enjo46luepi52o1t.apps.googleusercontent.com",
                callback: handleCallbackResponse,
            })
            google?.accounts?.id?.renderButton(
                divRef?.current,
                {theme: 'outline', size: 'large', shape: "pill"}
            )
        }

    }, [divRef?.current]);

    return (
        <div className={'login-box'}>
            <button onClick={()=> {
                dispatch(setForbidden(false))
                return navigate("/")}}>Close</button>
            <p>Please login to your account to continue</p>
            <div className={'login-button'} ref={divRef}></div>
        </div>
    )
}