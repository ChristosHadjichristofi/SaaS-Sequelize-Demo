CREATE TABLE IF NOT EXISTS customers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  status VARCHAR(50) NOT NULL,
  order_date DATETIME NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO customers (first_name, last_name, email, password)
VALUES ('Jane', 'Doe', 'janedoe@example.com', 'password123'),
       ('Bob', 'Smith', 'bobsmith@example.com', 'password123'),
       ('Alice', 'Johnson', 'alicejohnson@example.com', 'password123'),
       ('Mark', 'Brown', 'markbrown@example.com', 'password123'),
       ('Sarah', 'Williams', 'sarahwilliams@example.com', 'password123');

INSERT INTO products (name, description, price, image_url)
VALUES ('Sweatpants', 'Comfortable and cozy sweatpants', 29.99, 'https://example.com/sweatpants.jpg'),
       ('Jeans', 'Classic blue jeans', 49.99, 'https://example.com/jeans.jpg'),
       ('Sneakers', 'Stylish and comfortable sneakers', 59.99, 'https://example.com/sneakers.jpg'),
       ('Dress', 'Elegant and flattering dress', 79.99, 'https://example.com/dress.jpg'),
       ('Blouse', 'Versatile and chic blouse', 39.99, 'https://example.com/blouse.jpg'),
       ('Jacket', 'Stylish and warm jacket', 99.99, 'https://example.com/jacket.jpg'),
       ('Skirt', 'Flirty and fun skirt', 29.99, 'https://example.com/skirt.jpg'),
       ('Shorts', 'Casual and comfortable shorts', 24.99, 'https://example.com/shorts.jpg'),
       ('Sweater', 'Cozy and cute sweater', 34.99, 'https://example.com/sweater.jpg'),
       ('Hat', 'Stylish and practical hat', 19.99, 'https://example.com/hat.jpg'),
       ('Scarf', 'Warm and cozy scarf', 14.99, 'https://example.com/scarf.jpg'),
       ('Gloves', 'Soft and warm gloves', 9.99, 'https://example.com/gloves.jpg'),
       ('Purse', 'Chic and versatile purse', 49.99, 'https://example.com/purse.jpg'),
       ('Backpack', 'Stylish and practical backpack', 69.99, 'https://example.com/backpack.jpg'),
       ('Sunglasses', 'Cool and trendy sunglasses', 29.99, 'https://example.com/sunglasses.jpg');

INSERT INTO orders (customer_id, status, order_date)
VALUES (2, 'Pending', '2023-04-12 11:00:00'),
       (3, 'Shipped', '2023-04-11 15:00:00'),
       (4, 'Delivered', '2023-04-09 12:00:00'),
       (1, 'Pending', '2023-04-10 09:00:00'),
       (5, 'Pending', '2023-04-08 14:00:00');

INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES (1, 3, 1, 59.99),
       (1, 5, 2, 79.98),
       (2, 2, 1, 49.99),
       (2, 6, 1, 99.99),
       (2, 11, 1, 14.99),
       (3, 4, 1, 79.99),
       (3, 9, 2, 69.98),
       (4, 1, 1, 29.99),
       (4, 7, 1, 29.99),
       (4, 8, 1, 24.99),
       (5, 10, 1, 19.99),
       (5, 12, 1, 9.99),
       (5, 13, 1, 49.99),
       (5, 14, 1, 69.99),
       (5, 15, 1, 29.99);
