const express = require('express');
const app = express();

const { products } = require('./data.js');

// Home route
app.get('/', (req, res) => {
  res
    .status(200)
    .send('<h1>home page</h1><a href="/api/products"> products </a>');
});

// Get all products (only id, name, image)
app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

// Get single product by ID
app.get('/api/products/:productID', (req, res) => {
  const { productID } = req.params;
  const singleProduct = products.find(
    (x) => x.id === Number(productID)
  );

  if (!singleProduct) {
    return res.status(404).send('product not found');
  }
  res.json(singleProduct);
});

// Query route
app.get('/api/v1/products/query', (req, res) => {

  const { search, limit } = req.query;


  let sortedProducts = [...products]; // copy original

  if (search) {
    sortedProducts = sortedProducts.filter((product) =>
      product.name.startsWith(search)
    );
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  if (sortedProducts.length < 1) {
    return res.status(200).json({ success: true, data: [] });
  }

  res.status(200).json(sortedProducts);
});


app.listen(2000, () => {
  console.log('server is running at port number 1000');
});
