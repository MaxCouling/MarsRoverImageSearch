import axios from "axios";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Stack from '@mui/material/Stack';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// When using TypeScript 4.x and above
import type {} from '@mui/x-date-pickers/themeAugmentation';

import "./App.css";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';


function App() {
  // Declare a new state variable, which we'll call "pokemonName"
  

  const [roverName, setRoverName] = useState("curiosity");
  const [roverDate, setRoverDate] = useState<Date | null>(
    new Date('2014-08-18'),);
  
  const handleChange = (event: SelectChangeEvent) => {
    setRoverName(event.target.value as string);
  
    
  };
  const handleDateChange = (newValue: Date | null) => {
    setRoverDate(newValue);
  };
  
  const [roverInfo, setroverInfo] = useState<undefined | any>(undefined)
  const ROVER_BASE_API_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
  const API_KEY = "hiy3UTIT1hXjjOhGekEKfFer0s8fSHsM7kIjG9s6"
  const {format} = require('date-fns');
  
  return (
    <div>
      <h1>Mars Rover Image Search</h1>

      <div>
        
        <FormControl fullWidth>
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
    
        <DesktopDatePicker
          label="Date of Photos"
          inputFormat="MM/dd/yyyy"
          value={roverDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        
        </LocalizationProvider>
        
        <IconButton
          aria-label="search"
          onClick={() => {
            search();
          }}
        >
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </div>

      <p>You have entered {roverName}</p>

      
    </div>
  );

  function search() {
    axios
      .get(ROVER_BASE_API_URL + roverName + "/photos?earth_date=" + `${format(roverDate, 'yyyy-MM-dd')}` + "&api_key=" + API_KEY)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Rover information not found");
        setroverInfo(undefined);
      });
  }
}

export default App;
//{roverName === undefined ? (
//  <p>Rover not found</p>
//  ) : (
//    <div id="pokemon-result">
//      {roverInfo.photos[0].img_src === null ? (
//        <p>No image found</p>
//      ) : (
//        <img src={roverInfo.photos[0].img_src} />
//      )}
//      
//    </div>
//  )}