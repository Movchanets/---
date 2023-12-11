import { LegacyRef, useEffect, useRef, useState } from "react";
import Cropper from "cropperjs";
import { Button, Modal } from "react-bootstrap";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import classNames from "classnames";
import "cropperjs/dist/cropper.css";
import styles from "./index.module.css";

interface ICropperImage {
  url: string;
  isSaved: boolean;
}

interface ICroppedModal {
  id: string;
  //Callback функція для передачі обрізаних картинок
  handleImagesFunc: (images: Array<File>) => void;
  //Налаштування кроппера
  cropeprOptions: Cropper.Options<HTMLImageElement>;
  multiple?: boolean;
  children?: React.ReactElement;
}

const ImageCropper: React.FC<ICroppedModal> = ({
  id,
  handleImagesFunc,
  cropeprOptions,
  multiple = false,
  children,
}) => {
  const imgRef = useRef<HTMLImageElement>(); //посилання на тег img в модалці

  const inputRef = useRef<HTMLInputElement | null>(null); //посилання на input

  const [modalShow, setModalShow] = useState<boolean>(false);

  const [savedCount, setSavedCount] = useState<number>(0);

  const [showedImage, setShowedImage] = useState<string>("");

  const [selectedImages, setSelectedImages] = useState<Array<ICropperImage>>([]);

  const [croppedImages, setCroppedImages] = useState<Array<File>>([]);

  const [cropperObj, setCropperObj] = useState<Cropper>();

  useEffect(() => {
    if (imgRef.current) {
      const cropper = new Cropper(imgRef.current as HTMLImageElement, cropeprOptions);
      setCropperObj(cropper);
    }
  }, [modalShow]);

  const handleSelectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    var isFirstImage = true;
    for (var i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type;
      const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];

      if (validImageTypes.includes(fileType)) {
        const url = URL.createObjectURL(file);

        setModalShow(true);
        setSelectedImages((current) => [...current, { url: url, isSaved: false }]);

        //Щоб перша картинка не змінювалася після кожної ітерації
        if (isFirstImage) {
          setShowedImage(url);
          cropperObj?.replace(url);
          isFirstImage = false;
        }
      } else {
        console.error("Файл " + file.name + ", не є картинкою");
      }
    }

    e.target.value = "";
  };

  const onClickDoneHandle = () => {
    cropperObj?.getCroppedCanvas().toBlob((data) => {
      //Передаються всі збережені картинки та остання яка залишилася
      if (data) handleImagesFunc([...croppedImages, blobToFile(data)]);
    });

    closeModal();
  };

  //Збереження обрізаної картинки
  const onClickSaveHandle = () => {
    cropperObj?.getCroppedCanvas().toBlob((data) => {
      if (data) setCroppedImages((current) => [...current, blobToFile(data)]);
    });

    const selectedId = selectedImages.findIndex((el) => el.url === showedImage);
    if (selectedId === -1) return;
    setSavedCount((current) => (current += 1));

    setSelectedImages((current) => {
      current[selectedId] = { ...current[selectedId], isSaved: true };
      return current;
    });

    const newSelectedId = selectedImages.findIndex(
      (el) => el.url !== showedImage && !el.isSaved
    );
    if (newSelectedId === -1) return;

    changeSelectedImage(newSelectedId);
  };

  //Видалення поточної картинки
  const onRemoveModalHandle = () => {
    const newSelectedId = selectedImages.findIndex(
      (el) => el.url !== showedImage && !el.isSaved
    );
    if (newSelectedId === -1) return;

    setSelectedImages((current) => current.filter((el) => el.url !== showedImage));

    changeSelectedImage(newSelectedId);
  };

  //Передаються картинки без поточної
  const onRemoveAndDoneModalHandle = () => {
    handleImagesFunc(croppedImages);
    closeModal();
  };

  const onClickChangeSelectedImage = (id: number) => {
    changeSelectedImage(id);
  };

  const onCloseModalHandle = () => {
    closeModal();
  };

  //Поворот картинки
  const onClickHandleRotate = (degree: number) => cropperObj?.rotate(degree);

  //Зміна поточної картинки
  const changeSelectedImage = (id: number) => {
    const selected = selectedImages[id];
    if (selected.url === showedImage || selected.isSaved) return;

    setShowedImage(selected.url);
    cropperObj?.replace(selected.url);
  };

  //Перетворює blob в файл та дає рандомну назву
  const blobToFile = (blob: Blob): File => {
    const file = new File([blob], Math.random().toString(36).slice(2, 9));
    return file;
  };

  //Закриває кроппер та очищає все
  const closeModal = () => {
    setModalShow(false);
    setSavedCount(0);
    setCroppedImages([]);
    setSelectedImages([]);
    setShowedImage("");
    cropperObj?.destroy();
  };

  const dataSelectedFileView = selectedImages.map((file, key) => {
    return (
      <div key={key} className={styles.image_div}>
        <img
          onClick={() => onClickChangeSelectedImage(key)}
          className={classNames(styles.image, {
            [styles.image_saved]: file.isSaved,
          })}
          src={file.url}
          alt="file"
        />
      </div>
    );
  });

  return (
    <>
      <div style={{ display: "contents" }} onClick={() => inputRef.current?.click()}>
        {children}
      </div>

      <input
        id={id}
        type="file"
        onChange={handleSelectImage}
        className="d-none"
        accept=".jpg, .jpeg, .png"
        multiple={multiple}
        ref={inputRef}
      />

      {/* Модалка кроппера  */}
      <Modal show={modalShow} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Crop the Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: "520px" }}>
            <img
              alt="Picked image"
              src={showedImage}
              ref={imgRef as LegacyRef<HTMLImageElement>}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {selectedImages.length > 1 && (
            <div className="container">
              <div className={styles.image_holder}>{dataSelectedFileView}</div>
            </div>
          )}

          {selectedImages.length > 1 && (
            <>
              {savedCount === selectedImages.length - 1 ? (
                <Button
                  variant="danger"
                  className="my-2"
                  onClick={onRemoveAndDoneModalHandle}
                >
                  Remove and Done
                </Button>
              ) : (
                <Button variant="danger" className="my-2" onClick={onRemoveModalHandle}>
                  Remove
                </Button>
              )}
            </>
          )}

          <div className="btn-group">
            <Button title="Rotate Left" onClick={() => onClickHandleRotate(-90)}>
              <RotateLeftIcon />
            </Button>

            <Button title="Rotate Right" onClick={() => onClickHandleRotate(-90)}>
              <RotateRightIcon />
            </Button>
          </div>

          <Button variant="secondary" className="my-2" onClick={onCloseModalHandle}>
            Cancel
          </Button>

          {savedCount === selectedImages.length - 1 ? (
            <Button onClick={onClickDoneHandle}>Done</Button>
          ) : (
            <Button variant="success" onClick={onClickSaveHandle}>
              Next
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImageCropper;
