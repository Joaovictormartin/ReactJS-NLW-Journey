import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";

interface createActivityModalProps {
  closeCreateActivityModalOpen: () => void;
}

export function CreateActivityModal({ closeCreateActivityModalOpen }: createActivityModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <X onClick={closeCreateActivityModalOpen} className="text-zinc-400 size-5 cursor-pointer" />
          </div>

          <p className="text-sm text-zinc-400">Todos convidados podem visualizar as atividades. </p>
        </div>

        <form className="space-y-3">
          <div className="p-2.5 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2.5">
            <Tag className="size-5 text-zinc-400" />
            <input name="title" placeholder="Qual a atividade?" className="flex-1 bg-transparent outline-none text-lg placeholder-zinc-400" />
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2.5 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex flex-1 items-center gap-2.5">
              <Calendar className="size-5 text-zinc-400" />
              <input type="datetime-local" name="occurs_at" placeholder="Data e horário da atividade" className="flex-1 bg-transparent outline-none text-lg placeholder-zinc-400" />
            </div>
          </div>

          <Button type="submit" size="full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  );
}