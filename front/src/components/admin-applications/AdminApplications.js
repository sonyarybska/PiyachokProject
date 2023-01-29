import {useEffect, useState} from "react";
import './AdminAplications.css';

import {fetchEstablishments, patchEstablishments} from "../../services/establishment.service";
import {AdminApplication} from "./admin-aplication/AdminAplication";

export function AdminApplications() {
    const [establishments, setEstablishments] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [fetchingDelete, setFetchingDelete] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [currenPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (fetching) {
            fetchEstablishments(currenPage, 5, null, null, null, null, null, true).then(value => {
                setEstablishments([...establishments, ...value.data.establishments]);

                setTotalCount(value.data.count);
            })
                .finally(() => setFetching(false));
            setCurrentPage(prevState => +prevState + 1);
        } else if (fetchingDelete) {
            fetchEstablishments(1, 5, null, null, null, null, null, true).then(value => {
                setEstablishments([...value.data.establishments]);

                setTotalCount(value.data.count);
            })
                .finally(() => setFetchingDelete(false));
            setCurrentPage(2);
        }
    }, [fetching, fetchingDelete]);


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

    const updateState = (state, id) => {
        if (state === 'approve') {
            patchEstablishments({
                approved: true, pending: false, rejected: false
            }, id).finally(() => setFetchingDelete(true));
        } else if (state === 'reject') {
            patchEstablishments({
                rejected: true, approved: false, pending: false
            }, id).finally(() => setFetchingDelete(true));
        }
    }

    return (
        <div className={'aplications-box'}>
            {establishments.length ?
                establishments.map((value, index) => <AdminApplication key={index} item={value}
                                                                       updateState={updateState}/>) : 'No results'
            }
        </div>
    )
}