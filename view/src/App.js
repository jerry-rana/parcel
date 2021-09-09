import Sender from './sender';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center p-4 App">
      <main className="bg-white shadow-sm rounded p-4">
        <Sender />
      </main>
    </div>
  );
}

export default App;
