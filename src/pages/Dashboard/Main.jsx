import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../redux/students/studentsActions";
import { fetchTeachers } from "../../redux/teachers/teachersActions";
// import { useAuth } from "../../components/Auth";
const Main = () => {
  //   const { user } = useAuth();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchStudents());
    
  }, [dispatch]);
  return (
    <Dashboard>
      <Typography variant="h3" mt={10} mx={"auto"}>
        Hello {user.username}
      </Typography>
    </Dashboard>
  );
};

export default Main;
