import { useState } from "react";
import { CircleCheck, CircleDashed, StarIcon, Plus } from "lucide-react";

import { useParams } from "react-router-dom";
import { Button } from "../../../components/button";
import { InviteGuestModal } from "./invite-guest-modal";
import { ParticipantsGet } from "../../../models/participants";
import { useGetParticipants, usePutParticipants } from "../../../hooks/participants";

export function Guests() {
  const { tripId } = useParams();
  const { mutateAsync: putParticipants } = usePutParticipants();
  const { data: getParticipants } = useGetParticipants(tripId ? tripId : "");

  const [showGuestModal, setShowGuestModal] = useState(false);

  const openGuestsModal = () => setShowGuestModal(true);
  const closeGuestsModal = () => setShowGuestModal(false);

  const handleUpdateStatus = async (participant: ParticipantsGet) => {
    const body = { participantId: participant.id, is_confirmed: !participant.is_confirmed };
    await putParticipants(body);
  };

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {getParticipants?.map((participant, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <span className="block font-medium text-zinc-100">Convidado {index + 1}</span>
                {participant.is_owner && <StarIcon className="size-3 text-zinc-100 shrink-0" />}
              </div>
              <span className="block text-xm text-zinc-400 truncate">{participant.email}</span>
            </div>
            {participant.is_confirmed ? (
              <CircleCheck
                onClick={() => handleUpdateStatus(participant)}
                className="size-5 text-lime-400 shrink-0 cursor-pointer"
              />
            ) : (
              <CircleDashed
                onClick={() => handleUpdateStatus(participant)}
                className="size-5 text-zinc-400 shrink-0 cursor-pointer"
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
