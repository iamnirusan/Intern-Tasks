const mysql = require("mysql");

// MySQL Connection Pool
const con = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

// View all products with pagination
exports.view = (req, res) => {
  const limit = 3; // Number of products per page
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const offset = (page - 1) * limit;

  con.getConnection((err, connection) => {
    if (err) throw err;

    // Query to get total number of products
    connection.query(
      "SELECT COUNT(*) as total FROM products",
      (err, totalResult) => {
        if (err) throw err;

        const totalProducts = totalResult[0].total;
        const totalPages = Math.ceil(totalProducts / limit);

        // Query to get products with limit and offset for pagination
        connection.query(
          "SELECT ID, DATE_FORMAT(CREATED_AT, '%Y-%m-%d %H:%i:%s') AS formatted_datetime, NAME, WEIGHT, PRICE FROM products LIMIT ? OFFSET ?",
          [limit, offset],
          (err, rows) => {
            connection.release();

            if (!err) {
              res.render("home", {
                rows,
                currentPage: page,
                totalPages: totalPages,
              });
            } else {
              console.log("Error in Listing Data: " + err);
            }
          }
        );
      }
    );
  });
};

// Render add product form
exports.addproduct = (req, res) => {
  res.render("addproduct"); // Render the form to add a new product
};

// Save new product to the database
exports.save = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err; // Handle connection error

    const { name, weight, price } = req.body; // Destructure data from request body

    // Insert the new product into the database
    connection.query(
      "INSERT INTO products (NAME, WEIGHT, PRICE) VALUES (?,?,?)",
      [name, weight, price],
      (err, rows) => {
        connection.release(); // Release connection back to pool
        if (!err) {
          res.render("addproduct", {
            msg: "Product Details Added Successfully", // Success message
          });
        } else {
          console.log("Error in Adding Product: " + err);
        }
      }
    );
  });
};

// Render edit product form with existing data
exports.editproduct = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err; // Handle connection error
    const id = req.params.id; // Get product ID from URL parameter

    // Query to fetch product data by ID
    connection.query("SELECT * FROM products WHERE ID=?", [id], (err, rows) => {
      connection.release(); // Release connection back to pool
      if (!err) {
        res.render("editproduct", { rows }); // Render edit form with product data
      } else {
        console.log("Error in Fetching Product: " + err);
      }
    });
  });
};

// Update product details in the database
exports.edit = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err; // Handle connection error

    const { name, weight, price } = req.body; // Destructure updated data from request body
    const id = req.params.id; // Get product ID from URL parameter

    // Query to update product details by ID
    connection.query(
      "UPDATE products SET NAME=?, WEIGHT=?, PRICE=? WHERE ID=?",
      [name, weight, price, id],
      (err, rows) => {
        connection.release(); // Release connection back to pool
        if (!err) {
          // After updating, fetch the updated product details to display confirmation
          con.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(
              "SELECT * FROM products WHERE ID=?",
              [id],
              (err, rows) => {
                connection.release(); // Release connection back to pool
                if (!err) {
                  res.render("editproduct", {
                    rows,
                    msg: "Product Details Updated Successfully", // Success message
                  });
                } else {
                  console.log("Error in Fetching Updated Product: " + err);
                }
              }
            );
          });
        } else {
          console.log("Error in Updating Product: " + err);
        }
      }
    );
  });
};

// Delete product from the database
exports.deleteproduct = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err; // Handle connection error
    const id = req.params.id; // Get product ID from URL parameter

    // Query to delete product by ID
    connection.query("DELETE FROM products WHERE ID=?", [id], (err, rows) => {
      connection.release(); // Release connection back to pool
      if (!err) {
        res.redirect("/"); // Redirect to home page after deletion
      } else {
        console.log("Error in Deleting Product: " + err);
      }
    });
  });
};

// View a single product's details
exports.viewproduct = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err; // Handle connection error
    const id = req.params.id; // Get product ID from URL parameter

    // Query to fetch product details by ID
    connection.query(
      "SELECT ID, DATE_FORMAT(CREATED_AT, '%Y-%m-%d %H:%i:%s') AS formatted_datetime, NAME, WEIGHT, PRICE FROM products WHERE id=?",
      [id],
      (err, rows) => {
        connection.release(); // Release connection back to pool
        if (!err) {
          res.render("showproduct", { rows }); // Render the product details page
        } else {
          console.log("Error in Fetching Product: " + err);
        }
      }
    );
  });
};
