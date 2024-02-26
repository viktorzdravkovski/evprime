import { useState } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Form } from "react-router-dom";
import { Email, Home, Person, Phone, Send } from "@mui/icons-material";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const mediumScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const onChangeNameHandler = (event) => {
    setName(event.target.value);
    setNameError(event.target.value.length === 0);
  };

  const onChangeEmailHandler = (event) => {
    setEmail(event.target.value);
    setEmailError(
      event.target.value.length === 0 || !event.target.value.includes("@"),
    );
  };

  const onChangeMessageHandler = (event) => {
    setMessage(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "90%",
      }}
    >
      <Form
        method="post"
        style={{
          width: mediumScreen ? "50%" : "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Stack alignItems="center" rowGap={5} mt={5}>
          <Typography variant="h2">Want to reach out?</Typography>
          <TextField
            variant="standard"
            fullWidth
            required
            value={name}
            onChange={onChangeNameHandler}
            error={nameError}
            name="name"
            InputProps={{ startAdornment: <Person /> }}
          />
          <TextField
            variant="standard"
            fullWidth
            required
            value={email}
            onChange={onChangeEmailHandler}
            error={emailError}
            name="email"
            InputProps={{ startAdornment: <Email /> }}
            type="email"
          />
          <TextField
            label="Message"
            variant="standard"
            required
            rows={5}
            multiline
            fullWidth
            value={message}
            onChange={onChangeMessageHandler}
            name="description"
          />
          <Button variant="contained" type="submit" startIcon={<Send />}>
            Send
          </Button>
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "50px",
            marginTop: "50px",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Home />
              <Typography fontWeight="bold">Address</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                my: "16px",
              }}
            >
              <Email />
              <Typography fontWeight="bold">Email</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Phone />
              <Typography fontWeight="bold">Phone Number</Typography>
            </Box>
          </Box>
          <Box>
            <Typography>Rampo Lefkata 1</Typography>
            <Typography sx={{ my: "16px" }}>ev@rampo.com</Typography>
            <Typography>+389 75 500 000</Typography>
          </Box>
        </Box>
      </Form>
    </Box>
  );
};

export default ContactPage;
