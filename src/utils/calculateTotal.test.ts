import { PizzaSize, ReductionType } from 'constants/enum';
import { toFormat } from 'dinero.js';

import calculateTotal, { dineroFromFloat, filterPriceConfigs } from './calculateTotal';
import transformer from './transformer';

describe('calculateTotal', () => {
  const priceConfigs = [
    {
      name: 'amazon 50% if more than 10',
      customerType: 'amazon',
      pizzaSize: PizzaSize.SMALL,
      reductionType: ReductionType.PERCENT,
      reductionModifier: 50,
      minRequired: 10,
      priority: 1,
    },
    {
      name: 'amazon 20% for 1',
      customerType: 'amazon',
      pizzaSize: PizzaSize.SMALL,
      reductionType: ReductionType.PERCENT,
      reductionModifier: 20,
      minRequired: 1,
      priority: 2,
    },
  ];

  describe('dineroFromFloat', () => {
    test.each`
      input     | expected
      ${0}      | ${'USD 0'}
      ${2}      | ${'USD 2'}
      ${1.9}    | ${'USD 1.9'}
      ${2.99}   | ${'USD 2.99'}
      ${3.111}  | ${'USD 3.11'}
      ${4.6666} | ${'USD 4.67'}
    `('dineroFromFloat($input)', ({ input, expected }) => {
      expect(toFormat(dineroFromFloat(input), transformer)).toBe(expected);
    });
  });

  describe('filterPriceConfigs', () => {
    it('should return correct configs', () => {
      expect(filterPriceConfigs(priceConfigs, 1)).toMatchSnapshot();
    });
  });

  describe('calculateTotal', () => {
    it('should return USD 0 if quantity = 0', () => {
      const { total } = calculateTotal([], PizzaSize.SMALL, 0);

      expect(toFormat(total, transformer)).toBe('USD 0');
    });

    it('should return USD 0 if quantity is NaN', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { total } = calculateTotal([], PizzaSize.SMALL, 'abc');

      expect(toFormat(total, transformer)).toBe('USD 0');
    });

    it('should return default calculation if price configs is empty', () => {
      const { total } = calculateTotal([], PizzaSize.SMALL, 10);

      expect(toFormat(total, transformer)).toBe('USD 119.9');
    });

    it('should return correct price', () => {
      const { total, configs } = calculateTotal(priceConfigs, PizzaSize.SMALL, 10);

      expect(toFormat(total, transformer)).toBe('USD 60');
      expect(configs).toMatchSnapshot();
    });
  });
});
