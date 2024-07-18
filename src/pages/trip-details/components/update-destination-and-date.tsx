import { FormEvent, useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { Calendar, MapPin, X } from "lucide-react";

import { tripProps } from "..";
import { api } from "../../../services/api";
import { Button } from "../../../components/button";
import { DatePickerModal } from "../../../components/date-picker-modal";

interface updateDestinationAndDateProps {
  trip: tripProps | undefined;
  closeCreateActivityModalOpen: () => void;
}

export function UpdateDestinationAndDate({
  trip,
  closeCreateActivityModalOpen,
}: updateDestinationAndDateProps) {
  const { tripId } = useParams();

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [destination, setDestination] = useState<string | undefined>("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();

  const openIsDatePicker = () => setIsDatePickerOpen(true);
  const closeIsDatePicker = () => setIsDatePickerOpen(false);

  const displayedDate =
    eventStartAndEndDates && eventStartAndEndDates?.from && eventStartAndEndDates?.to
      ? format(eventStartAndEndDates?.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates?.to, "d' de 'LLL"))
      : "";

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!destination || !eventStartAndEndDates?.from || !eventStartAndEndDates?.to) return;

    api.put(`/trips/${tripId}`, {
      destination: destination,
      ends_at: eventStartAndEndDates?.to,
      starts_at: eventStartAndEndDates?.from,
    });

    window.location.reload();
    event.currentTarget.reset();
    closeCreateActivityModalOpen();
  };

  useEffect(() => {
    if (!trip) return;

    setDestination(trip?.destination);
    setEventStartAndEndDates({ to: new Date(trip?.ends_at), from: new Date(trip?.starts_at) });
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Alterar local/data</h2>
            <X
              onClick={closeCreateActivityModalOpen}
              className="text-zinc-400 size-5 cursor-pointer"
            />
          </div>

          <p className="text-sm text-zinc-400">Altere o local e hora da sua viagem. </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-3">
          <div className="flex justify-center">
            <div className="p-2.5 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2.5 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input
                type="text"
                name="local"
                value={destination}
                placeholder="Para onde você vai?"
                onChange={(e) => setDestination(e.target.value)}
                className="flex-1 bg-transparent outline-none text-lg placeholder-zinc-400"
              />
            </div>
            <button
              type="button"
              onClick={openIsDatePicker}
              className="p-2.5 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2.5"
            >
              <Calendar className="size-5 text-zinc-400" />
              <span className="text-lg text-zinc-400 w-45">{displayedDate}</span>
            </button>
          </div>

          <Button type="submit" size="full">
            Alterar
          </Button>
        </form>
      </div>

      {isDatePickerOpen && (
        <DatePickerModal
          closeIsDatePicker={closeIsDatePicker}
          eventStartAndEndDates={eventStartAndEndDates}
          setEventStartAndEndDates={setEventStartAndEndDates}
        />
      )}
    </div>
  );
}
