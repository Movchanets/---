import { GroupFilterActions, GroupFilterActionType, IFilterGroupState } from "./types";


const initialState: IFilterGroupState = {
  list:[],
};

export const FilterGroupReducer = (
  state = initialState,
  action: GroupFilterActions
): IFilterGroupState => {
  switch (action.type) {
    case GroupFilterActionType.CREATE_GROUP_FILTER: {
      return {
        ...state,
        list: [...state.list , action.newGroupElement]
      };
    }
    default:
      return state;
  }
};