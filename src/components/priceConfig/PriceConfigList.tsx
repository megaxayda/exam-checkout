import flattenDeep from 'lodash/flattenDeep';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectPricingConfigs } from 'selectors/pricingConfigSelectors';
import { PriceConfig } from 'slices/priceConfigSlice';

import PriceConfigListItem from './PriceConfigListItem';

export default function PriceConfigList() {
  const priceConfigs = useSelector(selectPricingConfigs);

  const list: PriceConfig[] = flattenDeep(
    Object.values(priceConfigs).map((e) => Object.values(e).map((i) => Object.values(i))),
  );

  return (
    <div
      style={{
        flex: 1,
        textAlign: 'left',
      }}
    >
      <table style={{ width: '100%' }}>
        <tr>
          <th>Name</th>
          <th>Customer Type</th>
          <th>Size</th>
          <th>Reduction Type</th>
          <th>Modifier</th>
          <th>Minimum Required</th>
          <th>Priority</th>
          <th></th>
        </tr>

        {list.map((e, index) => (
          <PriceConfigListItem key={index} config={e}></PriceConfigListItem>
        ))}
      </table>
    </div>
  );
}
