import React from "react";
import { Button } from "@mui/material";

export default function NavigationButton({ children, type = "button", width = "100%", fontSize = '1rem',fontWeight='600',borderRadius=2, padding=2, height = 0, onClick }) {
    return (
        <Button
            type={type}
            variant="contained"
            sx={{
                color: 'white',
                width: width,
                fontSize: fontSize,
                fontWeight: fontWeight,
                borderRadius: borderRadius,
                padding: padding,
                height: height,
                backgroundColor: '#DFAA5B',
                '&:hover': { backgroundColor: '#bf8f44' }
            }}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

