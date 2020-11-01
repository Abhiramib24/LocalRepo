const initialState = {
  patient:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEW':
      return {
        ...state,
        patient:[...state.patient,action.patient]
      };
    default:
      return state;
  }
};
export default reducer;
