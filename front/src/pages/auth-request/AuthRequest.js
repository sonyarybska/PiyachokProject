import {useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import './AuthRequest.css';

import {login} from "../../services/auth.service";
import {setForbidden} from "../../redux/actions/actions";

export function AuthRequest() {
    const {state} = useLocation()
    const dispatch = useDispatch();

    const divRef = useRef(null);

    const handleCallbackResponse = (res) => {
        dispatch(login(res.credential));
        dispatch(setForbidden(false));
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

    }, [state?.loginRequest, divRef?.current]);
    
    return (
        <div className={'login-box'}>
            <button onClick={()=>dispatch(setForbidden(false))}>Close</button>
            <p>Please login to your account to continue</p>
            <div className={'login-button'} ref={divRef}></div>
        </div>
    )
}