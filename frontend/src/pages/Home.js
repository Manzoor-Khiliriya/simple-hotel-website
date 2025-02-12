import React from "react";
import AvailabilityCheckForm from "../components/sections/AvailabiltyCheckForm";
import HotelInfoAndFacilities from "../components/sections/HotelInfoAndFacilties";
import RoomBooking from "../components/sections/RoomBookingSection";
import RoomsAndRates from "../components/sections/RoomsAndRates";

export default function Home() {
  return (
    <>
      <AvailabilityCheckForm />
      <HotelInfoAndFacilities />
      <RoomsAndRates />
      <RoomBooking />
    </>
  );
}
