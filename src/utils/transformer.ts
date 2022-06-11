import { Transformer } from 'dinero.js';

const transformer: Transformer<number> = (props) =>
  `${props.currency.code} ${props.amount}`;

export default transformer;
