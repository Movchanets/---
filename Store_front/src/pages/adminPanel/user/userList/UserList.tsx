import React, { useEffect, useState } from "react";
import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { IResponseSearch, ISearch } from "../../../../store/users/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import PaginationMUI from "../../../../components/common/pagination/singlePaginationMui";
import qs from "qs";
import { filterNonNull } from "../../../../helpers/helpers";
import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import UserMenuActions from "../../../../components/common/dialogMenu/UserMenuActions";

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

var countOnPage = 5;

const UserList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { GetUserSearchParams, BlockUser } = useActions();
  const { payload, pages, currentPage } = useTypedSelector(
    (store) => store.userSearch as IResponseSearch
  );
  const [searchString, setSearchString] = useState<string>("");
  const [search, setSearch] = useState<ISearch>({
    page: searchParams.get("page") || 1,
    countOnPage: searchParams.get("countOnPage") || countOnPage,
    sort: searchParams.get("sort") || "",
    search: searchParams.get("search") || "",
  });

  const [blockedUser, setBlockedUser] = useState<boolean>(false);

  const LoadUsers = async (find: ISearch) => {
    try {
      await GetUserSearchParams(find);
    } catch (error: any) {
      // console.log(error);
    }
  };

  const SetParamsValues = (find: ISearch) => {
    setSearch(find);
    countOnPage =
      Object.fromEntries([...(searchParams as any)]).countOnPage || countOnPage;
    setSearchString(find.search || "");
  };

  useEffect(() => {
    // read the params on component load and when any changes occur
    const currentParams = Object.fromEntries([...(searchParams as any)]);
    // get new values on change
    // console.log('-------useEffect:', currentParams);

    var find: ISearch = {
      page: currentParams.page || 1,
      countOnPage: currentParams.countOnPage || countOnPage,
      sort: currentParams.sort || "",
      search: currentParams.search || "",
    };

    SetParamsValues(find);
    LoadUsers(find);
  }, [searchParams, blockedUser]);

  const handlerUserProfile = (id: number) => {
    navigate(`/admin/users/editeProfile/${id}`);
  };

  const handlerBlockUser = async (email: string) => {
    try {
      console.log("Click", blockedUser);
      await BlockUser(email);
      //triger for reefresh
      setBlockedUser((prev) => !prev);
    } catch (err: any) {}
  };

  const handlerSearch = () => {
    setSearch({ ...search, search: searchString, page: 1 });
    setSearchParams(
      "?" +
        qs.stringify(
          filterNonNull({ ...search, search: searchString, page: 1 })
        )
    );
  };

  const onChangeSearchString = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    event.preventDefault();
    setSearchString(event.target.value);
  };

  const onPageChangeHandler = (page: number) => {
    // console.log("Page: ", page);
    setSearch({ ...search, page: page });
    setSearchParams(
      "?" + qs.stringify(filterNonNull({ ...search, page: page }))
    );
  };

  const onCountOnPageChangeHandler = (num: number) => {
    setSearch({ ...search, page: 1, countOnPage: num });
    setSearchParams(
      "?" +
        qs.stringify(filterNonNull({ ...search, page: 1, countOnPage: num }))
    );
  };

  const userList = payload.map((user, index) => (
    <StyledTableRow key={index}>
      <StyledTableCell component="th" scope="row">
        {user.firstName}
      </StyledTableCell>
      <StyledTableCell align="center">{user.lastName}</StyledTableCell>
      <StyledTableCell align="center">{user.email}</StyledTableCell>
      <StyledTableCell align="center">
        {user.userRoles?.map((role, index) => (
          <Typography key={"roel_" + index}>{role}</Typography>
        ))}
      </StyledTableCell>
      <StyledTableCell align="center">
        {user.isBlocked ? (
          <BlockIcon fontSize="large" sx={{ color: "red" }} />
        ) : (
          <CheckCircleOutlineIcon fontSize="large" sx={{ color: "green" }} />
        )}
      </StyledTableCell>
      <StyledTableCell align="center">
        {/* Menu for each user */}
        <UserMenuActions
          user={user}
          callbackProfile={handlerUserProfile}
          callbackBlock={handlerBlockUser}
        />
      </StyledTableCell>
    </StyledTableRow>
  ));

  return (
    <div style={{ margin: 10 }}>
      <FormControl fullWidth className="my-2" variant="outlined">
        <InputLabel>Search</InputLabel>
        <OutlinedInput
          type="text"
          value={searchString}
          onChange={onChangeSearchString}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handlerSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Search"
        />
      </FormControl>

      <TableContainer component={Paper} sx={{ border: 1 }}>
        <Table sx={{ width: "100%" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Surname</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Roles</StyledTableCell>
              <StyledTableCell align="center">Is blocked</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{userList}</TableBody>
        </Table>
        <PaginationMUI
          arrayRowPerPage={[2, 3, 5, 10, 15, 20]}
          onChangeCountOnerPage={onCountOnPageChangeHandler}
          onChangePage={onPageChangeHandler}
          countPages={pages ?? 0}
          countOnPage={countOnPage}
          siblingCount={3}
          currentPage={currentPage}
        />
      </TableContainer>
    </div>
  );
};
export default UserList;
