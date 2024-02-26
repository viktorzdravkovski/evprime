import evPrime from "../EvPrime.png";
import { Box, styled } from "@mui/material";

const HomeContainer = styled(Box)(({ theme }) => ({
  background:
    "url(https://assets-global.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298f612b93c55_631576ebbd94c7cc86308308_DrawKit0018_Music_Banner.png)",
  backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  [theme.breakpoints.up("xs")]: {
    backgroundSize: "contain",
  },
  [theme.breakpoints.up("lg")]: {
    backgroundSize: "auto",
  },
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  height: "100%",
}));

const HomePage = () => {
  return (
    <HomeContainer>
      <Box sx={{ width: "300px" }}>
        <img
          src={evPrime}
          alt="Ev Prime logo"
          style={{ height: "100%", width: "100%" }}
        />
      </Box>
    </HomeContainer>
  );
};

export default HomePage;
