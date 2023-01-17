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

    return (
        <div>
            {usersReviews.map(value => <OneUserReview key={value.review_id} value={value}/>)}
        </div>
    )
}