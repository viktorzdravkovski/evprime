import {
  Box,
  Button,
  Modal,
  Paper,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Link,
  redirect,
  useNavigate,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import {
  CalendarMonth,
  Clear,
  Delete,
  Edit,
  Place,
  Replay,
} from "@mui/icons-material";
import { getAuthToken } from "../util/auth";
import { useState } from "react";

const EventDetail = () => {
  const navigate = useNavigate();
  const data = useRouteLoaderData("event-detail");
  const token = useRouteLoaderData("root");
  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const event = data.event;
  const submit = useSubmit();
  const [modalOpen, setModalOpen] = useState(false);

  const paperStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    height: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const toggleEditMode = () => {
    navigate("edit");
  };

  const deleteEventHandler = () => {
    submit(null, { method: "delete" });
  };

  return (
    <>
      <Box mt={5} px={5}>
        <Box
          sx={{
            display: largeScreen ? "flex" : "block",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Box>
            <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <Typography
                variant="h2"
                sx={{
                  marginBottom: "16px",
                  display: "inline-block",
                  borderBottom: "1px solid black",
                }}
              >
                {event.title}
              </Typography>
              {token && (
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => setModalOpen(true)}
                >
                  {largeScreen ? "Delete event" : "Delete"}
                </Button>
              )}
            </Box>
            <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <CalendarMonth />
              <Typography variant="subtitle2" sx={{ fontStyle: "italic" }}>
                {event.date}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Place />
              <Tooltip title={event.location}>
                <Typography
                  noWrap
                  variant="subtitle2"
                  sx={{ fontStyle: "italic" }}
                >
                  {event.location}
                </Typography>
              </Tooltip>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              alignItems: "start",
              my: largeScreen ? 0 : 2,
            }}
          >
            {token && (
              <Button
                variant="contained"
                onClick={toggleEditMode}
                startIcon={<Edit />}
              >
                {largeScreen ? "Edit event" : "Edit"}
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Replay />}
            >
              <Link
                to={".."}
                style={{ textDecoration: "none", color: "white" }}
                relative="path"
              >
                {largeScreen ? "Back to events" : "Back"}
              </Link>
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: largeScreen ? "flex" : "block",
            gap: "16px",
            my: "16px",
          }}
        >
          <Box sx={{ maxWidth: "375px", width: "100%" }}>
            <img
              src={event.image}
              alt={event.title}
              style={{ height: "100%", maxWidth: "100%" }}
            />
          </Box>
          <Typography variant="subject2">{event.description}</Typography>
        </Box>
      </Box>
      <Modal open={modalOpen}>
        <Paper sx={paperStyle}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <Typography variant="h5" textAlign="center">
              Are you sure you want to delete this event?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button
                variant="contained"
                color="error"
                startIcon={<Delete />}
                onClick={deleteEventHandler}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Clear />}
                onClick={() => setModalOpen(false)}
              >
                No
              </Button>
            </Box>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default EventDetail;

export const loader = ({ params }) => {
  return fetch(`http://localhost:8080/events/${params.eventId}`);
};

export const action = async ({ params }) => {
  const token = getAuthToken();
  await fetch(`http://localhost:8080/events/${params.eventId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return redirect("/events");
};
