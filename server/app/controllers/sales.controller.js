const db = require("../models");
const Sales = db.sales;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
    // Validate request
     
    // const body = typeof req.body !='undefined' && req.body !=null && req.body !={} ? req.body : {};
    // if (body == null) {
    //     console.log("fuck");
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // } 
    // console.log(JSON.stringify(req.body));
    // console.log("req.body.customer_name "+req.body);

    const sales = {
        customer_name: req.body.customer_name,
        qty_total: req.body.qty_total,
        grand_total: req.body.grand_total,
        status: req.body.status
    };
  
    
    Sales.create(sales)
      .then(data => {
        
        res.status(200).send({
            status: "200",
            message:"success",
            data: data
          });
      })
      .catch(err => {
        res.status(500).send({
            status: "500",
            message:"fail"
          });
      });
  };

  
exports.findAll = (req, res) => {
    Sales.findAll()
      .then(data => {
        res.status(200).send({
            status: "200",
            message:"success",
            data: data
          });
      })
      .catch(err => {
        res.status(500).send({
            status: "500",
            message:"fail "+err.message
          });
      });
  };


  exports.findOne = (req, res) => {
    const id = req.params.id;
    Sales.findByPk(id)
      .then(data => {
        res.status(200).send({
            status: "200",
            message:"success",
            data: data
          });
      })
      .catch(err => {
        res.status(500).send({
            status: "500",
            message:"fail "+err.message
          });
      });
  };