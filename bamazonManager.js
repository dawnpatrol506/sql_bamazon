require ('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql');
const queries = require('./queries');
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB
});

function addInventory(db, callback){
    inquirer.prompt([
        {
            message: 'Input the ID of the item you would like to add to.',
            name: 'id'
        },
        {
            message: 'Input the number you would like to add.',
            name: 'qty'
        }
    ]).then(res => {
        callback(db, res.id, res.qty);
    });
}

db.connect(err =>{if(err)console.log(err);});

inquirer.prompt([{
    type: 'list',
    message: 'Choose an action',
    name: 'selection',
    choices: ['View Products', 'View Low Inventory', 'Add Inventory', 'Add New Product']
}]).then(res =>{
    switch(res.selection){
        case 'View Products':
            queries.viewProductsForSale(db);
            break;
        case 'View Low Inventory':
            queries.viewLowInventory(db);
            break;
        case 'Add Inventory':
            queries.viewProductsForSale(db)
            addInventory(db, queries.addToInventory);
            break;
        case 'Add New Product':
            let product = addNewProduct()
            queries.addNewProduct(db, product);
    }
});