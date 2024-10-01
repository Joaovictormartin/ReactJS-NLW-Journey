import { toast } from "sonner";
import { FormEvent } from "react";
import { AtSign, X } from "lucide-react";

import { useParams } from "react-router-dom";
import { Button } from "../../../components/button";
import { usePostParticipants } from "../../../hooks/participants";

interface inviteGuestModallProps {
  closeCreateGuestsModalOpen: () => void;
}

export function InviteGuestModal({ closeCreateGuestsModalOpen }: inviteGuestModallProps) {
  const { tripId } = useParams();
  const { mutateAsync: postParticipants } = usePostParticipants();

  const handleCreateGuests = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      toast.warning("O email é obrigatório.");
      return;
    }

    await postParticipants({ tripId, email });
    closeCreateGuestsModalOpen();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar Convidado</h2>
            <X
              onClick={closeCreateGuestsModalOpen}
              className="text-zinc-400 size-5 cursor-pointer"
            />
          </div>

          <p className="text-sm text-zinc-400">
            O convidado irá receber o e-mail para confirmar a participação na viagem.
          </p>
        </div>

        <form onSubmit={handleCreateGuests} className="space-y-3">
          <div className="p-2.5 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2.5">
            <AtSign className="size-5 text-zinc-400" />
            <input
              name="email"
              type="email"
              placeholder="Digite o e-mail do convidado"
              className="flex-1 bg-transparent outline-none text-lg placeholder-zinc-400"
            />
          </div>

          <Button type="submit" size="full">
            Salvar
          </Button>
        </form>
      </div>
    </div>
  );
}
