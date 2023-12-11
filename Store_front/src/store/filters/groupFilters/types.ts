
export interface ICreateFilterGroupItem {
    FilterNameId: number;
    NewFilterValuesIdList: Array<number>;
    RemoveFilterValuesIdList: Array<number>;
}


export interface IFilterGroupState {
    list: Array<ICreateFilterGroupItem>;
  }

  
  export enum GroupFilterActionType {
    CREATE_GROUP_FILTER = "CREATE_GROUP_FILTER",

  }
  
  export interface CreateGroupFilterAction {
    type: GroupFilterActionType.CREATE_GROUP_FILTER;
    newGroupElement:ICreateFilterGroupItem

  }
  
  
  export type GroupFilterActions =
    | CreateGroupFilterAction
