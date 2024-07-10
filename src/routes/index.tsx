import { createBrowserRouter } from "react-router-dom";

import { CreateTripPage } from "../pages/create-trip";
import { TripDetailsPage } from "../pages/trip-details";

export const routes = createBrowserRouter([
  { path: "/", element: <CreateTripPage /> },
  { path: "/trip/:tripId", element: <TripDetailsPage /> },
]);
