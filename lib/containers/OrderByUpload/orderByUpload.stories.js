import React, { useState } from 'react';
import OrderByUpload from './orderByUpload';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  component: OrderByUpload,
  title: 'Colmeia/OrderByUpload',
  decorators: [withKnobs],
};

const storiesStyle = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    margin: '30px',
  },
  resultContainerStyle: {
    display: 'flex',
    width: '200px',
    margin: '10px auto 0',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  resultStyle: {
    display: 'flex',
    width: '100%',
    marginTop: '10px',
    justifyContent: 'space-between',
  },
};

const Result = ({ lines }) => {
  return (
    lines.length > 0 && (
      <div style={storiesStyle.resultContainerStyle}>
        <div style={storiesStyle.resultStyle}>
          <span>SKU</span>
          <span>QUANTITY</span>
        </div>
        {lines.map(line => (
          <div key={line.sku} style={storiesStyle.resultStyle}>
            <span>{line.sku}</span>
            <span>{line.quantity}</span>
          </div>
        ))}
      </div>
    )
  );
};

export const Simple = () => {
  const [lines, setLines] = useState([]);
  return (
    <div style={storiesStyle.container}>
      <OrderByUpload onChange={setLines} />
      <Result lines={lines} />
    </div>
  );
};
