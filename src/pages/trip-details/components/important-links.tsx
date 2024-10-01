import { useState } from "react";
import { Link2, Plus } from "lucide-react";
import { useParams } from "react-router-dom";

import { useGetLinks } from "../../../hooks/links";
import { Button } from "../../../components/button";
import { CreateLinksModal } from "./create-links-modal";

export function ImportantLinks() {
  const { tripId } = useParams();
  const { data: links } = useGetLinks(tripId ? tripId : "");

  const [linksModalOpen, setLinksModalOpen] = useState(false);

  const openCreateLinksModalOpen = () => setLinksModalOpen(true);
  const closeCreateLinksModalOpen = () => setLinksModalOpen(false);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl sm:text-left text-center">Links importantes</h2>

      <div className="space-y-5">
        {links?.map((link) => (
          <div key={link.id} className="flex items-center justify-between gap-4">
            <div>
              <span className="block font-medium text-zinc-100">{link.title}</span>
              <a
                href={link.url}
                target="_blank"
                className="block text-sm text-zinc-400 truncate hover:text-zinc-200"
              >
                {link.url}
              </a>
            </div>
            <a href={link.url} target="_blank">
              <Link2 className="size-5 text-zinc-400 shrink-0 hover:text-zinc-200" />
            </a>
          </div>
        ))}
      </div>

      <Button onClick={openCreateLinksModalOpen} type="submit" variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {linksModalOpen && <CreateLinksModal closeCreateLinksModalOpen={closeCreateLinksModalOpen} />}
    </div>
  );
}
