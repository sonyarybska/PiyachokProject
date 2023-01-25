import {useEffect, useState} from "react";
import './AdminAplications.css';
import {AdminApplication} from "./admin-aplication/AdminAplication";
import {fetchEstablishments, patchEstablishments} from "../../services/establishment.service";

export function AdminApplications() {
    const [establishments, setEstablishments] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [currenPage, setCurrentPage] = useState(1);


    useEffect(() => {
        if (fetching) {
            fetchEstablishments(currenPage, null, null, null, null, null, null).then(value => {
                setEstablishments([...establishments, ...value.data.establishments]);

                setTotalCount(value.data.count);
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

    const updateState = (state, id) => {
        if(state==='approve'){
            patchEstablishments({
                approved: true, pending: false, rejected: false
            }, id).finally(()=>setEstablishments(establishments.filter(value=>value.establishment_id!==id)));
        }else if(state==='reject'){
            patchEstablishments({
                rejected: true, approved: false, pending: false
            }, id).finally(()=>setEstablishments(establishments.filter(value=>value.establishment_id!==id)));
        }
    }

    return (
        <div className={'aplications-box'}>
            {establishments.length ?
                establishments.map(value => {
                    if(value.pending){
                        return  <AdminApplication item={value} updateState={updateState}/>
                    }
                   return ''
                })
                : 'There no aplications'
            }
        </div>
    )
}