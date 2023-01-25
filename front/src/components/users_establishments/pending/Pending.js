import {useEffect, useState} from "react";
import "../GeneralStyleState.css";
import {decode} from "../../../services/auth.service";
import {useNavigate} from "react-router-dom";
import {deleteEstablishment, getEstablishmentsByUserId} from "../../../services/establishment.service";

export function Pending() {
    const [establishments, setEstablishments] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [fetching, setFetching] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const {user_id} = decode();
    const navigate = useNavigate();

    const redirectToEdit = (index) => {
        navigate('/my-establishments/update', {state: establishments[index]});
    }

    useEffect(() => {
        if (fetching) {
            getEstablishmentsByUserId(user_id, currentPage, 5, null, null, true)
                .then(value => {
                    setEstablishments([...establishments, ...value.data.establishments]);
                    setTotalCount(value.data.count)
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

    const deleteOneEstablishment = (id) => {
        deleteEstablishment(id).finally(() =>
            setEstablishments(establishments.filter(value => value.establishment_id !== id)))
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