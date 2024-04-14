import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { filterTeacher } from "../redux/teachers/teachersActions";
import { filterStudent } from "../redux/students/studentsActions";

const SearchBar = ({ filteringItems, setFilteringItems }) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterTeacher(filteringItems));
    // dispatch(filterStudent(filteringItems))
  }, [dispatch, filteringItems]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const newFilteringItems = { ...filteringItems, search: e.target.value };
    setFilteringItems(newFilteringItems);
  };

  return (
    <>
      <TextField
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={search}
        onChange={handleSearch}
      />
    </>
  );
};

export default SearchBar;
