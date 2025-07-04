import React from "react";
import { Typography } from "@mui/material";

export default function HeadingTypography({ text, color= "#000000", fontWeight="600", mb= 4 }) {
  return (
    <Typography variant="h4" textAlign="center" fontWeight={fontWeight}  color={color} gutterBottom mb={mb}>
      {text}
    </Typography>
  );
}
