import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog, AuditLogSchema } from './audit-log.schema';
import { logEvent } from './WinstonLogger';

@Injectable()
export class AuditLogService {
    constructor(
        @InjectModel('AuditLog') private readonly auditLogModel: Model<AuditLog>,
    ) {}

    async createLog(log: Partial<AuditLog>) {
        const auditLog = new this.auditLogModel(log);
        return auditLog.save();
    }

    async getOldValues(tableName: string, recordId: string): Promise<any> {
        // יש להוסיף לוגיקה כדי לחלץ את הערכים הישנים מהטבלה המתאימה
        // דוגמה בלבד
        return {}; 
    }
}
