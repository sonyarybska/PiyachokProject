import './User.css';

import {Link} from "react-router-dom";

export function User({item}) {

    return (
        <div className={'user-item'}>
            <Link to={`${item.user_id}`} state={{user_id:item.user_id}}>
                <img src={item.picture} alt=""/>
                {item.name}
            </Link>
        </div>
    )
}