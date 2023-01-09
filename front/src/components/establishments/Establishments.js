import './Establishments.css';
import {useDispatch, useSelector} from "react-redux";

import {Establishment} from "./establishment/Establishment";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {fetchEstablishments} from "../../services/establishment.service";

export function Establishments() {
    let {establishments} = useSelector(state => state.establishmentReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEstablishments());
    }, []);

    const [searchParams] = useSearchParams();

    const search_value = searchParams.get('search_value');

    const filtered = establishments?.filter(item =>
        item?.title?.toLowerCase().includes(search_value?.toLowerCase())
    );

    return (
        <div className={'establishment-box'}>
            {search_value ?
                filtered?.length > 0 ?
                    filtered?.map(value => <Establishment key={value.establishment_id} item={value}/>)
                    :
                    'There are no results for your request'
                :
                establishments?.map(value => <Establishment key={value.establishment_id} item={value}/>)}

        </div>
    )
}