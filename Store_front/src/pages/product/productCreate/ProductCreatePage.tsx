import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { IProductByUserCreate } from "../../../store/products/types";
import EditorTiny from "../../../components/common/EditorTiny";
import ImageCropper from "../../../components/common/ImageCropper";
import {
  TreeSelect,
  TreeSelectChangeEvent,
  TreeSelectSelectionKeysType,
} from "primereact/treeselect";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import classNames from "classnames";
import styles from "./index.module.scss";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { productByUserCreateSchema } from "../../../store/products/validator";
import { useNavigate } from "react-router-dom";

export const ProductCreatePage: React.FC = () => {
  const [selectedNodeKey, setSelectedNodeKey] = useState<
    string | TreeSelectSelectionKeysType | TreeSelectSelectionKeysType[]
  >("");

  const navigator = useNavigate();
  const { GetCategoryList, CreateFullProduct } = useActions();
  const { list } = useTypedSelector((store) => store.category);
  const { isAuth } = useTypedSelector((store) => store.login);

  const LoadCategories = async () => {
    try {
      await GetCategoryList();
    } catch (error: any) {
      console.error("Щось пішло не так, ", error);
    }
  };

  useEffect(() => {
    if (!isAuth) navigator("/sign-in");
    LoadCategories();
  }, [isAuth]);

  const initialValues: IProductByUserCreate = {
    product: {
      name: "",
      shortDescription: "",
      description: "",
      categoryId: 0,

      images: [],
      quantity: 0,
      price: 0
    },

  
  };

  const onSubmitHandler = async (model: IProductByUserCreate) => {
    console.log("model: ", model);
    try {
      await CreateFullProduct(model);
      navigator("/");
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  const formik = useFormik<IProductByUserCreate>({
    initialValues: initialValues,
    validationSchema: productByUserCreateSchema,
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

  //Search form props



  



  // Show images
  const dataFileView = values.product.images.map((file) => {
    return (
      <div
        key={file.name}
        className={`${styles.product_images} ${styles.image_view}`}
      >
        <div className={styles.hide_section}>
          <CloseIcon
            onClick={() => {
              onRemoveImageHandler(file.name);
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

  //Отримує картинки від кроппера
  const onHandleImages = (images: Array<File>) => {
    setFieldValue("product.images", [...values.product.images, ...images]);
  };

  const onRemoveImageHandler = (fileName: string) => {
    setFieldValue(
      "product.images",
      values.product.images.filter((x) => x.name !== fileName)
    );
  };

  const onHandleCategoryChange = (e: TreeSelectChangeEvent) => {
    if (e.target.value) {
      setSelectedNodeKey(e.target.value);
      setFieldValue("product.categoryId", e.target.value);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <main className="col">
            <form onSubmit={handleSubmit} action="#" method="POST">
              {/* info section  */}
              <section
                className={`${styles.main_section} ${styles.details_section}`}
              >
                <header className={styles.main_section_header}>
                  <h2>Enter your details</h2>
                </header>
                <div className={styles.details_section_body}>
                  {/* name field */}
                  <div
                    className={`${styles.details_section_body_field} ${styles.grid_column_medium} p-0`}
                  >
                    <label htmlFor="product.name">
                      What is the name of your object?
                      <abbr className="text-decoration-none" title="Required">
                        {" *"}
                      </abbr>
                    </label>
                    <input
                      type="text"
                      id="product.name"
                      name="product.name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.product.name}
                      className={classNames({
                        [styles.error]:
                          errors.product?.name && touched.product?.name,
                      })}
                    />
                    <span className={styles.error_section}>
                      {touched.product?.name && errors.product?.name}
                    </span>
                    <span className={styles.field_info}>
                      This is the name you will see when searching 
                    </span>
                  </div>
                </div>
              </section>

              {/* description section  */}
              <section
                className={`${styles.main_section} ${styles.details_section}`}
              >
                <header className={styles.main_section_header}>
                  <h2>Description</h2>
                </header>
                <div className={styles.details_section_body}>
                  {/* short description field */}
                  <div
                    className={`${styles.details_section_body_field} ${styles.grid_column_medium} p-0`}
                  >
                    <label htmlFor="product.shortDescription">
                      Short description of your property?
                      <abbr className="text-decoration-none" title="Required">
                        {" *"}
                      </abbr>
                    </label>
                    <div className={styles.description_section_body_field}>
                      <textarea
                        id="product.shortDescription"
                        name="product.shortDescription"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.product.shortDescription as string}
                        rows={3}
                      />
                    </div>
                    <span className={styles.error_section}>
                      {touched.product?.shortDescription &&
                        errors.product?.shortDescription}
                    </span>
                    <span className={styles.field_info}>
                      This description will be shown on the product list page.
                    </span>
                  </div>

                  {/* description field */}
                  <div
                    className={`${styles.details_section_body_field} ${styles.grid_column_large}`}
                  >
                    <label htmlFor="product.description">
                      Full description of your property?
                      <abbr className="text-decoration-none" title="Required">
                        {" *"}
                      </abbr>
                    </label>
                    <div className={styles.description_section_body_field}>
                      {/* Поле "Опис" */}
                      <EditorTiny
                        value={values.product.description}
                        field="product.description"
                        error={errors.product?.description}
                        touched={touched.product?.description}
                        onBlur={handleBlur}
                        onEditorChange={(text: string) => {
                          setFieldValue("product.description", text);
                        }}
                      />
                    </div>
                    <span className={styles.error_section}>
                      {touched.product?.description &&
                        errors.product?.description}
                    </span>
                  </div>
                </div>
              </section>

            

              {/* category section  */}
              <section
                className={`${styles.main_section} ${styles.details_section}`}
              >
                <header className={styles.main_section_header}>
                  <h2>Category</h2>
                </header>
                <div className={styles.details_section_body}>
                  {/* name field */}
                  <div
                    className={`${styles.details_section_body_field} ${styles.grid_column_small} p-0`}
                  >
                    <label htmlFor="product.categoryId">
                      What is the category of your property?
                      <abbr className="text-decoration-none" title="Required">
                        {" *"}
                      </abbr>
                    </label>
                    <TreeSelect
                      value={selectedNodeKey}
                      options={list}
                      onChange={onHandleCategoryChange}
                      id="product.categoryId"
                      name="product.categoryId"
                      placeholder="Категорія"
                      style={{
                        background: "none",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        borderRadius: "4px",
                        width: "100%",
                      }}
                      filter
                    />
                    <span className={styles.error_section}>
                      {touched.product?.categoryId &&
                        errors.product?.categoryId}
                    </span>
                  </div>
                </div>
              </section>

              {/* Photos  section  */}
              <section
                className={`${styles.main_section}  ${styles.details_section}`}
              >
                <header className={styles.main_section_header}>
                  <h2>Photos</h2>
                </header>
                <div className={styles.description_section_body}>
                  <span>
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
                      <Button variant="contained" className={`${styles.croper_btn}`}>Upload photos</Button>
                    </ImageCropper>
                    <div className="d-flex mt-3 flex-wrap gap-2">
                      {dataFileView}
                    </div>
                  </span>
                </div>
              </section>

            

              <div className={styles.button_submit_wrapper}>
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                >
                  Upload your property
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};
