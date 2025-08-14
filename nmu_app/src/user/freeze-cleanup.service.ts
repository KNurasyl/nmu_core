/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class FreezeCleanupService {
  private readonly logger = new Logger(FreezeCleanupService.name);

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanupAndAuditFreezes() {
    const now = new Date();

    const cleanupRes = await this.userModel
      .updateMany(
        { freezes: { $elemMatch: { endDate: { $lt: now } } } },
        { $pull: { freezes: { endDate: { $lt: now } } } },
      )
      .exec();

    if (cleanupRes.modifiedCount) {
      this.logger.log(`Removed expired freezes from ${cleanupRes.modifiedCount} users`);
    }

    const activeFreezeQuery = {
      freezes: { $elemMatch: { startDate: { $lte: now }, endDate: { $gte: now } } },
    };
    const frozenNowCount = await this.userModel.countDocuments(activeFreezeQuery).exec();
    this.logger.log(`Users currently frozen: ${frozenNowCount}`);
  }
}
