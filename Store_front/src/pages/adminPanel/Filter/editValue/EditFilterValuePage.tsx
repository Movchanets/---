import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { IFilterValueUpdate } from "../../../../store/filters/filterValue/types";
import { filterValueSchema } from "../../../../store/filters/filterValue/validator";


const EditFilterValuePage: React.FC = () => {

    const {GetFilterValueById , UpdateFilterValue} = useActions();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        LoadFiltersData();
     }, []);

    const LoadFiltersData = async () => {
        try {
            var res:any = await GetFilterValueById(Number(id));
            console.log(res)
            setFieldValue("id",res.id);
            setFieldValue("name",res.name);
            setFieldValue("IsDelete",res.IsDelete);
        } catch (error: any) {
            console.error("Щось пішло не так, ", error);
        }
    };

    const onSubmitHandler = async (model:IFilterValueUpdate) => {
        try {

            await UpdateFilterValue(model);
            // navigate("/admin/filter");
        } catch (error) {
            console.error("Щось пішло не так, ", error);
        }
    };

    const initialValue: IFilterValueUpdate = {
        id:0,
        name: "",
        IsDelete:false,
    }

    const formik = useFormik<IFilterValueUpdate>({
        initialValues: initialValue,
        validationSchema: filterValueSchema,
        onSubmit: onSubmitHandler,
    });

    const { values, touched, errors, handleBlur, setFieldValue, handleSubmit, handleChange } = formik;
    return (
        <>
            <div className="container  ">

                {/*Create filter name */}
                <div className="row">
                    <div className="col-12 text-center">
                        <h2>
                            <strong>Редагувати значення фільтру</strong>
                        </h2>
                    </div>
                    <div className="col mt-3">
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="row">
                                <div className="col-lg-4">
                                    {/* Поле "Назва" */}
                                    <TextField
                                        onChange={handleChange}
                                        value={values.name}
                                        onBlur={handleBlur}
                                        id="name"
                                        name="name"
                                        label="Назва"
                                        variant="outlined"
                                        style={{ width: "100%" }}
                                        helperText={touched.name && errors.name ? errors.name : ""}
                                        error={touched.name && errors.name ? true : false}
                                    />
                                    <br />
                                </div>
                                <div className="row">
                                    <div className="col mt-2">
                                        <Button
                                         disabled={!(formik.isValid && formik.dirty)}
                                            type="submit"
                                            variant="contained"
                                        >
                                            Редагувати
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditFilterValuePage;