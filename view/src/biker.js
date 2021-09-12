import React, { useEffect, useState } from 'react';
import ParcelService from './service';

const Biker = () => {
    const [bikerList, setBikerList] = useState([]);
    const [parcelList, setParcelList] = useState([]);
    const [bikerId, setBikerId] = useState('01');

    const getBikerList = () => {
        ParcelService.readBiker()
        .then(data => 
            data.length > 0 && 
            setBikerList(JSON.parse(data)),
            getParcelList(bikerId)
        )
        .catch(err => console.log(err.message))
    }

    const getParcelList = (id) => {
        setBikerId(id);
        ParcelService.readParcel()
        .then(data => {
            if(data.length > 0)
            {
                //const filtered = JSON.parse(data).filter(item => item.senderId === id);
                setParcelList(JSON.parse(data));
            }
        })
        .catch(err => console.log(err.message))
    }

    const updateStatus = (parcelId, status) => {
        if((status === `Picked` || status === `Delivered`) && !window.confirm("Current timestamp will be added to the order status!")){
            return false
        }

        let dateTime = new Date();
        ParcelService.updateStatus({parcelId, bikerId, status, dateTime})
        .then(() => 
            getParcelList(bikerId)
        )
        .catch(err => console.log(err))
    }


    useEffect(() => {
        getBikerList();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-md-12 text-end">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => getBikerList()}>Refresh</button>
                </div>
            </div>
            <div className="row align-items-center border-bottom pb-3 mb-3">
                <div className="col-md-8">
                    <h6 className="fw-bold text-primary mb-0">Biker web tool</h6>
                </div>
                <div className="col-md-4 text-end">
                    <div className="input-group">
                        <label className="pe-2 text-secondary fw-bold">Welcome</label>
                        <select className="form-control border-0 border-bottom py-0" onChange={(e) => getParcelList(e.target.value)}>
                            {bikerList.map((item, key) => (
                                <option key={key} value={item.bikerId}>Biker {item.bikerId}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            {
            parcelList.length > 0 ?
                <ParcelList list={parcelList} handleStatusChange={updateStatus} selectedId={bikerId}/>
                :
                <p className="text-center">No Parcel Found!</p>
            }
        </div>
    )
}

const ParcelList = (props) => {
    const filtered = props.list.filter(item => item.bikerId === props.selectedId && item.status !== `Delivered`);

    return (<>
        <div className="row bg-gray-shade text-primary py-2 d-none d-md-flex">
            <div className="col-md-1 text-center">#</div>
            <div className="col-md-2">Parcel Name</div>
            <div className="col-md-2">Pick-up address</div>
            <div className="col-md-2">Drop-off address</div>
            <div className="col-md-2 text-center">Status</div>
            <div className="col-md-3 text-center">Action</div>
        </div>
            {
                props.list.map(item => (
                    <div key={item.parcelId} className="row align-items-center border-bottom fs-6">
                        <div className="col-md-1 text-md-center text-primary">{item.parcelId}</div>
                        <div className="col-md-2">{item.name}</div>
                        <div className="col-md-2">{item.pickUp}</div>
                        <div className="col-md-2">{item.dropOff}</div>
                        <div className="col-6 col-md-2 fw-bold small text-center">
                            <small className="text-muted d-none">{item.bikerId && `Biker ${item.bikerId}`} </small>
                            <span className={
                                item.status === `Not Picked` ? `text-success` :
                                item.status === `Picked` ? `text-info` :
                                item.status === `On The Way` ? `text-warning` : `text-danger`
                            }>{item.status}</span>
                        </div>
                        <div className="col-6 col-md-3 text-center">
                        { item.status === `Not Picked` ?
                                <button 
                                className="btn btn-sm btn-success my-2"
                                disabled={filtered.length > 0 ? true : false} 
                                onClick={() => props.handleStatusChange(item.parcelId, `Picked`)}
                            >Pick Parcel</button>

                        : `bikerId` in item && item.status === `Picked` ?
                            
                            <button 
                                    className="btn btn-sm btn-warning my-2"
                                    disabled={`bikerId` in item && item.bikerId === props.selectedId ? false : true} 
                                    onClick={() => props.handleStatusChange(item.parcelId, `On The Way`)}
                                >On The Way</button>
                        
                        : `bikerId` in item && item.status === `On The Way` ?

                            <button 
                                    className="btn btn-sm btn-success my-2"
                                    disabled={`bikerId` in item && item.bikerId === props.selectedId ? false : true} 
                                    onClick={() => props.handleStatusChange(item.parcelId, `Delivered`)}
                                >Delivered</button>
                        :
                            <small>Done</small>
                       }
                        </div>
                    </div>
                ))
            }
        </>)
}

export default Biker;