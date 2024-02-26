import {
  Button,
  Card,
  Box,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  CalendarMonthOutlined,
  Place,
  ShareLocationOutlined,
} from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";

const EventCard = (props) => {
  const { event, showUserCommands } = props;
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/events/${event.id}`);
  };

  const addToMyEvents = () => {};

  return (
    <Card>
      <CardMedia
        image={event.image}
        sx={{ height: "10rem" }}
        onClick={onClickHandler}
      />
      <CardContent>
        <Typography variant="h5" component="div" textAlign="start">
          {event.title}
        </Typography>
        <Box>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              my: "8px",
            }}
          >
            <CalendarMonthOutlined />
            <Typography variant="body2" fontStyle="italic">
              {event.date}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "8px", alignItems: "start" }}>
            <Place />
            <Tooltip
              title={event.location || "Petko rajko stojkoski the second"}
            >
              <Typography noWrap>{event.location || "N/A"}</Typography>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        {showUserCommands && (
          <Button variant="contained" onClick={addToMyEvents}>
            SAVE
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default EventCard;
