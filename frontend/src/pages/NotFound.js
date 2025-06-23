import { Container, Typography, Box } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import BackButton from "../components/customButtons/BackButton";

export default function NotFound() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", my: 10 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <ErrorOutlineIcon sx={{ fontSize: 30, color: "error.main" }} />
        <Typography variant="h5" color="error" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Oops! The page you're looking for doesn't exist or has been moved.
        </Typography>
        <BackButton>
          Go Back Home
        </BackButton>
      </Box>
    </Container>
  );
};

