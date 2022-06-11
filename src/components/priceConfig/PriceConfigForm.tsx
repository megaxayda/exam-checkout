import { PizzaSize, reductionTypeOption } from 'constants/enum';
import capitalize from 'lodash/capitalize';
import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { savePriceConfig } from 'slices/priceConfigSlice';

export default function PriceConfigForm() {
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      savePriceConfig({
        name: e.currentTarget.ruleName.value,
        customerType: e.currentTarget.customerType.value,
        pizzaSize: e.currentTarget.size.value,
        reductionType: e.currentTarget.reductionType.value,
        reductionModifier: Number(e.currentTarget.modifier.value),
        minRequired: Number(e.currentTarget.min.value),
        priority: Number(e.currentTarget.priority.value),
      }),
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document && document.getElementById('priceConfigForm').reset();
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <form
        id="priceConfigForm"
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          gap: '8px',
        }}
      >
        <h2>Add new price config</h2>

        {/* NAME */}
        <label htmlFor="ruleName">Name: </label>
        <input required id="ruleName" type="text" name="ruleName"></input>

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
        <input
          required
          id="modifier"
          type="float"
          name="modifier"
          min={0}
          placeholder="Quantity | Amount | Percent | Price"
        ></input>

        {/* MIN REQUIRED */}
        <label htmlFor="min">Minimum required:</label>
        <input required id="min" type="number" name="min" min={0}></input>

        {/* PRIORITY */}
        <label htmlFor="priority">Priority:</label>
        <input
          required
          id="priority"
          type="number"
          name="priority"
          min={1}
          max={100}
          placeholder="1~100"
        ></input>

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
