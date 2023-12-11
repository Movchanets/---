import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import {
  TreeSelect,
  TreeSelectChangeEvent,
  TreeSelectSelectionKeysType,
} from "primereact/treeselect";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { IFilterNameCreate } from "../../../../store/filters/filterName/types";
import { filterNameSchema } from "../../../../store/filters/filterName/validator";

const CreateFilterName: React.FC = () => {
  const [selectedNodeKey, setSelectedNodeKey] = useState<
    string | TreeSelectSelectionKeysType | TreeSelectSelectionKeysType[]
  >("");
  const { GetCategoryList, CreateFilterName } = useActions();
  const { list } = useTypedSelector((store) => store.category);
  const navigate = useNavigate();

  useEffect(() => {
    LoadCategories();
  }, []);

  const LoadCategories = async () => {
    try {
      await GetCategoryList();
    } catch (error: any) {
      console.error("Щось пішло не так, ", error);
    }
  };

  const onSubmitHandler = async (model: IFilterNameCreate) => {
    console.log("model: ", model);
    try {
      await CreateFilterName(model);
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

  const initialValue: IFilterNameCreate = {
    name: "",
    categoryId: null,
  };

  const formik = useFormik<IFilterNameCreate>({
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
              <strong>Створення фільтру</strong>
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
                    Створити
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
export default CreateFilterName;
