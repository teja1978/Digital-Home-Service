package com.localservicemarketplace.lead;


import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class LeadService {

    private final LeadRepository leadRepository;

    // Constructor for the LeadService, injecting the LeadRepository
    public LeadService(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    // Method to save a lead
    public Lead save(Lead lead) {
        return leadRepository.save(lead);
    }

    // Method to find leads by partnerId and serviceId
    public List<Lead> findByPartnerIdAndServiceId(String partnerId, Long serviceId) {
        return leadRepository.findByPartnerIdAndServiceId(partnerId, serviceId);
    }

    // Method to find pending leads by partnerId and serviceId
    public List<Lead> findPendingLeadsByPartnerIdAndServiceId(String partnerId, Long serviceId) {
        return leadRepository.findByPartnerIdAndServiceIdAndStatus(partnerId, serviceId, Lead.LeadStatus.PENDING);
    }

    // Method to find leads by userId
    public List<Lead> findByUserId(String userId) {
        return leadRepository.findByUserId(userId);
    }

    // Method to update lead status by leadId and status
    public Lead updateLeadStatus(Long leadId, Lead.LeadStatus status) {
        // Find the lead by leadId
        Optional<Lead> byId = leadRepository.findById(leadId);
        if (byId.isPresent()) {
            Lead lead = byId.get();
            // Update the lead status
            lead.setStatus(status);
            // Save and return the updated lead
            return leadRepository.save(lead);
        } else {
            // Throw an exception if leadId is not found
            throw new LeadNotFoundException(leadId);
        }
    }
}
