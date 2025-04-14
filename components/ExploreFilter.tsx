"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { ChevronDown } from "lucide-react";
import { genres,sortOptions } from "@/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";



export function ExploreFilters({
  onGenreChange,
  onSortChange,
  onClear,
  selectedGenre,
  selectedSort,
}: {
  onGenreChange: (genre: string) => void;
  onSortChange: (sort: string) => void;
  onClear: () => void;
  selectedGenre: string;
  selectedSort: string;
}) {
  return (
    <div className="flex flex-wrap justify-between items-center  p-4 rounded-xl shadow-sm  mb-6 gap-4">
      <div className="flex flex-wrap gap-4">
        {/* Genre Dropdown */}
        <Select value={selectedGenre} onValueChange={onGenreChange} >
      <SelectTrigger className="text-sm outline-none border px-4 py-2 w-32 rounded-2xl" >
        <SelectValue placeholder={`Genre: ${selectedGenre}`} />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-auto">
        {genres.map((genre) => (
          <SelectItem key={genre} value={genre} className={genre === selectedGenre ? "font-semibold" : ""}>
            {genre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-sm rounded-2xl">
              Sort: {selectedSort}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-40">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => onSortChange(option)}
                className={option === selectedSort ? "font-semibold" : ""}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Clear All Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClear}
        className="text-blue-500 hover:underline"
      >
        Clear All
      </Button>
    </div>
  );
}
