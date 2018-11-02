const uniqueString = require('unique-string');
const _ = require('lodash');

module.exports = {
  isAdmin: async (client) => {
    client = await ClientService.findClient(client);
    return client.role === 'admin';
  },

  validateNumber: (value, defaultValue) => {
    if (_.isNumber(value)) {
      return value;
    } else if (_.isString(value)) {
      if (/^\+?(0|[1-9]\d*)$/.test(value)) {
        return parseInt(value);
      } else {
        return undefined;
      }
    }

    return defaultValue;
  },

  generateFilename: file => {
    const { filename } = file;
    const parts = filename.split('.');
    const extension = parts[parts.length - 1].toLowerCase();
    const newFilename = uniqueString() + Date.now() + '.' + extension;
    return newFilename;
  },

  generateRandomV2landString: length => {
    const charset = ['🧜‍♀️', '🧜‍♂️', '🐠', '🐟', '🐬', '🐳', '🐋',
      '💧', '💦', '🌊', '🏄‍♀️', '🏄‍♂️', '🏊‍♀️', '🏊‍♂️', '🚣‍♀️', '🚣‍♂️',
      '🚤', '🛥', '⛵️', '🛶', '🛳', '⛴', '🚢', '💙', '🏖', '🏝'];

    let string = '';
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * charset.length);
      string += charset[index];
    }

    return string;
  },

  shortenString: (str, length = 100) => {
    if (!str || length < 1) return;
    return str.length > length
      ? (str.slice(0, length - 1) + '…')
      : str;
  },

  /**
   * 生成 WHERE 语句
   */
  generateWhereQuery: function(query, model = '', values = [], parents = []) {
    try {
      let string = '';
      const properties = Object.getOwnPropertyNames(query);
      for (let i = 0; i < properties.length; i++) {
        const property = properties[i];
        let temp = parents.slice();
        if (
          !query[property] ||
          [
            '_properties',
            'associations',
            'associationsCache',
            'inspect',
            'add',
            'remove',
          ].includes(property)
        ) {
          continue;
        } else if (
          typeof query[property] !== 'object' ||
          query[property] instanceof Date
        ) {
          if (string.length) {
            string += ' AND ';
          }
          if (temp.length > 0) {
            string += `"${temp[0]}"::json#>>'{`;
            temp = temp.slice(1);
            temp.push(property);
            string += `${temp.join(',')}}'`;
          } else {
            string += (model ? (model + '.') : '') + property;
          }
          values.push(query[property]);
          string += ' = $' + values.length;
        } else {
          parents.push(property);
          child = generateWhereQuery(query[property], model, values, parents);
          if (string.length) {
            string += ' AND ';
          }
          string += child.query;
          values = child.values;
        }
      }

      return {
        query: string,
        values,
      };
    } catch (err) {
      throw err;
    }
  },
};
