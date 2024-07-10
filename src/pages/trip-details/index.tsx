import { useState } from "react";
import { Plus } from "lucide-react";

import { Guests } from "./guests";
import { Activities } from "./activities";
import { Button } from "../../components/button";
import { ImportantLinks } from "./important-links";
import { CreateActivityModal } from "./create-activity-modal";
import { DestinationAndDateHeader } from "./destination-and-date-header";

export function TripDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);

  const openCreateActivityModalOpen = () => setIsCreateActivityModalOpen(true);
  const closeCreateActivityModalOpen = () => setIsCreateActivityModalOpen(false);

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <Button onClick={openCreateActivityModalOpen}>
              <Plus className="size-5 text-lime-950" />
              Cadastrar atividade
            </Button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks />
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && <CreateActivityModal closeCreateActivityModalOpen={closeCreateActivityModalOpen} />}
    </div>
  );
}
