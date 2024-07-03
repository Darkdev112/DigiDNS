const {Record}=require("../models")

const createRecord=async(req,res)=>{
    const { hostname, type, ttl, data } = req.body;
    const email = req.auth.email;

    try {
        const newRecord = new Record({ hostname, type, ttl, data, email });
        await newRecord.save();
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteRecord=async(req,res)=>{
    console.log("BodyReq",req.body);
    const recordId= req.body.id;

    try {
        const record = await Record.findOneAndDelete({ _id: recordId});
        if (!record) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const updateRecord=async(req,res)=>{
    const recordId= req.body._id;
    const { hostname, type, ttl, data } = req.body;

    try {
        const record = await Record.findOneAndUpdate(
            { _id: recordId},
            { hostname, type, ttl, data },
            { new: true }
        );
        if (!record) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getAllRecord=async(req,res)=>{
    const email = req.auth.email;

    try {
        const records = await Record.find({ email });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getRecord=async(req,res)=>{
    const recordId= req.body._id;

    try {
        const record = await Record.findOne({ _id: recordId});
        if (!record) return res.status(404).json({ message: 'Record not found' });
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const searchRecord=async(req, res) => {
    const hostname = req.query.hostname;
  
    try {
      const records = await Record.find({ hostname: new RegExp(hostname, 'i') });
      res.status(200).json(records);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  


module.exports={
    createRecord,
    deleteRecord,
    updateRecord,
    getAllRecord,
    getRecord,
    searchRecord,
}

