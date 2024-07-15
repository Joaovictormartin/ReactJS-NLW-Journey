import { FormEvent, useState } from "react";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";

import { api } from "../../services/api";
import { InviteGuestModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";

export function CreateTripPage() {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [destination, setDestination] = useState("");
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();

  const openGuestsInput = () => {
    if (!destination || !eventStartAndEndDates?.from || !eventStartAndEndDates?.to) return;
    setIsGuestsInputOpen(true);
  };
  const closeGuestsInput = () => setIsGuestsInputOpen(false);

  const openGuestsModal = () => setIsGuestsModalOpen(true);
  const closeGuestsModal = () => setIsGuestsModalOpen(false);

  const openConfirmTripModal = () => {
    if (emailsToInvite.length === 0) return;
    setIsConfirmTripModalOpen(true);
  };
  const closeConfirmTripModal = () => setIsConfirmTripModalOpen(false);

  const handleAddNewEmailsToInvite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email || emailsToInvite.includes(email)) return;

    setEmailsToInvite((state) => [...state, email]);
    event.currentTarget.reset();
  };

  const handleRemoveNewEmailsToInvite = (emailToRemove: string) => {
    setEmailsToInvite((state) => state.filter((email) => email !== emailToRemove));
  };

  const createTrip = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!destination) return;
    if (!ownerName || !ownerEmail) return;
    if (emailsToInvite.length === 0) return;
    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) return;

    const body = {
      destination,
      owner_name: ownerName,
      owner_email: ownerEmail,
      emails_to_invite: emailsToInvite,
      ends_at: eventStartAndEndDates?.to,
      starts_at: eventStartAndEndDates?.from,
    };

    const response = await api.post("/trips", body);
    const { tripId } = response.data;

    navigate(`trip/${tripId}`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="logo plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            setDestination={setDestination}
            openGuestsInput={openGuestsInput}
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />
          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              openGuestsModal={openGuestsModal}
              openConfirmTripModal={openConfirmTripModal}
            />
          )}
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

      {isGuestsModalOpen && (
        <InviteGuestModal
          emailsToInvite={emailsToInvite}
          closeGuestsModal={closeGuestsModal}
          handleAddNewEmailsToInvite={handleAddNewEmailsToInvite}
          handleRemoveNewEmailsToInvite={handleRemoveNewEmailsToInvite}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          createTrip={createTrip}
          destination={destination}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          eventStartAndEndDates={eventStartAndEndDates}
          closeConfirmTripModal={closeConfirmTripModal}
        />
      )}
    </div>
  );
}
