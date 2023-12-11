import { useEffect, useState } from "react";
import styles from "./status.module.scss";
import classNames from "classnames";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from "@mui/material";
import PaginationMUI from "../../../components/common/pagination/singlePaginationMui";
import { IDetail, IOrderSearch } from "../../../store/orders/types";
import { useSearchParams } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { filterNonNull } from "../../../helpers/helpers";
import qs from "qs";

export const OrderStatus = () => {
  

  const [isOpenMore, setIsOpenMore] = useState<boolean>(false);
  const {GetUserOrders} = useActions();
  const { pages, orders } = useTypedSelector((store) => store.order.list);
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
  function calculateTotal(details: Array<IDetail > | undefined): number {
    let total = 0;
    details?.forEach((x) => {
      total += x.quantity * x.product.price;
    });
    return total;
  }
  const OrdersList = orders.map((row) => (
    
    <StyledTableRow key={row?.id}>
    
      <StyledTableCell align="center">{row?.user?.email}</StyledTableCell>

      <StyledTableCell align="center" scope="row">
        {row?.details?.map((x) => { return <div>{x?.product?.name} - {x?.quantity}</div> })}
        
      </StyledTableCell>
      <StyledTableCell align="center">{`${row?.user?.firstName} ${row?.user?.lastName}`}</StyledTableCell>

      <StyledTableCell align="center">{
        calculateTotal(row?.details)
      }  </StyledTableCell>
    
    

     
      
      
    </StyledTableRow>
  ));
  const loadOrders = async (find: IOrderSearch) => {
    try {
      await GetUserOrders(find);
   
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };
  const checkSortValue = () => {
    if (search.sort && !defaultSortValues.includes(search.sort)) {
      setSearch({ ...search, sort: defaultSortBy });
      setSearchParams(
        "?" + qs.stringify(filterNonNull({ ...search, sort: defaultSortBy }))
      );
    }
  };

  const [searchParams, setSearchParams] = useSearchParams();
  var defaultCountOnPage = 5;
  const defaultSortBy = "Name";
  const defaultSortValues = ["Name", "UserId", "Price"];
  const [search, setSearch] = useState({
    page: searchParams.get("page") || 1,
    countOnPage: searchParams.get("countOnPage") || defaultCountOnPage,
    sort: searchParams.get("sort") || defaultSortBy,
    search: searchParams.get("search") || "",
  });
  const [searchText, setSearchText] = useState<string>(search.search ?? "");
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
  useEffect(() => {
    
    // read the params on component load and when any changes occur
    const currentParams = Object.fromEntries([...(searchParams as any)]);
    // get new values on change
    // console.log('-------useEffect:', currentParams);

    var find = {
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
    loadOrders(find);
}, [searchParams]);
  return (
    <div className="container-lg mx-auto mt-5">
      <div className={styles.title}>
        <h4>Order status</h4>
        <p>Check your orders</p>
      </div>
      <TableContainer component={Paper} sx={{ border: 1 }}>
        <Table sx={{ width: "100%" }} aria-label="customized table">
          <TableHead>
            <TableRow>
             
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Details</StyledTableCell>
              <StyledTableCell align="center">Client Name</StyledTableCell>
              <StyledTableCell align="center">Total</StyledTableCell>
             
           
              
           

              
            </TableRow>
          </TableHead>
          <TableBody>{OrdersList}</TableBody>
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
