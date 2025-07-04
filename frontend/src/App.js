import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AvailableRooms from "./pages/AvailableRooms";
import RoomDetails from "./pages/RoomDetails";
import RoomsTypeInfo from "./pages/RoomsTypeInfo";
import RoomBooking from "./pages/RoomBooking";
import HotelInfoAndFacilities from "./components/sections/HotelInfoAndFacilties";
import NotFound from "./pages/NotFound";

function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/facilities" element={<HotelInfoAndFacilities />} />
        <Route path="/rooms-type" element={<RoomsTypeInfo />} />
        <Route path="/room-booking" element={<RoomBooking />} />
        <Route path="/available-rooms" element={<AvailableRooms />} />
        <Route path="/room-details/:roomId" element={<RoomDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
