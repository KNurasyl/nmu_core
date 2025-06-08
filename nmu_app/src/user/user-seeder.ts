import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRole } from 'src/common/enums/user-role.enum';
import { CreateUserInput } from './dto/create-user.input';
import { UserService } from './user.service';

@Injectable()
export class UserSeeder {
  constructor(private readonly userService: UserService) {}

  async seedUsers(count: number = 1000) {
    for (let i = 0; i < count; i++) {
      const hashedPassword = await bcrypt.hash('123456', 10);

      const input: CreateUserInput = {
        phoneNumber: faker.phone.number({ style: 'international' }),
        password: hashedPassword,
        userName: faker.person.firstName() + ' ' + faker.person.lastName(),
        userRole: UserRole.Student,
      };
      // Проверь что не создаёшь дубликаты!
      await this.userService.create(input);
    }
    return `${count} users created`;
  }
}
