DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;


DROP TABLE IF EXISTS products;
CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(20) NOT NULL DEFAULT 'GENERAL',
    price FLOAT NOT NULL,
    stock_quantity INTEGER NOT NULL
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES
('SHOES', 'APPAREL', 49.99, 10),
('SOCKS', 'APPAREL', 5.00, 20),
('SHIRT', 'APPAREL', 19.98, 15),
('JEANS', 'APPAREL', 60.00, 30),
('LEATHER VEST', 'APPAREL', 99.99, 1),
('MICROWAVE OVEN', 'HOME GOODS', 200.00, 10),
('COLOR TV', 'HOME GOODS', 499.95, 10),
('LAMP', 'HOME GOODS', 19.95, 5),
('DESK', 'HOME GOODS', 300.50, 5),
('FLAME-THROWER', 'MISCELLANEOUS', 0.00, 1);