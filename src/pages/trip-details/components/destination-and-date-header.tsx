import { useState } from "react";
import { format } from "date-fns";
import { Calendar, MapPin, Settings2 } from "lucide-react";

import { TripGet } from "../../../models/trips";
import { Button } from "../../../components/button";
import { UpdateDestinationAndDate } from "./update-destination-and-date";

interface Props {
  trip: TripGet | undefined;
}

export function DestinationAndDateHeader({ trip }: Props) {
  const [updadeDateModalOpen, setUpdadeDateModalOpen] = useState(false);

  const openCreateUpdateDateModalOpen = () => setUpdadeDateModalOpen(true);
  const closeCreateUpdateDateModalOpen = () => setUpdadeDateModalOpen(false);

  const displayedDate = trip
    ? format(trip?.starts_at, "d' de 'LLL")
        .concat(" até ")
        .concat(format(trip?.ends_at, "d' de 'LLL"))
    : "";

  return (
    <div className="px-4 py-3 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between flex-wrap">
      <div className=" flex items-center gap-2">
        <MapPin className="size-4 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className=" flex flex-col items-center gap-5 sm:flex-row">
        <div className="">
          <div className=" flex items-center gap-2">
            <Calendar className="size-4 text-zinc-400" />
            <span className="text-zinc-100">{displayedDate}</span>
          </div>
        </div>

        <div className="w-px h-6 bg-zinc-600 hidden sm:block" />

        <Button onClick={openCreateUpdateDateModalOpen} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>

      {updadeDateModalOpen && (
        <UpdateDestinationAndDate
          trip={trip}
          closeCreateActivityModalOpen={closeCreateUpdateDateModalOpen}
        />
      )}
    </div>
  );
}
