"use client"

import { CardContent, Card } from "@/components/ui/card"



export function CardsHome({cards}) {

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

