import { RootState } from 'store';

export const selectPricingConfigs = (state: RootState) => state.priceConfig.priceConfigs;

export const selectAllCustomerTypes = (state: RootState) =>
  Object.keys(state.priceConfig.priceConfigs);
