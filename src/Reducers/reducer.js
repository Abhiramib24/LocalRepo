const initialState = {
  fname: [],
  age: [],
  place: [],
  contactnum: [],
  doctorname: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEW':
      return {
        ...state,

        fname: [...state.fname, action.name],
        age: [...state.age, action.age],
        place: [...state.place, action.place],
        contactnum: [...state.contactnum, action.contactnum],
        doctorname: [...state.doctorname, action.doctorname],
      };
    default:
      return state;
  }
};
export default reducer;
