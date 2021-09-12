const Parcel = require('../models/parcelModel');
const header = {
    'Content-Type': 'application/json', 
    'Access-Control-Allow-Origin': "http://localhost:3000",
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT'
};

async function getSender(req, res){
    try{
        const sender = await Parcel.sender();
        res.writeHead(200, header)
        res.end(JSON.stringify(sender))
    }catch(err){
        console.log(err);
    }
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(err)
        }
    })
}

async function getParcels(req, res){
    try{
        const parcel = await Parcel.read();

        res.writeHead(200, header)
        res.end(JSON.stringify(parcel))
    }catch(err){
        console.log(err);
    }
}

async function createParcel(req, res){
    const body = await getPostData(req)
    try{
        const parcel = await Parcel.create(body);

        res.writeHead(200, header)
        res.end(JSON.stringify(parcel))
    }catch(err){
        console.log(err);
    }
}

async function updateParcel(req, res){
    const body = await getPostData(req)
    try{
        const parcel = await Parcel.update(body);

        res.writeHead(200, header)
        res.end(JSON.stringify(parcel))
    }catch(err){
        console.log(err);
    }
}

async function getBiker(req, res){
    try{
        const biker = await Parcel.biker();
        res.writeHead(200, header)
        res.end(JSON.stringify(biker))
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    getSender,
    getParcels,
    createParcel,
    updateParcel,
    getBiker
}