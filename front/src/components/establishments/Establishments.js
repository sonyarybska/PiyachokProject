import './Establishments.css';

import {Establishment} from "./establishment/Establishment";
import {useEffect, useState} from "react";
import {fetchEstablishments, getTypeEstablishments} from "../../services/establishment.service";


export function Establishments() {
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

    useEffect(() => {
        if (fetching) {
            fetchEstablishments(currenPage, null, null, sortType, currentType, filterByRating, filterByCheck).then(value => {
                setEstablishments([...establishments, ...value.data.establishments]);
                setTotalCount(value?.data?.count);
                setMaxCheck(value.data.maxCheck);
            })
                .finally(() => setFetching(false));
            setCurrentPage(prevState => +prevState + 1);
        }

    }, [fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [totalCount]);

    const scrollHandler = (e) => {
        if (e?.target?.documentElement?.scrollHeight - (e?.target?.documentElement?.scrollTop + window?.innerHeight) < 100 && establishments?.length < totalCount) {
            setFetching(true);
        }
    }

    useEffect(() => {
        getTypeEstablishments().then(value => setTypes([...value.data]));
    }, []);


    const onChangeType = (e) => {
        if (e.target.value.length) {
            setCurrentType(e.target.value);
            setCurrentPage(prevState => +prevState + 1);
            fetchEstablishments(null, 15, null, sortType, e.target.value, filterByRating).then(value => setEstablishments([...value.data.establishments]));

        } else {
            setCurrentType(null);
            setCurrentPage(2);
            fetchEstablishments(null, null, null, sortType, null, filterByRating).then(value => setEstablishments([...value.data.establishments]));
        }
    }

    const onChangeSort = (e) => {
        if (e.target.value.length) {
            fetchEstablishments(null, 15, null, e.target.value, currentType, filterByRating).then(value => setEstablishments([...value?.data?.establishments]));
            setSortType(e.target.value);
            setCurrentPage(prevState => +prevState + 1);

        } else {
            fetchEstablishments(null, null, null, null, currentType, filterByRating).then(value => setEstablishments([...value?.data?.establishments]));
            setSortType(null);
            setCurrentPage(2);
        }
    }

    const onSubmitFilterRating = (e) => {
        e.preventDefault();
        let filterParams;

        if (+e.target[0].value === 0 && +e.target[1].value === 0) {
            fetchEstablishments(1, null, null, sortType, currentType, null, filterByCheck).then(value => {
                setEstablishments([...value.data.establishments])
            });

            setFilterByRating(null);
            setCurrentPage(2);
        } else if (+e.target[1].value === 0 && !+e.target[0].value) {
            filterParams = `rating-${+e.target[0].value},${5}`;
            fetchEstablishments(1, null, null, sortType, currentType, filterParams, filterByCheck).then(value => {
                setEstablishments([...value.data.establishments])
            });

            setFilterByRating(filterParams);
            setCurrentPage(prevState => +prevState + 1);
        } else {
            filterParams = `rating-${+e.target[0].value},${+e.target[1].value}`;
            fetchEstablishments(1, null, null, sortType, currentType, filterParams, filterByCheck).then(value => {
                setEstablishments([...value.data.establishments])
            });

            setFilterByRating(filterParams);
            setCurrentPage(prevState => +prevState + 1);
        }
    }

    const onSubmitFilterCheck = (e) => {
        e.preventDefault();

        let filterParams;

        if (+e.target[0].value === 0 && +e.target[1].value === 0) {
            filterParams = `averageCheck-${0},${maxCheck}`;
            fetchEstablishments(1, null, null, sortType, currentType, filterByRating, null).then(value => {
                setEstablishments([...value.data.establishments])
            });

            setFilterByCheck(filterParams);
            setCurrentPage(2);
        } else if (+e.target[1].value === 0 && !+e.target[0].value) {
            filterParams = `averageCheck-${+e.target[0].value},${maxCheck}`;
            fetchEstablishments(1, null, null, sortType, currentType, filterByRating, filterParams).then(value => {
                setEstablishments([...value.data.establishments])
            });

            setFilterByCheck(filterParams);
            setCurrentPage(prevState => +prevState + 1);
        } else {
            filterParams = `averageCheck-${+e.target[0].value},${+e.target[1].value}`;
            fetchEstablishments(1, null, null, sortType, currentType, filterByRating, filterParams).then(value => {
                setEstablishments([...value.data.establishments])
            });

            setFilterByCheck(filterParams);
            setCurrentPage(prevState => +prevState + 1);
        }
    }

    return (<div>
        <div className={'filter-box'}>
            <div className={'filter-item'}>
                <p>Sort by</p>
                <select onChange={onChangeSort}>
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
                <select onChange={onChangeType} name="" id="">
                    <option value={''}>Any type</option>
                    {types.map((value, index) => <option key={index} value={value.title}>{value.title}</option>)}
                </select>
            </div>

            <div className={'filter-item'}>
                <p>Rating</p>
                <form className={'between-form'} onSubmit={onSubmitFilterRating} name={'rating'} action="">
                    <input type="number"/>
                    <input type="number"/>
                    <button> filter</button>
                </form>
            </div>

            <div className={'filter-item'}>
                <p>Average check</p>
                <form className={'between-form'} onSubmit={onSubmitFilterCheck} name={'average_check'} action="">
                    <input type="number"/>
                    <input type="number"/>
                    <button>filter</button>
                </form>
            </div>
        </div>

        <div className={'establishment-box'}>
            {establishments.length ? establishments?.map((value, index) => <Establishment
                sortFunction={onChangeSort} key={index}
                item={value}/>) : <div>No result</div>}
        </div>

    </div>)
}