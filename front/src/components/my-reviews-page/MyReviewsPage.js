import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {getReviewsByUserId} from "../../services/user.service";
import {OneUserReview} from "./one-users-review/OneUserReview";

export function MyReviewsPage() {
    const {state:{user_id}} = useLocation();

    const [usersReviews, setUsersReviews] = useState([]);

    useEffect(() => {
        getReviewsByUserId(user_id).then(data=>setUsersReviews([...data]));
    }, [])
    console.log(usersReviews);
    return (
        <div>
            {usersReviews.map(value => <OneUserReview value={value}/>)}
        </div>
    )
}