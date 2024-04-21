import Card from "./components/Card";

const IrCounter = () => {

    const cards = [
        { id: 1, title: "Entra", count: 278, iconClassName: "bi bi-person-fill-up" },
        { id: 2, title: "Sale", count: 159, iconClassName: "bi bi-person-fill-down" },
        { id: 3, title: "Promedio", count: 310, iconClassName: "bi bi-people-fill" }
    ];

    return (
        <div className="row">
            {cards.map(card => (
                <Card key={card.id} title={card.title} count={card.count} iconClassName={card.iconClassName} />

            ))}
        </div>
    );
};

export default IrCounter;
