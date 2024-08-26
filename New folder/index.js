import express from 'express';
import cors from 'cors';
import dataRouter from './routes/dataRoute.js';
import dbConnect from './config/db.js';





const app = express();
const PORT = process.env.PORT || 4000;




app.use(express.json());
app.use(cors());


dbConnect();



app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.use('/api/data',dataRouter)




  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
