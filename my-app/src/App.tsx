import axios from "axios";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
// import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel"
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import {
  TextField,
  InputLabel,
  FormControl,
  ImageList,
  ImageListItem,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";

import Stack from "@mui/material/Stack";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// When using TypeScript 4.x and above
import type {} from "@mui/x-date-pickers/themeAugmentation";

import "./App.css";

function App() {
  // Declare a new state variable, which we'll call "pokemonName"

  const [roverName, setRoverName] = useState("curiosity");
  const [roverDate, setRoverDate] = useState<Date | null>(
    new Date("2021-03-26")
  );

  const handleChange = (event: SelectChangeEvent) => {
    setRoverName(event.target.value as string);
  };
  const handleDateChange = (newValue: Date | null) => {
    setRoverDate(newValue);
  };

  const [roverInfo, setroverInfo] = useState<undefined | string[]>(undefined);
  const ROVER_BASE_API_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
  const API_KEY = "hiy3UTIT1hXjjOhGekEKfFer0s8fSHsM7kIjG9s6";

  // search function that runs when the page loads
  const { format } = require("date-fns");
  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="sticky"
            sx={{
              bgcolor: "background.paper",
              boxShadow: 1,
              p: 2,
              minWidth: 300,
            }}
          >
            <Toolbar>
              <Typography variant="h4" component="span" sx={{ flexGrow: 1 }}>
                Mars Rover Image Search
              </Typography>

              <FormControl sx={{ mx: 2 }}>
                <InputLabel id="demo-simple-select-label">Rover</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={roverName}
                  label="Rover"
                  onChange={handleChange}
                >
                  <MenuItem value={"curiosity"}>Curiosity</MenuItem>
                  <MenuItem value={"opportunity"}>Opportunity</MenuItem>
                  <MenuItem value={"spirit"}>Spirit</MenuItem>
                </Select>
              </FormControl>
              {/* Date for rover */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date of Photos"
                  inputFormat="dd/MM/yyyy"
                  value={roverDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <Button
                variant="contained"
                endIcon={<SearchIcon />}
                onClick={() => {
                  search();
                }}
                sx={{ mx: 2 }}
              >
                Search
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </div>

      {roverInfo && roverInfo.length !== 0 ? (
        <ImageList cols={3}>
          {roverInfo.map((item) => (
            <ImageListItem key={item}>
              <img src={`${item}`} alt={"The image g"} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <p>Not found</p>
      )}
    </div>
  );

  function search() {
    axios
      .get(
        ROVER_BASE_API_URL +
          roverName +
          "/photos?earth_date=" +
          `${format(roverDate, "yyyy-MM-dd")}` +
          "&api_key=" +
          API_KEY
      )
      .then((res) => {
        setroverInfo(
          res.data.photos.map((item: { img_src: string }) => item.img_src)
        );
      })
      .catch((err) => {
        console.log(err);
        console.log("Rover information not found");
        setroverInfo(undefined);
      });
  }
}

export default App;
