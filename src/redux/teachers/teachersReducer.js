import {
  FETCH_TEACHERS_ERROR,
  FETCH_TEACHERS_REQUEST,
  FETCH_TEACHERS_SUCCESS,
  CREATE_TEACHER,
  DELETE_TEACHER,
  EDIT_TEACHER,
  FILTER_TEACHER,
} from "./teachersTypes";

const initialState = {
  loading: false,
  error: "",
  teachers: JSON.parse(localStorage.getItem("teachers")) || [],
  inpVal: "",
  filtered: [],
  filteredStatus: false,
};

const teachersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEACHERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TEACHERS_SUCCESS:
      localStorage.setItem("teachers", JSON.stringify(action.payload));
      return {
        loading: false,
        teachers: action.payload,
        error: "",
      };
    case FETCH_TEACHERS_ERROR:
      return {
        loading: false,
        teachers: [],
        error: action.payload,
      };
    case CREATE_TEACHER:
      const newTeachers = [...state.teachers, action.payload];
      localStorage.setItem("teachers", JSON.stringify(newTeachers));
      return {
        ...state,
        teachers: newTeachers,
      };
    case DELETE_TEACHER:
      const newList = state.teachers.filter(
        (teacher) => teacher.id !== action.payload
      );
      localStorage.setItem("teachers", JSON.stringify(newList));
      return {
        ...state,
        teachers: newList,
      };
    case EDIT_TEACHER:
      return {
        ...state,
        teachers: state.teachers.map((teacher) =>
          teacher.id === action.payload.id ? action.payload : teacher
        ),
      };
    //! Filter start
    case FILTER_TEACHER:
      const shorten = action.payload;
      console.log(shorten);
      if (
        shorten.search.length > 0 ||
        shorten.levelFilt.length > 0 ||
        shorten.groupPicker.length > 0
      ) {
        const filteredItems = state.teachers.filter((teacher) => {
          const searchingItems = [
            teacher.firstname,
            teacher.lastname,
            teacher.level,
            teacher.groups.join(""),
          ];
          const filteringLevel = teacher.level.toLowerCase();
          const filteringGroups = teacher.groups.map((group) =>
            group.toLowerCase()
          );

          let smatches = true;
          let lmatches = true;
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
          //! Level filter
          if (shorten.levelFilt) {
            const levelMatches = filteringLevel.includes(
              shorten.levelFilt.toLowerCase()
            );
            if (levelMatches) {
              lmatches = true;
            } else {
              lmatches = false;
            }
          }
          //! Group filter
          if (shorten.groupPicker) {
            const groupMatches = shorten.groupPicker.every((group) =>
              filteringGroups.includes(group.toLowerCase())
            );
            console.log(filteringGroups);
            if (groupMatches) {
              gmatches = true;
            } else {
              gmatches = false;
            }
          }
          let res = true;
          if (smatches == false || lmatches == false || gmatches == false) {
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
export default teachersReducer;
