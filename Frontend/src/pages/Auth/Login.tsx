import { useState, useEffect, useMemo } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useFetchUserInfo } from "../../services/hooks/useAuth";
import { CircularProgress, Box, Button } from "@mui/material";
import { getUserDetails } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const GoogleSSO = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const navigate = useNavigate();

  const { data, isFetching, isLoading } = useFetchUserInfo({
    email: userInfo ? "sumit.kumar2@tigeranalytics.com" : "",
  });

  const userData = useMemo(() => {
    return getUserDetails();
  }, [data]);

  useEffect(() => {
    if (data?.data?.app_access) {
      sessionStorage.setItem("UserDetails", JSON.stringify(data));
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [data]);

  useEffect(() => {
    if (userData) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      if (!accessToken) {
        console.error("Access token not found.");
        return;
      }

      try {
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const userData = await userInfoResponse.json();
        setUserInfo(userData);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: () => console.error("Google Login Failed"),
    scope: "openid email profile",
    flow: "implicit",
  });

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        left: "45%",
      }}
    >
      {!(isFetching || isLoading) && (
        <Button variant="contained" onClick={() => login()}>
          Login with Google
        </Button>
      )}
      {(isFetching || isLoading) && (
        <Box sx={{ textAlign: "center", marginTop: "25%" }}>
          <CircularProgress />
          <Box component="h2">Fetching User Details</Box>
        </Box>
      )}
    </Box>
  );
};

export default GoogleSSO;
