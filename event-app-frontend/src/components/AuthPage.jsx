import {
  Box,
  Button,
  FormControl,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const data = useActionData();
  const navigation = useNavigation();
  const largeScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const isLogin =
    !searchParams.get("mode") || searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  const toggleAuthMode = () => {
    setSearchParams({
      mode: isLogin ? "signup" : "login",
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      sx={{
        background:
          "url(https://assets-global.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298f612b93c55_631576ebbd94c7cc86308308_DrawKit0018_Music_Banner.png)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <Paper elevation={10}>
        <Box width={{ xs: 300, md: 500 }} borderRadius={5} p={10}>
          <Form method="post">
            <Stack alignItems="center" rowGap={3}>
              <Typography variant="h5" component="div">
                {isLogin ? "Log in" : "Create new user"}
              </Typography>
              <FormControl fullWidth>
                <TextField label="E-Mail" name="email" />
              </FormControl>
              <FormControl fullWidth>
                <TextField label="Password" type="password" name="password" />
              </FormControl>
              {data && data.errors && (
                <ul>
                  {Object.values(data.errors).map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              )}
              {data && data.message && (
                <Typography variant="subject2">{data.message}</Typography>
              )}
              <Box
                sx={{
                  display: largeScreen ? "flex" : "block",
                  width: "100%",
                  gap: 2,
                }}
              >
                <FormControl sx={{ display: "block", width: "100%" }}>
                  <Button
                    sx={{
                      display: "block",
                      width: "100%",
                      marginBottom: largeScreen ? 0 : "8px",
                    }}
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Working..." : "Go"}
                  </Button>
                </FormControl>

                <FormControl sx={{ display: "block", width: "100%" }}>
                  <Button
                    sx={{ display: "block", width: "100%" }}
                    variant="contained"
                    color="secondary"
                    onClick={toggleAuthMode}
                  >
                    {isLogin ? "Create User" : "Log In"}
                  </Button>
                </FormControl>
              </Box>
            </Stack>
          </Form>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthPage;

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode" }, { status: 422 });
  }

  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });
  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }

  const responseData = await response.json();

  const token = responseData.token;
  localStorage.setItem("token", token);
  localStorage.setItem("expiration", responseData.expirationTime);

  return redirect("/");
};
