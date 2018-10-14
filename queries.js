function viewProductsForSale(db){
    let query = 'SELECT * FROM products';

    db.query(query, (err, result, fields) => {
        if(err){
            console.log(err);
            return;
        }

        console.log('ID  NAME               PRICE   QTY')
        console.log('----------------------------------');
        
        result.forEach(row =>{
            let nameSpacing = '';
            for(let i = 0; i < 20 - row.product_name.length; i++){
                nameSpacing += ' ';
            }

            let priceSpacing;

            if(row.price < 10)
                priceSpacing = '    ';
            else if(row.price < 100)
                priceSpacing = '   ';
            else
                priceSpacing = '  ';

            console.log(row.item_id + '  ' + row.product_name + nameSpacing + row.price.toFixed(2) + priceSpacing + row.stock_quantity);
        })
    })

    db.end(err => {if(err)console.log(err);});
}

function viewLowInventory(db){
    let query = 'SELECT * FROM products WHERE stock_quantity < 5';

    db.query(query, (err, result, fields) => {
        if(err){
            console.log(err);
            return;
        }

        console.log('ID  NAME               PRICE   QTY')
        console.log('----------------------------------');
        
        result.forEach(row =>{
            let nameSpacing = '';
            for(let i = 0; i < 20 - row.product_name.length; i++){
                nameSpacing += ' ';
            }

            let priceSpacing;

            if(row.price < 10)
                priceSpacing = '    ';
            else if(row.price < 100)
                priceSpacing = '   ';
            else
                priceSpacing = '  ';

            console.log(row.item_id + '  ' + row.product_name + nameSpacing + row.price.toFixed(2) + priceSpacing + row.stock_quantity);
        })
    })

    db.end(err => {if(err)console.log(err);});
}

function addToInventory(db, id, qty){
    let query = 'UPDATE products SET stock_quantity = ' + qty + ' WHERE item_id = ' + id;
    db.query(query, (err, result, fields) => {
        if(err){
            console.log(err);
            return;
        }
    })
    
    db.end(err => {if(err)console.log(err);});
}

function addNewProduct(db, name, department, price, qty){
    let query = 'INSERT INTO products' + 
                '(product_name, department_name, price, stock_quantity)' +
                'VALUES(' + name + ', ' + department + ', ' + price + ', ' + qty + ')';
    db.query(query, (err, result, fields) => {if(err)console.log(err);});

    db.end(err => {if(err)console.log(err);});
}


module.exports = queries = {
    viewProductsForSale,
    viewLowInventory,
    addToInventory,
    addNewProduct
};