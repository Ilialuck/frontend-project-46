// выбор форматтеров
import stylish from './stylish.js';

export default (data, type) => {
  switch (type) {
    case 'stylish':
      return stylish(data);
    default:
      return stylish(data);
  }
};
