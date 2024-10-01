import { api } from "../api";
import { ActivitiesPost } from "../models/activities";

const TRIPS_URL = "/trips";

export const getLinks = async (id: string) => {
  const res = await api.get(`${TRIPS_URL}/${id}/links`);
  return res.data.links;
};

export const postLinks = async (payload: ActivitiesPost) => {
  const tripId = payload.tripId;
  delete payload.tripId;

  await api.post(`${TRIPS_URL}/${tripId}/links`, payload);
};
