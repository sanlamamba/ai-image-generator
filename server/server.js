
import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');
   
});


console.log('Server started on port 8080');