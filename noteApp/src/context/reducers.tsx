const reducers = (state, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return {...state, categories: action.payload};
    case 'GET_NOTES':
      return {...state, notes: action.payload};
    case 'SET_CATEGORY':
      return {...state, currentCategory: action.payload};
    case 'INSERT_CATEGORY':
      return {...state, categories: [action.payload, ...state.categories]};
    case 'DELETE_CATEGORY':
      const filteredCategories = state.categories.filter(
        e => e._id !== action.payload,
      );
      return {...state, categories: filteredCategories};
    case 'DELETE_NOTE':
      const filteredNotes = state.notes.filter(e => e._id !== action.payload);
      return {...state, notes: filteredNotes};
    case 'INSERT_NOTE':
      return {...state, notes: [action.payload, ...state.notes]};
    case 'UPDATE_NOTE':
      const index = state.notes.findIndex(e => e._id === action.payload._id);

      state.notes[index] = action.payload;
      return {...state};
    default:
      return state;
  }
};
export default reducers;
