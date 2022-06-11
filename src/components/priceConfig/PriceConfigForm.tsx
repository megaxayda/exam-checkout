import { PizzaSize, reductionTypeOption } from 'constants/enum';
import capitalize from 'lodash/capitalize';
import React from 'react';

export default function PriceConfigForm() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          gap: '8px',
        }}
      >
        <h2>Add new price config</h2>

        {/* NAME */}
        <label htmlFor="name">Name: </label>
        <input required id="name" type="text" name="name"></input>

        {/* CUSTOMER TYPE */}
        <label htmlFor="customerType">Customer type: </label>
        <input required id="customerType" type="text" name="customerType"></input>

        {/* SIZE */}
        <label htmlFor="size">Choose pizza size:</label>
        <select id="size" name="size">
          {Object.values(PizzaSize).map((e) => (
            <option key={e} value={e}>
              {capitalize(e)}
            </option>
          ))}
        </select>

        {/* REDUCTION TYPE */}
        <label htmlFor="reductionType">Choose reduction type:</label>
        <select id="reductionType" name="reductionType">
          {reductionTypeOption.map((e) => (
            <option key={e.value} value={e.value}>
              {e.name}
            </option>
          ))}
        </select>

        {/* REDUCTION MODIFIER */}
        <label htmlFor="modifier">Reduction modifier:</label>
        <input required id="modifier" type="number" name="modifier"></input>

        {/* MIN REQUIRED */}
        <label htmlFor="min">Minimum required:</label>
        <input required id="min" type="number" name="min"></input>

        {/* PRIORITY */}
        <label htmlFor="priority">Priority:</label>
        <input required id="priority" type="number" name="priority"></input>

        {/* SUBMIT */}
        <button
          type="submit"
          style={{ height: '30px', width: '100px', marginLeft: 'auto' }}
        >
          ADD
        </button>
      </form>
    </div>
  );
}
