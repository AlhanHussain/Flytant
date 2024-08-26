import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  date:{type:Date,default:Date.now},
});

const dataModel = mongoose.model('datas', dataSchema);

export default dataModel;;
