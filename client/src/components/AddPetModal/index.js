import React, { useState, useEffect, useCallback, useRef } from "react";
import "./style.css";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./style.css";
import {
  Modal,
  Button,
  TextInput,
  Select,
  Textarea,
  Checkbox,
} from "react-materialize";
import { useHistory } from "react-router-dom";
import API from "../../utils/API";
import store from "../../utils/store";
import { addCurrentUser, addFile, addFileName } from "../../utils/actions";
import "materialize-css";

function AddPetModal() {
  const history = useHistory();
  const pageLoaded = useRef(false)
  const { currentUser } = store.getState();
  const [pet, setPet] = useState({
    name: "",
    image: "",
    age: "",
    size: "",
    gender: "",
    bio: "",
    breed: "",
    isVaccinated: false,
    userId: currentUser._id,
  });

  const pixelRatio = 4;
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: "50",
    aspect: 1 / 1,
    x: 25,
    y: 25,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  async function generateNewImage(previewCanvas, crop) {
    if (!crop || !previewCanvas) {
      return;
    }
    const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);
    const newImg = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 1)
    );
    return newImg;
  }

  function getResizedCanvas(canvas, newWidth, newHeight) {
    const tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = newWidth;
    tmpCanvas.height = newHeight;

    const ctx = tmpCanvas.getContext("2d");
    ctx.drawImage(
      canvas,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      newWidth,
      newHeight
    );

    return tmpCanvas;
  }

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  useEffect(() => {
    if(pageLoaded.current) {
      API.createPet(currentUser._id, pet)
    .then((petRes) => {
      store.dispatch(addCurrentUser(petRes.data));
      history.push("/match");
    })
    .catch(err => console.log(err));
    } else {
      pageLoaded.current = true;
    }
  }, [pet.image]);

  const handleImageSelection = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const addPet = async (e) => {
    e.preventDefault();
    const petImg = await generateNewImage(
      previewCanvasRef.current,
      completedCrop
    );
    const fd = new FormData();
    fd.append("file", petImg);
    const uploadRes = await API.uploadPetImage(currentUser._id, fd);
    console.log("Upload Response:", uploadRes);
    setPet({ ...pet, image: uploadRes.data.link });
  };

  return (
    <>
      <Modal
      className="add-pet-modal"
        actions={[
          <Button flat modal="close" node="butoon" >
            Another Time
          </Button>,
          <Button className="add-pet-btn" modal="close" node="button"  disabled={crop.width == 0 || crop.height == 0 || !pet.name || !pet.age || !pet.gender || !pet.size || !pet.breed} onClick={addPet}>
            Add Pet
          </Button>,
        ]}
        bottomSheet={false}
        fixedFooter={false}
        header="Add Pet"
        id="modal1"
        open={false}
        options={{
          dismissible: true,
          endingTop: "10%",
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          opacity: 0.5,
          outDuration: 250,
          preventScrolling: true,
          startingTop: "4%",
        }}
        trigger={<Button className="addbtn" node="button">Add Pet </Button>}
      >
        <TextInput
          className="upload-btn"
          id="TextInput-4"
          label="Pet Name"
          onChange={(e) => setPet({ ...pet, name: e.target.value })}
        />
        <TextInput

          id="TextInput-4"
          label="Select Image"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageSelection}
        />

        <ReactCrop
          src={upImg}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        />
        <div className={!upImg ? "hide" : "crop-preview"}>
          <canvas
            ref={previewCanvasRef}
            style={{ width: "200px", height: "200px" }}
          />
        </div>
        <TextInput
          id="TextInput-4"
          label="Breed"
          onChange={(e) => setPet({ ...pet, breed: e.target.value })}
        />
        <Select
          id="Select-9"
          multiple={false}
          onChange={(e) => setPet({ ...pet, age: e.target.value })}
          options={{
            classes: "",
            dropdownOptions: {
              alignment: "left",
              autoTrigger: true,
              closeOnClick: true,
              constrainWidth: true,
              coverTrigger: true,
              hover: false,
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 250,
            },
          }}
          value=""
        >
          <option disabled value="">
            Age
          </option>
          <option value="Puppy">Puppy</option>
          <option value="Junior">Junior</option>
          <option value="Adult">Adult</option>
          <option value="Mature">Mature</option>
          <option value="Senior">Senior</option>
        </Select>
        <Select
          id="Select-9"
          multiple={false}
          onChange={(e) => setPet({ ...pet, size: e.target.value })}
          options={{
            classes: "",
            dropdownOptions: {
              alignment: "left",
              autoTrigger: true,
              closeOnClick: true,
              constrainWidth: true,
              coverTrigger: true,
              hover: false,
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 250,
            },
          }}
          value=""
        >
          <option disabled value="">
            Pet Size Choose your option
          </option>
          <option value="Toy">Toy (under 12 lbs)</option>
          <option value="Small">Small (12-25 lbs)</option>
          <option value="Medium">Medium (25-50 lbs)</option>
          <option value="Large">Large (50-100 lbs)</option>
          <option value="Extra Large">Extra Large(100+ lbs)</option>
        </Select>
        <Select
          id="Select-9"
          multiple={false}
          onChange={(e) => setPet({ ...pet, gender: e.target.value })}
          options={{
            classes: "",
            dropdownOptions: {
              alignment: "left",
              autoTrigger: true,
              closeOnClick: true,
              constrainWidth: true,
              coverTrigger: true,
              hover: false,
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 250,
            },
          }}
          value=""
        >
          <option disabled value="">
            Gender
          </option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </Select>
        <Checkbox
          id="Checkbox_3"
          label="Check if your pet is Vaccinated"
          value="yes"
          onChange={(e) => setPet({ ...pet, isVaccinated: e.target.checked })}
        />
        <Textarea
          data-length={500}
          id="Textarea-12"
          label="Bio"
          onChange={(e) => setPet({ ...pet, bio: e.target.value })}
        />
      </Modal>
    </>
  );
}

export default AddPetModal;
