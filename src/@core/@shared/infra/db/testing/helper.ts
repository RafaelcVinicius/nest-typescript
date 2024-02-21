import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { join } from 'path';
import { glob } from 'glob';
import { Config } from '../config';

export function setupSequelize(options: SequelizeOptions = {}) {
  let _sequelize: Sequelize;

  beforeAll(async () => {
    if ('models' in options) delete options['models'];

    _sequelize = new Sequelize({
      ...Config.db(),
      ...options,
      models: await glob(
        join(__dirname, '..', '..', '..', '..') + '/**/*.model.ts',
        {
          ignore: '**/@shared/**',
        },
      ),
    });
  });

  beforeEach(async () => await _sequelize.sync({ force: true }));

  afterAll(async () => await _sequelize.close());

  return {
    get sequelize() {
      return _sequelize;
    },
  };
}
