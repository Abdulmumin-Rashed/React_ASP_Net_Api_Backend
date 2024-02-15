import { CHANGE_PAGE, CHANGE_SIZE, SEARCH_DATA, SORT_DATA } from "./actions";

const reducer = (state, action) => {
  if (action.type === SEARCH_DATA) {
    return { ...state, searchQuery: action.query };
  }
  if (action.type === SORT_DATA) {
    return { ...state, sortColumn: action.column };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, currentPage: action.page };
  }
  if (action.type === CHANGE_SIZE) {
    return { ...state, pageSize: action.size };
  }
  throw new Error(`no matching "${action.type}" - action type`);
};
export default reducer;
