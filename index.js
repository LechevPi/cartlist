import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://secondbrain-3273f-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemInCart = ref(database, "cart")

/* Handling click on add buttons */

const inputFieldElement = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const shoppingList = document.getElementById('shopping-list')

addButton.addEventListener("click", function() {
    let inputValue = inputFieldElement.value

    if (inputValue != "") {
        push(itemInCart, inputValue)
    }

    resetInputField()

})

onValue(itemInCart, function(snapshot) {

    if (snapshot.exists()) {

        let itemsArray = Object.entries(snapshot.val())

        resetShoppingList()

        for (let i=0; i<itemsArray.length; i++) {
            let itemId = itemsArray[i][0]
            let itemValue = itemsArray[i][1]
            appendItemToShoppingList(itemId, itemValue)
        }
    } else {
        shoppingList.innerHTML = "<p>Nothing in the list ...</p>"
    }
})

function resetInputField() {
    inputFieldElement.value = ""
}

function appendItemToShoppingList(inputId, inputValue) {

    let newEl = document.createElement("li")
    newEl.textContent = inputValue

    newEl.addEventListener("click", function() {
        deleteItemFromDatabase(inputId)
    })

    shoppingList.append(newEl)
}

function resetShoppingList() {
    shoppingList.innerHTML = ""
}

function deleteItemFromDatabase(elementId) {
    remove(ref(database, `cart/${elementId}`))
}