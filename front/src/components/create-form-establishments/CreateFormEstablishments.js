import {usePlacesWidget} from "react-google-autocomplete";
import {createRef, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import './CreateFormEsrablishments.css';

import {getTypeEstablishments, postEstablishments, putEstablishments} from "../../services/establishment.service";
import {ReorderPreviewPictures} from "./ReorderPreviewPictures/ReorderPreviewPictures";
import {decode} from "../../services/auth.service";
import {Reorder} from "framer-motion";

export function CreateFormEstablishments() {
    const {state, pathname} = useLocation();
    const currentPath = pathname?.split('/').pop();

    const inputFileRef = createRef();
    const {user_id} = decode();

    const [data, setData] = useState({
        title: '',
        type: '',
        tags: '',
        start_work: '',
        end_work: '',
        phone: '',
        average_check: ''
    });

    const [location, setLocation] = useState('');
    const [files, setFiles] = useState([]);
    const [fileUrl, setFileUrl] = useState([]);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        (async () => {
            if (currentPath === 'update') {
                setData({
                    title: state.title,
                    type: state.type,
                    tags: state.tags,
                    start_work: state.start_work,
                    end_work: state.end_work,
                    phone: state.phone,
                    average_check: state.average_check
                });
                setLocation(state?.location);

                const urlArray = [];

                const prevFiles = Promise.all(state?.photos.map(async (file, index) => {
                    const response = await fetch(`http://localhost:4000/${file}`);

                    const photoName = response?.url?.split('/').pop();

                    const contentType = response.headers.get('content-type');
                    const blob = await response.blob();
                    return {file: new File([blob], photoName, {type: contentType}), index};
                }));

                Array.from(await prevFiles).forEach((value, index) => urlArray.push(URL.createObjectURL(value.file) + `#index=${index}`));

                setFiles(await prevFiles);

                setFileUrl([...urlArray]);

            } else {
                setData({title: '', type: '', tags: '', start_work: '', end_work: '', phone: '', average_check: ''});
                setLocation('');
                setFiles([]);
                setFileUrl([]);
            }
        })();
    }, [currentPath]);



    useEffect(() => {
        const orderIndex = fileUrl.map(value => value?.split('=').pop());

        const reorderedArray = files.sort((a, b) => orderIndex.indexOf(a.index.toString()) - orderIndex.indexOf(b.index.toString()));
        setFiles([...reorderedArray]);

    },[fileUrl]);

    const handleChange = (event) => {
        const fileList = event.target.files;

        const urlArray = [];

        Array.from(fileList).forEach((value, index) => urlArray.push(URL.createObjectURL(value) + `#index=${fileUrl.length + index}`));

        setFileUrl([...fileUrl, ...urlArray]);

        const filesWithId = Array.from(fileList).map((file, index) => {
            return {file, index: fileUrl.length + index};
        })

        setFiles([...files, ...filesWithId]);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Array.from(files).forEach(photo => formData.append('photos[]', photo.file));
        formData.append("data", JSON.stringify(data));
        formData.append("user_id", user_id);
        formData.append("location", location);

        currentPath === 'update' ? await putEstablishments(formData, state.establishment_id) : await postEstablishments(formData);
    }

    const onChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    const {ref} = usePlacesWidget({
        apiKey: 'AIzaSyD5gZah6W1Tr3U5x7KE8P6Zh2I9WElHwak', onPlaceSelected: () => {
            if (ref?.current?.value) {
                setLocation(ref?.current?.value);
            }
        }, language: 'en', options: {
            componentRestrictions: {country: "ua"},
            fields: ["address_component", "geometry"],
            types: ["street_number", 'route', "locality", "political"]
        },
    });

    useEffect(() => {
        getTypeEstablishments().then(data => setTypes([...data.data]));
    }, []);

    return (<div>
        <form className={'create-establishment_form'} onSubmit={onSubmit} encType="multipart/form-data">
            <div className={'detail-section'}>
                <h3>Describe in detail</h3>
                <label color="charcoal" htmlFor="title" className="css-ha5hu8">Enter the name of the
                    establishment*</label>
                <input type="text" value={data.title} name={'title'} placeholder={'Enter the title'}
                       onChange={onChange}/>
                <label color="charcoal" htmlFor="type" className="css-ha5hu8">Enter the type of the
                    establishment*</label>
                <select onChange={onChange} name="type">
                    {currentPath === 'update' ? <option value={data?.type}>{data?.type}</option> :
                        <option value="none" hidden></option>}
                    {types.map((value => <option key={value.type_id} value={value.title}>{value.title}</option>))}
                </select>

                <label color="charcoal" htmlFor="tags" className="css-ha5hu8">Enter the tags of the
                    establishment*</label>
                <input type="text" value={data.tags} name={'tags'} placeholder={'Enter the tags'}
                       onChange={onChange}/>
                <label color="charcoal" htmlFor="type" className="css-ha5hu8">Enter the establishment's opening
                    hours*</label>
                <input type="time" value={data.start_work} name={'start_work'}
                       placeholder={'start work'}
                       onChange={onChange}/>
                <input ref={inputFileRef} hidden type="file" id={'input-file'} placeholder={'photo'} accept="image/*"
                       onChange={handleChange}
                       onClick={(event) => event.target.value = ''}
                       multiple
                />
                <input type="time" value={data.end_work} name={'end_work'}
                       placeholder={'end work'}
                       onChange={onChange}/>
                <input value={data.average_check} name={'average_check'} placeholder={'average check'}
                       onChange={onChange} type="number"/>
            </div>

            {<div className={'photo-section'}>
                <h3>Photo</h3>

                <h6>The first photo will be on the cover of the ad. Drag to reorder</h6>
                <Reorder.Group className={'photos-wrap'} as={"div"} axis={'x'} values={fileUrl}
                               style={{overflow: "hidden"}}
                               onReorder={setFileUrl}>

                    <ReorderPreviewPictures setFiles={setFiles} files={files} fileUrl={fileUrl} isUpdate={currentPath}
                                            user_id={user_id}
                                            setFileUrl={setFileUrl}/>
                </Reorder.Group>
            </div>}

            <div className={'contact-section'}>
                <h3>Contact information</h3>
                <input onChange={(e) => setLocation(e.target.value)} value={location} ref={ref} type="text"
                       name={'location'} placeholder={'location'}/>

                <input value={data.phone} name={'phone'} placeholder={'phone'} onChange={onChange} type="text"/>
            </div>

            <div className={'submit-section'}>
                {currentPath === 'update' ? <button>Edit</button> : <button>Post</button>}
            </div>
        </form>
    </div>)
}