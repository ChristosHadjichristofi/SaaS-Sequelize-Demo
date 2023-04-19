var DataTypes = require("sequelize").DataTypes;
var _customers = require("./customers");
var _order_items = require("./order_items");
var _orders = require("./orders");
var _products = require("./products");

function initModels(sequelize) {
  var customers = _customers(sequelize, DataTypes);
  var order_items = _order_items(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);

  order_items.belongsTo(orders, { foreignKey: "order_id"});
  orders.hasMany(order_items, { foreignKey: "order_id"});
  order_items.belongsTo(products, { foreignKey: "product_id"});
  products.hasMany(order_items, { foreignKey: "product_id"});
  orders.belongsTo(customers, { foreignKey: "customer_id"});
  customers.hasMany(orders, { foreignKey: "customer_id"});

  return {
    customers,
    order_items,
    orders,
    products,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
