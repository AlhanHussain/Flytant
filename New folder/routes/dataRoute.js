import express from 'express';
import {getData,createData,updateData,deleteData} from '../controller/dataController.js';



const dataRouter = express.Router();

dataRouter.post('/create',createData);
dataRouter.get('/get',getData);
dataRouter.put('/update/:id',updateData)
dataRouter.delete('/delete/:id',deleteData)


export default dataRouter;
 