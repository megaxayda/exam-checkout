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

export const filterPriceConfigs = (
  priceConfigs: PriceConfig[],
  quantity: number,
): PriceConfig[] => {
  // FILTER BY MINIMUM REQUIRED
  const priceConfigsByMinimum = priceConfigs.filter(
    (config) => quantity >= config.minRequired,
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
      return { total: dineroFromFloat(0) };
    }

    const filteredConfigs = filterPriceConfigs(priceConfigs, quantity);

    let modifiedQuantity = quantity;
    const price = defaultPrice[size];
    let modifiedPrice = price;

    if (isEmpty(filteredConfigs)) {
      return { total: multiply(modifiedPrice, modifiedQuantity) };
    }

    for (const config of filteredConfigs) {
      const { reductionModifier, minRequired } = config;

      switch (config.reductionType) {
        case ReductionType.FREE_PER_X:
          if (minRequired === 0) {
            throw 'reductionModifier can not be 0';
          }
          modifiedQuantity = quantity - Math.floor(quantity / minRequired);
          break;

        // Only apply to original price
        case ReductionType.DIRECT:
          modifiedPrice = subtract(price, dineroFromFloat(reductionModifier));
          break;

        // Only apply to original price
        case ReductionType.PERCENT: {
          if (reductionModifier > 100) {
            throw 'reductionModifier can not be bigger than 100';
          }
          const [d1] = allocate(price, [
            100 - Math.floor(reductionModifier),
            Math.floor(reductionModifier),
          ]);
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

    return { total: multiply(modifiedPrice, modifiedQuantity), configs: filteredConfigs };
  } catch (error) {
    console.error(error);
    alert && alert(String(error));
  }

  return { total: dineroFromFloat(0) };
};

export default calculateTotal;
