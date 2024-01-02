import { EntityAuditable } from '../../../infra/database/base-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export default class MarketStatus extends EntityAuditable {
  @Column()
  public tradingPair: string;

  @Column({
    type: 'float',
  })
  public lastPrice: number; // path

  @Column({
    type: 'float',
  })
  public volumen: number;

  @Column({ nullable: true })
  requestDate: Date;
}
