import {useEffect, useState} from "react";
import {fetchNewsTypes} from "../../services/news.service";

export function News() {
    const [news, setNews] = useState({text: '', type: '', photo: ''});
    const [types, setTypes] = useState([]);

    const onSubmitNews = (e) => {
        e.preventDefault();
        console.log(news);
    }

    const onChangeFile = (e) => {
        setNews({...news,photo:e.target.files});
    }

    const onChange = (e) => {
        setNews({...news,[e.target.name]:e.target.value});
    }

    useEffect(()=>{
        fetchNewsTypes().then(value => setTypes([...value.data]))
    },[]);

    return (
        <div>
            <div>
                <p>Add news</p>
                <form onSubmit={onSubmitNews} action="">
                    <input name={'text'} value={news.text} onChange={onChange} type="text"/>
                    <select name={'type'} value={news.type} onChange={onChange}>
                        {
                            types.map(value => <option value={value.type}>{value.type}</option>)
                        }
                    </select>
                    <input onChange={onChangeFile} type="file"/>
                    <button>Add</button>
                </form>
            </div>
        </div>
    )
}