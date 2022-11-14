import React, { useState, useEffect} from 'react';
import "./profile.css"
import Swal from 'sweetalert2'

function savePic(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })
};  

export default function App() {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    savePic();
    setImages([...e.target.files]);
  }

  console.log("Images : ", images);
  console.log("imageURLs : ", imageURLs);

  return (
    <div className="profile">
      <div className='bc_img'>{imageURLs.map((imageSrc, idx) => (
        <img key={idx} width="500" height="400" src={imageSrc} className="profile_img" />
      ))}</div>
    <input type="file" multiple accept="image/*" onChange={onImageChange} className="choose"/>
    </div>
  );
};