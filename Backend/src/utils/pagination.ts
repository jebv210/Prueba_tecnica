export const pagination = (page = 1, limit = 10, totalItems: number) => {
    const totalPages = Math.ceil(totalItems / limit)// Calcula el total de páginas redondeando hacia arriba con el total de items
    const back = page > 1 ? page - 1 : null// Determina la página anterior, si la página actual es mayor a 1. Si no hay página anterior, es null.
    const next = page < totalPages ? page + 1 : null // Determina la página siguiente, si la página actual es menor al total de páginas. Si no hay página siguiente, es null.

    return { totalPages, totalItems, back, next} 
    // Retorna un objeto con el total de páginas, total de elementos, página anterior y página siguiente.
}