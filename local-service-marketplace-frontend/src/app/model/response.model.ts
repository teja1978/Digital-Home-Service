export interface Response<T> {
    data: T;
}

export interface Offering {
    id: number;
    name: string;
    path: string|undefined;
  }
  
  export interface PartnerOffering {
    id: number;
    partnerId: string;
    firstName: string;
    lastName: string;
    offeringId: number; 
    gender: string;
    age: number;
    phoneNumber: string;
    service: string;
    address: string;
    perHourBasePrice: number;
    fieldExperience: number;
    companyOrganization: string;
  }
  
  export interface Lead {
    id: number;
    userid: string;
    partnerid: string;
    serviceid: number;
    status: LeadStatus;
    address?: string;
    name?: string;
    phoneNumber?: string;
    dateOfService?: string;
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
  