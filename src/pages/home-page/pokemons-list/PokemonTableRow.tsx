import { TableCell, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import closePokemonIcon from "@/assets/close-pokemon.png"; 
import type { PokemonTableRowProps } from "./types";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";


export const PokemonTableRow = (props: PokemonTableRowProps) => {
  const { pokemon: p, onSelectPokemon } = props;
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Tooltip key={p.id}>
      <TableRow
        className="hover:bg-neutrals-100 cursor-pointer"
        onClick={() =>
          onSelectPokemon({
            id: p.id,
            name: p.name,
            image: p.image,
            description: p.description,
            height: p.height,
            weight: p.weight,
            category: p.category,
            abilities: p.abilities,
          })
        }
      >
        <TableCell>
          <div className="flex items-center gap-3 truncate px-1">
            <div className="relative h-11 w-11 bg-slate-100 rounded-full overflow-hidden">
              {!imgLoaded && <Skeleton className="absolute h-11 w-11 rounded-full" />}
              <img
                src={p.image}
                alt={p.name}
                className={`h-11 w-11 rounded-full object-cover bg-slate-100 transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImgLoaded(true)}
              />
            </div>
            <span>{p.name}</span>
            {p.isMyPokemon && (
              <img
                src={closePokemonIcon}
                alt="My Pokemon"
                className="h-4 w-4"
              />
            )}
          </div>
        </TableCell>
        <TableCell className="text-gray-600">{`#${p.id}`}</TableCell>
        <TooltipTrigger asChild>
          <TableCell className="pr-10 truncate">{p.description}</TableCell>
        </TooltipTrigger>
        <TableCell>
          {p.powerLevel ? `Power level ${p.powerLevel}` : "-"}
        </TableCell>
        <TableCell className="capitalize">
          {p.hpLevel ? `${p.hpLevel} HP` : "-"}
        </TableCell>
      </TableRow>

      <TooltipContent
        side="top"
        align="center"
        className="bg-gray-700 text-body-regular text-white rounded px-3 py-2 max-w-xs"
      >
        <p>{p.description ?? "No description"}</p>
      </TooltipContent>
    </Tooltip>
  );
};