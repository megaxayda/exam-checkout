import './App.css';

import Checkout from 'components/checkout/Checkout';
import PriceConfig from 'components/priceConfig/PriceConfig';
import React from 'react';

function App() {
  return (
    <div className="main">
      <PriceConfig />
      <Checkout />
    </div>
  );
}

export default App;
