package com.localservicemarketplace.lead;

public class LeadNotFoundException extends RuntimeException {
    public LeadNotFoundException(Long leadId) {
        super("Lead with ID " + leadId + " was not found");
    }
}
