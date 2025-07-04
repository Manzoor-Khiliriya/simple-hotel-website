import React from "react";
import { AppBar, Toolbar, Box, Stack, Button, useTheme, useMediaQuery } from "@mui/material";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/download 1.png";

const navLinks = [
  { label: "Our Hotel", path: "/" },
  { label: "Rooms & Rates", sectionId: "rooms-section" },
  { label: "Facilities", sectionId: "hotelAndFacilities-section" },
  { label: "Contact Us", sectionId: "footer-section" },
];

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path, sectionId) => {
    if (location.pathname !== path) {
      navigate(path);
      if (sectionId) {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    } else if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const buttonStyles = {
    backgroundColor: "#dbaa5b",
    color: "white",
    fontSize: "1rem",
    fontWeight: 600,
    borderRadius: "8px",
    px: 2,
    "&:hover": { backgroundColor: "#a47d5c" },
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#f5f5f5", py: 3 }}>
      <Toolbar sx={{ justifyContent: "center", flexDirection: "column" }}>
        <Box component={RouterLink} to="/" sx={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} alt="logo" style={{ height: 90, width: 130 }} />
        </Box>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={isMobile ? 1.5 : 2}
          sx={{ mt: 2, textAlign: isMobile ? "center" : "inherit" }}
        >
          {navLinks.map((link) => (
            <Button
              key={link.path}
              onClick={() => handleNavigation(link.path, link.sectionId)}
              variant="contained"
              sx={buttonStyles}
            >
              {link.label}
            </Button>
          ))}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
