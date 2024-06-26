import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"


export function FilterPredictions({ onSearch, initialStartDate, initialEndDate}) {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const formatDate = (date) => date.toLocaleDateString('es-ES');

  const handleApplyFilters = () => {
    onSearch(startDate, endDate);
    setPopoverOpen(false); // Cierra el popover
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline"><FilterIcon className="mr-2 h-4 w-4" />Ver Prediction</Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0">
        <div className="grid gap-4 p-6">
          <div>
            <h3 className="font-semibold text-lg">Opciones</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Personaliza tu búsqueda de prediciones.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="start">Desde</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full justify-start text-left font-normal" id="start" variant="outline">
                  <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                  {formatDate(startDate)}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar initialFocus mode="single" numberOfMonths={1} selected={startDate} onSelect={setStartDate} />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="end">Hasta</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full justify-start text-left font-normal" id="end" variant="outline">
                  <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                  {formatDate(endDate)}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar initialFocus mode="single" numberOfMonths={1} selected={endDate} onSelect={setEndDate} />
              </PopoverContent>
            </Popover>
          </div>
          <Button onClick={handleApplyFilters}>Predecir</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
function CalendarDaysIcon(props) {
  return (
    (<svg
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>)
  );
}

function FilterIcon(props) {
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
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}