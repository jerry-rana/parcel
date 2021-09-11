const http = require('http');
const { getSender, getParcels, createParcel } = require('./controllers/parcelController');

const server = http.createServer((req, res) => {
    
    if (req.url === '/sender' && req.method === 'GET') {
        getSender(req, res);
    }else if (req.url === '/parcel' && req.method === 'GET') {
        getParcels(req, res);
    } else if(req.url === '/parcel' && req.method === 'POST') {
        createParcel(req, res); 
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" })
        res.end(JSON.stringify({ message: 'Nothing found here' }))
    }

})

const PORT = 5000;
server.listen(PORT, () => console.log('Server running on port ' + PORT))

module.exports = server;