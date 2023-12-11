import React, { useEffect, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  TextField,
} from "@mui/material";
import {
  
  IProductEdit,
  IProductImageItem,
} from "../../../../store/products/types";
import { useFormik } from "formik";
import {
  TreeSelect,
  TreeSelectChangeEvent,
  TreeSelectSelectionKeysType,
} from "primereact/treeselect";
import CloseIcon from "@mui/icons-material/Close";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import EditorTiny from "../../../../components/common/EditorTiny";
import { APP_ENV } from "../../../../env";
import ImageCropper from "../../../../components/common/ImageCropper";
import styles from "./index.module.css";
import { productEditSchema } from "../../../../store/products/validator";

const EditProduct: React.FC = () => {
  const [isChangedAddress, setIsChangedAddress] = useState<boolean>(false);
  const [clearForm, setClearForm] = useState<boolean>(false);
  const [selectedNodeKey, setSelectedNodeKey] = useState<
    string | TreeSelectSelectionKeysType | TreeSelectSelectionKeysType[]
  >("");

  const [productImages, setProductImages] = useState<Array<IProductImageItem>>(
    []
  );


  const { GetCategoryList, GetProduct, EditProduct } = useActions();

  const { list } = useTypedSelector((store) => store.category);

  const { id } = useParams();

  const navigate = useNavigate();

  const LoadProduct = async (id: number) => {
    try {
      const response: any = await GetProduct(id);

      const { payload } = response;

      setFieldValue("id", payload.id);
      setFieldValue("name", payload.name);
      setFieldValue("description", payload.description);
      setFieldValue("shortDescription", payload.shortDescription);
      setFieldValue("categoryId", payload.categoryId);
      setFieldValue("quantity", payload.quantity);
      setFieldValue("price", payload.price);
      setSelectedNodeKey(String(payload.categoryId));
      setProductImages(payload.images);
    
    } catch (error) {
      console.error("Щось пішло не так, ", error);
      navigate("/admin/404");
    }
  };

  const LoadCategories = async () => {
    try {
      await GetCategoryList();
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  useEffect(() => {
    LoadCategories();
    LoadProduct(Number(id));
  }, []);

  const onSubmitHandler = async (model: IProductEdit) => {
    console.log("model: ", model);
    try {
      await EditProduct(model);
      navigate("/admin/products");
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  //Отримує картинки від кроппера
  const onHandleImages = (images: Array<File>) => {
    setFieldValue("images", [...values.images, ...images]);
  };

  const onHandleCategoryChange = (e: TreeSelectChangeEvent) => {
    if (e.target.value) {
      setSelectedNodeKey(e.target.value);
      setFieldValue("categoryId", e.target.value);
    }
  };

  const onRemoveImageHandler = (fileName: string, isNew: boolean) => {
    if (isNew) {
      setFieldValue(
        "images",
        values.images.filter((x) => x.name !== fileName)
      );
    } else {
      setProductImages((current) => current.filter((x) => x.name !== fileName));
      setFieldValue("removeImages", [...values.removeImages, fileName]);
    }
  };

  //Formik
  const initialValues: IProductEdit = {
    id: 0,
    name: "",
    description: "",
    shortDescription: "",
    categoryId: 0,
    images: [],
    removeImages: [],
    quantity: 0,
    price: 0
  };

  const formik = useFormik<IProductEdit>({
    initialValues: initialValues,
    validationSchema: productEditSchema,
    onSubmit: onSubmitHandler,
  });

  const {
    handleSubmit,
    values,
    handleChange,
    setFieldValue,
    errors,
    touched,
    handleBlur,
  } = formik;

  //Props






  // Show images
  const dataOldFileView = productImages.map((file) => {
    return (
      <div
        key={file.id}
        className={`${styles.product_images} ${styles.image_view}`}
      >
        <div className={styles.hide_section}>
          <CloseIcon
            onClick={() => {
              onRemoveImageHandler(file.name, false);
            }}
            className={styles.close_icon}
          ></CloseIcon>
        </div>
        <img
          className={styles.image}
          src={APP_ENV.REMOTE_HOST_IMAGE_URL + file.name}
          alt="file"
        />
      </div>
    );
  });

  const dataNewFileView = values.images.map((file) => {
    return (
      <div
        key={file.name}
        className={`${styles.product_images} ${styles.image_view}`}
      >
        <div className={styles.hide_section}>
          <CloseIcon
            onClick={() => {
              onRemoveImageHandler(file.name, true);
            }}
            className={styles.close_icon}
          ></CloseIcon>
        </div>
        <img
          className={styles.image}
          src={URL.createObjectURL(file)}
          alt="file"
        />
      </div>
    );
  });

  return (
    <>
      <div className="py-5 px-3">
        <div className="mx-auto text-center">
          <h2>
            <strong>Редагувати продукт</strong>
          </h2>
          <p className="mt-2">Ви на сторінці для редагування продукту</p>
        </div>
        <form
          onSubmit={handleSubmit}
          action="#"
          method="POST"
          className={styles.form}
        >
          <div className={styles.fields_div}>
            {/* Поле "Назва" */}
            <TextField
              onChange={handleChange}
              value={values.name}
              onBlur={handleBlur}
              id="name"
              name="name"
              label="Назва"
              variant="outlined"
              className={styles.field}
              helperText={touched.name && errors.name ? errors.name : ""}
              error={touched.name && errors.name != null}
            />

            {/* Поле "Опис" */}
            <EditorTiny
              value={values.description}
              label="Опис"
              field="description"
              error={errors.description}
              touched={touched.description}
              onBlur={handleBlur}
              onEditorChange={(text: string) => {
                setFieldValue("description", text);
              }}
            />

            {/* Поле "Короткий опис" */}
            <TextField
              onChange={handleChange}
              value={values.shortDescription}
              onBlur={handleBlur}
              id="shortDescription"
              name="shortDescription"
              label="Короткий опис"
              variant="outlined"
              className={styles.field}
              multiline
              helperText={
                touched.shortDescription && errors.shortDescription
                  ? errors.shortDescription
                  : ""
              }
              error={
                touched.shortDescription && errors.shortDescription != null
              }
            />

        {/* Поле "Ціна" */}
        <TextField
              onChange={handleChange}
              value={values.price}
              onBlur={handleBlur}
              type="number"
              inputProps={{ inputMode: 'numeric' }}
              id="price"
              name="price"
              label="Ціна"
              variant="outlined"
              className={styles.field}
              
              helperText={
                touched.price && errors.price
                  ? errors.price
                  : ""
              }
              error={
                touched.price && errors.price != null
              }
            />
     {/* Поле "Кількість" */}
     <TextField
              onChange={handleChange}
              value={values.quantity}
              onBlur={handleBlur}
              type="number"
              inputProps={{ inputMode: 'numeric' }}
              id="quantity"
              name="quantity"
              label="Кількість"
              variant="outlined"
              className={styles.quantity}
              
              helperText={
                touched.quantity && errors.quantity
                  ? errors.quantity
                  : ""
              }
              error={
                touched.quantity && errors.quantity != null
              }
            />

            {/* Поле "Категорія ID" */}
            <TreeSelect
              value={selectedNodeKey}
              options={list}
              onChange={onHandleCategoryChange}
              id="categoryId"
              name="categoryId"
              placeholder="Категорія"
              style={{
                background: "none",
                border: "1px solid rgba(0, 0, 0, 0.23)",
                borderRadius: "4px",
                fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
              }}
              filter
            ></TreeSelect>

            {/* Поле "Фото" */}
            <div>
              <label className="form-label">Фото</label>

              <div className="mt-1">
                <ImageCropper
                  id="upload"
                  handleImagesFunc={onHandleImages}
                  cropeprOptions={{
                    viewMode: 1,
                    autoCropArea: 1,
                    minCropBoxWidth: 140,
                    minCropBoxHeight: 80,
                  }}
                  multiple
                >
                  <Button variant="contained">Завантажити</Button>
                </ImageCropper>
              </div>
              <div className={styles.image_holder}>
                {dataOldFileView}
                {dataNewFileView}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              variant="contained"
              className={styles.submit_button}
            >
              Зберегти
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
