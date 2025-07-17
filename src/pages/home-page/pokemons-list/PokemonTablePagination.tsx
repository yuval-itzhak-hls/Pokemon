
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { PokemonTablePaginationProps} from "./types"; 
import { PaginationTexts, ItemsPerPageOptions } from "./consts";


export const PokemonTablePagination = (props: PokemonTablePaginationProps) => {
  const {
    currentPage,
    pageCount,
    itemsPerPage,
    totalItems,
    onPageChange,
    onItemsPerPageChange,
  } = props;

  const currentRangeStart: number = (currentPage - 1) * itemsPerPage + 1;
  const currentRangeEnd: number = Math.min(
    currentPage * itemsPerPage,
    totalItems
  );

  const displayRange: string =
    totalItems === 0
      ? PaginationTexts.NoItemsFound
      : `${currentRangeStart}-${currentRangeEnd} of ${totalItems} ${PaginationTexts.ItemsLabel}`;

  return (
    <div className="flex items-center justify-between px-4 py-3 text-caption-regular text-neutrals-600 h-11 border-t">
      <div className="flex items-center gap-3 whitespace-nowrap">
        <span>{PaginationTexts.RowsPerPage}</span>
        <select
          className="rounded-md bg-transparent p-1 focus:outline-none"
          value={itemsPerPage}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            onItemsPerPageChange(Number(event.target.value));
            onPageChange(1); // Reset to first page when items per page changes
          }}
        >
          {ItemsPerPageOptions.map((option: number) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-8">
        <span className="text-caption-regular text-neutrals-600 whitespace-nowrap">
          {displayRange}
        </span>
        <Pagination>
          <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                aria-disabled={currentPage === 1}
                onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                  event.preventDefault();
                  if (currentPage > 1) onPageChange(currentPage - 1);
                }}
                className="[&>span]:sr-only"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                aria-disabled={currentPage === pageCount}
                onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                  event.preventDefault();
                  if (currentPage < pageCount) onPageChange(currentPage + 1);
                }}
                className="[&>span]:sr-only"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};