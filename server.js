const express = require("express"); // Importing the express module
const server = express(); // Creating an instance of an Express server
const { products } = require("./data.js"); // Importing the products data from the data.js file

// Home route
server.get("/", (req, res) => {
  res.status(200).send("<h1>hello world</h1><a href='/api/products'>products</a>");
});

// Route to get all products with selected fields
server.get("/api/products", (req, res) => {
  // Map over the products array to create a new array with only the id, image, and name fields
  const newProduct = products.map((product) => {
    const { id, image, name } = product;
    return { id, image, name };
  });

  // Send the new array of products as a JSON response
  res.status(200).json(newProduct);
});

// Route to get a single product by ID
server.get("/api/products/:productID", (req, res) => {
  // Find the product that matches the productID from the request parameters
  const selected = products.find((product) => {
    const { id, image, name } = product;
    return id == req.params.productID;
  });

  // If no product is found, send a 404 status with an error message
  if (!selected) {
    return res.status(404).send("product does not exist");
  }

  // If a product is found, send it as a JSON response
  return res.status(200).json(selected);
});

// Route to handle query parameters for searching and limiting products
server.get("/api/v1/query", (req, res) => {
  let { search, limit } = req.query; // Get the search and limit query parameters
  let sortedProducts = [...products]; // Create a copy of the products array

  // If a search query is present, filter the products array
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search) || product.name.endsWith(search);
    });

    // If a limit query is present, slice the array to the specified limit
    if (limit) {
      sortedProducts = sortedProducts.slice(0, Number(limit));
    }
  }

  // Send the filtered (and possibly limited) array of products as a JSON response
  res.json(sortedProducts);
});

// Start the server on port 5000
server.listen(5000, () => {
  console.log("server running");
});
