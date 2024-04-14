import axios from "axios";
import {
  CREATE_TEACHER,
  DELETE_TEACHER,
  EDIT_TEACHER,
  FETCH_TEACHERS_ERROR,
  FETCH_TEACHERS_REQUEST,
  FETCH_TEACHERS_SUCCESS,
  FILTER_TEACHER
} from "./teachersTypes";

export const fetchTeachersRequest = () => {
  return {
    type: FETCH_TEACHERS_REQUEST,
  };
};

export const fetchTeachersSuccess = (teachers) => {
  return {
    type: FETCH_TEACHERS_SUCCESS,
    payload: teachers,
  };
};

export const fetchTeachersError = (error) => {
  return {
    type: FETCH_TEACHERS_ERROR,
    payload: error,
  };
};

export const createTeacher = (teacher) => {
  return {
    type: CREATE_TEACHER,
    payload: teacher,
  };
};

export const deleteTeacher = (id) => {
  return {
    type: DELETE_TEACHER,
    payload: id,
  };
};

export const editTeacher = (updatedTeacher) => ({
  type: EDIT_TEACHER,
  payload: updatedTeacher,
});

export const fetchTeachers = () => {
  return async (dispatch, getState) => {
    dispatch(fetchTeachersRequest());
    const { teachers } = getState().teachers;
    if (!teachers.length) {
      axios
        .get("http://localhost:3001/teachers")
        .then((res) => {
          const data = res.data;
          dispatch(fetchTeachersSuccess(data));
        })
        .catch((err) => {
          dispatch(fetchTeachersError(err.message));
        });
    }
  };
};

// export const searchTeacher = (searched) => {
//   return {
//     type: SEARCH_TEACHER,
//     payload: searched,
//   };
// };
// export const filterLevelTeacher = (filtered) => {
//   return {
//     type: FILTER_LEVEL_TEACHER,
//     payload: filtered,
//   };
// };
export const filterTeacher = (filteringItems)=>{
  return{
    type: FILTER_TEACHER,
    payload: filteringItems
  }
}