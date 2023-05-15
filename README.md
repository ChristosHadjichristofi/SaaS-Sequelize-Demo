# SaaS-Sequelize-Demo

1. `connect-db.js` has the necessary connect function using Sequelize
2. `models/` has the Models that represent the following schema:

![image](https://user-images.githubusercontent.com/40044042/233163585-5a8c7f16-3a51-4929-a961-279254f2e38c.png)

3. `index.js` has the following sequelize query examples:
    1. Find all customers
    2. Find customer by ID = 1
    3. Find customer where first name is equal to Sarah
    4. Find or create customer with email equal to "test@sequelize.com"
    5. Find and count all products where price is between [5, 35]
    6. Count the number of orders for a customer (customer_id = 1)
    7. Insert a new order for customer_id = 1
    8. Find total price of ordered items that belong to order with ID = 1
    9. Find all customers who have placed an order, along with the total number of orders each customer has placed
    10. Find the top 5 most expensive products, along with the total number of orders each product has been ordered in
    11. Find all customers who have placed an order in the last 30 days, along with the total value of orders for each customer
    12. Find all orders that have at least one product with a price greater than $90, along with the total number of such products in each order
