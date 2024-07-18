import { useState } from "react";
import { CircleCheck, CircleDashed, StarIcon, Plus } from "lucide-react";

import { tripProps } from "..";
import { api } from "../../../services/api";
import { Button } from "../../../components/button";
import { InviteGuestModal } from "./invite-guest-modal";

interface guestsProps {
  trip: tripProps | undefined;
}

export function Guests({ trip }: guestsProps) {
  const [showGuestModal, setShowGuestModal] = useState(false);

  const openGuestsModal = () => setShowGuestModal(true);
  const closeGuestsModal = () => setShowGuestModal(false);

  const handleUpdateStatus = (participantId: string) => {
    api.get(`/participants/${participantId}/confirm`).then(() => window.location.reload());
  };

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {trip?.participants.map((participant, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <span className="block font-medium text-zinc-100">Convidado {index + 1}</span>
                {participant.is_owner && <StarIcon className="size-3 text-zinc-100 shrink-0" />}
              </div>
              <span className="block text-xm text-zinc-400 truncate">{participant.email}</span>
            </div>
            {participant.is_confirmed ? (
              <CircleCheck className="size-5 text-lime-400 shrink-0" />
            ) : (
              <CircleDashed
                className="size-5 text-zinc-400 shrink-0"
                onClick={() => handleUpdateStatus(participant.id)}
              />
            )}
          </div>
        ))}
      </div>

      <Button onClick={openGuestsModal} type="submit" variant="secondary" size="full">
        <Plus className="size-5" />
        Adicionar mais convidados
      </Button>

      {showGuestModal && <InviteGuestModal closeCreateGuestsModalOpen={closeGuestsModal} />}
    </div>
  );
}

//jornada
