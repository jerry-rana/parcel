const senderList = [
    { senderId: "01" },
    { senderId: "02" },
    { senderId: "03" },
    { senderId: "04" },
    { senderId: "05" }
]
const bikerList = [
    { bikerId: "01" },
    { bikerId: "02" },
    { bikerId: "03" },
    { bikerId: "04" },
    { bikerId: "05" },
    { bikerId: "06" },
    { bikerId: "07" },
    { bikerId: "08" },
    { bikerId: "09" },
    { bikerId: "10" }
]

var store = [
    {
        senderId: "01",
        parcelId: "123",
        name: "Parcel 1",
        pickUp: 'street A',
        dropOff: 'street B',
        status: 'Not Picked',
    },
    {
        senderId: "01",
        parcelId: "124",
        name: "Parcel 2",
        pickUp: 'street A',
        dropOff: 'street B',
        status: 'Not Picked',
    },
    {
        senderId: "02",
        parcelId: "125",
        name: "Parcel 2",
        pickUp: 'street A',
        dropOff: 'street B',
        status: 'Not Picked'
    },
    {
        senderId: "03",
        parcelId: "126",
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

// parcel read, create and update
function read(){
    return new Promise((resolve, reject) => {
        resolve(JSON.stringify(store));
    })
}

function create(parcel){
    return new Promise((resolve, reject) => {
        store.push(JSON.parse(parcel));
        resolve(store);
    })
}

function update(parcel){
    let obj = JSON.parse(parcel);
    return new Promise((resolve, reject) => {
        store.map((item, idx) => {
            if(item.parcelId === obj.parcelId){
                store[idx] = {...item, bikerId: obj.bikerId, status: obj.status, dateTime: obj.dateTime};    
            }
        })

        resolve(store);
    })
}

// get biker
function biker(){
    return new Promise((resolve, reject) => {
        resolve(JSON.stringify(bikerList));
    })
}


module.exports = {
    sender,
    read,
    create,
    update,
    biker
}