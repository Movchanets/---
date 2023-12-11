import { Button, Chip, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { IFilterValueItem, IFilterValuesCreate } from "../../../../store/filters/filterValue/types";
import { filterValueSchema } from "../../../../store/filters/filterValue/validator";


const CreateFilterValue: React.FC = () => {

    const [chipData, setChipData] = useState<string[]>([]);
    const {CreateFilterValues} = useActions();
    const navigate = useNavigate();

    useEffect(() => { }, [chipData]);
    const onSubmitHandler = async () => {

        if (values.name === "")
            return;

        if (chipData.find(e => e === values.name))
            return;

        setChipData((chips) => [...chips,  values.name ]);
        setFieldValue("name", "");

    };

    const handleDelete = (chipToDelete: string) => () => {
        setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
    };

    const onSendData = async () => {
        try {
            const modelData:IFilterValuesCreate = {names:chipData};
            await CreateFilterValues(modelData);
            navigate("/admin/filter");
        } catch (error) {
            console.error("Щось пішло не так, ", error);
        }
    };

    const initialValue: IFilterValueItem = {
        id:0,
        name: "",
    }

    const formik = useFormik<IFilterValueItem>({
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
                            <strong>Створити значення фільтру</strong>
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
                                    <div className="col-md-6 mt-3">
                                        <div style={{ display: 'flex', flexWrap: "wrap", listStyle: "none", backgroundColor: "#e7e7e7", borderRadius: "10px" }}>
                                            {chipData.map((data, index) => {
                                                return (
                                                    <li key={data + index}>
                                                        <Chip
                                                            label={data}
                                                            onDelete={handleDelete(data)}
                                                            style={{ margin: "5px" }}
                                                        />
                                                    </li>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col mt-2">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                        >
                                            Додати значення
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col mt-3">
                        <Button
                            disabled={!(chipData.length >= 1)}
                            onClick={() => { onSendData() }}
                            variant="contained"
                        >
                            Створити
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateFilterValue;