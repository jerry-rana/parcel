import React, { useEffect, useState } from 'react';

const Sender = () => {
    const [senderList, setSenderList] = useState([]);

    const getSenderList = () => {
        fetch('http://localhost:5000/sender')
        .then(res => res.json())
        .then(({ data }) => data && setSenderList(data))
        .catch(err => console.log(err.message))
    }

    useEffect(() => {
        getSenderList();

    }, [])

    return (
        <div className="container">
            <div className="row align-items-center border-bottom pb-3 mb-3">
                <div className="col-md-8">
                    <h6 className="fw-bold text-primary mb-0">Dashboard</h6>
                </div>
                <div className="col-md-4 text-end">
                    <div className="input-group">
                        <label className="pe-2 text-secondary fw-bold">Welcome</label>
                        <select className="form-control border-0 border-bottom py-0">
                            {senderList.map((item, key) => (
                                <option key={key} value={item.senderId}>Sender {item.senderId}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <CreateParcel />
        </div>
    )
}

const CreateParcel = () => {
    const [parcelList, setParcelList] = useState([
        {
            parcelId: "01",
            name: "Parcel 1",
            pickUp: 'street A',
            dropOff: 'street B',
            status: 'Not Picked'
        },
        {
            parcelId: "02",
            name: "Parcel 2",
            pickUp: 'street A',
            dropOff: 'street B',
            status: 'Not Picked'
        },
        {
            parcelId: "03",
            name: "Parcel 3",
            pickUp: 'street A',
            dropOff: 'street B',
            status: 'Not Picked'
        }
    ]);

    return (<>
        <div className="row py-2 mb-3 bg-gray-shade">
            <div className="col-md-3">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Parcel Name" />
                </div>
            </div>
            <div className="col-md-3">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Pick-up" />
                </div>
            </div>
            <div className="col-md-3">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Drop-off" />
                </div>
            </div>
            <div className="col-md-3 text-end">
                <button className="btn btn-primary">Create new</button>
            </div>
        </div>
        {
        parcelList.length > 0 ?
            <ParcelList list={parcelList}/>
            :
            <p className="text-center">No Parcel Found!</p>
        }
    </>)
}
const ParcelList = (props) => {

    return (

        <table className="w-100">
            <thead className="bg-gray-shade text-primary">
                <tr>
                    <td width="50" align="center">#</td>
                    <td>Parcel Name</td>
                    <td>Pick-up address</td>
                    <td>Drop-off address</td>
                    <td>Status</td>
                </tr>
            </thead>    
            <tbody>
            {
                props.list.map(item => (
                    <tr key={item.parcelId} className="border-bottom fs-6">
                        <td width="50" align="center" className="text-primary">{item.parcelId}</td>
                        <td>{item.name}</td>
                        <td>{item.pickUp}</td>
                        <td>{item.dropOff}</td>
                        <td className="text-danger">{item.status}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}

export default Sender;