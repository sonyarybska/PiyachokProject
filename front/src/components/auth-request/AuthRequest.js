import {useEffect, useRef} from "react";
import {login} from "../../services/auth.service";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import './AuthRequest.css';

export function AuthRequest() {
    const {state} = useLocation()
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const divRef = useRef(null);

    const handleCallbackResponse = (res) => {
        navigate(`${window?.location?.pathname}`, {state: {loginRequest: false}});
        dispatch(login(res.credential));
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
            <button onClick={()=>navigate(`${window.location.pathname}`,{state:{loginRequest:false}})}>Close</button>
            <p>Please login to your account to continue</p>
            <div className={'login-button'} ref={divRef}></div>
        </div>
    )
}