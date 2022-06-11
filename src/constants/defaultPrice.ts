import { USD } from '@dinero.js/currencies';
import { dinero } from 'dinero.js';

import { PizzaSize } from './enum';

const defaultPrice = {
  [PizzaSize.SMALL]: dinero({ amount: 1199, currency: USD, scale: 2 }),
  [PizzaSize.MEDIUM]: dinero({ amount: 1599, currency: USD, scale: 2 }),
  [PizzaSize.LARGE]: dinero({ amount: 2199, currency: USD, scale: 2 }),
};

export default defaultPrice;
