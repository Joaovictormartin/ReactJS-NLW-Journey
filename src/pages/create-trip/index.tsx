import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { InviteGuestModal } from "./invite-guests-modal";
import { ConfirmTriptModal } from "./confirm-trip-modal";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState(["joao@gmail.com"]);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const openGuestsInput = () => setIsGuestsInputOpen(true);
  const closeGuestsInput = () => setIsGuestsInputOpen(false);

  const openGuestsModal = () => setIsGuestsModalOpen(true);
  const closeGuestsModal = () => setIsGuestsModalOpen(false);

  const openConfirmTripModal = () => setIsConfirmTripModalOpen(true);
  const closeConfirmTripModal = () => setIsConfirmTripModalOpen(false);

  const handleAddNEwemailsToInvite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email || emailsToInvite.includes(email)) return;

    setEmailsToInvite((state) => [...state, email]);
    event.currentTarget.reset();
  };

  const handleRemoveNEwemailsToInvite = (emailToRemove: string) => {
    setEmailsToInvite((state) => state.filter((email) => email !== emailToRemove));
  };

  const createTrip = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    navigate("trip/123");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="logo plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep isGuestsInputOpen={isGuestsInputOpen} openGuestsInput={openGuestsInput} closeGuestsInput={closeGuestsInput} />
          {isGuestsInputOpen && <InviteGuestsStep emailsToInvite={emailsToInvite} openGuestsModal={openGuestsModal} openConfirmTripModal={openConfirmTripModal} />}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com a nossos{" "}
          <a className="text-zinc-300 underline" href="/">
            termos de uso
          </a>{" "}
          e{" "}
          <a className="text-zinc-300 underline" href="/">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isGuestsModalOpen && <InviteGuestModal emailsToInvite={emailsToInvite} closeGuestsModal={closeGuestsModal} handleRemoveNEwemailsToInvite={handleRemoveNEwemailsToInvite} handleAddNEwemailsToInvite={handleAddNEwemailsToInvite} />}

      {isConfirmTripModalOpen && <ConfirmTriptModal closeConfirmTripModal={closeConfirmTripModal} createTrip={createTrip} />}
    </div>
  );
}
