import {
  Box,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

interface PaginationProp {
  arrayRowPerPage: number[];
  onChangeCountOnerPage: (rowPerPage: number) => void;
  onChangePage: (page: number) => void;
  countPages: number;
  countOnPage?: number | string;
  currentPage?: number;
  siblingCount: number;
}
const PaginationMUI: React.FC<PaginationProp> = ({
  onChangePage,
  countPages,
  countOnPage,
  currentPage,
  siblingCount,
  arrayRowPerPage,
  onChangeCountOnerPage: onChangeRowPerPage,
}) => {
  return (
    <>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingY: "4px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>{`Count on page:`}&nbsp;</Typography>
          <Select
            labelId="rowsPerPage_lable"
            id="id_rowsPerPage"
            value={countOnPage as number}
            label="rowPerPage"
            onChange={(
              event: SelectChangeEvent<number>,
              child: React.ReactNode
            ) => {
              onChangeRowPerPage(event.target.value as number);
            }}
            size="small"
          >
            {arrayRowPerPage.map((number, index) => (
              <MenuItem key={index} value={number}>
                {number}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Pagination
          siblingCount={siblingCount}
          count={countPages as number}
          onChange={(event: React.ChangeEvent<unknown>, page: number) => {
            onChangePage(page);
          }}
          page={currentPage}
          variant="outlined"
          shape="rounded"
        />
      </Paper>
    </>
  );
};

export default PaginationMUI;
