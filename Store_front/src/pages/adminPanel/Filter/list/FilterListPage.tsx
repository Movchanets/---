import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IFilterNameVM } from "../../../../store/filters/filterName/types";
import { Button, Tooltip } from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const FilterListPage: React.FC = () => {
  const { GetAllFilterNames } = useActions();
  const { list } = useTypedSelector((store) => store.filterNames);
  const navigate = useNavigate();

  const LoadData = async () => {
    try {
      var res = await GetAllFilterNames();
    } catch (err: any) {}
  };

  useEffect(() => {
    LoadData();
  }, []);

  const onCreateFilterNameButtonHandler = () => {
    navigate("/admin/filter/name/create");
  };
  const onCreateFilterValueButtonHandler = () => {
    navigate("/admin/filter/value/create");
  };
  const onCreateFilterGroupButtonHandler = () => {
    navigate("/admin/filter/group/create");
  };

  const onCreateConnectionProductAndFilterHandler = () => {
    navigate("/admin/filter/connection");
  };

  // Для самих категорій фільтрів
  const onRemoveFilterNameClickHandler = (id: number) => {
    console.log("Видалення категорій тимчасово непрацює ");
  };

  const onEditFilterNameClickHandler = (id: number) => {
    navigate(`/admin/filter/name/edit/${id}`);
  };

  //Для значень категорії фільтрів
  const onRemoveFilterValueClickHandler = (id: number) => {};

  const onEditFilterValueClickHandler = (id: number | any) => {
    navigate(`/admin/filter/value/edit/${id}`);
  };

  function Row(props: { row: IFilterNameVM }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <StyledTableRow>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{row.categoryId}</TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>
            <div className="d-flex justify-content-center">
              <Tooltip disableFocusListener title="Редагувати категорію">
                <Button
                  onClick={() => {
                    onEditFilterNameClickHandler(row.id);
                  }}
                >
                  <EditOutlinedIcon fontSize="large" color="success" />
                </Button>
              </Tooltip>
              <Tooltip disableFocusListener title="Видалити категорію">
                <Button
                  onClick={() => {
                    onRemoveFilterNameClickHandler(row.id);
                  }}
                >
                  <HighlightOffOutlinedIcon fontSize="large" color="warning" />
                </Button>
              </Tooltip>
            </div>
          </TableCell>
        </StyledTableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open}>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" component="div">
                  Додаткова інформація
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>(ID) Значення</StyledTableCell>
                      <StyledTableCell>Значення</StyledTableCell>
                      <StyledTableCell>Видалено</StyledTableCell>
                      <StyledTableCell align="center">Більше</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.filterValues.map((filterValueitem) => (
                      <TableRow key={filterValueitem.name}>
                        <TableCell>{filterValueitem.id}</TableCell>
                        <TableCell>{filterValueitem.name}</TableCell>
                        <TableCell>
                          {filterValueitem.IsDelete ? "Так" : "Ні"}
                        </TableCell>
                        <TableCell>
                          <div className="d-flex justify-content-center">
                            <Tooltip
                              disableFocusListener
                              title="Редагувати значення"
                            >
                              <Button
                                onClick={() => {
                                  onEditFilterValueClickHandler(
                                    filterValueitem.id
                                  );
                                }}
                              >
                                <EditOutlinedIcon
                                  fontSize="medium"
                                  color="success"
                                />
                              </Button>
                            </Tooltip>
                            <Tooltip
                              disableFocusListener
                              title="Видалити значення"
                            >
                              <Button>
                                <HighlightOffOutlinedIcon
                                  fontSize="medium"
                                  color="warning"
                                />
                              </Button>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {row.filterValues.length <= 0 && (
                  <h5 className="text-center">Груп фільтрів не знайдено</h5>
                )}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <TableContainer component={Paper} sx={{ padding: "8px" }}>
            <div className="mb-2">
              {/* Кнопки додавання */}
              <div className="col-md-8 d-flex justify-content-between">
                <Button
                  onClick={onCreateFilterNameButtonHandler}
                  variant="contained"
                >
                  Створити фільтр
                </Button>

                <Button
                  onClick={onCreateFilterValueButtonHandler}
                  variant="contained"
                >
                  Створити значення фільтра
                </Button>
                <Button
                  onClick={onCreateFilterGroupButtonHandler}
                  variant="contained"
                >
                  Створити нову групу фільтрів
                </Button>
                <Button
                  onClick={onCreateConnectionProductAndFilterHandler}
                  variant="contained"
                >
                  З'єднати продукт і фільтр
                </Button>
              </div>
            </div>
            {/* Таблиця */}
            <Table>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell style={{ width: "10% " }} />
                  <StyledTableCell style={{ width: "10% " }}>
                    Категорія&nbsp;(ID)
                  </StyledTableCell>
                  <StyledTableCell>Імя фільтру</StyledTableCell>
                  <StyledTableCell align="center">Більше</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {list.map((item) => (
                  <Row key={item.name} row={item} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {list.length <= 0 && (
            <h4 className="text-center mt-2">Фільтрів не знайдено </h4>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterListPage;
