import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(express.static('public'));

const url = 'mongodb://127.0.0.1:27017';
mongoose.connect(url).then(()=>{
    console.log('Connected to MongoDB');
    app.listen(3000,()=>{
        console.log('Server is running on port 3000');
    })
}).catch(()=>{
    console.log('Failed to connect to MongoDB');
})

app.get('/', (req, res)=>{
    res.sendFile('index.html')
    console.log(res, 'response')
})
app.post('/add', (req, res)=>{
    res.send('data send')
    console.log(req.body,"req body")
})

app.get('/todo',(req, res)=>{
    res.send('rendered add path')
})
