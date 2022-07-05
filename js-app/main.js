import { getCoffees, getSingleCoffee, addCoffee, deleteCoffee, updateCoffee } from "./coffeeDataManager.js"

const url = "https://localhost:5001/api/beanvariety/";

let beans = []
const useBeans = () => {
    return [...beans]
}

const applicationElement = document.querySelector(".coffeeshop");

const button = document.querySelector("#run-button");
button.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(beanVarieties => {
            console.log(beanVarieties);
        })
});

const addButton = document.querySelector("#add-button");
addButton.addEventListener("click", (event) => {

    console.log("event listener");
    CreateBean();
});

const addNewBeanVariety = beanObj => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(beanObj)
    })
        .then(response => response.json())
        .then(parsedResponse => {
            beans.push(parsedResponse)
            return parsedResponse
        })
}

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json())
        .then(allBeans => {
            const beanElement = document.querySelector(".beanList");
            beanElement.innerHTML = BeanList(allBeans);
        });
}

const BeanList = (allBeans) => {
    let beanHTML = "";
    //Loop over the array of beans and for each one, invoke the Bean component which returns HTML representation
    for (const beanObject of allBeans) {
        beanHTML += Bean(beanObject)
    }
    return beanHTML;

}

const Bean = (beanObject) => {

    return `
      <section class="bean">
        <header>
            
            <h2 class="bean__name">${beanObject.name}</h2>
        </header>
        <p class="bean__region">Region: ${beanObject.region}</p>
        <p class="bean__notes">Notes: ${beanObject.notes}</p>
      </section>
    `
}

const CreateBean = () => {

    document.getElementById("beanForm").innerHTML =
        `
        <div class="newBean">
            <br>
            <div>
                <input value=""
                    name="beanName"
                    class="newBean__input"
                    type="text"
                    placeholder="Name" />
            </div>
            <div>
                <input value=""
                    name="beanRegion"
                    class="newBean__input"
                    type="text"
                    placeholder="Region" />
            </div>
            <textarea name="beanNotes"
                class="newBean__input newBean__Notes"
                placeholder="Enter Notes"></textarea>
            <button id="newBean__submit">Add</button>
            <button id="newBean__cancel">Cancel</button>
        </div>
        `
    document.getElementById("newBean__submit").addEventListener("click", event => {

        //collect the input values into an object to add to the DB
        const name = document.querySelector("input[name='beanName']").value
        const region = document.querySelector("input[name='beanRegion']").value
        const notes = document.querySelector("textarea[name='beanNotes']").value

        const beanObject = {
            Name: name,
            Region: region,
            Notes: notes
        }

        // call the API method to add entry to the DB
        addNewBeanVariety(beanObject)
            .then(response => {

                document.querySelector("input[name='beanName']").value = ""
                document.querySelector("input[name='beanRegion']").value = ""
                document.querySelector("textarea[name='beanNotes']").value = ""
            })
    })
}

/***************** CRUD for Coffee component *******************/

const CoffeeList = (allCoffees) => {
    let coffeeHTML = "";
    //Loop over the array of coffees and for each one, invoke the Coffee component which returns HTML representation
    for (const coffeeObject of allCoffees) {
        coffeeHTML += Coffee(coffeeObject)
    }
    return coffeeHTML;

}

const Coffee = (coffeeObject) => {

    return `
      <section class="coffee">
        <header>        
            <h2 class="coffee__title">${coffeeObject.title}</h2>
        </header>

        <button id="details__${coffeeObject.id}">Details</button><br>
        <button id="edit__${coffeeObject.id}">Edit</button><br>
        <button id="delete__${coffeeObject.id}">Delete</button><br>
      </section>
    `
}

const SingleCoffee = (coffeeObject) => {

    return `
      <section class="singleCoffee">
      <hr>
        <header>        
            <h2>Coffee Details</h2>
            <h4 class="coffee__title"> Coffee: ${coffeeObject.title} </h2>
        </header>
        <p class="coffee__beanVarietyName">Bean Variety Name: ${coffeeObject.beanVariety.name}</p>
        <p class="coffee__beanVarietyRegion">Bean Variety Region: ${coffeeObject.beanVariety.region}</p>
      </section>
    `
}

