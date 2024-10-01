import { api } from "../api";
import { ActivitiesPost } from "../models/activities";

const TRIPS_URL = "/trips";

export const getActivities = async (id: string) => {
  const res = await api.get(`${TRIPS_URL}/${id}/activities`);
  return res.data.activities;
};

export const postActivities = async (payload: ActivitiesPost) => {
  const tripId = payload.tripId;
  delete payload.tripId;

  await api.post(`${TRIPS_URL}/${tripId}/activities`, payload);
};
