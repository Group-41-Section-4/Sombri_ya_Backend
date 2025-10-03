import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findOrCreateUser(email: string, name: string) {
    let user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      user = this.userRepo.create({ email, name });
      user = await this.userRepo.save(user);
    }

    return user;
  }

  async findUserByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async registerUser(email: string, name: string, password: string) {
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      email,
      name,
      password: hashedPassword,
      biometric_enabled: false,
    });

    return this.userRepo.save(user);
  }
}
