import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuditLog } from './audit-log.schema';
import {AuditLogService }from './audit-log.service'

@Injectable()
export class AuditLogMiddleware implements NestMiddleware {
  constructor(private readonly auditLogService: AuditLogService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const method = req.method;
    const url = req.originalUrl;
    const tableName = this.getTableName(url);

    if (['POST', 'PUT', 'DELETE'].includes(method)) {
      const recordId = this.getRecordId(req);
      const oldValues = await this.auditLogService.getOldValues(tableName, recordId);
      const newValues = method !== 'DELETE' ? req.body : null;

      await this.auditLogService.createLog({
        tableName,
        operation: method,
        recordId,
        oldValues,
        newValues,
        changedBy: req.user ? req.user.username : 'unknown'
      });
    }

    next();
  }

  private getTableName(url: string): string {
    // Function to extract the table name from the URL
    return 'example_table';
  }

  private getRecordId(req: Request): string {
    // Function to extract the record ID from the Request
    return req.params.id || req.body.id;
  }
}
