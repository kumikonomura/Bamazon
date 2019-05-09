const {createConnection} = require('mysql2')

const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Capullo123!',
    database: 'bamazon_db'
})

const inquirer = require('inquirer')

// Running this app will first display all the items available for sale
// Will include ids, names, and prices of products for sale
let displayItems = _ => {
// db.connect(e => {
//     if(e) {console.log(e)}
    db.query('SELECT * FROM products', (e, data)=> {
        if(e) {console.log(e)}
        for (i = 0; i < 10; i++)
        console.log(`
            ID: ${data[i].item_id}
            Product Name: ${data[i].product_name}
            Department Name: ${data[i].department_name}
            Price: ${data[i].price}
            Stock Quantity: ${data[i].stock_quantity}
        `)
        placeOrder()
    })
}
displayItems()
// The app should then prompt users with two messages
function placeOrder() {
    // First, should ask them the ID of the product they would like to buy
    inquirer.prompt([
        {
            type: 'input',
            name: 'productID',
            message: 'Which product ID which you like to buy?'
        },
        // Second, should ask how many units of the product they would like to buy
        {
            type: 'input',
            name: 'units',
            message: 'How many units of the product would you like to buy?'

        }
    ])
    // response of the user to the above two messages
    .then(({productID, units}) => {
        console.log(`
            Product ID: ${productID}
            Units: ${units}
        `)
    })
} 


// Once customer has placed the order, your app should check if your store has enough of the product to meet the customer's request
// Check against product ID
let checkInventory = _ => {
    db.connect(e => {
        if(e) console.log(e)
        db.query('SELECT * FROM PRODUCTS WHERE item_id', (e, data)=> {
            if(e) console.log(e)
            console.log(data)
        })
    })
}

// If not, the app should log a phrase like Insufficient quantity! and then prevent the order from going through

// However, if your store does have enough of the product, you should fulfill the customer's order
    // This means updating the SQL database to reflect the remaining quantity
    // Once the update goes through, show the customer the total cost of their purchase