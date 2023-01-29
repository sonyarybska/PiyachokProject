import {useLocation, useNavigate} from "react-router-dom";
import {createRef, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import './UserInfo.css';

import {deleteUser, fetchOneUser, updateUser} from "../../services/user.service";
import {UserInfoEstablishments} from "./user-info-establishments/UserInfoEstablishments";
import {deleteEstablishment, getEstablishmentsByUserId,} from "../../services/establishment.service";
import {setUserName} from "../../redux/actions/actions";

export function UserInfo() {
    const {user} = useSelector(state => state.userReducer);
    const {state: {user_id}} = useLocation();

    const [currentUser, setCurrentUser] = useState({});

    const navigate = useNavigate();

    const [userEstablishments, setUserEstablishments] = useState([]);

    const [fetching, setFetching] = useState(true);
    const [fetchingDelete, setFetchingDelete] = useState(false);
    const [fetchingUser, setFetchingUser] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(1);

    const changeNameInput = createRef();

    const dispatch = useDispatch()

    useEffect(() => {
        if (fetching) {
            getEstablishmentsByUserId(user_id, currentPage, null, true).then(value => {
                setUserEstablishments([...userEstablishments, ...value?.data?.establishments]);
                setTotalCount(value.data.count);
            }).finally(() => setFetching(false));
            setCurrentPage(prevState => +prevState + 1);
        }

        else if(fetchingDelete){
            getEstablishmentsByUserId(user_id, null, null, true).then(value => {
                setUserEstablishments([...value?.data?.establishments]);
            }).finally(() => setFetchingDelete(false));
            setCurrentPage(2);
        }
    }, [fetching,fetchingDelete, user_id]);


    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [totalCount]);

    const scrollHandler = (e) => {
        if (e?.target?.documentElement?.scrollHeight - (e?.target?.documentElement?.scrollTop + window?.innerHeight) < 100 && userEstablishments?.length < totalCount) {
            setFetching(true);
        }
    }

    useEffect(() => {
        fetchOneUser(user_id).then(value => {
            setCurrentUser({...value.data});
        }).finally(() => setFetchingUser(false));
    }, [user_id, fetchingUser]);


    const changeName = async (e) => {
        await updateUser(user_id, {name: e.target.value}).finally(() => setFetchingUser(true));
        e.target.hidden = true;
        if (user_id === user.user_id) {
            dispatch(setUserName(e.target.value));
        }
    }

    const onChangeSort = (e) => {
        const value = e.target.value;
        if (userEstablishments && value === 'ASC') {
            const sorted = userEstablishments.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
            setUserEstablishments([...sorted]);
        } else if (userEstablishments && value === 'DESC') {
            const sorted = userEstablishments.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
            setUserEstablishments([...sorted]);
        }
    }

    const deleteItem = (id) => {
        deleteEstablishment(id).finally(() => setFetchingDelete(true));
    }

    return (<div className={'user-info-box'}>

            <div className={'user-title'}>
                <div className={'user-name-avatar-box'}>

                    <div className={'user-avatar'}>
                        <img src={currentUser?.picture} alt=""/>
                    </div>

                    <div>
                        <h4>{currentUser?.name}</h4>
                        <h6>{currentUser?.email}</h6>
                    </div>
                </div>

                <div>
                    <button onClick={() => changeNameInput.current.hidden = false}>Edit name</button>

                    <button onClick={async () => {
                        await deleteUser(user_id);
                        navigate('/admin-page/users')
                    }}>Delete user
                    </button>

                </div>

                <input onKeyDown={e => e.key === 'Enter' && changeName(e)} ref={changeNameInput} hidden type="text"/>
            </div>

            <div className={'select-sort'}>
                <select onChange={onChangeSort} name="" id="">
                    <option value="ASC">Sort by date of publication(ASC)</option>
                    <option value="DESC">Sort by date of publication(DESC)</option>
                </select>
            </div>

            <div className={'user-establishments'}>
                {userEstablishments.length ? userEstablishments.map((establishment, index) =>
                    <UserInfoEstablishments key={index} deleteItem={deleteItem} establishment={establishment}/>) : 'no result'
                }
            </div>
        </div>
    )
}
