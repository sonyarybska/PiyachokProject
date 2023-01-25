import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

import {OneUserReview} from "./one-users-review/OneUserReview";

import {fetchReviewsByUserId} from "../../services/review.service";

export function MyReviewsPage() {
    const {state: {user_id}} = useLocation();

    const [usersReviews, setUsersReviews] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if(fetching){
            fetchReviewsByUserId(user_id, currentPage, 5).then(data =>  {
                setUsersReviews([...usersReviews,...data.reviews]);
                setTotalCount(data.count);
            }).finally(()=>setFetching(false));
            setCurrentPage(prevState => +prevState+1);
        }
    }, [fetching]);


    const scrollHandler = (e) => {
        if (e?.target?.documentElement?.scrollHeight - (e?.target?.documentElement?.scrollTop + window?.innerHeight) < 100 && usersReviews?.length < totalCount) {
            setFetching(true);
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [totalCount]);


    return (
        <div>
            {usersReviews.map(value => <OneUserReview key={value.review_id} value={value}/>)}
        </div>
    )
}