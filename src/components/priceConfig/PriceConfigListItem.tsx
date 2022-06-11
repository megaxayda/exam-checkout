import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { deletePriceConfig, PriceConfig } from 'slices/priceConfigSlice';

type PriceConfigListItemProps = {
  config: PriceConfig;
};

function PriceConfigListItem({ config }: PriceConfigListItemProps) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePriceConfig(config));
  };

  return (
    <tr>
      <td>{config.name}</td>
      <td>{config.customerType}</td>
      <td>{config.pizzaSize}</td>
      <td>{config.reductionType}</td>
      <td>{config.reductionModifier}</td>
      <td>{config.minRequired}</td>
      <td>{config.priority}</td>
      <td>
        <button onClick={handleDelete}>DELETE</button>
      </td>
    </tr>
  );
}

export default memo(PriceConfigListItem);
