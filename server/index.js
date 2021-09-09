const http = require('http');

const senderList = [
        {
            senderId: 1,
            parcelId: 123,
            pickUp: 'street A',
            dropOff: 'street B'
        },
        {
            senderId: 2,
            parcelId: 234,
            pickUp: 'street C',
            dropOff: 'street D'
        },
        {
            senderId: 3,
            parcelId: 345,
            pickUp: 'street E',
            dropOff: 'street F'
        }
    ]

const server = http.createServer((req, res) => {
    
    if (req.url === '/sender' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*"})
        res.end(JSON.stringify({ data: senderList }))
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" })
        res.end(JSON.stringify({ message: 'Nothing found here' }))
    }

})

const PORT = 5000;
server.listen(PORT, () => console.log('Server running on port ' + PORT))

module.exports = server;