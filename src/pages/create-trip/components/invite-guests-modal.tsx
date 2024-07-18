import { FormEvent } from "react";
import { AtSign, Plus, X } from "lucide-react";

import { Button } from "../../../components/button";

interface InviteGuestModalProps {
  emailsToInvite: string[];
  closeGuestsModal: () => void;
  handleRemoveNewEmailsToInvite: (email: string) => void;
  handleAddNewEmailsToInvite: (e: FormEvent<HTMLFormElement>) => void;
}

export function InviteGuestModal({
  emailsToInvite,
  closeGuestsModal,
  handleRemoveNewEmailsToInvite,
  handleAddNewEmailsToInvite,
}: InviteGuestModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <X onClick={closeGuestsModal} className="text-zinc-400 size-5 cursor-pointer" />
          </div>

          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {emailsToInvite.length > 0 ? (
            emailsToInvite.map((email, index) => (
              <div
                key={index}
                className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2 flex-grow"
              >
                <span className="text-zinc-300 flex-1">{email}</span>
                <button onClick={() => handleRemoveNewEmailsToInvite(email)}>
                  <X className="size-4 text-zinc-400" />
                </button>
              </div>
            ))
          ) : (
            <span className="text-xs text-zinc-500">Nenhum convidado selecionado</span>
          )}
        </div>

        <div className="w-full h-px bg-zinc-800"></div>

        <form
          onSubmit={handleAddNewEmailsToInvite}
          className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2.5"
        >
          <div className="px-2 flex items-center gap-2 flex-1">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="flex-1 bg-transparent outline-none text-lg placeholder-zinc-400"
            />
          </div>

          <Button type="submit">
            Convidar
            <Plus className="size-5 text-lime-950" />
          </Button>
        </form>
      </div>
    </div>
  );
}
