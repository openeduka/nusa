import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom';
import RedirectWithStatus from '../RedirectWithStatus';

import React from 'react';
// import { Rupa } from 'rupa';

//import cls from './App.css';

const Home = () => <h3>Homes</h3>;
const Posts = () => <h3>Posts</h3>;
const NotFound = () => <h3>NotFound</h3>;

function App() {
  //const [text, setText] = useState('Hello, World!');

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/posts" component={Posts} />
        <RedirectWithStatus status={301} from={'/home'} to={'/'} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
