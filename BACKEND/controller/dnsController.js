const {Record}=require("../models")

const dnsRequest=async (req, res) => {
    const { hostname } = req.query;
    
    try {
      const record = await Record.findOne({ hostname });
      if (record) {
        res.status(200).json(record);
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}


module.exports={dnsRequest};