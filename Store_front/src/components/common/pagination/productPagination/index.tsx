import {
  Box,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import styles from "./index.module.scss";

interface PaginationProp {
  arrayRowPerPage: number[];
  onChangeCountOnerPage: (rowPerPage: number) => void;
  onChangePage: (page: number) => void;
  countPages: number;
  countOnPage?: number | string;
  currentPage?: number;
  siblingCount: number;
}
const ProductPagination: React.FC<PaginationProp> = ({
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
      <section className={`${styles.pagination_box}`}>
        <Pagination
          siblingCount={siblingCount}
          count={countPages}
          onChange={(event: React.ChangeEvent<unknown>, page: number) => {
            onChangePage(page);
          }}
          page={currentPage}
          shape="rounded"
          size="small"
          boundaryCount={2}
          className={`${styles.pagination_content}`}

        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography className={`${styles.showing_text}`}>{`Showing`}&nbsp;{`${Number(currentPage) * Number(countOnPage) - Number(countOnPage) + 1} – ${Number(currentPage) * Number(countOnPage)}`}</Typography>
          <Select
            hidden
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
      </section>
    </>
  );
};

export default ProductPagination;
