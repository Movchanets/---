import { Button, Checkbox, FormControl, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import http from "../../../../http_common";
import { IFilterNameVM } from "../../../../store/filters/filterName/types";
import { ICreateFilterGroupItem} from "../../../../store/filters/groupFilters/types";
import { filterGroupSchema } from "../../../../store/filters/groupFilters/validator";
import styles from "./index.module.css";



const CreateFilterGroupPage: React.FC = () => {

    const { UpgradeGroupFilter, GetAllFilterValues, UpdateFilterValuesList } = useActions();
    const { list } = useTypedSelector(store => store.filterValues);
    const [filteName, setFilteName] = useState<Array<IFilterNameVM>>([]);
    const [isSaveGroupFilter, setIsSaveGroupFilter] = useState(false);


    const LoadData = async () => {
        try {
            const respFilteName = await (await http.get(`/api/Filters/get_filter_names`)).data;
            console.log(respFilteName);
            // const respFilteValues = await (await http.get(`/api/Filters/get_filter_values`)).data;
            setFilteName(respFilteName.payload);
            // setFilteValue(respFilteValues.payload);
            await GetAllFilterValues();
        }
        catch (e: any) {

        }
    }

    useEffect(() => {
        LoadData();
    }, [isSaveGroupFilter]);


    const checkFilterValueHandler = (e: ChangeEvent<HTMLInputElement>, checked: boolean, valueId: number) => {
        //update redux list element
        var val = list.filter(el => el.id === valueId);
        val[0].checked = !val[0].checked;

        if (values.FilterNameId <= 0) return

        //Added element to new list
        checked ?
            setFieldValue("NewFilterValuesIdList", values.NewFilterValuesIdList.concat(valueId))
            : setFieldValue("NewFilterValuesIdList", values.NewFilterValuesIdList.filter(elm => elm != valueId));


        //added element to remove list
        !checked ?
            setFieldValue("RemoveFilterValuesIdList", values.RemoveFilterValuesIdList.concat(valueId))
            : setFieldValue("RemoveFilterValuesIdList", values.RemoveFilterValuesIdList.filter(elm => elm != valueId));
    }

    const changeFilterNameHandler = (e: ChangeEvent<any>) => {
        //clean formik model
        setFieldValue("NewFilterValuesIdList", []);
        setFieldValue("RemoveFilterValuesIdList", []);

        let updateArrayValues = [...list];
        const parren = filteName.filter(el => el.id === e.target.value);
        console.log("element", parren)

        for (let i = 0; i < updateArrayValues.length; i++) {
            updateArrayValues[i].checked = false;
        }

        for (let i = 0; i < parren[0].filterValues.length; i++) {
            let elementIndex = updateArrayValues.findIndex(el => el.id === parren[0].filterValues[i].id);
            updateArrayValues[elementIndex].checked = true;
        }

        // setFilteValue(updateArrayValues);
        UpdateFilterValuesList(updateArrayValues);
        setFieldValue("FilterNameId", e.target.value);

    }

    const onSubmitHandler = async (model: ICreateFilterGroupItem) => {
        console.log("model: ", model);
        try {
            await UpgradeGroupFilter(model);
            setFieldValue("FilterNameId", 0 );
            setIsSaveGroupFilter(prev=>!prev);
        } catch (error) {
            console.error("Щось пішло не так, ", error);
        }
    };

    const selectorFilterNameItems = filteName.map((item) => {
        return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
    });

    const listFilterValues = list.map((item) => (
        <div key={item.id} className="col">
            <label className="w-100 d-flex align-items-center ">
                <Checkbox
                    key={item.id}
                    onChange={(e: ChangeEvent<HTMLInputElement>, checked: boolean) => { checkFilterValueHandler(e, checked, item.id) }}
                    checked={item.checked ? true : false}

                />
                <h5 className="text-truncate">{item.name}</h5>
            </label>
        </div>
    ));

    const initialValue: ICreateFilterGroupItem = {
        FilterNameId: 0,
        NewFilterValuesIdList: [],
        RemoveFilterValuesIdList: []
    }

    const formik = useFormik<ICreateFilterGroupItem>({
        initialValues: initialValue,
        validationSchema: filterGroupSchema,
        onSubmit: onSubmitHandler,
    });

    const { values, touched, errors, handleBlur, setFieldValue, handleSubmit, handleChange } = formik;

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <h2>
                            <strong>Створити групи фільтру</strong>
                        </h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="row">
                                <div className="col">

                                    <FormControl sx={{ minWidth: 120 }}>
                                        <TextField
                                            name="FilterNameId"
                                            id="FilterNameId"
                                            style={{ width: "300px" }}
                                            value={values.FilterNameId}
                                            onChange={changeFilterNameHandler}
                                            onBlur={handleBlur}
                                            select
                                            helperText={touched.FilterNameId && errors.FilterNameId ? errors.FilterNameId : ""}
                                            error={touched.FilterNameId && errors.FilterNameId ? true : false}
                                        >
                                            <MenuItem value="0" hidden>
                                                <em>Виберіть назву фільту</em>
                                            </MenuItem>
                                            {selectorFilterNameItems}
                                        </TextField>
                                    </FormControl>

                                </div>
                            </div>
                            <div className="col">
                                <Button
                                    sx={{ mt: 1 }}
                                    disabled={!(formik.isValid && formik.dirty && values.FilterNameId > 0)}
                                    type="submit"
                                    variant="contained"
                                >
                                    Зберегти
                                </Button>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="row">
                                        <div className="col">
                                            <hr />
                                            <h3 className="text-center">Список всіх значень фільтрів</h3>
                                        </div>
                                    </div>
                                    <div
                                        className={`${styles.selectList} row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5`}
                                    >
                                        {list.length > 0 ?
                                             listFilterValues: <span>Список порожній</span>}
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateFilterGroupPage;