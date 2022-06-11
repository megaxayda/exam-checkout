import { PizzaSize } from 'constants/enum';
import { add } from 'dinero.js';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import { useSelector } from 'react-redux';
import { selectPricingConfigs } from 'selectors/pricingConfigSelectors';
import { PriceConfig } from 'slices/priceConfigSlice';
import calculateTotal, { dineroFromFloat } from 'utils/calculateTotal';

export default function useCalculateTotal(
  customerType: string | undefined,
  smallQuantity = 0,
  mediumQuantity = 0,
  largeQuantity = 0,
) {
  const pricingConfigs = useSelector(selectPricingConfigs);

  if (isNil(customerType)) {
    return dineroFromFloat(0);
  }

  const totalSmall = calculateTotal(
    get(pricingConfigs, `[${customerType}][${PizzaSize.SMALL}]`, []) as PriceConfig[],
    PizzaSize.SMALL,
    smallQuantity,
  );
  const totalMedium = calculateTotal(
    get(pricingConfigs, `[${customerType}][${PizzaSize.MEDIUM}]`, []) as PriceConfig[],
    PizzaSize.MEDIUM,
    mediumQuantity,
  );
  const totalLarge = calculateTotal(
    get(pricingConfigs, `[${customerType}][${PizzaSize.LARGE}]`, []) as PriceConfig[],
    PizzaSize.LARGE,
    largeQuantity,
  );

  return add(add(totalSmall, totalMedium), totalLarge);
}
