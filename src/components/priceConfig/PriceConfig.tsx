import React from 'react';

import PriceConfigForm from './PriceConfigForm';
import PriceConfigList from './PriceConfigList';

export default function PriceConfig() {
  return (
    <div
      style={{
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <PriceConfigForm />
      <hr style={{ borderTop: '1px black solid', width: '100%' }}></hr>
      <PriceConfigList />
    </div>
  );
}
