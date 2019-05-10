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
            name: 'quantity',
            message: 'How many units of the product would you like to buy?'

        }
    ])
    // response of the user to the above two messages
    .then(({productID, quantity})=> {
        console.log(productID)
        console.log(quantity)
    })
}

// function to check stock
// need to make productID = item_id
// if enough stock then process order for customer
// and update SQL database to relect the remaining quantity
// once update goes through, show customer the total cost of their purchase

// if not enough stock, log phrase 'Insufficient quantity' and prevent
// order from going through

let checkStock = (productID, quantity) => {
    db.query(`SELECT * FROM products WHERE item_id = ${productID}`, (e, 
        [{product_name, price, stock_quantity}])=> {
            if(e) throw e
            if(stock_quantity => quantity) {
                console.log(`
                    Order Processed!!
                    Quantity: ${quantity}
                    Product Name: ${product_name}
                    TOTAL COST: ${price * quantity}
                
                `)
            }
        })
}


