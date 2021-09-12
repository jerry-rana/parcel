const API_URL = 'http://localhost:5000';

class ParcelService{

    async readSender(){
        return await fetch(`${API_URL}/sender`)
        .then(res => res.json())
    }

    async readParcel(){
        return await fetch(`${API_URL}/parcel`)
        .then(res => res.json())
    }

    async createParcel(formData){
        return await fetch(`${API_URL}/parcel`,
        {
            method:'post',
            //headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        }
        )
        .then(res => res.json())
    }

    async readBiker(){
        return await fetch(`${API_URL}/biker`)
        .then(res => res.json())
    }

    async updateStatus(formData){
        return await fetch(`${API_URL}/update`,
        {
            method:'post',
            mode: 'cors',
            body: JSON.stringify(formData)
        }
        )
        .then(res => res.json())
    }
}

export default new ParcelService();