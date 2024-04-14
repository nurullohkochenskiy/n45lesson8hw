import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTeachers, filterTeacher } from "../../redux/teachers/teachersActions";
import Dashboard from "../../components/Dashboard";
import Teacherlist from "../../components/Teacherlist";
import { Button,  Stack } from "@mui/material";
import SearchTeacher from "../../components/SearchTeacher";
import FilterTeacher from "../../components/FilterTeacher";
import TransitionsModal from "../../components/Modal";

const Teachers = () => {
  const [filteringItems, setFilteringItems] = useState({
    search: "",
    levelFilt: "",
    groupPicker: [],
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeachers());
    
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
        <SearchTeacher filteringItems={filteringItems} setFilteringItems={setFilteringItems} />
        <TransitionsModal typeModal={"add"} namebtn = {"Add a teacher"}/>
          
        <FilterTeacher filteringItems={filteringItems} setFilteringItems={setFilteringItems} />
      </Stack>

      <Teacherlist filteringItems={filteringItems} />
    </Dashboard>
  );
};

export default Teachers;
