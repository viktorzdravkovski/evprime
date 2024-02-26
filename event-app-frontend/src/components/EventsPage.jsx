import {
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
} from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";

const EventsPage = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const mediumScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const events = data.events;

  const handleNavigateToEvent = (id) => {
    navigate(`/events/${id}`);
  };

  return (
    <Box
      sx={(theme) => ({
        background:
          "url(https://assets-global.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298f612b93c55_631576ebbd94c7cc86308308_DrawKit0018_Music_Banner.png)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        textAlign: "center",
        display: "flex",
        height: "80%",
        alignItems: "flex-start",
        flexDirection: "column",
        overflowY: "auto",
        "& ::-webkit-scrollbar": {
          width: "6px",
          backgroundColor: "#FFF",
        },
        "& ::-webkit-scrollbar-thumb": {
          borderRadius: "10px",
          background: theme.palette.primary.main,
          border: "1px solid #aaa",
        },
        "& ::-webkit-scrollbar-thumb:hover": {
          background: theme.palette.primary.light,
        },
        "& ::-webkit-scrollbar-thumb:active": {
          background: "linear-gradient(left, #22ADD4, #1E98BA)",
        },
        "& ::-webkit-scrollbar-track": {
          borderRadius: "10px",
          background: "rgba(0, 0, 0, 0.1)",
          border: "1px solid #ccc",
        },
      })}
    >
      <ImageList variant="masonry" cols={mediumScreen ? 3 : 1} gap={8}>
        {events.map((event) => {
          return (
            <ImageListItem key={event.id}>
              <img
                srcSet={`${event.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${event.image}?w=248&fit=crop&auto=format`}
                alt={event.title}
                style={{ cursor: "pointer" }}
                loading="lazy"
                onClick={() => handleNavigateToEvent(event.id)}
              />
              <ImageListItemBar
                position="bottom"
                title={event.title}
                subtitle={event.date}
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </Box>
  );
};

export default EventsPage;

export const loader = () => {
  return fetch("http://localhost:8080/events");
};
