import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchStudents, filterStudent } from "../../redux/students/studentsActions";
import Dashboard from "../../components/Dashboard";
import Teacherlist from "../../components/Teacherlist";
import {  Stack } from "@mui/material";

import FilterTeacher from "../../components/FilterTeacher";
import TransitionsModal from "../../components/Modal";
import SearchBar from "../../components/SearchBar";

const Students = () => {
  const [filteringItems, setFilteringItems] = useState({
    search: "",
    groupFilt: [],
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudents());
    
  }, [dispatch]);
  
  
  
  return (
    <Dashboard>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        mb={5}
      >
        <SearchBar filteringItems={filteringItems} setFilteringItems={setFilteringItems} />
        <TransitionsModal typeModal={"add"} namebtn = {"Add a student"}/>
          
        <FilterTeacher filteringItems={filteringItems} setFilteringItems={setFilteringItems} />
      </Stack>

      <Teacherlist filteringItems={filteringItems} />
    </Dashboard>
  );
};

export default Students;
