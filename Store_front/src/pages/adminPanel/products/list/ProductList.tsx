import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "@mui/material/Button";
import ProductMenuActions from "../../../../components/common/dialogMenu/ProductMenuActions";
import PaginationMUI from "../../../../components/common/pagination/singlePaginationMui";
import { filterNonNull } from "../../../../helpers/helpers";
import qs from "qs";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import parse from "html-react-parser";
import { IProductSearch } from "../../../../store/products/types";

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

const defaultSortValues = ["Date", "Name", "Price","Quantity" ,"Id"];

var defaultCountOnPage = 5;
const defaultSortBy = "Date";

const ProductList: React.FC = () => {
  const { pages, products } = useTypedSelector((store) => store.product.list);
  const { GetProductList, RemoveProduct } = useActions();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState<IProductSearch>({
    page: searchParams.get("page") || 1,
    countOnPage: searchParams.get("countOnPage") || defaultCountOnPage,
    sort: searchParams.get("sort") || defaultSortBy,
    search: searchParams.get("search") || "",
  });

  const [searchText, setSearchText] = useState<string>(search.search ?? "");
  const [deleteItem, setDeleteItem] = useState<boolean>(false);

  const checkSortValue = () => {
    if (search.sort && !defaultSortValues.includes(search.sort)) {
      setSearch({ ...search, sort: defaultSortBy });
      setSearchParams(
        "?" + qs.stringify(filterNonNull({ ...search, sort: defaultSortBy }))
      );
    }
  };

  const loadProducts = async (find: IProductSearch) => {
    try {
      await GetProductList(find);
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  useEffect(() => {
    // read the params on component load and when any changes occur
    const currentParams = Object.fromEntries([...(searchParams as any)]);
    // get new values on change
    // console.log('-------useEffect:', currentParams);

    var find: IProductSearch = {
      page: currentParams.page || 1,
      countOnPage: currentParams.countOnPage || defaultCountOnPage,
      sort: currentParams.sort || defaultSortBy,
      search: currentParams.search || "",
    };

    setSearch(find);
    setSearchText(find.search || "");
    defaultCountOnPage =
      Object.fromEntries([...(searchParams as any)]).countOnPage ||
      defaultCountOnPage;

    checkSortValue();
    loadProducts(find);
  }, [searchParams, deleteItem]);

  const onCreateProductButtonHandler = () => {
    navigate("/admin/products/create");
  };

  const onEditProductHandler = (id: number) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const onRemoveProductHandler = async (id: number) => {
    try {
      await RemoveProduct(id);
      setDeleteItem((current) => !current);
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  const onSearchClickHandler = () => {
    console.log("Search: ", searchText);

    setSearch({ ...search, search: searchText, page: 1 });
    setSearchParams(
      "?" +
        qs.stringify(filterNonNull({ ...search, search: searchText, page: 1 }))
    );
  };

  const onSortChangeHandler = (e: SelectChangeEvent) => {
    console.log("Sort by: ", e.target.value);

    setSearch({ ...search, sort: e.target.value });
    setSearchParams(
      "?" + qs.stringify(filterNonNull({ ...search, sort: e.target.value }))
    );
  };

  const onPageChangeHandler = (page: number) => {
    console.log("Page: ", page);

    setSearch({ ...search, page: page });
    setSearchParams(
      "?" + qs.stringify(filterNonNull({ ...search, page: page }))
    );
  };

  const onCountOnPageChangeHandler = (num: number) => {
    console.log("Count on page: ", num);

    setSearch({ ...search, page: 1, countOnPage: num });
    setSearchParams(
      "?" +
        qs.stringify(filterNonNull({ ...search, page: 1, countOnPage: num }))
    );
  };

  const ProductsList = products.map((row) => (
    <StyledTableRow key={row.id}>
        <StyledTableCell component="th" scope="row">
        {row.id}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {row.name}
      </StyledTableCell>
    
      <StyledTableCell align="center">
        {row.category + " (" + row.categoryId + ")"}
      </StyledTableCell>
      <StyledTableCell align="center">{row.price}</StyledTableCell>
      <StyledTableCell align="center">{row.quantity}</StyledTableCell>
      {/* <StyledTableCell align="center">{parse(row.description)}</StyledTableCell> */}
      <StyledTableCell align="center">
        {/* Menu for each product */}
        <ProductMenuActions
          product={row}
          editFunc={onEditProductHandler}
          removeFunc={onRemoveProductHandler}
        />
      </StyledTableCell>
    </StyledTableRow>
  ));

  return (
    <div style={{ margin: 10 }}>
      <div className="d-flex justify-content-between align-items-md-center mb-2 flex-column flex-md-row">
        {/* Кнопка додавання */}
        <Button onClick={onCreateProductButtonHandler} variant="contained">
          Додати продукт
        </Button>

        {/* Select для сортування */}
        <FormControl
          className="mt-3 mt-md-0"
          sx={{ minWidth: 100 }}
          size="small"
        >
          <InputLabel id="sort-by-select-label">Sort by</InputLabel>
          <Select
            // defaultValue={"Date"}
            labelId="sort-by-select-label"
            label="Sort by"
            value={search.sort}
            onChange={onSortChangeHandler}
          >
            {defaultSortValues.map((value, index) => (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* Пошук */}
      <FormControl fullWidth className="my-2" variant="outlined">
        <InputLabel>Search</InputLabel>
        <OutlinedInput
          type="text"
          value={searchText}
          onChange={(el) => setSearchText(el.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={onSearchClickHandler}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Search"
        />
      </FormControl>
      {/* Таблиця */}
      <TableContainer component={Paper} sx={{ border: 1 }}>
        <Table sx={{ width: "100%" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              
              <StyledTableCell align="center">Category (ID)</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              {/* <StyledTableCell align="center">Description</StyledTableCell> */}
              <StyledTableCell align="center">More</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{ProductsList}</TableBody>
        </Table>
      </TableContainer>
      <div className="mt-2">
        <PaginationMUI
          arrayRowPerPage={[2, 3, 5, 10, 15, 20]}
          onChangeCountOnerPage={onCountOnPageChangeHandler}
          onChangePage={onPageChangeHandler}
          countPages={pages}
          countOnPage={search.countOnPage}
          siblingCount={3}
          currentPage={Number(search.page)}
        />
      </div>
    </div>
  );
};

export default ProductList;
