import { useLocation, useNavigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useEffect } from "react";


import { IFilterSearch } from "../../../store/products/types";
import { useUrlProductListSearch } from "../../../hooks/useUrlProductListSearch";
import ProductPagination from "../../../components/common/pagination/productPagination";
import ProductCard from "../../../components/common/productCommon/card";
import FilterListCommon from "../../../components/common/filter";
import styles from "./index.module.scss";

import { DefaultSelectMenu } from "../../../components/common/SelectMenu/default/DefaultSelectMenu";

const ProductListPage: React.FC = () => {

  const { pages, products, totalElements } = useTypedSelector(
    (store) => store.product.list
  );
const { list } = useTypedSelector((store) => store.filterNames);
  const { GetProductListByFilter, GetAllFilterNames, SetFavoriteProduct } = useActions();

  const urlLocation = useLocation();
  const navigate = useNavigate();

  const { searchValue, setSearchValue, getProductDetailsLink } = useUrlProductListSearch(
    urlLocation.search
  );
  const onClickFilter = (id: number, value: string, checked: boolean) => {
    var newArr = [...searchValue.values];
    checked ? newArr.push(id) : (newArr = newArr.filter((e) => e != id));

    setSearchValue({ ...searchValue, values: newArr });
  };
  const loadProductsFilter = async (searchParams: IFilterSearch) => {
    try {
      console.log("searchParams: ", searchParams);
      await GetProductListByFilter(searchParams);
      await GetAllFilterNames();
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  useEffect(() => {
    loadProductsFilter(searchValue);
  }, [searchValue]);

  const checkSortValue = (value: string) => {
    setSearchValue({ ...searchValue, sort: value });
  };

  const onPageChangeHandler = (page: number) => {
    setSearchValue({ ...searchValue, page: page });
  };

  const onCountOnPageChangeHandler = (num: number) => {
    setSearchValue({ ...searchValue, page: 1, countOnPage: num });
  };

  const onClickDetailsHandler = (id: number, categoryName: string) => {
    const navlink = getProductDetailsLink(id, categoryName);

    navigate(navlink);
  };

  const onClickSaveHandler = async (id: number) => {
    try {
      await SetFavoriteProduct(id);
    } catch (error) {
      console.error("Щось пішло не так, ", error);
    }
  };

  const ProductsList = products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
      clickCallback={onClickDetailsHandler}
      clickSaveCallback={onClickSaveHandler}
    />
  ));

  return (
   <>    
      <div className="container mt-3">
        <div className="row justify-content-center g-3">
        <div className="row justify-content-center g-3">
          <div className={`col-md-3 ${styles.left_col}`}>
            <div className="row ">
             
              <FilterListCommon
                filters={list}
                checkedFilters={searchValue.values}
                callback={onClickFilter}
              />
            </div>
          </div>
          <div className="col-md-7">
            <div className={styles.header_list}>
              {/* Found */}
              <h2>{`${
                searchValue.categoryName
              }: ${totalElements} products found`}</h2>
              {/* Sort by: */}
              <div>
                <DefaultSelectMenu
                  textBeforeSelect="Sort by: "
                  selectable={[
                    "Price",
                    "Quantity",
                    "Name (A to Z)",
                    "Date",
                                      ]}
                  onSelectValue={(value: any) => checkSortValue(value)}
                  currentValue={searchValue.sort}
                  className={`${styles.sort}`}
                />
              </div>
            </div>
            {/*  */}
            {ProductsList.length !== 0 ? (
              ProductsList
            ) : (
              <h2 className="text-center">Product not found</h2>
            )}

            <div className="mt-2">
              <ProductPagination
                arrayRowPerPage={[20]}
                onChangeCountOnerPage={onCountOnPageChangeHandler}
                onChangePage={onPageChangeHandler}
                countPages={pages}
                countOnPage={searchValue.countOnPage}
                siblingCount={2}
                currentPage={Number(searchValue.page)}
              />
         </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};



export default ProductListPage;
