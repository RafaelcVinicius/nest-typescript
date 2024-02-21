import { Column, DataType, Table } from 'sequelize-typescript';
import SequelizeModel from '../../../../@shared/infra/db/model/sequelize.model';

@Table({ tableName: 'order', timestamps: false })
export default class OrderModel extends SequelizeModel<OrderModel> {
  @Column(DataType.UUID)
  declare public_id: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare description: string;
}
