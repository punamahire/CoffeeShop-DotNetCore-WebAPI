const url = "https://localhost:5001/api/coffee/";

export const getCoffees = () => {

    return fetch(url)
        .then(response => response.json())
        .then(parsedResponse => {
            return parsedResponse;
        })
}

export const addCoffee = coffeeObj => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(coffeeObj)

    })
        .then(response => response.json())
}

export const deleteCoffee = coffeeId => {
    return fetch(url + `${coffeeId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    // .then(response => response.json())
}

export const getSingleCoffee = (coffeeId) => {
    return fetch(url + `${coffeeId}`)
        .then(response => response.json())
}

export const updateCoffee = (coffeeObj) => {
    return fetch(url + `${coffeeObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(coffeeObj)
    })
        .then(response => {
            console.log(response);
        })
}