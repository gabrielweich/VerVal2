import React from 'react';
import ReactDOM from 'react-dom';
import HomeContainer from '../containers/Home/HomeContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HomeContainer />, div);
});
