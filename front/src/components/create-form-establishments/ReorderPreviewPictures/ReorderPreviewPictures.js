import './ReorderPreviewPictures.css';
import {Reorder} from "framer-motion";
import deleteBucket from "../../../assets/svg/delete.svg";
import addPhotoImg from "../../../assets/images/add-photo.png";
import {createRef, useEffect, useState} from "react";

export function ReorderPreviewPictures({fileUrl, setFileUrl, setFiles, files}) {
    const deleteRef = createRef();
    const [clicked, setClicked] = useState(false);

    const deleteAvatar = (photo) => {
        setClicked(true);
        const filteredFiles = Array.from(files).filter(value => value.index !== +photo[0].split('=')[1]);

        setFiles(filteredFiles.map((value, index) => {
            return {file: value.file, index}
        }));
    }

    useEffect(() => {
        setFileUrl(Array.from(files).map((value, index) => URL.createObjectURL(value.file) + `#index=${index}`));
        setClicked(false);
    }, [clicked]);

    const uploadFile = () => {
        document.getElementById('input-file').click()
    }

    return (
        (() => {
            let photos = [];
            for (let i = 0; i < 6; i++) {
                if (fileUrl[i]) {
                    photos.push(
                        <Reorder.Item as={"div"}
                                      className={'div-photos'} value={fileUrl[i]} style={{
                            background: `url(${fileUrl[i].replace(/\\/g, '/')}) no-repeat`,
                            backgroundSize: 'cover',
                            backgroundPosition: "center",
                        }} key={fileUrl[i]} a-key={i} whileDrag={{cursor: "move"}}>

                            <div ref={deleteRef} onClick={(e) => deleteAvatar([fileUrl[i]])}
                                 className={`delete delete${i}`} id={`delete${i}`}>
                                <img className={`delete-bucket`} src={deleteBucket} alt=""/>
                            </div>

                            <div className={`main-photo main-photo${i}`}><h6>Головна</h6></div>
                        </Reorder.Item>
                    );
                } else {
                    photos.push(<div className={`add-photo`} onClick={() => uploadFile()} style={{
                        background: `url(${addPhotoImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: "center"
                    }}/>)
                }
            }
            return photos;
        })()
    )
}