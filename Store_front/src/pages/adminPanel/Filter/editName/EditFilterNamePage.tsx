import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import {
  TreeSelect,
  TreeSelectChangeEvent,
  TreeSelectSelectionKeysType,
} from "primereact/treeselect";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { IFilterNameUpdate } from "../../../../store/filters/filterName/types";
import { filterNameSchema } from "../../../../store/filters/filterName/validator";

const EditFilterNamePage: React.FC = () => {
  const { id } = useParams();
  const { GetCategoryList, UpdateFilterName, GetFilterNameById } = useActions();
  const { list } = useTypedSelector((store) => store.category);
  const [selectedNodeKey, setSelectedNodeKey] = useState<
    string | TreeSelectSelectionKeysType | TreeSelectSelectionKeysType[]
  >(`${id}`);
  const navigate = useNavigate();

  useEffect(() => {
    LoadCategories();
  }, []);

  const LoadCategories = async () => {
    try {
      var res: any = await GetFilterNameById(Number(id));
      await GetCategoryList();
      setFieldValue("id", res.id);
      setFieldValue("name", res.name);
      setFieldValue("categoryId", res.categoryId);
      setFieldValue("IsDelete", res.IsDelete);
      setSelectedNodeKey(res.categoryId);
    } catch (error: any) {
      console.error("Щось пішло не так, ", error);
    }
  };

  const onSubmitHandler = async (model: IFilterNameUpdate) => {
    console.log("model: ", model);
    try {
      await UpdateFilterName(model);
      navigate(`/admin/filter`);
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  const onHandleCategoryChange = (e: TreeSelectChangeEvent) => {
    if (e.target.value) {
      setSelectedNodeKey(e.target.value);
      setFieldValue("categoryId", e.target.value);
    }
  };

  const initialValue: IFilterNameUpdate = {
    id: Number(id),
    name: "",
    categoryId: 0,
    IsDelete: false,
  };

  const formik = useFormik<IFilterNameUpdate>({
    initialValues: initialValue,
    validationSchema: filterNameSchema,
    onSubmit: onSubmitHandler,
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    handleSubmit,
    handleChange,
  } = formik;
  return (
    <>
      <div className="container  ">
        {/*Create filter name */}

        <div className="row">
          <div className="col-12 text-center">
            <h2>
              <strong>Редагування фільтру</strong>
            </h2>
          </div>
          <div className="col-md-6  mt-3">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  {/* Поле "Назва" */}
                  <TextField
                    onChange={handleChange}
                    value={values.name}
                    onBlur={handleBlur}
                    id="name"
                    name="name"
                    label="Назва"
                    variant="outlined"
                    helperText={touched.name && errors.name ? errors.name : ""}
                    error={touched.name && errors.name ? true : false}
                  />
                  <br />
                  <span>Назва фільтру</span>
                </div>
                <div className=" col-lg-6 ">
                  {/* Поле "Батьківської категорії ID" */}
                  <TreeSelect
                    value={selectedNodeKey}
                    options={list}
                    onChange={onHandleCategoryChange}
                    id="parentID"
                    name="parentID"
                    placeholder="Категорія (буде головна)"
                    style={{
                      background: "none",
                      border: "1px solid rgba(0, 0, 0, 0.23)",
                      borderRadius: "4px",
                      padding: "5px",
                    }}
                    filter
                  ></TreeSelect>
                  <br />
                  <span>До якої категорії відноситься</span>
                </div>
                <div className="mt-4">
                  <Button
                    disabled={
                      !(formik.isValid && formik.values.name.length > 2)
                    }
                    type="submit"
                    variant="contained"
                  >
                    Оновити
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditFilterNamePage;
