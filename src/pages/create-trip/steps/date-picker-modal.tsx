import "react-day-picker/dist/style.css";

import { X } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { DateRange, DayPicker } from "react-day-picker";

interface datePickerModalProps {
  closeIsDatePicker: () => void;
  eventStartAndEndDates: DateRange | undefined;
  setEventStartAndEndDates: (date: DateRange | undefined) => void;
}

export function DatePickerModal({
  closeIsDatePicker,
  eventStartAndEndDates,
  setEventStartAndEndDates,
}: datePickerModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecione a data</h2>
            <X onClick={closeIsDatePicker} className="text-zinc-400 size-5 cursor-pointer" />
          </div>
        </div>

        <DayPicker
          mode="range"
          locale={ptBR}
          className="my-day-picker"
          disabled={{ before: new Date() }}
          selected={eventStartAndEndDates}
          onSelect={setEventStartAndEndDates}
        />
      </div>
    </div>
  );
}
