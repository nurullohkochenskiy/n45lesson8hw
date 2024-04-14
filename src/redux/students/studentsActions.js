import axios from "axios";
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

export const fetchStudentsRequest = () => {
  return {
    type: FETCH_STUDENTS_REQUEST,
  };
};

export const fetchStudentsSuccess = (teachers) => {
  return {
    type: FETCH_STUDENTS_SUCCESS,
    payload: teachers,
  };
};

export const fetchStudentsError = (error) => {
  return {
    type: FETCH_STUDENTS_ERROR,
    payload: error,
  };
};

export const getStudent = (id) => {
  return {
    type: GET_STUDENT,
    payload: Number(id),
  };
};
export const createStudent = ({ firstname, lastname, group }) => {
  function findHighestId(students) {
    let highestId = 0;
    for (const student of students) {
      if (Number(student.id) > highestId) {
        highestId = student.id;
      }
    }
    return highestId;
  }
  return (dispatch, getState) => {
    const { students } = getState().students;
    const highestId = findHighestId(students);
    const studentData = {
      id: String(Number(highestId) + 1),
      firstname: firstname,
      lastname: lastname,
      group: group,
    };
    dispatch({
      type: CREATE_STUDENT,
      payload: studentData,
    });
  };
};
export const deleteStudent = (id) => {
  return {
    type: DELETE_STUDENT,
    payload: id,
  };
};

export const editStudent = (updatedStudent) => ({
  type: EDIT_STUDENT,
  payload: updatedStudent,
});

export const fetchStudents = () => {
  return async (dispatch, getState) => {
    dispatch(fetchStudentsRequest());
    const { students } = getState().students;
    if (!students.length) {
      axios
        .get("http://localhost:3001/students")
        .then((res) => {
          const data = res.data;
          dispatch(fetchStudentsSuccess(data));
        })
        .catch((err) => {
          dispatch(fetchStudentsError(err.message));
        });
    }
  };
};

export const filterStudent = (filteringItems) => {
    return {
      type: FILTER_STUDENT,
      payload: filteringItems,
    };
  };