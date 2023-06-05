const NoteReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_NOTE_LOAD":
      return {
        ...state,
        loading: true,
      };
    case "GET_ALL_NOTE_LOAD_FAIL":
      return {
        ...state,
        loading: false,
      };
    case "GET_ALL_NOTE_SUCCESS":
      return {
        ...state,
        loading: false,
        AllNotes: action.payload,
      };
    case "GET_ALL_NOTE_FAIL":
      return {
        ...state,
        loading: false,
        Error: action.payload,
      };

    //   -------------create Note
    case "CREATE_NOTE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "CREATE_NOTE_Fail":
      return {
        ...state,
        loading: false,
      };
    case "CREATE_NOTE_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "CREATE_NOTE_FAIL":
      return {
        ...state,
        loading: false,
        Error: action.payload,
      };

    // ------------------- delet Note
    case "DELETE_NOTE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_NOTE_Fail":
      return {
        ...state,
        loading: false,
      };
    case "DELETE_NOTE_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "DELETE_NOTE_FAIL":
      return {
        ...state,
        loading: false,
        Error: action.payload,
      };

    // ----------- get single note
    case "GET_SINGLE_NOTE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_SINGLE_NOTE_Fail":
      return {
        ...state,
        loading: false,
      };
    case "GET_SINGLE_NOTE_SUCCESS":
      return {
        ...state,
        loading: false,
        singleNote: action.payload,
      };
    case "GET_SINGLE_NOTE_FAIL":
      return {
        ...state,
        loading: false,
        Error: action.payload,
      };

    // -------------- update note
    case "UPDATE_NOTE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_NOTE_Fail":
      return {
        ...state,
        loading: false,
      };
    case "UPDATE_NOTE_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "UPDATE_NOTE_FAIL":
      return {
        ...state,
        loading: false,
        Error: action.payload,
      };

    default:
      return state;
  }
};
export default NoteReducer;
