import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PizzaSize, ReductionType } from 'constants/enum';
import lowerCase from 'lodash/lowerCase';
import set from 'lodash/set';
import unset from 'lodash/unset';

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
  [size: string]: { [name: string]: PriceConfig };
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
      const { customerType, pizzaSize, name } = action.payload;

      set(
        state.priceConfigs,
        `[${customerType}][${pizzaSize}]["${name}"]`,
        action.payload,
      );
    },

    deletePriceConfig: (state, action: PayloadAction<PriceConfig>) => {
      const { customerType, pizzaSize, name } = action.payload;

      unset(state.priceConfigs, `[${lowerCase(customerType)}][${pizzaSize}]["${name}"]`);
    },
  },
});

export const { savePriceConfig, deletePriceConfig } = priceConfigSlice.actions;

export default priceConfigSlice.reducer;
