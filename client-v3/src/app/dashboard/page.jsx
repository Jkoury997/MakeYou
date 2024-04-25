
import { CardsHome } from "@/components/component/cards-home";
import {searchAdvanced} from "../api/ircounter/countdata"


export default  async function Page() {

    const data = {
        startDate: Date.now(),
        endDate: Date.now(),
    }

    const response = await searchAdvanced(data)

    console.log(response)


    return (
        <>
        <CardsHome></CardsHome>

        </>
        
    );
  }