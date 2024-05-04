
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

export function FilterDate({ onSearch, initialStartDate, initialEndDate }) {
  // Estados para manejar las fechas de inicio y fin
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  // Función para formatear la fecha en un string legible
  const formatDate = (date) => date.toLocaleDateString('es-ES');

  return (
    <div className="flex flex-row justify-end items-center gap-2 w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-auto justify-start text-left font-normal" variant="outline">
            <CalendarDaysIcon className="mr-1 h-4 w-4" />
            {formatDate(startDate)}  {/* Muestra la fecha seleccionada */}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar initialFocus mode="single" selected={startDate} onSelect={setStartDate} />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-auto justify-start text-left font-normal" variant="outline">
            <CalendarDaysIcon className="mr-1 h-4 w-4" />
            {formatDate(endDate)}  {/* Muestra la fecha seleccionada */}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar initialFocus mode="single" selected={endDate} onSelect={setEndDate} />
        </PopoverContent>
      </Popover>
      <Button onClick={() => onSearch(startDate, endDate)} className="ml-0 w-auto">
        <SearchIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}


function CalendarDaysIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
