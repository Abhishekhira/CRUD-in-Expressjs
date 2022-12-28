const express=require("express");
const Joi=require("joi")
//thi module return class 
const app=express();
//above executes express represent our express app it includes bunch of methods
// console.log(app);
app.use(express.json())
const arr=[
    {id:1,name:"abc"},
    {id:2,name:"akshat"},
    {id:3,name:"vishal"}
]
app.get("/",(req,resp)=>{
    resp.send("Hello Welcome to Home page")
})
app.get("/api/customers",(req,resp)=>{
   
    resp.send("Welcome to contact page")

})
app.get("/api/customers/:id",(req,resp)=>{
 let customer=arr.find((item)=>item.id===+req.params.id)
 if (!customer) {
    resp.send("customer with id "+ req.params.id+" is is not found");
 }else{
    resp.send(customer.name)
 }
})
app.post("/api/customers",(req,resp)=>{
    const schema={
        name:Joi.string().min(3).required()
    }
    const result=Joi.validate(req.body,schema)
    console.log(result)
  if(result.error){
    resp.status(400).send("more than 3 character in name require")
  }
    const cust={
        id:arr.length+1,
        name:req.body.name
 };
    arr.push(cust)
    console.log(arr)
    resp.send(cust)
})
app.put("/api/customers/:id",(req,resp)=>{
//look up in the arr
//if not exist return 404
const val=arr.find((item)=>item.id==req.params.id);
if (!val) {
   resp.send("404 not foud customer with this idea") 
   return;
}
//validate
//if invalid return throw error
const schema={
    name:Joi.string().min(3).required()
}
const result=Joi.validate(req.body,schema)
if (result.error) {
    resp.send("Bad request")
}
// update customer
val.name=req.body.name
resp.send(val)
})
app.delete("/api/customers/:id",(req,resp)=>{
    //look up customers in the array
    //if doesn't exist return 404
 const val=arr.find((item)=>item.id==req.params.id);
 if (!val) {
    resp.send("404 page not found")
 }
 const index=arr.indexOf(val);
 arr.splice(index,1,0)
 resp.send(val)
})
//we have a pakcage for validation of name and length of the name called joi
const port=process.env.PORT || 3000
app.listen(port,()=>console.log(`listening to port ${port}`))