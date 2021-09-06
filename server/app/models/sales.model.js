module.exports = (sequelize, Sequelize) => {
    const Sales = sequelize.define("sales", {
      customer_name: {
        type: Sequelize.STRING
      },
      qty_total: {
        type: Sequelize.INTEGER
      },
      grand_total: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.STRING
      }
    });
  
    return Sales;
  };
  