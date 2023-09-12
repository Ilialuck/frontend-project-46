import _ from 'lodash';

const getPlainValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plain = (tree) => {
  const iter = (node, path) => {
    const lines = node
      .flatMap((diff) => {
        const keyPath = (path === '' ? `${diff.key}` : `${path}.${diff.key}`);

        switch (diff.type) {
          case 'nested':
            return iter(diff.children, keyPath);
          case 'added':
            return `Property '${keyPath}' was added with value: ${getPlainValue(diff.value)}`;
          case 'deleted':
            return `Property '${keyPath}' was removed`;
          case 'changed':
            return `Property '${keyPath}' was updated. From ${getPlainValue(diff.value1)} to ${getPlainValue(diff.value2)}`;
          case 'unchanged':
            return [];
          default:
            throw new Error(`Unknown type of diff: ${diff.type}`);
        }
      });

    return [...lines]
      .join('\n');
  };

  return iter(tree, '');
};
export default plain;
