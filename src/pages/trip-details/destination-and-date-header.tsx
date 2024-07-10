import { Calendar, MapPin, Settings2 } from "lucide-react";

import { Button } from "../../components/button";

interface destinationAndDateHeaderProps {}

export function DestinationAndDateHeader({}: destinationAndDateHeaderProps) {
  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className=" flex items-center gap-2">
        <MapPin className="size-4 text-zinc-400" />
        <span className="text-zinc-100">Florianópolis, Brasil</span>
      </div>

      <div className=" flex items-center gap-5">
        <div className="">
          <div className=" flex items-center gap-2">
            <Calendar className="size-4 text-zinc-400" />
            <span className="text-zinc-100">17 a 23 de Agosto</span>
          </div>
        </div>

        <div className="w-px h-6 bg-zinc-600" />

        <Button variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
}