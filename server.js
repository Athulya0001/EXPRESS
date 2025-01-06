import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use(express.static('public'));
app.use(express.json());

const url = 'mongodb://127.0.0.1:27017/userData';
mongoose.connect(url).then(()=>{
    console.log('Connected to MongoDB');
    app.listen(3000,()=>{
        console.log('Server is running on port 3000');
    });
}).catch((err)=>{
    console.log('Failed to connect to MongoDB', err);
})

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
  });
  
const User = mongoose.model('User', userSchema);

app.get('/', (req, res)=>{
    res.sendFile('index.html')
    console.log(res, 'response')
})
app.post('/add', async (req, res)=>{
    const {name} = req.body;
    console.log(req.body,"req body")

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

    const user = new User({ name });
    const savedUser =await user.save();
    console.log(savedUser,"saveduser");
    console.log(JSON.parse(savedUser),"parsed value");
})

app.get('/todo',(req, res)=>{
    res.send('rendered add path')
})
