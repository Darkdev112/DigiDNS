
const express=require("express");
const route=express.Router();
const {loginSignup,records,dnsQueries}=require("../controller")
const{authentication}=require("../middleware");

route.post("/signup",[],loginSignup.createUser);
route.post("/login",[],loginSignup.loginUser);

route.post("/createRecord",[authentication],records.createRecord);
route.delete("/deleteRecord",[],records.deleteRecord);
route.patch("/updateRecord",[],records.updateRecord);
route.get("/getAllRecord",[authentication],records.getAllRecord);
route.get("/getOneRecord",[],records.getRecord);
route.get("/searchRecords",[],records.searchRecord)


route.get("/dnsQuery",[],dnsQueries.dnsRequest);

module.exports=route;