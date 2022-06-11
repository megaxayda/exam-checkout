import { USD } from '@dinero.js/currencies';
import defaultPrice from 'constants/defaultPrice';
import { PizzaSize, ReductionType } from 'constants/enum';
import { allocate, dinero, multiply, subtract } from 'dinero.js';
import isEmpty from 'lodash/isEmpty';
import { PriceConfig } from 'slices/priceConfigSlice';

export const dineroFromFloat = (amount: number) => {
  const factor = USD.base ** USD.exponent;
  const a = Math.round(amount * factor);

  return dinero({ amount: a, currency: USD });
};

const filterPriceConfigs = (
  priceConfigs: PriceConfig[],
  quantity: number,
): PriceConfig[] => {
  // FILTER BY MINIMUM REQUIRED
  const priceConfigsByMinimum = priceConfigs.filter(
    (config) => config.minRequired >= quantity,
  );

  // FILTER BY PRIORITY
  const maxPriority = Math.min(...priceConfigsByMinimum.map((config) => config.priority));
  const priceConfigsByPriority = priceConfigsByMinimum.filter(
    (config) => config.priority === maxPriority,
  );

  return priceConfigsByPriority;
};

const calculateTotal = (
  priceConfigs: PriceConfig[],
  size: PizzaSize,
  quantity: number,
) => {
  try {
    if (isNaN(quantity) || quantity === 0) {
      return dineroFromFloat(0);
    }

    const filteredConfigs = filterPriceConfigs(priceConfigs, quantity);

    let modifiedQuantity = quantity;
    const price = defaultPrice[size];
    let modifiedPrice = price;

    if (isEmpty(filteredConfigs)) {
      return multiply(modifiedPrice, modifiedQuantity);
    }

    for (const config of filteredConfigs) {
      const { reductionModifier } = config;

      switch (config.reductionType) {
        case ReductionType.FREE_PER_X:
          modifiedQuantity = quantity - Math.floor(quantity / reductionModifier);
          break;

        // Only apply to original price
        case ReductionType.DIRECT:
          modifiedPrice = subtract(price, dineroFromFloat(reductionModifier));
          break;

        // Only apply to original price
        case ReductionType.PERCENT: {
          const [d1] = allocate(price, [Math.floor(reductionModifier)]);
          modifiedPrice = d1;
          break;
        }

        case ReductionType.MODIFIED_PRICE: {
          modifiedPrice = dineroFromFloat(reductionModifier);
          break;
        }

        default:
          break;
      }
    }

    return multiply(modifiedPrice, modifiedQuantity);
  } catch (error) {
    alert(String(error));
  }

  return dineroFromFloat(0);
};

export default calculateTotal;
