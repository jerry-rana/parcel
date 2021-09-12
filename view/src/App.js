import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Sender from './sender';
import Biker from './biker';
import Dashboard from './dashboard';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {

  return (
    <div className="container-fluid d-flex justify-content-center p-4 App">
      <main className="bg-white shadow-sm rounded p-4">
        <BrowserRouter>
          <Switch>
            <Route path="/sender" component={Sender} />
            <Route path="/biker" component={Biker} />
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
