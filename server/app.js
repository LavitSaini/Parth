import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

dotenv.config();
app.use(express.json());
app.use(cors({
    credentials : true,
    origin : "http://localhost:5173",
}))

app.post('/bhfl', (req, res) => {
    try {
        const { data } = req.body;

        const numbers = data.filter(item => !isNaN(item));
        
        const alphabets = data.filter(item => isNaN(item));
        let alphabetsToReverse = [...alphabets];
        
        const highest_alphabet = [];
        let highestAlphabet = alphabetsToReverse.sort().reverse()[0];
        
        if(highestAlphabet) {
            highest_alphabet.push(highestAlphabet);
        }

        res.json({
            is_success : true,
            user_id : "john_doe_17091999",
            email : "john@xyz.com",
            roll_number : "ABCD123",
            numbers,
            alphabets,
            highest_alphabet
        });

    } catch (error) {
        console.log("Error coming in post api");
        return res.status(500).json({
            message : `Error in post api ${error.message}`
        })
    }
})


app.get('/bhfl', (req, res) => {
    try {
        res.json({
            operation_code : 1
        });
    } catch (error) {
        console.log("Error coming in get api");
        return res.status(500).json({
            message : `Error in get api ${error.message}`
        })
    }
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log("Server is listening on port 3000");
})