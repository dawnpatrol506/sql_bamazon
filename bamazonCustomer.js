require('dotenv').config();
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
    }
})