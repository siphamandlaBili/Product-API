const express = require("express");
const server = express();
const {products} = require("./data.js")

server.get("/",(req,res)=>{
  res.status(200).send("<h1>hello world</h1><a href='/api/products'>products</a>")
})

server.get("/api/products",(req,res)=>{
   const newProduct = products.map((product)=>{
      const {id,image,name} = product;
      return {id,image,name}
   })

   console.log(newProduct)
  res.status(200).json(newProduct)
})

server.get("/api/products/:productID",(req,res)=>{
  console.log(req.params.productID)
  
  const selected = products.find((product)=>{
    
     const {id,image,name} = product;
     return id == req.params.productID
  })

  if(!selected){
    return res.status(404).send("product does not exist")
  }
  return res.status(200).json(selected)
})

server.listen(5000,()=>{
  console.log("server running ")
})