import { Schema, Document } from 'mongoose';

export interface AuditLog extends Document {
tableName: string;
operation: string;
recordId: string;
oldValues: any;
newValues: any;
changedBy: string;
changedAt: Date;
}

export const AuditLogSchema = new Schema({
tableName: { type: String, required: true },
operation: { type: String, required: true },
recordId: { type: String, required: true },
oldValues: { type: Schema.Types.Mixed },
newValues: { type: Schema.Types.Mixed },
changedBy: { type: String, required: true },
changedAt: { type: Date, default: Date.now }
});