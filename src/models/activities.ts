export type ActivityCategory = {
  id: string;
  title: string;
  occurs_at: string;
};

export type ActivitiesGet = {
  date: string;
  activities: ActivityCategory[];
};

export type ActivitiesPost = {
  title: string;
  tripId?: string;
  occurs_at: string;
};
