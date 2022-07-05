const url = "https://localhost:5001/api/beanvariety/";

let beans = []
const useBeans = () => {
    return [...beans]
}

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
    console.log("inside CreateBean");
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

    // const applicationElement = document.querySelector(".coffeeshop");
    document.getElementById("newBean__submit").addEventListener("click", event => {

        console.log("inside submit event listener");
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

                //showPostList()
                console.log("inside api call");
                document.querySelector("input[name='beanName']").value = ""
                document.querySelector("input[name='beanRegion']").value = ""
                document.querySelector("textarea[name='beanNotes']").value = ""
            })
    })
}

