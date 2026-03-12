import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cartId: string;

  @Column()
  productId: number;

  @Column()
  quantity: number;
}
