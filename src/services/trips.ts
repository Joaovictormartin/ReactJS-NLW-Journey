import { api } from "../api";
import { TripPost, TripPut } from "../models/trips";

const TRIPS_URL = "/trips";

export const getTrip = async (id: string) => {
  const res = await api.get(`${TRIPS_URL}/${id}/confirm`);
  return res.data.trip;
};

export const postTrip = async (payload: TripPost) => await api.post(`${TRIPS_URL}`, payload);

export const putTrip = async (payload: TripPut) => {
  const tripId = payload.tripId;
  delete payload.tripId;

  await api.put(`${TRIPS_URL}/${tripId}`, payload);
};
