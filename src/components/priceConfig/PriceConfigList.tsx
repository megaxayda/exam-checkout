import React from 'react';

export default function PriceConfigList() {
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
        </tr>
        <tr>
          <td>microsoft buy 1 get 1</td>
          <td>microsoft</td>
          <td>Large</td>
          <td>Free per x</td>
          <td>N/A</td>
          <td>1</td>
          <td>1</td>
        </tr>
      </table>
    </div>
  );
}
