import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";

import { Guests } from "./guests";
import { api } from "../../services/api";
import { Activities } from "./activities";
import { Button } from "../../components/button";
import { ImportantLinks } from "./important-links";
import { CreateActivityModal } from "./create-activity-modal";
import { DestinationAndDateHeader } from "./destination-and-date-header";

export interface tripProps {
  id: string;
  ends_at: string;
  starts_at: string;
  destination: string;
  is_confirmed: boolean;
  participants: {
    id: string;
    name: string | null;
    email: string;
    is_confirmed: boolean;
    is_owner: boolean;
  }[];
}

export function TripDetailsPage() {
  const { tripId } = useParams();

  const [trip, setTrip] = useState<tripProps | undefined>();
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);

  const openCreateActivityModalOpen = () => setIsCreateActivityModalOpen(true);
  const closeCreateActivityModalOpen = () => setIsCreateActivityModalOpen(false);

  useEffect(() => {
    api.get(`/trips/${tripId}/confirm`).then((response) => setTrip(response.data.trip));
  }, [tripId, isCreateActivityModalOpen]);

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader trip={trip} />

      <main className="flex gap-16 px-4 flex-col 2md:flex-row">
        <div className="flex-1 space-y-6">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <Button onClick={openCreateActivityModalOpen}>
              <Plus className="size-5 text-lime-950" />
              Cadastrar atividade
            </Button>
          </div>

          <Activities />
        </div>

        <div className="flex-1 space-y-6 2md:w-80">
          <ImportantLinks />
          <div className="w-full h-px bg-zinc-800" />
          <Guests trip={trip} />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          trip={trip}
          closeCreateActivityModalOpen={closeCreateActivityModalOpen}
        />
      )}
    </div>
  );
}
