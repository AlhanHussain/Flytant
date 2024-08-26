import dataModel from "../model/dataModel.js";


 const createData = async (req, res) => {
    try {
      const { title, description } = req.body;
      const newData = new dataModel({ title, description });
      await newData.save();
      res.status(201).json({success:true, message: "Data created successfully",newData });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


const getData = async (req, res) => {
    try {
      const data = await dataModel.find();
      res.status(200).json({success:true, message: "Data fetched successfully",data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
}



const updateData = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const updatedData = await dataModel.findByIdAndUpdate(id, { title, description },{ new: true });
      res.status(200).json({success:true, message: "Data updated successfully",updatedData });
    } catch (error) {
}
}

const deleteData = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedData = await dataModel.findByIdAndDelete(id);
      res.status(200).json({success:true, message: "Data deleted successfully",deletedData });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
}

export  { createData, getData, updateData, deleteData };