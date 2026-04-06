import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  img: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column({ default: 'electronics' })
  category: string;
}
