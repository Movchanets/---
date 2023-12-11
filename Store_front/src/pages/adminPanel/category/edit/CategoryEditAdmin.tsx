import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageCropper from "../../../../components/common/ImageCropper";
import { APP_ENV } from "../../../../env";
import defaultImage from "../../../../assets/placeholder_image.jpg";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { Button, Checkbox } from "@mui/material";
import styles from "./index.module.css";
import {
  TreeSelect,
  TreeSelectChangeEvent,
  TreeSelectSelectionKeysType,
} from "primereact/treeselect";
import { useActions } from "../../../../hooks/useActions";
import InputGroup from "../../../../components/common/InputGroup/InputGroup";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  ICategoryEditItem,
  ICategoryList,
} from "../../../../store/category/types";

const CategoryEditAdminPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { GetCategoryList, GetCategoryById, EditCategory } = useActions();
  const { selectCategory, list } = useTypedSelector((store) => store.category);
  const [selectedNodeKey, setSelectedNodeKey] = useState<
    string | TreeSelectSelectionKeysType | TreeSelectSelectionKeysType[]
  >("-1");

  const defaultElementCategory: ICategoryList = {
    key: -1,
    label: "Parrent element",
    data: {
      id: 0,
      image: "",
      name: "Parrent element",
      parentId: null,
      productCount: 0,
      isRecommend: false,
    },
    children: [],
  };
  const LoadCategories = async () => {
    try {
      await GetCategoryList();
      const resp: any = await GetCategoryById(id as string);
      setFieldValue("id", resp.id);
      setFieldValue("name", resp.name);
      setFieldValue("parentId", resp.parentId);
      setFieldValue("isRecommended", resp.isRecommended);
      setSelectedNodeKey(resp.parentId);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    LoadCategories();
  }, []);

  const handleImage = async (images: Array<File>) => {
    console.log("Select category image file: ", images[0]);
    const reader = new FileReader();
    reader.readAsDataURL(images[0]); //проводимо читання дагого файлу, для отримання base64
    reader.onload = function () {
      //якщо читання успішні
      setFieldValue("image", reader.result as string);
    };
  };

  const handleRecomendedCheckBox = async (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    console.log("Change is recomenf checbox", checked);
    setFieldValue("isRecommended", checked);
  };

  interface tempV {
    key: number;
    select: boolean;
  }

  const onHandleCategoryChange = (e: TreeSelectChangeEvent) => {
    if (e.target.value) {
      console.log("Select category parent ID", e.target.value);

      setSelectedNodeKey(e.target.value);
      setFieldValue("parentId", e.target.value);
    }
  };

  const onSubmitFormik = async (values: ICategoryEditItem) => {
    try {
      // console.log("Submit category edit ", values)
      var res = await EditCategory(values);
      navigate("/admin/category");
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  const initValues: ICategoryEditItem = {
    name: "",
    id: 0,
    parentId: 0,
    // isRecommended:false,
    image: defaultImage,
  };

  const updateSchema = yup.object({
    name: yup.string().required("Вкажіть ім'я"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initValues,
    onSubmit: onSubmitFormik,
    validationSchema: updateSchema,
  });

  const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
    formik;

  return (
    <>
      <div className={`${styles.emp_category}  container-fluid`}>
        <div className="row">
          <div className="col-lg-4 m-auto">
            <div className={styles.category_image}>
              <ImageCropper
                id="upload"
                handleImagesFunc={handleImage}
                cropeprOptions={{
                  viewMode: 1,
                  autoCropArea: 1,
                  aspectRatio: 16 / 9,
                  minCropBoxWidth: 140,
                  minCropBoxHeight: 80,
                }}
              >
                <img
                  src={
                    selectCategory?.image
                      ? APP_ENV.REMOTE_HOST_IMAGE_URL + selectCategory?.image
                      : values.image
                  }
                />
              </ImageCropper>
            </div>
          </div>
          <div className="col-lg-8">
            <form onSubmit={handleSubmit}>
              <div className={styles.category_head}>
                <h5>{selectCategory?.name}</h5>
                <p className={`${styles.category_Id}`}>
                  CATEGORY ID: <span>{selectCategory?.id}</span>
                </p>
                <ul className={`${styles.category_tab} nav nav-tabs`}>
                  <li className="nav-item">
                    <p className={`${styles.category_about} nav-link active`}>
                      Edit
                    </p>
                  </li>
                </ul>
              </div>
              <div className={styles.category_about}>
                <div className="row">
                  <div className="col-6">
                    <InputGroup
                      label="Name"
                      field="name"
                      value={values.name}
                      error={errors.name}
                      touched={touched.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-2">
                    <label>Parrent</label>
                  </div>
                  <div className="col-md-5 d-flex flex-column">
                    {/* Поле "Категорія ID" */}
                    <TreeSelect
                      value={selectedNodeKey}
                      options={[defaultElementCategory, ...list]}
                      onChange={onHandleCategoryChange}
                      id="myChildren"
                      name="myChildren"
                      placeholder="Parrent"
                      style={{
                        background: "none",
                        border: "1px solid rgba(0, 0, 0, 0.23)",
                        borderRadius: "4px",
                        fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
                      }}
                      // selectionMode= "checkbox"
                      // metaKeySelection={false}
                      // selectionMode="multiple"
                      filter
                    ></TreeSelect>
                    {/* <label style={{margin:"0px" , padding:"0px", color:"gray" , fontWeight:"normal"}}>Select same category for top level  </label> */}
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-2">
                    <label>Is Recommended</label>
                  </div>
                  <div className="col-md">
                    <Checkbox onChange={handleRecomendedCheckBox} />
                  </div>
                </div>
              </div>
              <Button type="submit" variant="contained">
                Update
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryEditAdminPage;
