export type ParticipantsGet = {
  id: string;
  name: string;
  email: string;
  is_owner: string;
  is_confirmed: boolean;
};

export type ParticipantsPost = {
  title: string;
  tripId?: string;
};

export type ParticipantsPatch = {
  is_confirmed: string;
  participantId?: string;
};
