// выбор форматтеров
import stylish from './stylish.js';
import plain from './plain.js';

export default (data, type) => {
  switch (type) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    default:
      return stylish(data);
  }
};
