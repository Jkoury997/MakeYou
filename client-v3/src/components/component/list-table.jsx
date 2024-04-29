import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export function ListTable() {
  return (
    (<div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Store</TableHead>
            <TableHead className="hidden md:table-cell ">Battery (R / T)</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>ABC123456789</TableCell>
            <TableCell>Store A</TableCell>
            <TableCell className="hidden md:table-cell">
              <div className="flex items-center gap-2">
                <BatteryIcon className="w-4 h-4" />
                <span>75%</span>
                <BatteryIcon className="w-4 h-4" />
                <span>75%</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-end gap-2">
                <Button size="sm" variant="ghost">
                  <FileEditIcon className="w-4 h-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button size="sm" variant="ghost">
                  <TrashIcon className="w-4 h-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>DEF987654321</TableCell>
            <TableCell>Store B</TableCell>
            <TableCell className="hidden md:table-cell">
              <div className="flex items-center gap-2">
                <BatteryIcon className="w-4 h-4" />
                <span>50%</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-end gap-2">
                <Button size="sm" variant="ghost">
                  <FileEditIcon className="w-4 h-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button size="sm" variant="ghost">
                  <TrashIcon className="w-4 h-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>GHI456789012</TableCell>
            <TableCell>Store C</TableCell>
            <TableCell className="hidden md:table-cell">
              <div className="flex items-center gap-2">
                <BatteryIcon className="w-4 h-4" />
                <span>25%</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-end gap-2">
                <Button size="sm" variant="ghost">
                  <FileEditIcon className="w-4 h-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button size="sm" variant="ghost">
                  <TrashIcon className="w-4 h-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>)
  );
}

function BatteryIcon(props) {
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
      <rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
      <line x1="22" x2="22" y1="11" y2="13" />
    </svg>)
  );
}


function FileEditIcon(props) {
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
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>)
  );
}


function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>)
  );
}
