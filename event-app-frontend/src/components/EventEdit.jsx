import { Box, Button, Stack, TextField, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Form, json, redirect, useRouteLoaderData } from "react-router-dom";
import { getAuthToken } from "../util/auth";
import { Save } from "@mui/icons-material";

const EventEdit = () => {
  const data = useRouteLoaderData("event-detail");
  const event = data.event;
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(event.date);
  const [description, setDescription] = useState(event.description);
  const [image, setImage] = useState(event.image);
  const [location, setLocation] = useState(event.location);
  const mediumScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const onChangeTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const onChangeImageHandler = (event) => {
    setImage(event.target.value);
  };

  const onChangeDateHandler = (event) => {
    setDate(event.target.value);
  };

  const onChangeDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const onChangeLocationHandler = (event) => {
    setLocation(event.target.value);
  };

  // TODO Refactor this shit
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Form method="put" style={{ width: mediumScreen ? "50%" : "90%" }}>
        <Stack alignItems="center" rowGap={5} mt={5}>
          <TextField
            label="Event Title"
            variant="standard"
            fullWidth
            value={title}
            onChange={onChangeTitleHandler}
            name="title"
          />
          <TextField
            label="Event Image"
            variant="standard"
            placeholder="https://..."
            fullWidth
            value={image}
            onChange={onChangeImageHandler}
            name="image"
          />
          <TextField
            label="Event Date"
            variant="standard"
            placeholder="dd.MM.YYYY"
            fullWidth
            value={date}
            onChange={onChangeDateHandler}
            name="date"
          />
          <TextField
            label="Event Location"
            variant="standard"
            fullWidth
            value={location}
            onChange={onChangeLocationHandler}
            name="location"
          />
          <TextField
            label="Event Description"
            variant="standard"
            rows={3}
            multiline
            fullWidth
            value={description}
            onChange={onChangeDescriptionHandler}
            name="description"
          />
          <Button
            variant="contained"
            color="success"
            sx={{ marginBottom: 2 }}
            type="submit"
            startIcon={<Save />}
          >
            Update event
          </Button>
        </Stack>
      </Form>
    </Box>
  );
};

export default EventEdit;

export const action = async ({ request, params }) => {
  const token = getAuthToken();
  const data = await request.formData();
  const event = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    location: data.get("location"),
    description: data.get("description"),
  };

  const response = await fetch(
    `http://localhost:8080/events/${params.eventId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
    },
  );

  if (!response.ok) {
    throw json({ message: "Event edit failed" }, { status: 500 });
  }

  return redirect("..");
};
