import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "10px",
  width: 500,
  bgcolor: "background.paper",
  p: 4,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [levelFilt, setLevelFilt] = React.useState("");
  const [groupPicker, setGroupPicker] = React.useState([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const groups = ["n45", "n46"];
  const handleChangeLevel = (e) => {
    setLevelFilt(e.target.value);
    // setFilteringItems({ ...filteringItems, levelFilt: e.target.value });
  };
  const handleChangeGroups = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    // setFilteringItems({ ...filteringItems, groupPicker: value });
    setGroupPicker(typeof value === "string" ? value.split(",") : value);
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
  }
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add a teacher
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box component="form" onSubmit={handleSubmit} sx={style} >
            <TextField
              sx={{ width: "100%" }}
              required
              id="outlined-required"
              label="Firstname"
            />
            <TextField
              sx={{ mt: 2, width: "100%" }}
              required
              id="outlined-required"
              label="Lastname"
            />
            <Box mt={2} display={"flex"} alignItems={"center"} gap={"20px"}>
              <Typography>Choose level:</Typography>
              {/* <InputLabel id="demo-multiple-checkbox-label">Level</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                placeholder="Choose level"
                id="demo-simple-select"
                value={levelFilt}
                label="level"
                onChange={handleChangeLevel}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Junior"}>Junior</MenuItem>
                <MenuItem value={"Middle"}>Middle</MenuItem>
                <MenuItem value={"Senior"}>Senior</MenuItem>
              </Select>
            </Box>
            <Box mt={2} display={"flex"} alignItems={"center"} gap={"20px"}>
              <Typography>Choose groups:</Typography>
              <Select
                multiple
                value={groupPicker}
                onChange={handleChangeGroups}
                input={<OutlinedInput label="Groups" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {groups.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={groupPicker.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
