import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import './Establishments.css';

import {fetchEstablishments, getTypeEstablishments} from "../../services/establishment.service";
import {Establishment} from "./establishment/Establishment";

export function Establishments({admin}) {
    const {isForbidden} = useSelector(state => state.userReducer);
    const [establishments, setEstablishments] = useState([]);

    const [types, setTypes] = useState([]);
    const [currentType, setCurrentType] = useState(null);

    const [currenPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [maxCheck, setMaxCheck] = useState(0);

    const [sortType, setSortType] = useState(null);
    const [filterByRating, setFilterByRating] = useState(null);
    const [filterByCheck, setFilterByCheck] = useState(null);

    const [fetchingEstablishments, setFetchingEstablishments] = useState(true);

    const {state} = useLocation();

    useEffect(() => {
        let cancel = false;

        if (fetching) {
            fetchEstablishments(currenPage, 8, state?.title, sortType, currentType, filterByRating, filterByCheck).then(value => {
                setEstablishments([...establishments, ...value.data.establishments]);
                setTotalCount(value?.data?.count);
                setMaxCheck(value.data.maxCheck);
            })
                .finally(() => setFetching(false));
            setCurrentPage(prevState => +prevState + 1);
        }

        return () => {
            cancel = true;
        }
    }, [fetching]);

    useEffect(() => {
            if (state?.title) {
                fetchEstablishments(null, 6, state?.title).then(value => setEstablishments([...value.data.establishments]));
            } else {
                fetchEstablishments(null,null,null,null,null,null,null,null,true).then(value => setEstablishments([...value.data.establishments])).finally(() => setFetchingEstablishments(false));
            }
    }, [state?.title,fetchingEstablishments]);

    const scrollHandler = (e) => {
        if (e?.target?.documentElement?.scrollHeight - (e?.target?.documentElement?.scrollTop + window?.innerHeight) < 100 && establishments?.length < totalCount) {
            setFetching(true);
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [totalCount]);



    useEffect(() => {
        getTypeEstablishments().then(value => setTypes([...value.data]));
    }, []);


    const onChangeType = (e) => {
        setCurrentPage(2);
        if (e.target.value.length) {
            setCurrentType(e.target.value);
            fetchEstablishments(null, 8, state?.title, sortType, e.target.value, filterByRating, null).then(value => setEstablishments([...value.data.establishments]));

        } else {
            setCurrentType(null);
            fetchEstablishments(null, 8, state?.title, sortType, null, filterByRating, null).then(value => setEstablishments([...value.data.establishments]));
        }
    }

    const onChangeSort = (e) => {
        setCurrentPage(2);
        if (e.target.value.length) {
            fetchEstablishments(null, 8, state?.title, e.target.value, currentType, filterByRating).then(value => setEstablishments([...value?.data?.establishments]));
        } else {
            fetchEstablishments(null, 8, state?.title, null, currentType, filterByRating, null, null, true, false).then(value => setEstablishments([...value?.data?.establishments]));
            setSortType(null);
        }
    }

    const onSubmitFilterRating = (e) => {
        e.preventDefault();
        let filterParams;
        setCurrentPage(2);
        if (+e.target[0].value === 0 && +e.target[1].value === 0) {
            fetchEstablishments(null, 8, state?.title, sortType, currentType, null, filterByCheck).then(value => {
                setEstablishments([...value.data.establishments])
            });

            setFilterByRating(null);
        } else if (+e.target[1].value === 0 && !+e.target[0].value) {
            filterParams = `rating-${+e.target[0].value},${5}`;
            fetchEstablishments(null, 8, state?.title, sortType, currentType, filterParams, filterByCheck).then(value => {
                setEstablishments([...value.data.establishments])
            });

            setFilterByRating(filterParams);

        } else {
            filterParams = `rating-${+e.target[0].value},${+e.target[1].value}`;
            fetchEstablishments(null, 8, state?.title, sortType, currentType, filterParams, filterByCheck).then(value => {
                setEstablishments([...value.data.establishments])
            });

            setFilterByRating(filterParams);
        }
    }

    const onSubmitFilterCheck = (e) => {
        e.preventDefault();

        let filterParams;

        setCurrentPage(2);

        if (+e.target[0].value === 0 && +e.target[1].value === 0) {
            filterParams = `averageCheck-${0},${maxCheck}`;
            fetchEstablishments(null, 8, state?.title, sortType, currentType, filterByRating, null).then(value => {
                setEstablishments([...value.data.establishments])
            });

            setFilterByCheck(filterParams);
        } else if (+e.target[1].value === 0 && !+e.target[0].value) {
            filterParams = `averageCheck-${+e.target[0].value},${maxCheck}`;
            fetchEstablishments(null, 8, state?.title, sortType, currentType, filterByRating, filterParams).then(value => {
                setEstablishments([...value.data.establishments])
            });

            setFilterByCheck(filterParams);
        } else {
            filterParams = `averageCheck-${+e.target[0].value},${+e.target[1].value}`;
            fetchEstablishments(null, 8, state?.title, sortType, currentType, filterByRating, filterParams).then(value => {
                setEstablishments([...value.data.establishments])
            });

            setFilterByCheck(filterParams);
        }
    }


    return (<div className={'main-page'}>
        {!admin && <div className={'filter-box'}>
            <div className={'filter-item'}>
                <p>Sort by</p>
                <select  onChange={onChangeSort}>
                    <option value={''}>Without sort</option>
                    <option value="average_check-DESC">Sort by average check (descending)</option>
                    <option value="average_check-ASC">Sort by average check (ascending)</option>
                    <option value="avgRating-DESC">Sort by rating (descending)</option>
                    <option value="avgRating-ASC">Sort by rating (ascending)</option>
                    <option value="created_at-DESC">Sort by date of publication (descending)</option>
                    <option value="created_at-ASC">Sort by date of publication (ascending)</option>
                    <option value="title-DESC">Sort by alphabetic (descending)</option>
                    <option value="title-ASC">Sort by alphabetic (ascending)</option>
                </select>
            </div>

            <div className={'filter-item'}>
                <p>Type of establishment</p>
                <select  onChange={onChangeType} name="" id="">
                    <option value={''}>Any type</option>
                    {types.map((value, index) => <option key={index} value={value.title}>{value.title}</option>)}
                </select>
            </div>

            <div className={'filter-item'}>
                <p>Rating</p>
                <form className={'between-form'} onSubmit={onSubmitFilterRating} name={'rating'} action="">
                    <input  type="number"/>
                    <input  type="number"/>
                    <button> filter</button>
                </form>
            </div>

            <div className={'filter-item'}>
                <p>Average check</p>
                <form className={'between-form'} onSubmit={onSubmitFilterCheck} name={'average_check'} action="">
                    <input  type="number"/>
                    <input  type="number"/>
                    <button>filter</button>
                </form>
            </div>
        </div>
        }


        <div className={'establishment-box'}>


            {establishments.length ? establishments?.map((value, index) => {
                if(value.approved){
                  return <Establishment
                        loginRequest={isForbidden}
                        sortFunction={onChangeSort}
                        key={index}
                        item={value}/>
                }
                return null;
                }) :
                <div>No result</div>}
        </div>
    </div>)
}