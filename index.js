const chalk = require('chalk');
const sequelize = require("./connect-db");
var initModels = require("./models/init-models");
const {Sequelize} = require('sequelize');

const op = Sequelize.Op;

function logWithFormatting(text) {
  console.log(chalk.bold(chalk.bgCyan.black(' ' + text + ' ')));
}

const main = async () => {

    const models = initModels(sequelize);
    // if you want to sync your models (in the models folder with the db uncomment the line below)
    // await sequelize.sync({ force: true });

    // Query 1: Find all customers
    logWithFormatting("Query 1: Find all customers");
    const customers = await models.customers.findAll({ raw: true });  
    console.table(customers);

    // Query 2: Find customer by ID = 1
    logWithFormatting("Query 2: Find customer by ID = 1");
    const customerId1 = await models.customers.findByPk(1, { raw: true });
    console.table(customerId1);

    // Query 3: Find customer where first name is equal to Sarah
    logWithFormatting("Query 3: Find customer where first name is equal to Sarah");
    const customerSarah = await models.customers.findOne({ where: { first_name: 'Sarah' }, raw: true });
    console.table(customerSarah);

    // Uncomment if you want to first delete the user with email equal to 'test@sequelize.com'
    // await models.customers.destroy({ where: { email: 'test@sequelize.com' } });
    
    // Query 4: Find or create customer with email equal to test@sequelize.com
    logWithFormatting("Query 4: Find or create customer with email equal to test@sequelize.com");
    const [user, created] = await models.customers.findOrCreate({
        where: { email: 'test@sequelize.com' },
        defaults: {
            first_name: 'Christos',
            last_name: 'Hadjichristofi',
            password: '123456'
        },
        raw: true
    })
    if (created) console.table(user);

    // Query 5: Find and count all products where price is between [5, 35]
    logWithFormatting("Query 5: Find and count all products where price is between [5, 35]");
    const { count, rows } = await models.products.findAndCountAll({
        where: { 
            price: {
                [op.between]: [5, 35]
            }
        },
        raw: true
    });
    console.table(`Found ${count} products that have price between 5 and 35`);
    console.table(rows);

    // Query 6: Count the number of orders for a customer (customer_id = 1)
    logWithFormatting("Query 6: Count the number of orders for a customer (customer_id = 1)");
    let numOfOrdersCust1 = await models.orders.count({ where: { customer_id: 1 }})
    console.table(`Customer with ID = 1 has ${numOfOrdersCust1} orders.`);

    // Query 7: Insert a new order for customer_id = 1
    logWithFormatting("Query 7: Insert a new order for customer_id = 1");
    await models.orders.create({
        customer_id: 1,
        status: "Pending",
        order_date: Date.now()
    });

    numOfOrdersCust1 = await models.orders.count({ where: { customer_id: 1 }})
    console.table(`Customer with ID = 1 has ${numOfOrdersCust1} orders.`);

    // Query 8: Find total price of ordered items that belong to order with ID = 1
    logWithFormatting("Query 8: Find total price of ordered items that belong to order with ID = 1");
    const { total_price_order_1 } = await models.order_items.findOne({
        attributes: [
          [ sequelize.fn('sum', sequelize.col('price')), 'total_price_order_1' ]
        ],
        where: { order_id: 1 },
        raw: true
    })

    console.table(`The total price of order with ID = 1 is ${total_price_order_1}.`);

    // Query 9: Find all customers who have placed an order, along with the total number of orders each customer has placed.
    logWithFormatting("Query 9: Find all customers who have placed an order, along with the total number of orders each customer has placed");
    const q9result = await models.customers.findAll({
        attributes: [
            'id', 'first_name', 'last_name', 
            [Sequelize.fn('COUNT', Sequelize.col('orders.id')), 'order_count']
        ],
        include: {
            model: models.orders,
            attributes: []
        },
        group: ['customers.id'],
        having: {
            order_count: {
                [Sequelize.Op.gt]: 0
            }
        },
        raw: true
    });
    
    console.table(q9result);

    // Query 10: Find the top 5 most expensive products, along with the total number of orders each product has been ordered in.
    logWithFormatting("Query 10: Find the top 5 most expensive products, along with the total number of orders each product has been ordered in");
    const q10result = await models.products.findAll({
        attributes: [
            'id',
            'name',
            'price',
            [sequelize.fn('COUNT', sequelize.col('order_items.order_id')), 'orderCount']
        ],
        include: [{
            model: models.order_items,
            attributes: []
        }],
        group: ['products.id'],
        order: [['price', 'DESC']],
        limit: 5,
        subQuery: false,
        raw: true
    });
      
    console.table(q10result);

    // Query 11: Find all customers who have placed an order in the last 30 days, along with the total value of orders for each customer.
    logWithFormatting("Query 11: Find all customers who have placed an order in the last 30 days, along with the total value of orders for each customer");
    const q11result = await models.customers.findAll({
        attributes: [
            'id', 'first_name', 'last_name',
            [Sequelize.fn('SUM', Sequelize.col('orders.order_items.price')), 'total_value'],
        ],
        include: [
            {
                model: models.orders,
                where: {
                    order_date: {
                        [Sequelize.Op.gte]: Sequelize.literal('DATE_SUB(NOW(), INTERVAL 30 DAY)')
                    }
                },
                attributes: [],
                include: [
                    {
                        model: models.order_items,
                        attributes: []
                    }
                ]
            }
        ],
        group: ['customers.id'],
        raw: true
    });
      
    console.table(q11result);

    // Query 12: Find all orders that have at least one product with a price greater than $90, along with the total number of such products in each order.
    logWithFormatting("Query 12: Find all orders that have at least one product with a price greater than $90, along with the total number of such products in each order");
    const q12result = await models.orders.findAll({
        attributes: [
            'id', 'status', 'order_date',
            [Sequelize.fn('SUM', Sequelize.literal('(order_items.price > 90)')), 'product_count']
        ],
        include: {
            model: models.order_items,
            attributes: []
        },
        group: ['orders.id'],
        having: Sequelize.literal('product_count > 0'),
        raw: true
    });

    console.table(q12result);
}


main();