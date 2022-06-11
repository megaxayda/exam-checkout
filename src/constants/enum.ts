export enum PizzaSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

// customer:

// pizza type:

// price

// reduction type: free x | direct reduction | percent reduction | lowered price

// reduction num: x | price | %

// min num:

// priority:

export enum ReductionType {
  FREE_PER_X = 'FREE_PER_X',
  DIRECT = 'DIRECT',
  PERCENT = 'PERCENT',
  MODIFIED_PRICE = 'MODIFIED_PRICE',
}

export const reductionTypeOption = [
  {
    name: 'Free per X',
    value: ReductionType.FREE_PER_X,
  },
  {
    name: 'Direct',
    value: ReductionType.DIRECT,
  },
  {
    name: 'Percent',
    value: ReductionType.PERCENT,
  },
  {
    name: 'Modified Price',
    value: ReductionType.MODIFIED_PRICE,
  },
];
