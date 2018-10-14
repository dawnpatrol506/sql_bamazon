require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB
});

db.connect(err => {
    if (err)
        console.log(err);
});

db.query('SELECT * FROM `products`', function (err, result, fields) {
    if (err)
        console.log(err);
    else {
        console.log('ITEMS FOR SALE' +
            '\nItem ID    Product Name        Price' +
            '\n------------------------------------');

        result.forEach(row => {
            let emptyString = '';
            for (let i = 0; i < (20 - row.product_name.length); i++) {
                emptyString += ' ';
            }

            console.log(row.item_id +
                '          ' + row.product_name +
                emptyString + row.price);

        });
        inquirer.prompt([
            {
                name: 'id',
                message: 'Input the ID of the item you would like to purchase.'
            },
            {
                name: 'qty',
                message: 'How many would you like?'
            }
        ]).then(res => {
            if (isNaN(res.id) || isNaN(res.qty)) {
                console.log('Invalid ID or Quantity.');
                db.end();
                return;
            }

            if (result[(res.id - 1)].stock_quantity < res.qty) {
                console.log('Insufficient supply');
                db.end();
                return;
            }

            let sum = result[(res.id - 1)].price * res.qty;

            let query = 'UPDATE products SET stock_quantity = ' + (result[(res.id - 1)].stock_quantity - res.qty) + ' WHERE item_id = ' + res.id;

            // console.log('QUERY STRING: ' + query);

            db.query(query, (err, result, fields) => {
                if (err) {
                    console.log(err);
                }

                console.log('Order total: $' + sum.toFixed(2));

                db.end(err => {
                    if (err) console.log(err);
                });
            })

        })

    }
})


