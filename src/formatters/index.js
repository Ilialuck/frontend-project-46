// выбор форматтеров
import stylish from './stylish.js';
import plain from './plain.js';

export default (data, type) => {
  switch (type) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data, null, ' ');
    default:
      throw new Error(`Unknown type of formatter - ${type}`);
  }
};
