export interface Lead {
  id: number;
  status: LeadStatus;
  address: string;
  name: string;
  phoneNumber: string;
  dateOfService: string;
  totalAmount: number;
}

export enum LeadStatus {

  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  IN_SERVICE = 'IN_SERVICE',
  SERVICED = 'SERVICED',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  COMPLETE = 'COMPLETE',
  FEEDBACK_COMPLETE = 'FEEDBACK_COMPLETE'
}