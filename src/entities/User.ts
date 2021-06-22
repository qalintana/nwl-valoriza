import {
  Entity,
  PrimaryColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  admin: boolean;

  @CreateDateColumn()
  created_ate: Date;

  @UpdateDateColumn()
  updated_ate: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
