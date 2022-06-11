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
    return { total: dineroFromFloat(0) };
  }

  const { total: totalSmall, configs: appliedConfigsSmall = [] } = calculateTotal(
    Object.values(
      get(pricingConfigs, `[${customerType}][${PizzaSize.SMALL}]`, {}),
    ) as unknown as PriceConfig[],
    PizzaSize.SMALL,
    smallQuantity,
  );
  const { total: totalMedium, configs: appliedConfigsMedium = [] } = calculateTotal(
    Object.values(
      get(pricingConfigs, `[${customerType}][${PizzaSize.MEDIUM}]`, {}),
    ) as unknown as PriceConfig[],
    PizzaSize.MEDIUM,
    mediumQuantity,
  );
  const { total: totalLarge, configs: appliedConfigsLarge = [] } = calculateTotal(
    Object.values(
      get(pricingConfigs, `[${customerType}][${PizzaSize.LARGE}]`, {}),
    ) as unknown as PriceConfig[],
    PizzaSize.LARGE,
    largeQuantity,
  );

  return {
    total: add(add(totalSmall, totalMedium), totalLarge),
    configs: [...appliedConfigsSmall, ...appliedConfigsMedium, ...appliedConfigsLarge],
  };
}
