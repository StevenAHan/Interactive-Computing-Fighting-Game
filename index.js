// define the port that this project should listen on
const port = 60000;

// set up express
const express = require('express');
const app = express();

// set up the 'public' folder to serve static content to the user
app.use( express.static('public') );

// set up socket io for bidirectional communication with the client
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// read the HTML file for this demo into memory from the 'public' directory
const fs = require('fs');
const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');

// tell the server to send out the HTML file for this demo when it gets contacted
app.get("/", function(request, response) {
    // tell the user they should expect HTML
    response.type('html');

    // send the HTML file to the browser
    response.write(htmlFile);

    // tell the browser we are done!
    response.end();
});


// start up the server (go to your browser and visit localhost:port)
server.listen(port, () => {
    console.log(`listening on :${port}`);
});



// your custom code for faciltating communication with clients can be written below

let users = {};
let games = {};
let userId = 0;
let gameId = 0;
let lobby = "lobby"; // room for those not in a game

// whenever a client connects to the server
io.on('connection', function(socket) {
    console.log('a user connected');

    users[socket] = {
        "id": userId++, 
        "socket": socket
    };
    socket.join(lobby);

    socket.on('create_game', function(game) {
        console.log("creating game: ", game);

        let gameCode = gameId++;
        games[gameCode] = {code: gameCode, user1: socket};
        users[socket].gameCode = gameCode;
        socket.leave(lobby);
        socket.join(gameCode);

        socket.to(lobby).emit('update_games', games);
    });

    socket.on('join_game', function(game) {
        console.log("joining game: ", game);

        games[game.code].user2 = socket;
        users[socket].gameCode = game.code;
        socket.leave(lobby);
        socket.join(game.code);

        socket.to(lobby).emit('update_games', games);
    });

    socket.on('user_output', function(data) {
        console.log(`user ${users[socket].id} sent to game ${users[socket].gameCode}: ${data}`);

        socket.emit("user_input", data);
    });

    socket.on('leave_room', function(data) {
        console.log(`user ${users[socket].id} is leaving a game: ${data}`);

        socket.leave(data.gameCode);

        // logic assumes 2 player game
        if (games[data.gameCode].user1 === socket) {
            delete games[data.gameCode.user1];
            if (!games[data.gameCode].user2) {
                delete games[data.gameCode];
            }
        } else if (games[data.gameCode].user2 === socket) {
            delete games[data.gameCode.user2];
            if (!games[data.gameCode].user1) {
                delete games[data.gameCode];
            }
        }

        socket.to(lobby).emit('update_games', games);
    });

    

});
