import { api } from "../api";
import { ParticipantsPost, ParticipantsPatch } from "../models/participants";

const TRIPS_URL = "/trips";

export const getParticipants = async (id: string) => {
  const res = await api.get(`${TRIPS_URL}/${id}/participants`);
  return res.data.participants;
};

export const postParticipants = async (payload: ParticipantsPost) => {
  const tripId = payload.tripId;
  delete payload.tripId;

  await api.post(`${TRIPS_URL}/${tripId}/invites`, payload);
};

export const putParticipants = async (payload: ParticipantsPatch) => {
  const participantId = payload.participantId;
  delete payload.participantId;

  await api.put(`participants/${participantId}/confirm`, payload);
};
