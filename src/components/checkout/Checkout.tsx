import defaultPrice from 'constants/defaultPrice';
import { toFormat, Transformer } from 'dinero.js';
import useCalculateTotal from 'hooks/useCalculateTotal';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllCustomerTypes } from 'selectors/pricingConfigSelectors';

const transformer: Transformer<number> = (props) =>
  `${props.currency.code} ${props.amount}`;

export default function Checkout() {
  const customerTypes = useSelector(selectAllCustomerTypes);

  const [customerType, setCustomerType] = useState<string>();
  const [smallQuantity, setSmallQuantity] = useState<number>();
  const [mediumQuantity, setMediumQuantity] = useState<number>();
  const [largeQuantity, setLargeQuantity] = useState<number>();

  const { total, configs } = useCalculateTotal(
    customerType,
    smallQuantity,
    mediumQuantity,
    largeQuantity,
  );

  useEffect(() => {
    setCustomerType(customerTypes[0]);
  }, [customerTypes]);

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
      <select
        id="customerType"
        value={customerType}
        onChange={(e) => {
          setCustomerType(e.target.value);
        }}
      >
        <option value={''}>{'Choose customer type'}</option>
        {customerTypes.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>

      <table style={{ width: '100%', textAlign: 'left', marginTop: '10px' }}>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
        <tr>
          <td>Small Pizza</td>
          <td>{toFormat(defaultPrice.SMALL, transformer)}</td>
          <td>
            <input
              value={smallQuantity}
              type="number"
              min={0}
              onChange={(e) => {
                setSmallQuantity(Number(e.target.value));
              }}
            ></input>
          </td>
        </tr>
        <tr>
          <td>Medium Pizza</td>
          <td>{toFormat(defaultPrice.MEDIUM, transformer)}</td>
          <td>
            <input
              value={mediumQuantity}
              type="number"
              min={0}
              onChange={(e) => {
                setMediumQuantity(Number(e.target.value));
              }}
            ></input>
          </td>
        </tr>
        <tr>
          <td>Large Pizza</td>
          <td>{toFormat(defaultPrice.LARGE, transformer)}</td>
          <td>
            <input
              value={largeQuantity}
              type="number"
              min={0}
              onChange={(e) => {
                setLargeQuantity(Number(e.target.value));
              }}
            ></input>
          </td>
        </tr>
      </table>

      <h4>Applied: </h4>
      <ol>
        {configs?.map((e, index) => (
          <li key={index}>{e.name}</li>
        ))}
      </ol>

      <h3>Total: {toFormat(total, transformer)}</h3>
    </div>
  );
}
