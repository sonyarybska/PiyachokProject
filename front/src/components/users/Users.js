import {useEffect} from "react";
import {fetchUsers} from "../../services/user.service";
import {useDispatch, useSelector} from "react-redux";
import {User} from "./user/User";
import './Users.css';

export function Users() {
    const {users} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getUsers() {
            await dispatch(fetchUsers());
        }

        getUsers();
    }, []);


    return (
        <div className={'users-container'}>
            {
                users.map(value => <User item={value}/>)
            }
        </div>
    )
}