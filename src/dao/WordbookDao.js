'use strict';

/**
 * 生词本
 */

const co = require('co');
const sequelize = require('sequelize');
const WordbookModel = require('./model/WordbookModel');

/**
 * 保存生词
 */
function save(historyId) {
  return co(function* () {
    let wordbookModel = yield new WordbookModel();

    yield wordbookModel.create({
      historyId
    });

    return true;
  }).catch(error => {
    // historyId 已存在的话，忽略
    if (error.name === 'SequelizeUniqueConstraintError') {
      return true;
    }

    throw error;
  });
}

/**
 * 删除生词
 */
function remove(id) {
  return co(function* () {
    let wordbookModel = yield new WordbookModel();

    yield wordbookModel.destroy({
      where: {
        id
      }
    });

    return true;
  });
}

/**
 * 获取生词
 */
function getAll(offset = 0, limit = 100) {
  return co(function* () {
    let wordbookModel = yield new WordbookModel();
    return yield wordbookModel.findAll({
      offset,
      limit,
      order: [
        ['id', 'DESC']
      ]
    });
  });
}

module.exports = {
  save,
  remove,
  getAll
};