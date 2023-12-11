import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import {
  TreeSelect,
  TreeSelectChangeEvent,
  TreeSelectSelectionKeysType,
} from "primereact/treeselect";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import ImageCropper from "../../../../components/common/ImageCropper";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import {
  ICategoryCreateItem,
  ICategoryList,
} from "../../../../store/category/types";
import { categoryCreateSchema } from "../../../../store/category/validator";
import styles from "./index.module.css";

const CreateCategoryAdminPage = () => {
  const [selectedNodeKey, setSelectedNodeKey] = useState<
    string | TreeSelectSelectionKeysType | TreeSelectSelectionKeysType[]
  >("-1");

  const { CreateCategory, GetCategoryList } = useActions();
  const { list } = useTypedSelector((store) => store.category);

  const navigate = useNavigate();

  const defaultElementCategory: ICategoryList = {
    key: -1,
    label: "Parent element",
    data: {
      id: 0,
      image: "",
      name: "Parent element",
      parentId: null,
      productCount: 0,
      isRecommend: false,
    },
    children: [],
  };
  const LoadCategories = async () => {
    try {
      await GetCategoryList();
    } catch (error: any) {
      console.error("Щось пішло не так, ", error);
    }
  };

  useEffect(() => {
    LoadCategories();
  }, []);

  const onSubmitHandler = async (model: ICategoryCreateItem) => {
    console.log("model: ", model);
    try {
      await CreateCategory(model);
      navigate("/admin/category");
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  //Отримує картинки від кроппера
  const onHandleImages = (images: Array<File>) => {
    const reader = new FileReader();
    reader.readAsDataURL(images[0]); //проводимо читання дагого файлу, для отримання base64
    reader.onload = function () {
      //якщо читання успішні
      setFieldValue("image", reader.result as string); //передаємо результат (base64)
    };
  };

  const onHandleCategoryChange = (e: TreeSelectChangeEvent) => {
    if (e.target.value) {
      setSelectedNodeKey(e.target.value);
      setFieldValue("parentID", e.target.value);
    }
  };

  const onRemoveImageHandler = () => {
    setFieldValue("image", "");
  };

  //Formik
  const initialValues: ICategoryCreateItem = {
    name: "",
    parentID: 0,
    // isRecommended: false,
    image: "",
  };

  const formik = useFormik<ICategoryCreateItem>({
    initialValues: initialValues,
    validationSchema: categoryCreateSchema,
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

  return (
    <>
      <div className="py-5 px-3">
        <div className="mx-auto text-center">
          <h2>
            <strong>Створити категорію</strong>
          </h2>
          <p className="mt-2">Ви на сторінці для створення категорії</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fields_div}>
            {/* Поле "Назва" */}
            <TextField
              onChange={handleChange}
              value={values.name}
              onBlur={handleBlur}
              id="name"
              name="name"
              className={styles.field}
              label="Назва"
              variant="outlined"
              helperText={touched.name && errors.name ? errors.name : ""}
              error={touched.name && errors.name ? true : false}
            />

            {/* Поле "Батьківської категорії ID" */}
            <TreeSelect
              value={selectedNodeKey}
              options={[defaultElementCategory, ...list]}
              onChange={onHandleCategoryChange}
              id="parentID"
              name="parentID"
              placeholder="Категорія (буде головна)"
              style={{
                background: "none",
                border: "1px solid rgba(0, 0, 0, 0.23)",
                borderRadius: "4px",
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
                >
                  <Button variant="contained">Завантажити</Button>
                </ImageCropper>
              </div>
              <div className={styles.image_holder}>
                {values.image ? (
                  <div
                    className={`${styles.product_images} ${styles.image_view}`}
                  >
                    <div className={styles.hide_section}>
                      <CloseIcon
                        onClick={onRemoveImageHandler}
                        className={styles.close_icon}
                      ></CloseIcon>
                    </div>
                    <img
                      className={styles.image}
                      src={values.image}
                      alt="file"
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>

              {/* <TextField
                            onChange={handleChange}
                            value={values.name}
                            onBlur={handleBlur}
                            id="isRecommended"
                            name="isRecommended"
                            className={styles.field}
                            label="Назва"
                            variant="outlined"
                            helperText={touched.isRecommended && errors.isRecommended ? errors.isRecommended : ""}
                            error={touched.isRecommended && errors.isRecommended ? true : false}
                        /> */}
            </div>
          </div>
          <div className="mt-4">
            <Button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              variant="contained"
              className={styles.submit_button}
            >
              Створити
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCategoryAdminPage;
