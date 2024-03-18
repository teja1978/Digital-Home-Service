import { LeadStatus } from "../model/response.model";



export function leadStatusToString(leadStatus: LeadStatus) {

    const map = new Map<LeadStatus, string>();
    map.set(LeadStatus.PENDING, 'Pending');
    map.set(LeadStatus.REJECTED, 'Rejected');
    map.set(LeadStatus.ACCEPTED, 'Accepted');
    map.set(LeadStatus.IN_SERVICE, 'In Service');
    map.set(LeadStatus.SERVICED, 'Serviced');
    map.set(LeadStatus.PAYMENT_PENDING, 'Payment Pending');
    map.set(LeadStatus.COMPLETE, 'Complete');
    map.set(LeadStatus.FEEDBACK_COMPLETE, 'Complete');

    return map.get(leadStatus);

  }