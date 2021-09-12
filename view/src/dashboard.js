import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-12 border-bottom pb-3 mb-3">
                    <h6>Click to navigate</h6>
                </div>
                <div className="col-md-6 mb-2">
                    <Link to="/sender" className="btn w-100 btn-primary">Sender</Link>
                </div>
                <div className="col-md-6">
                    <Link to="/biker" className="btn w-100 btn-success">Biker</Link>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;