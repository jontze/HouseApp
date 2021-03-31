import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Water {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column('decimal')
  cubicmeter: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
