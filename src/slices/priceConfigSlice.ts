import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PizzaSize, ReductionType } from 'constants/enum';

export type PriceConfig = {
  name: string;
  customerType: string;
  pizzaType: PizzaSize;
  reductionType: ReductionType;
  reductionModifier: number;
  minRequired: number;
  priority: number;
};

type PriceConfigByPizzaSize = {
  [key in PizzaSize]: PriceConfig;
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
      const { customerType, pizzaType } = action.payload;
      state.priceConfigs[customerType][pizzaType] = action.payload;
    },
  },
});

export const { savePriceConfig } = priceConfigSlice.actions;

export default priceConfigSlice.reducer;
