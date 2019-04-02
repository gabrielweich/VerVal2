import React from 'react';
import ReactDOM from 'react-dom';
import UploadCsv from '../components/UploadCsv/UploadCsv';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UploadCsv />, div);
});
