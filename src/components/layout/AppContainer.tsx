import { styled } from "@mui/material";
import bg from "./bg.jpg";

const AppContainer = styled("div")({
  width: "100vw",
  height: "100vh",
  backgroundImage: `url(${bg})`,
  padding: "50px",
  boxSizing: "border-box",
});

export default AppContainer;
