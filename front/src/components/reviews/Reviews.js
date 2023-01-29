import {useEffect, useState} from "react";
import ReactStars from 'react-stars'

import './Reviews.css';
import {deleteReview, fetchReviewsByEstablishmentId, postReview} from "../../services/review.service";
import {useSelector} from "react-redux";
import {Review} from "./review/Review";
import {useLocation} from "react-router-dom";
import {AuthRequest} from "../auth-request/AuthRequest";

export function Reviews({establishment_id}) {
    const {state} = useLocation();
    const {user: {user_id}} = useSelector(state => state.userReducer);

    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState({text: '', check: '', rating: 0});
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetchingPagination, setFetchingPagination] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [fetchingDelete, setFetchingDelete] = useState(false);

    useEffect(() => {
        if (fetchingPagination) {
            fetchReviewsByEstablishmentId(+establishment_id, currentPage, 5, "created_at-DESC").then(value => {
                setReviews([...reviews, ...value?.data?.reviews]);
                setCount(value?.data?.count);
            }).finally(() => setFetchingPagination(false));
            setCurrentPage(prevState => prevState + 1)
        } else if (fetching) {
            fetchReviewsByEstablishmentId(+establishment_id, null, 5, "created_at-DESC").then(value => {
                setReviews([...value?.data?.reviews]);
                setCount(value?.data?.count);
            }).finally(() => setFetching(false));
            setCurrentPage(2);
        } else if (fetchingDelete) {
            fetchReviewsByEstablishmentId(+establishment_id, null, 5, "created_at-DESC").then(value => {
                setCount(value?.data?.count);
                setReviews([...value?.data?.reviews]);
            }).finally(() => setFetchingDelete(false));
            setCurrentPage(2);
        }
    }, [fetchingPagination, fetching, fetchingDelete]);

    const scrollHandler = (e) => {
        if (e?.target?.documentElement?.scrollHeight - (e?.target?.documentElement?.scrollTop + window?.innerHeight) < 150 && reviews?.length < count) {
            setFetchingPagination(true);
            console.log('sksk')
        }
    }


    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [count]);


    const onChange = (e) => {
        setReview({...review, [e.target.name]: e.target.value});
    }

    const onChangeRating = (rating) => {
        setReview({...review, rating})
    }

    const createReview = async (e) => {
        e.preventDefault();
        await postReview({...review, establishment_id, user_id}).finally(() => setFetching(true));
    }

    const deleteItem = (id) => {
        deleteReview(id).finally(()=>setFetchingDelete(true));
    }

    return (
        <div className={'reviews-box'}>
            {
                state?.loginRequest && <AuthRequest/>
            }

            <div>
                Reviews about establishments
            </div>
            <ReactStars className={state?.loginRequest ? 'disable_actions' : ''} count={5} value={review?.rating}
                        onChange={onChangeRating}/>
            <form className={'input-form'} onSubmit={createReview} action="">
                <input onChange={onChange} className={state?.loginRequest ? 'disable_actions' : ''} name={'text'}
                       value={review.text} type="text"/>
                <input onChange={onChange} className={state?.loginRequest ? 'disable_actions' : ''} name={'check'}
                       value={review.check} type="number"/>

                <button className={state?.loginRequest ? 'disable_actions' : ''}>Send</button>
            </form>

            {
                reviews.length ? reviews.map(review => <Review deleteItem={deleteItem} key={review.review_id}
                                                               review={review}/>) : "No review yet"
            }
        </div>
    )
}