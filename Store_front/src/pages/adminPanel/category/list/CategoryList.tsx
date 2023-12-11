import React, { useState, useEffect } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Button } from 'primereact/button';
import { NodeService } from "./service";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import {
  ICategoryList,
  ICategoryState,
} from "../../../../store/category/types";
import defaultImage from "../../../../assets/placeholder_image.jpg";
import { APP_ENV } from "../../../../env";
import 'primeicons/primeicons.css';
import { useNavigate } from "react-router-dom";

interface TreeNode {
  key: number;
  data: {};
}

interface ImageColumnProps {
  rowData: ICategoryList;
}

interface ColumnProps {
  id: number;
}

const CategoryList = () => {
  const { GetCategoryList, RemoveCategory } = useActions();
  const { list } = useTypedSelector(
    (store) => store.category as ICategoryState
  );
  const navigate = useNavigate();
  const [deleteItem, setDeleteItem] = useState<boolean>(false);

  const imageTemaplate = (e: any) => (
    <div>
      <img
        width={50}
        height={50}
        src={e.data.image ? `${APP_ENV.REMOTE_HOST_IMAGE_URL + e.data.image}` : defaultImage}
        alt={`Image `}
      />
    </div>
  );

  const actionTemplate = (e: any) => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          icon="pi pi-pencil"
          severity="success"
          rounded onClick={() => {
            navigate(`/admin/category/edit/${e.data.id}`);
          }}
          style={{marginRight:"5px"}}
          tooltip="Edit"
          tooltipOptions={{position:"bottom"}}
          ></Button>

        <Button type="button"
          icon="pi pi-ban"
          severity="danger"
          rounded onClick={() => {
            console.log("remove category id ", e);
            RemoveCategoryHandler(e.data.id);
          }}
          tooltip="Remove"
          tooltipOptions={{position:"bottom"}}
          ></Button>
      </div>
    );
  };

  let columns = [
    { field: "name", header: "Name" },
    { field: "parentId", header: "Parent" },
  ];

  const [visibleColumns, setVisibleColumns] = useState(columns);

  const onColumnToggle = (event: MultiSelectChangeEvent) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol: any) => sCol.field === col.field)
    );

    setVisibleColumns(orderedSelectedColumns);
  };

  const LoadCategories = async () => {
    try {
      await GetCategoryList();
    } catch (error: any) {
      console.log(error);
    }
  };

  const RemoveCategoryHandler = async (id: number) => {
    try {
      await RemoveCategory(id);
      setDeleteItem(prev => !prev);
    } catch (error: any) {
      console.log(error);
    }
  };

  const onCreateCategoryBtnHandler = () => {
    navigate("create/");
  }
  useEffect(() => {
    LoadCategories();
  }, [deleteItem]);

  const header = (
    <MultiSelect
      value={visibleColumns}
      options={columns}
      onChange={onColumnToggle}
      optionLabel="header"
      className="w-full sm:w-16rem"
      display="chip"
    />
  );

  return (
    <div className="card">
      <Button label="Create category"
        severity="info"
        style={{ margin: "15px", maxWidth: "15rem" }}
        onClick={onCreateCategoryBtnHandler} />

      <TreeTable
        value={list}
        header={header}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column key="id" field="id" header="Id" expander></Column>
        {visibleColumns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))}
        <Column body={imageTemaplate} header="Image"></Column>
        <Column body={actionTemplate} header="Actions" ></Column>
      </TreeTable>
    </div>
  );
};

export default CategoryList;
