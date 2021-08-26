import React from 'react';
import { Route, BrowserRouter} from 'react-router-dom';
import Comp from './components/Comp';

function App() {
  return (
  <div>
    <BrowserRouter>
      <Route exact path="/" component={Comp} />
    </BrowserRouter>
  </div>
  );
}

export default App;
