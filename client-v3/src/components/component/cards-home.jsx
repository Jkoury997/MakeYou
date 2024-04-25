"use client"

import { CardContent, Card } from "@/components/ui/card"



export function CardsHome() {

  const cards = [
    {
      icon: DollarSignIcon,
      title: "Entran",
      value: "10.000"
    },
    {
      icon: ShoppingCartIcon,
      title: "Salen",
      value: "10.000"
    },
    {
      icon: TrendingUpIcon,
      title: "Promedio",
      value: "1.000"
    },
    {
      icon: PercentIcon,
      title: "Conversion",
      value: "25.5%"
    }
  ];

  return (

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {cards.map((card, index) => {
                const LinkIcon = card.icon;
                return (
                    <Card key={index}>
                        <CardContent className="flex items-center gap-5">
                        <LinkIcon className="h-6 w-6 text-gray-500 " />
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-500 ">{card.title}</span>
                                <span className="text-2xl font-bold">{card.value}</span>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}

          </div>

  )
}

function DollarSignIcon(props) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}



function PercentIcon(props) {
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
      <line x1="19" x2="5" y1="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  )
}



function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}


function TrendingUpIcon(props) {
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
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}
