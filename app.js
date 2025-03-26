// Ramandeep kaur , 0004398
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const connectString = 'mongodb+srv://Ramandeep:Abc.1234@cluster0.jwixp.mongodb.net/';

app.use(bodyParser.json());
app.use(cors()); // Enable CORS
mongoose
    .connect(connectString, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:',  err));

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, requird: true },
    org: { type: String, requird: true }
});
const User = mongoose.model('User', userSchema);

//Routes

//Create a new user
app.post('/users', async(req, res) => {
    try {
        const { name, email } = req.body;
        const user = new User({ name, email });
        await user.save();
        res.status(201).send(user);

    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Read all users
app.get('/users', async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.massage);
    }
});

// Read a single user ID
app.get('/users/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!User) {
            return res.status(400).send('User not Found');
        }
        res.status(200).json(user);

    } catch (error) {
        res.status(500).send(error.massage);
    }
});

// Update the user by Id
app.put('/users/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('user update successfully');

    } catch (error) {
        res.status(500).send(error.massage);
    }
});

// Delete user by Id

app.delete('/users/:id', async(req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('user delete  successfully');

    } catch (error) {
        res.status(500).send(error.massage);
    }

});

// Start the server 
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});