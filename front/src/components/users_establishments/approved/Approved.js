import {useEffect, useState} from "react";
import {decode} from "../../../services/auth.service";
import {deleteEstablishment, getEstablishmentsByUserId} from "../../../services/establishment.service";
import {useNavigate} from "react-router-dom";
import '../GeneralStyleState.css';

export function Approved() {
    const [establishments, setEstablishments] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [fetching, setFetching] = useState(true);
    const [fetchingDelete, setFetchingDelete] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const {user_id} = decode();
    const navigate = useNavigate();

    const redirectToEdit = (index) => {
        navigate('/my-establishments/update', {state: establishments[index]});
    }

    useEffect(() => {
        if (fetching) {
            getEstablishmentsByUserId(user_id, currentPage, 8, true)
                .then(value => {
                    setEstablishments([...establishments, ...value.data.establishments]);
                    setTotalCount(value.data.count)
                })
                .finally(() => setFetching('false'))
            setCurrentPage(prevState => +prevState + 1);
        }
    }, [fetching]);

    useEffect(() => {
        if (fetchingDelete) {
            getEstablishmentsByUserId(user_id, null, 8, true)
                .then(value => {
                    setEstablishments([...value.data.establishments]);
                    setTotalCount(value.data.count)
                }).finally(() => setFetchingDelete('false'));
        }
    }, [fetchingDelete])
    console.log(fetchingDelete);
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

    const deleteOneEstablishment = (id) => {
        deleteEstablishment(id).finally(() => setFetchingDelete(true));
    }

    return (
        <div>
            {
                establishments.map((value, index) => {
                    return <div className={'div-est'}>
                        <div
                            onClick={() => navigate(`/adv/${value.title}`, {state: {establishment_id: value.establishment_id}})}
                            className={'img'} style={{
                            background: `url(${'http://localhost:4000/' + value?.avatar?.replace(/\\/g, '/')}) center center / cover no-repeat`
                        }}></div>
                        <div>
                            <h4>{value.title}</h4>
                            <p>{value.type}</p>
                            <p>{value.location}</p>
                            <p>{value.start_work}-{value.end_work}</p>
                        </div>
                        <button onClick={() => deleteOneEstablishment(value.establishment_id)}>Delete</button>
                        <button onClick={() => redirectToEdit(index)}>Edit</button>
                    </div>
                })
            }
        </div>
    )
}