document.querySelector("#showCoffees-button").addEventListener("click", () => {
    getCoffees()
        .then(coffees => {
            document.querySelector(".coffeeList").innerHTML = CoffeeList(coffees);
        })
});

// Add coffee to the database
const CreateCoffee = () => {

    document.getElementById("coffeeForm").innerHTML =
        `
        <div class="newCoffee">
            <br>
            <div>
                <input value=""
                    name="coffeeTitle"
                    class="newCoffee__input"
                    type="text"
                    placeholder="Name of coffee" />
            </div>
            <div>
                <input value=""
                    name="beanId"
                    class="newCoffee__input"
                    type="text"
                    placeholder="Bean Id" />
            </div>
            
            <button id="newCoffee__submit">Add</button>
            <button id="newCoffee__cancel">Cancel</button>
        </div>
        `
    document.getElementById("newCoffee__submit").addEventListener("click", event => {

        //collect the input values into an object to add to the DB
        const title = document.querySelector("input[name='coffeeTitle']").value
        const beanId = document.querySelector("input[name='beanId']").value

        const coffeeObject = {
            Title: title,
            BeanVarietyId: beanId
        }

        // call the API method to add entry to the DB
        addCoffee(coffeeObject)
            .then(response => {

                // the coffee object is added to DB. No need to display the
                // add form anymore.
                document.getElementById("coffeeForm").innerHTML = "";

                // show the list of updated coffees
                getCoffees()
                    .then(coffees => {
                        document.querySelector(".coffeeList").innerHTML = CoffeeList(coffees);
                    })
            })
    })
}

// Update coffee in the database
const UpdateCoffee = (coffeeObj) => {

    document.getElementById("editCoffeeForm").innerHTML =
        `
        <div class="newCoffee">
            <br>
            <div>
                <input value="${coffeeObj.title}"
                    name="coffeeTitle"
                    class="newCoffee__input"
                    type="text"
                    placeholder="Name of coffee" />
            </div>
            <div>
                <input value="${coffeeObj.beanVarietyId}"
                    name="beanId"
                    class="newCoffee__input"
                    type="number"
                    placeholder="Bean Id" />
            </div>
            
            <button id="editCoffee__submit">Update</button>
            <button id="editCoffee__cancel">Cancel</button>
        </div>
        `
    document.getElementById("editCoffee__submit").addEventListener("click", event => {

        //collect the input values into an object to add to the DB
        const title = document.querySelector("input[name='coffeeTitle']").value
        const beanId = document.querySelector("input[name='beanId']").value

        coffeeObj.Title = title;
        coffeeObj.BeanVarietyId = beanId;

        // call the API method to add entry to the DB
        updateCoffee(coffeeObj)
            .then(response => {

                // the coffee object is updated. No need to display the
                // edit form anymore.
                document.getElementById("editCoffeeForm").innerHTML = "";

                // show the list of updated coffees
                getCoffees()
                    .then(coffees => {
                        document.querySelector(".coffeeList").innerHTML = CoffeeList(coffees);
                    })
            })
    })
}

// Handle CRUD events
applicationElement.addEventListener("click", event => {

    event.preventDefault();

    if (event.target.id.startsWith("details")) {

        const coffeeId = parseInt(event.target.id.split("__")[1])

        getSingleCoffee(coffeeId)
            .then(coffee => {
                document.querySelector(".singleCoffee").innerHTML = SingleCoffee(coffee);
            })
    }

    if (event.target.id.startsWith("add")) {

        CreateCoffee();
    }

    if (event.target.id.startsWith("delete")) {

        const coffeeId = parseInt(event.target.id.split("__")[1])

        deleteCoffee(coffeeId)
            .then(resp => {
                getCoffees()
                    .then(coffees => {
                        document.querySelector(".coffeeList").innerHTML = CoffeeList(coffees);
                    })
            })
    }

    if (event.target.id.startsWith("edit")) {

        const coffeeId = event.target.id.split("__")[1];
        getSingleCoffee(coffeeId)
            .then(coffee => {
                UpdateCoffee(coffee);
            })
        console.log("coffee updated");
    }
});

