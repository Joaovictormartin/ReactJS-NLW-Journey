import { FormEvent } from "react";
import { Mail, User, X } from "lucide-react";
import { Button } from "../../components/button";

interface confirmTriptModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (e: FormEvent<HTMLFormElement>) => void;
}

export function ConfirmTriptModal({ closeConfirmTripModal, createTrip }: confirmTriptModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirmar criação da viagem</h2>
            <X onClick={closeConfirmTripModal} className="text-zinc-400 size-5 cursor-pointer" />
          </div>

          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para <span className="text-zinc-100 font-semibold">Florianópolis, Brasil</span> nas datas de <span className="text-zinc-100 font-semibold">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="p-2.5 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2.5">
            <User className="size-5 text-zinc-400" />
            <input name="name" placeholder="Seu nome completo" className="flex-1 bg-transparent outline-none text-lg placeholder-zinc-400" />
          </div>

          <div className="p-2.5 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2.5">
            <Mail className="size-5 text-zinc-400" />
            <input type="email" name="email" placeholder="Seu e-mail pessoal" className="flex-1 bg-transparent outline-none text-lg placeholder-zinc-400" />
          </div>

          <Button type="submit" size="full">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  );
}
