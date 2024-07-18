import { useState } from "react";
import { format } from "date-fns/format";
import { DateRange } from "react-day-picker";
import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";

import { Button } from "../../../components/button";
import { DatePickerModal } from "../../../components/date-picker-modal";

interface destinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  openGuestsInput: () => void;
  closeGuestsInput: () => void;
  eventStartAndEndDates: DateRange | undefined;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (date: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
  setDestination,
  openGuestsInput,
  closeGuestsInput,
  isGuestsInputOpen,
  eventStartAndEndDates,
  setEventStartAndEndDates,
}: destinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const openIsDatePicker = () => setIsDatePickerOpen(true);
  const closeIsDatePicker = () => setIsDatePickerOpen(false);

  const displayedDate =
    eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
      : "Quando?";

  return (
    <div className="py-4 bg-zinc-900 px-4 rounded-xl flex flex-col items-center shadow-shape gap-3 sm:flex-row sm:h-16">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          type="text"
          disabled={isGuestsInputOpen}
          placeholder="Para onde você vai?"
          onChange={(e) => setDestination(e.target.value)}
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
        />
      </div>

      <button
        onClick={openIsDatePicker}
        disabled={isGuestsInputOpen}
        className="flex items-center gap-2 text-left"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 w-45">{displayedDate}</span>
      </button>

      <div className="w-px h-6 bg-zinc-800 hidden sm:block" />

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={openGuestsInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}

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
