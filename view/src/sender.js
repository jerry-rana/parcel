import React, { useEffect, useState } from 'react';
import ParcelService from './service';

const Sender = () => {
    const [senderList, setSenderList] = useState([]);
    const [parcelList, setParcelList] = useState([]);
    const [senderId, setSenderId] = useState('01');

    const getSenderList = () => {
        ParcelService.readSender()
        .then(data => 
            data.length > 0 && 
            setSenderList(JSON.parse(data)),
            getParcelList(senderId)
        )
        .catch(err => console.log(err.message))
    }

    const getParcelList = (id) => {
        setSenderId(id);
        ParcelService.readParcel()
        .then(data => {
            if(data.length > 0)
            {
                const filtered = JSON.parse(data).filter(item => item.senderId === id);
                setParcelList(filtered);
            }
        })
        .catch(err => console.log(err.message))
    }

    const handleCreateParcel = (formData) => {
        let parcelId = Math.floor(Math.random() * 999)+'';
        let status = "Not Picked";
        ParcelService.createParcel({senderId, parcelId, ...formData, status})
        .then((data) => 
            getParcelList(senderId)
        )
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getSenderList();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-md-12 text-end">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => getSenderList()}>Refresh</button>
                </div>
            </div>
            <div className="row align-items-center border-bottom pb-3 mb-3">
                <div className="col-md-8">
                    <h6 className="fw-bold text-primary mb-0">Dashboard</h6>
                </div>
                <div className="col-md-4 text-end">
                    <div className="input-group">
                        <label className="pe-2 text-secondary fw-bold">Welcome</label>
                        <select className="form-control border-0 border-bottom py-0" onChange={(e) => getParcelList(e.target.value)}>
                            {senderList.map((item, key) => (
                                <option key={key} value={item.senderId}>Sender {item.senderId}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <CreateParcel handleCreateParcel={handleCreateParcel}/>
            {
            parcelList.length > 0 ?
                <ParcelList list={parcelList}/>
                :
                <p className="text-center">No Parcel Found!</p>
            }
        </div>
    )
}

const CreateParcel = (props) => {
    const [formData, setFormData] = useState(
            {
                name: '',
                pickUp: '',
                dropOff: ''
            }
        );

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const createParcel = () => {
        if(formData['name'] === '' || formData['pickUp'] === '' || formData['dropOff'] === ''){
            alert('Details required!');
            return false;
        }

        props.handleCreateParcel(formData);
        setFormData({ name: '', pickUp: '', dropOff:'' })
    }

    return (<>
        <div className="row py-2 mb-3 bg-gray-shade">
            <div className="col-md-3 mb-2 mb-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" name="name" placeholder="Parcel Name" value={formData.name} onChange={e => handleOnChange(e)} />
                </div>
            </div>
            <div className="col-md-3 mb-2 mb-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" name="pickUp" placeholder="Pick-up" value={formData.pickUp} onChange={e => handleOnChange(e)}/>
                </div>
            </div>
            <div className="col-md-3 mb-2 mb-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" name="dropOff" placeholder="Drop-off" value={formData.dropOff} onChange={e => handleOnChange(e)}/>
                </div>
            </div>
            <div className="col-md-3 text-end">
                <button className="btn btn-primary" onClick={() => createParcel()}>Create new</button>
            </div>
        </div>
    </>)
}

const ParcelList = (props) => {
    const getDateFormat = (dt) => {
        return new Date(dt).toLocaleString()
    }

    return (<>
        <div className="row bg-gray-shade text-primary py-2 d-none d-md-flex">
            <div className="col-md-1 text-center">#</div>
            <div className="col-md-2">Parcel Name</div>
            <div className="col-md-3">Pick-up address</div>
            <div className="col-md-3">Drop-off address</div>
            <div className="col-md-3 text-center">Status</div>
        </div>
        {
            props.list.map(item => (
                <div key={item.parcelId} className="row align-items-center border-bottom fs-6">
                    <div className="col-md-1 text-md-center text-primary">{item.parcelId}</div>
                    <div className="col-md-2">{item.name}</div>
                    <div className="col-md-3">{item.pickUp}</div>
                    <div className="col-md-3">{item.dropOff}</div>
                    <div className="col-6 col-md-3 fw-bold small text-md-center">
                        <span className={
                        item.status === `Not Picked` ? `text-success` :
                            item.status === `Picked` ? `text-info` :
                                item.status === `On The Way` ? `text-warning` : `text-danger`
                        }>{item.status}</span><br/>
                        <small className="text-muted"> {(`dateTime` in item) && `at - ` + getDateFormat(item.dateTime)}</small>
                    </div>
                </div>
            ))
        }
    </>)
}

export default Sender;