import axios from "axios";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
// import TextField from "@mui/material/TextField";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel"
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import RoverList from "./RoverList";
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
  styled,
  Paper,
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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [roverInfo, setroverInfo] = useState<undefined | string[]>(undefined);
  const ROVER_BASE_API_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
  const API_KEY = "hiy3UTIT1hXjjOhGekEKfFer0s8fSHsM7kIjG9s6";
  const { format } = require("date-fns");
  const [pageView, setPageView] = useState<"home" | "notFound" | "results">(
    "home"
  );
  // search function that runs when the page loads

  // useEffect(() => {
  //   search();
  // }, []);

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
              {/* Title for React app */}

              <Typography
                variant="h4"
                component="span"
                sx={{ flexGrow: 1, cursor: "pointer" }}
                onClick={() => setPageView("home")}
              >
                Mars Rover Image Search
              </Typography>

              {/* Rover Selection */}

              <FormControl sx={{ mx: 2 }}>
                <InputLabel id="demo-simple-select-label">Rover</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={roverName}
                  label="Rover"
                  onChange={handleChange}
                >
                  <MenuItem value={"perseverance"}>Perseverance</MenuItem>
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

              {/* Search button */}

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

      {/* Image placement, if no images show "Not Found" */}

      {/* {roverInfo && roverInfo.length !== 0 ? ( */}
      {pageView == "results" && (
        <ImageList cols={3}>
          {roverInfo!.map((item) => (
            <ImageListItem key={item}>
              <img src={`${item}`} alt={"The image g"} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      )}

      {/* ) : ( */}
      {pageView == "notFound" && (
        <div>
          <Typography variant="h2" align="center" marginTop={2}>
            Not Found
          </Typography>
          <Typography align="center" marginTop={4}>
            Either {roverName} didn't take any pictures on the day specified, or
            it wasnt operational at that time. Below is the times that the
            different mars rovers were operational. Please enter a different
            time or rover and search again.
          </Typography>
          <RoverList></RoverList>
        </div>
      )}
      {pageView == "home" && (
        <div>
          <Typography variant="h2" align="center" marginTop={2}>
            Welcome to the Mars Rover Image Search!
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{ display: "inline-block" }}
              marginTop={4}
              maxWidth={700}
            >
              This is a Mars Rover Image Search made my Max Couling using one of
              NASA’s RESTful API’s. First you select what rover you would like
              to see the images for, then you pick the date of when you would
              like to see the images. This can be any date that the rover has
              taken photos, could be a birthday, wedding date or anything. Using
              this react web app, you can see what the rovers on mars took a
              picture of on that day.
            </Typography>
          </Box>
          <RoverList></RoverList>
        </div>
      )}

      {/* )} */}
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
        if (res.data.photos.length > 0) setPageView("results");
        else setPageView("notFound");
      })
      .catch((err) => {
        console.log(err);
        console.log("Rover information not found");
        setPageView("notFound");
        setroverInfo([]);
      });
  }
}

export default App;
