import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import React from "react";

interface iRoverCard {
  roverName: string;
  roverImage: string;
  roverDesc: string;
  roverMoreInfo: string;
  roverOperationDate: string;
}

const rovers: iRoverCard[] = [
  {
    roverName: "Perseverance",
    roverImage:
      "https://mars.nasa.gov/layout/mars2020/images/home/MarsPerseveranceRover_SampleCollection.jpg",
    roverOperationDate: "Operation Date: 2021-Current",
    roverDesc:
      "Perseverance will test a method for getting oxygen from the air in the Martian atmosphere. This will help NASA plan for the best designs to send human astronauts to explore Mars one day.",
    roverMoreInfo: "https://mars.nasa.gov/mars2020/",
  },
  {
    roverName: "Curiosity",
    roverImage:
      "https://mars.nasa.gov/system/feature_items/images/6037_msl_banner.jpg",
    roverOperationDate: "Operation Date: 2012-Current",
    roverDesc:
      "To find out if life was ever on mars, NASA sent the Curiosity rover. Curiosity is the largest robot to ever land on another planet. It is about the size of a small SUV.",
    roverMoreInfo: "https://mars.nasa.gov/msl/home/",
  },
  {
    roverName: "Opportunity",
    roverImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/NASA_Mars_Rover.jpg/1200px-NASA_Mars_Rover.jpg",
    roverOperationDate: "Operation Date: 2004-2018",
    roverDesc:
      "Opportunity took many color photos of the Martian landscape. The evidence it collected suggested that its landing site was once the shoreline of a salty sea.",
    roverMoreInfo:
      "https://www.jpl.nasa.gov/missions/mars-exploration-rover-opportunity-mer",
  },
  {
    roverName: "Spirit",
    roverImage:
      "https://solarsystem.nasa.gov/system/content_pages/main_images/1068_rover2-1.jpg",
    roverOperationDate: "Operation Date: 2004-2010",
    roverDesc:
      "Spirit was sent to Mars to find more clues about the history of water there, and to see if the Red Planet could ever have supported life.",
    roverMoreInfo: "https://solarsystem.nasa.gov/missions/spirit/in-depth/",
  },
];

function RoverList() {
  return (
    <Container
      maxWidth={"xl"}
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        alignItems: "flex-start",
      }}
    >
      {rovers.map((rover) => (
        <Card sx={{ width: 345, my: 4, mx: 1 }}>
          <CardMedia
            component="img"
            height="140"
            image={rover.roverImage}
            alt="Rover Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {rover.roverName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: "bold" }}
            >
              {rover.roverOperationDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {rover.roverDesc}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" href={rover.roverMoreInfo} target="_blank">
              Learn More
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}

export default RoverList;
