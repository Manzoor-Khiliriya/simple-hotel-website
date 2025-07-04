import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BackButton({ children, fullWidth = false }) {
    const navigate = useNavigate();

    function handleBackButton() {
        return navigate('/')
    }
    return (
        <Button
            fullWidth={fullWidth}
            variant="contained"
            sx={{ backgroundColor: "#008080", "&:hover": { backgroundColor: "#006666" } }}
            onClick={handleBackButton}
        >
            {children}
        </Button >
    );
};


