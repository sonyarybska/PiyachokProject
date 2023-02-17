import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import ReactStars from 'react-stars';
import './Reviews.css';

import {deleteReview, fetchReviewsByEstablishmentId, postReview} from "../../services/review.service";

import {Review} from "./review/Review";
import {useLocation} from "react-router-dom";

export function Reviews({establishment_id}) {
    const {user: {user_id}} = useSelector(state => state.userReducer);

    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState({text: '', check: '', rating: 0});

    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [fetchingPagination, setFetchingPagination] = useState(true);
    const [fetching, setFetching] = useState(false);
    const [fetchingDelete, setFetchingDelete] = useState(false);

    useEffect(() => {
        if (fetchingPagination && establishment_id) {
            fetchReviewsByEstablishmentId(establishment_id, currentPage, 5, "created_at-DESC").then(value => {
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
    }, [fetchingPagination, fetching, fetchingDelete, establishment_id]);

    const scrollHandler = (e) => {
        if (e?.target?.documentElement?.scrollHeight - (e?.target?.documentElement?.scrollTop + window?.innerHeight) < 150 && reviews?.length < count) {
            setFetchingPagination(true);
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
        deleteReview(id).finally(() => setFetchingDelete(true));
    }

    return (
        <div className={'reviews-box'}>
            <div>
                Reviews about establishments
            </div>
            <ReactStars count={5} value={review?.rating}
                        onChange={onChangeRating}/>
            <form className={'input-form'} onSubmit={createReview} action="">
                <input placeholder={'Text your review'} onChange={onChange} name={'text'}
                       value={review.text} type="text"/>
                <input placeholder={'Enter average check'} onChange={onChange} name={'check'}
                       value={review.check} type="number"/>

                <button>Send</button>
            </form>

            {
                reviews.length ? reviews.map(review => <Review deleteItem={deleteItem} key={review.review_id}
                                                               review={review}/>) : "No review yet"
            }
        </div>
    )
}