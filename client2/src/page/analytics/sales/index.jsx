import CardSale from "../../../components/CardSale";
import FilterDate from "../../../components/FilterDate";

const Sales = () => {

    return (
        <div>
            <FilterDate />
            <div class="row row-cols-1 row-cols-md-2 g-4">
                    <CardSale
                    />
            </div>
        </div>
        
    );
};

export default Sales;
