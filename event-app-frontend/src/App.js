import "./App.css";
import EventsPage, { loader as eventsLoader } from "./components/EventsPage";
import { createTheme, styled, ThemeProvider } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import EventDetail, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./components/EventDetail";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import Root from "./components/Root";
import ErrorPage from "./components/ErrorPage";
import EventCreate, {
  action as eventCreateAction,
} from "./components/EventCreate";
import EventEdit, { action as eventEditAction } from "./components/EventEdit";
import AuthPage, { action as authAction } from "./components/AuthPage";
import { action as logoutAction } from "./components/Logout";
import { checkAuthLoader, getAuthToken } from "./util/auth";
import ContactPage from "./components/ContactPage";

const StyledContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

const theme = createTheme({
  palette: {
    background: {
      default: blueGrey[100],
    },
    primary: {
      main: "#304ffe",
    },
  },
  typography: {
    fontFamily: "Josefin Sans",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: getAuthToken,
    id: "root",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "events",
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: "new",
            element: <EventCreate />,
            action: eventCreateAction,
            loader: checkAuthLoader,
          },
          {
            path: ":eventId",
            loader: eventDetailLoader,
            id: "event-detail",
            children: [
              {
                index: true,
                element: <EventDetail />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EventEdit />,
                action: eventEditAction,
                loader: checkAuthLoader,
              },
            ],
          },
        ],
      },
      {
        path: "auth",
        element: <AuthPage />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledContainer>
        <RouterProvider router={router} />
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;
