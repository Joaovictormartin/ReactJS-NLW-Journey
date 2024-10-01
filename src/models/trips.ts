export type TripGet = {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
  created_at: string;
  participants: {
    id: string;
    name: string | null;
    email: string;
    is_confirmed: boolean;
    is_owner: boolean;
    trip_id: string;
  }[];
};

export type TripPost = {
  destination: string;
  starts_at: string;
  ends_at: string;
  emails_to_invite: string[];
  owner_name: string;
  owner_email: string;
};

export type TripPut = {
  tripId?: string;
  destination: string;
  starts_at: string;
  ends_at: string;
};
