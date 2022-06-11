import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PizzaSize, ReductionType } from 'constants/enum';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';

export type PriceConfig = {
  name: string;
  customerType: string;
  pizzaSize: PizzaSize;
  reductionType: ReductionType;
  reductionModifier: number;
  minRequired: number;
  priority: number;
};

type PriceConfigByPizzaSize = {
  [size: string]: PriceConfig[];
};

type PriceConfigByPizzaSizeByCustomer = {
  [customerType: string]: PriceConfigByPizzaSize;
};

export type PriceConfigState = {
  priceConfigs: PriceConfigByPizzaSizeByCustomer;
};

const initialState: PriceConfigState = {
  priceConfigs: {},
};

export const priceConfigSlice = createSlice({
  name: 'priceConfig',
  initialState,
  reducers: {
    savePriceConfig: (state, action: PayloadAction<PriceConfig>) => {
      const { customerType, pizzaSize } = action.payload;

      const currentList = get(state.priceConfigs, `[${customerType}][${pizzaSize}]`, []);

      if (isEmpty(currentList)) {
        set(state.priceConfigs, `[${customerType}][${pizzaSize}]`, [action.payload]);
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        currentList.push(action.payload);
      }
    },
  },
});

export const { savePriceConfig } = priceConfigSlice.actions;

export default priceConfigSlice.reducer;
