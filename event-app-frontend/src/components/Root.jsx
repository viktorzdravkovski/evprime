import { useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";
import Sidebar from "./Sidebar";

const Root = () => {
  const navigate = useNavigate();
  const token = useLoaderData();
  const submit = useSubmit();

  const createNewEventNavigationHandler = () => {
    navigate("/events/new");
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const duration = getTokenDuration();
    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, duration);
  }, [token, submit]);

  return (
    <>
      {/*<Navbar />*/}
      <Sidebar />
      {token && (
        <SpeedDial
          ariaLabel="SpeedDial"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            icon={<EventIcon />}
            tooltipTitle={<Typography>Create an event</Typography>}
            onClick={createNewEventNavigationHandler}
          />
        </SpeedDial>
      )}
    </>
  );
};

export default Root;
