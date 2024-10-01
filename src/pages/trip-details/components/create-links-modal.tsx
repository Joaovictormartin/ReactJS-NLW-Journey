import { FormEvent } from "react";
import { Link2, Tag, X } from "lucide-react";
import { useParams } from "react-router-dom";

import { Button } from "../../../components/button";
import { usePostLinks } from "../../../hooks/links";
import { toast } from "sonner";

interface createLinksModalProps {
  closeCreateLinksModalOpen: () => void;
}

export function CreateLinksModal({ closeCreateLinksModalOpen }: createLinksModalProps) {
  const { tripId } = useParams();
  const { mutateAsync: postLinks } = usePostLinks();

  const handleCreateLinks = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    if (!title) {
      toast.warning("O título é obrigatório.");
      return;
    }
    if (!url) {
      toast.warning("A URL é obrigatório.");
      return;
    }

    await postLinks({ tripId, title, url });
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
