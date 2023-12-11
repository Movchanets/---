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

import PaginationMUI from "../../../../components/common/pagination/singlePaginationMui";
import { filterNonNull } from "../../../../helpers/helpers";
import qs from "qs";

import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { IDetail, IOrderSearch } from "../../../../store/orders/types";
import OrderMenuActions from "../../../../components/common/dialogMenu/OrderMenuActions";

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



const OrdersList: React.FC = () => {
  const { pages, orders } = useTypedSelector((store) => store.order.list);
  const {
    GetOrdersList,
 
    RemoveOrder,
  } = useActions();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  var defaultCountOnPage = 5;
  const defaultSortBy = "Name";

  const [deleteItem, setDeleteItem] = useState<boolean>(false);
  const defaultSortValues = ["Name", "UserId", "Price"];
  const [search, setSearch] = useState({
    page: searchParams.get("page") || 1,
    countOnPage: searchParams.get("countOnPage") || defaultCountOnPage,
    sort: searchParams.get("sort") || defaultSortBy,
    search: searchParams.get("search") || "",
  });
  const [searchText, setSearchText] = useState<string>(search.search ?? "");
  const checkSortValue = () => {
    if (search.sort && !defaultSortValues.includes(search.sort)) {
      setSearch({ ...search, sort: defaultSortBy });
      setSearchParams(
        "?" + qs.stringify(filterNonNull({ ...search, sort: defaultSortBy }))
      );
    }
  };


  const loadOrders = async (find: IOrderSearch) => {
    try {
      await GetOrdersList(find);
   
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
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
  }, [searchParams, deleteItem]);


  const onEditOrderHandler = (id: number) => {
    navigate(`/admin/orders/edit/${id}`);
  };

  const onRemoveOrderHandler = async (id: number) => {
    try {
      console.log(orders);
     // await RemoveOrder(id);
     // setDeleteItem((current) => !current);
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
      <StyledTableCell align="center">{row?.user?.phoneNumber}</StyledTableCell>
    

     
      
      <StyledTableCell align="center">
        {/* Menu for each product */}
        <OrderMenuActions
          order={row}
        
          removeFunc={onRemoveOrderHandler}
        />
      </StyledTableCell>
    </StyledTableRow>
  ));

  return (
    <div style={{ margin: 10 }}>
   
      {/* Пошук */}
      
      {/* Таблиця */}
      <TableContainer component={Paper} sx={{ border: 1 }}>
        <Table sx={{ width: "100%" }} aria-label="customized table">
          <TableHead>
            <TableRow>
             
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Details</StyledTableCell>
              <StyledTableCell align="center">Client Name</StyledTableCell>
              <StyledTableCell align="center">Total</StyledTableCell>
              <StyledTableCell align="center">Phone</StyledTableCell>
           
              
           

              <StyledTableCell align="center">More</StyledTableCell>
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

export default OrdersList;
