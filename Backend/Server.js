require('dotenv').config();

const express = require('express');

const app = express();

const router = require('./routes')

const DbConnect = require('./database');

const cors = require('cors');

const cookieparser = require('cookie-parser');

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

app.use(cookieparser());

const corsOption = {

    credentials: true,

    origin : ['http://localhost:3000'],
}
app.use(cors(corsOption))

app.use('/storage', express.static('storage'));

const PORT = process.env.PORT || 5500;

DbConnect();

app.use(express.json({limit: '8mb'}));

app.use(router);

app.get('/', (req,res) => {

    res.send('hello from express js')
});

// socket

io.on('connection', (socket) => {
    console.log('new connection ', socket.id);
});

server.listen(PORT, () => console.log(` listening on port ${PORT}`));