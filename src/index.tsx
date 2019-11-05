import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './common/App/App';

function render(Root) {
  ReactDOM.hydrate(
    <BrowserRouter>
      <Root />
    </BrowserRouter>,
    document.getElementById('root'),
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./common/App/App', () => {
    render(App);
  });
}
