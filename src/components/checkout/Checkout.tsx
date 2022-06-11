import defaultPrice from 'constants/defaultPrice';
import { toFormat, Transformer } from 'dinero.js';
import React from 'react';

const transformer: Transformer<number> = (props) =>
  `${props.currency.code} ${props.amount}`;

export default function Checkout() {
  return (
    <div
      style={{
        flex: 1,
        borderLeft: '1px solid black',
        padding: '20px',
      }}
    >
      <h2>Checkout</h2>

      <label htmlFor="customerType" style={{ display: 'block' }}>
        Choose customer type:
      </label>
      <select id="customerType" name="customerType">
        <option value={'Microsoft'}>Microsoft</option>
      </select>

      <table style={{ width: '100%', textAlign: 'left', marginTop: '10px' }}>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
        <tr>
          <td>Large Pizza</td>
          <td>{toFormat(defaultPrice.LARGE, transformer)}</td>
          <td>
            <input name="largeQuantity" type="number"></input>
          </td>
        </tr>
        <tr>
          <td>Medium Pizza</td>
          <td>{toFormat(defaultPrice.MEDIUM, transformer)}</td>
          <td>
            <input name="largeQuantity" type="number"></input>
          </td>
        </tr>
        <tr>
          <td>Small Pizza</td>
          <td>{toFormat(defaultPrice.SMALL, transformer)}</td>
          <td>
            <input name="largeQuantity" type="number"></input>
          </td>
        </tr>
      </table>

      <h4>Applied: </h4>
      <ol>
        <li>microsoft buy 1 get 1</li>
      </ol>

      <h3>Total: USD 1000.20</h3>
    </div>
  );
}
