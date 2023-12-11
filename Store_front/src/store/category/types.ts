export interface ICategoryItem {
  id: number;
  name: string;
  image: string;
  parentId: number | null;
  IsDelete?: boolean;
  isRecommend: boolean;
  productCount: number;
}

export interface ICategoryList {
  key: number;
  label: string;
  data: ICategoryItem;
  children: Array<ICategoryList>;
}

export interface ICategoryState {
  list: Array<ICategoryList>;
  selectCategory?: ICategoryItem;
  childList: Array<ICategoryItem>;
}

export interface ICategoryCreateItem {
  name: string;
  parentID: number | string | null;
  // isRecommended: boolean;
  image: string;
}

export interface ICategoryEditItem {
  id: number | string;
  name: string;
  parentId: number | string | null;
  // isRecommended: boolean;
  image?: string;
}

export enum CategoryActionType {
  CATEGORY_LIST = "CATEGORY_LIST",
  LOAD_CURRENT_CATEGORY_CHILDREN = "LOAD_CURRENT_CATEGORY_CHILDREN",
  GET_CATEGORY_BY_ID = "GET_CATEGORY_BY_ID",
  CATEGORY_CREATE = "CATEGORY_CREATE",
  CATEGORY_UPDATE = "CATEGORY_UPDATE",
  CATEGORY_REMOVE = "CATEGORY_REMOVE",
  START_REQUEST = "START_REQUEST",
  SERVER_ERROR = "SERVER_ERROR",
}

export interface GetCategoriesAction {
  type: CategoryActionType.CATEGORY_LIST;
  payload: ICategoryState;
}

export interface CategoryUpdateAction {
  type: CategoryActionType.CATEGORY_UPDATE;
  payload: ICategoryItem;
}

export interface CategoryCreateAction {
  type: CategoryActionType.CATEGORY_CREATE;
}

export interface CategoryRemoveAction {
  type: CategoryActionType.CATEGORY_REMOVE;
}

export interface GetCategoryByIdAction {
  type: CategoryActionType.GET_CATEGORY_BY_ID;
  payload: ICategoryItem;
}

export interface GetCategoryChildrenAction {
  type: CategoryActionType.LOAD_CURRENT_CATEGORY_CHILDREN;
  payload: Array<ICategoryItem>;
}

export interface StartRequestAction {
  type: CategoryActionType.START_REQUEST;
}

export interface ServerErrorAction {
  type: CategoryActionType.SERVER_ERROR;
}

export type CategoryActions =
  | CategoryCreateAction
  | CategoryUpdateAction
  | CategoryRemoveAction
  | GetCategoriesAction
  | GetCategoryByIdAction
  | StartRequestAction
  | GetCategoryChildrenAction
  | ServerErrorAction;
