const {createConnection} = require('mysql2')

const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Capullo123!',
    database: 'bamazon_db'
})

const inquirer = require('inquirer')

db.connect(e => {
    if(e) {console.log(e)}
    db.query('SELECT * FROM products', (e, data)=> {
        if(e) {console.log(e)}
        console.log(data)
    })
})
// Running this app will first display all of the items available for sale.
// Include ids, names and prices of products for sale
function displayItems() {
    db.query('SELECT * FROM products', (e, data)=> {
        if(e) throw e
        console.log(data)
    })
}
// The app should then prompt users with two messages
function startStore() {
    // First, should ask them the ID of the product they would like to buy
    inquirer.prompt([
        {
            type: 'input',
            name: 'first message',
            message: 'Which product ID which you like to buy?'
        },
        // Second, should ask how many units of the procut they would like to buy
        {
            type: 'input',
            name: 'second message',
            message: 'How many units of the product do you want to purchase?'

        }
    ])
    .then(userInput => {
        console.log(userInput)
    })
} // 
// Once customer has placed the order, your app should check if your store has enough of the product
// to meet the customer's request

// If not, the app should log a phrase like Insufficient quantity! and then prevent the order from going through

// However, if your store does have enough of the product, you should fulfill the customer's order
    // This means updating the SQL database to reflect the remaining quantity
    // Once the update goes through, show the customer the total cost of their purchase
