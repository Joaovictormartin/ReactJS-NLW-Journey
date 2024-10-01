import { ptBR } from "date-fns/locale";
import { format, isBefore } from "date-fns";
import { useParams } from "react-router-dom";
import { CircleCheck, CircleDashed } from "lucide-react";

import { useGetActivities } from "../../../hooks/activities";
import { ActivityCategory, ActivitiesGet } from "../../../models/activities";

export function Activities() {
  const { tripId } = useParams();
  const { data: activities } = useGetActivities(tripId ? tripId : "");

  return (
    <div className="space-y-8">
      {activities?.map((category: ActivitiesGet, index: number) => (
        <div key={index} className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="text-xl text-zinc-300 font-semibold">
              Dia {format(category.date, "d")}
            </span>
            <span className="text-xs text-zinc-500">
              {format(category.date, "EEEE", { locale: ptBR })}
            </span>
          </div>
          {category?.activities?.length > 0 ? (
            <div className="space-y-2.5">
              {category?.activities?.map((activity: ActivityCategory, i: number) => (
                <div key={i} className="space-y-2.5">
                  <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                    {isBefore(new Date(activity.occurs_at), new Date()) ? (
                      <CircleCheck className="size-5 text-lime-300" />
                    ) : (
                      <CircleDashed className="size-5 text-zinc-400 shrink-0" />
                    )}
                    <span className="text-zinc-100 flex-1">{activity.title}</span>
                    <span className="text-zinc-400">{format(activity.occurs_at, "HH:mm")} h</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
          )}
        </div>
      ))}
    </div>
  );
}
