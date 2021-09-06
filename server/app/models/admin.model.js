module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin", {
      fullname: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return admin;
  };
  