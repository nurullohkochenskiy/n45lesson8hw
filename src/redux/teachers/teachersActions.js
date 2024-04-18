import axios from "axios";
import {
  GET_TEACHER,
  CREATE_TEACHER,
  DELETE_TEACHER,
  EDIT_TEACHER,
  FETCH_TEACHERS_ERROR,
  FETCH_TEACHERS_REQUEST,
  FETCH_TEACHERS_SUCCESS,
  FILTER_TEACHER,
} from "./teachersTypes";

export const fetchTeachersRequest = () => {
  return {
    type: FETCH_TEACHERS_REQUEST,
  };
};

export const fetchTeachersSuccess = (teachers) => {
  localStorage.setItem("teachers", JSON.stringify(teachers));
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
export const getTeacher = (id) => {
  return {
    type: GET_TEACHER,
    payload: Number(id),
  };
};
export const createTeacher = ({ firstname, lastname, level, groups }) => {
  function findHighestId(teachers) {
    let highestId = 0;
    for (const teacher of teachers) {
      if (Number(teacher.id) > highestId) {
        highestId = teacher.id;
      }
    }
    return highestId;
  }
  return (dispatch, getState) => {
    const { teachers } = getState().teachers;
    const highestId = findHighestId(teachers);
    const teacherData = {
      id: String(Number(highestId) + 1),
      firstname: firstname,
      lastname: lastname,
      level: level,
      groups: groups,
    };
    dispatch({
      type: CREATE_TEACHER,
      payload: teacherData,
    });
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

export const filterTeacher = (filteringItems) => {
  return {
    type: FILTER_TEACHER,
    payload: filteringItems,
  };
};
