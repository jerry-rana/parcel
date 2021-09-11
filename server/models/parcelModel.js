//const store = require('./data.json');
const senderList = [
    { senderId: "01" },
    { senderId: "02" },
    { senderId: "03" },
    { senderId: "04" },
    { senderId: "05" }
]

var store = [
    {
        senderId: "01",
        parcelId: "123",
        name: "Parcel 1",
        pickUp: 'street A',
        dropOff: 'street B',
        status: 'Not Picked'
    },
    {
        senderId: "01",
        parcelId: "231",
        name: "Parcel 2",
        pickUp: 'street A',
        dropOff: 'street B',
        status: 'Not Picked'
    },
    {
        senderId: "02",
        parcelId: "123",
        name: "Parcel 2",
        pickUp: 'street A',
        dropOff: 'street B',
        status: 'Not Picked'
    },
    {
        senderId: "03",
        parcelId: "465",
        name: "Parcel 3",
        pickUp: 'street A',
        dropOff: 'street B',
        status: 'Not Picked'
    }
];

// get sender
function sender(){
    return new Promise((resolve, reject) => {
        resolve(JSON.stringify(senderList));
    })
}

// parcel read and create
function read(){
    return new Promise((resolve, reject) => {
        resolve(JSON.stringify(store));
    })
}

function create(parcel){
    return new Promise((resolve, reject) => {
        //let parsedData = JSON.parse(store);
        store.push(JSON.parse(parcel));
        //localStorage.setItem('parcel_data', JSON.stringify(parsedData));
        resolve(store);
    })
}


module.exports = {
    sender,
    read,
    create
}