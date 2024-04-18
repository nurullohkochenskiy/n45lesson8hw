import {
  GET_STUDENT,
  CREATE_STUDENT,
  DELETE_STUDENT,
  EDIT_STUDENT,
  FETCH_STUDENTS_ERROR,
  FETCH_STUDENTS_REQUEST,
  FETCH_STUDENTS_SUCCESS,
  FILTER_STUDENT,
} from "./studentsTypes";

const initialState = {
  loading: false,
  error: "",
  students: JSON.parse(localStorage.getItem("students")) || [],
  inpVal: "",
  filtered: [],
  filteredStatus: false,
  foundStudent: {},
};

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_STUDENTS_SUCCESS:
      return {
        loading: false,
        students: action.payload,
        error: "",
      };
    case FETCH_STUDENTS_ERROR:
      return {
        loading: false,
        students: [],
        error: action.payload,
      };
    case GET_STUDENT:
      const foundStudent = state.students.find(
        (student) => student.id == action.payload
      );
      return {
        ...state,
        foundStudent: foundStudent,
      };
    case CREATE_STUDENT:
      const newStudents = [...state.students, action.payload];
      localStorage.setItem("students", JSON.stringify(newStudents));
      return {
        ...state,
        students: newStudents,
      };
    case DELETE_STUDENT:
      const newList = state.students.filter(
        (student) => student.id !== action.payload
      );
      localStorage.setItem("students", JSON.stringify(newList));
      return {
        ...state,
        students: newList,
      };
    case EDIT_STUDENT:
      const ListAfterEdit = state.students.map((student) =>
        student.id === action.payload.id ? action.payload : student
      );
      localStorage.setItem("students", JSON.stringify(ListAfterEdit));
      return {
        ...state,
        students: ListAfterEdit,
      };
    //! Filter start
    case FILTER_STUDENT:
      const shorten = action.payload;
      console.log(shorten);
      if (shorten.search.length > 0 || shorten.groupFilt.length > 0) {
        const filteredItems = state.students.filter((student) => {
          const searchingItems = [
            student.firstname,
            student.lastname,
            student.group,
          ];
          const filteringGroup = student.group;

          let smatches = true;
          let gmatches = true;
          //! Search filter
          if (shorten.search) {
            const searchMatches = searchingItems.some((item) => {
              return item.toLowerCase().includes(shorten.search.toLowerCase());
            });
            if (searchMatches) {
              smatches = true;
            } else {
              smatches = false;
            }
          }
          //! Group filter
          if (shorten.groupFilt) {
            const groupMatches = filteringGroup.includes(
              shorten.groupFilt.toLowerCase()
            );
            if (groupMatches) {
              gmatches = true;
            } else {
              gmatches = false;
            }
          }
          let res = true;
          if (smatches == false || gmatches == false) {
            res = false;
          }
          return res;
        });
        return {
          ...state,
          filteredStatus: true,
          filtered: filteredItems,
        };
      } else {
        return {
          ...state,
          filteredStatus: false,
        };
      }
    //! Filter end
    default:
      return state;
  }
};
export default studentsReducer;
