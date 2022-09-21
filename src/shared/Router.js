import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/mainpage/MainPage";
import NotFound from "../pages/NotFound";
import TouristSpotsPage from "../pages/mainpage/TouristSpotsPage";
import SignUp from "../pages/user/SignUp";
import ScheduleRegisterPage from "../pages/schedule/SceduleRegisterPage";
import RestaurantsPage from "../pages/mainpage/RestaurantsPage";
import LogIn from "../pages/user/LogIn";
import AccommodationsPage from "../pages/mainpage/AccommodationsPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/spots" element={<TouristSpotsPage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/accommodations" element={<AccommodationsPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/schedule/register" element={<ScheduleRegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
