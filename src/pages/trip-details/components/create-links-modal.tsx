import { FormEvent } from "react";
import { Link2, Tag, X } from "lucide-react";

import { api } from "../../../services/api";
import { Button } from "../../../components/button";
import { useParams } from "react-router-dom";

interface createLinksModalProps {
  closeCreateLinksModalOpen: () => void;
}

export function CreateLinksModal({ closeCreateLinksModalOpen }: createLinksModalProps) {
  const { tripId } = useParams();

  const handleCreateLinks = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    if (!title || !url) return;

    api.post(`/trips/${tripId}/links`, { title, url });

    window.location.reload();
    event.currentTarget.reset();
    closeCreateLinksModalOpen();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar link</h2>
            <X
              onClick={closeCreateLinksModalOpen}
              className="text-zinc-400 size-5 cursor-pointer"
            />
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>

        <form onSubmit={handleCreateLinks} className="space-y-3">
          <div className="p-2.5 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2.5">
            <Tag className="size-5 text-zinc-400" />
            <input
              name="title"
              placeholder="Título do link"
              className="flex-1 bg-transparent outline-none text-lg placeholder-zinc-400"
            />
          </div>

          <div className="p-2.5 h-14 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2.5">
            <Link2 className="size-5 text-zinc-400" />
            <input
              name="url"
              placeholder="URL"
              className="flex-1 bg-transparent outline-none text-lg placeholder-zinc-400"
            />
          </div>

          <Button type="submit" size="full">
            Salvar links
          </Button>
        </form>
      </div>
    </div>
  );
}
