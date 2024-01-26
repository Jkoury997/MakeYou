const rubroUnico = async (products) => {
    let rubrosUnicos = [...new Set(products.map(product => product.Rubro))];
    rubrosUnicos.unshift("Todos")
    return rubrosUnicos;
}

export default {
    rubroUnico
}