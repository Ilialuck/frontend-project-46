import _ from 'lodash';

const buildDifferencesTree = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));

  const diff = keys.map((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, children: buildDifferencesTree(data1[key], data2[key]), type: 'nested' };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, value2: data2[key], type: 'added' };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, value1: data1[key], type: 'deleted' };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, value1: data1[key], value2: data2[key], type: 'changed',
      };
    }
    return { key, value1: data1[key], type: 'unchanged' };
  });

  return diff;
};

export default buildDifferencesTree;
