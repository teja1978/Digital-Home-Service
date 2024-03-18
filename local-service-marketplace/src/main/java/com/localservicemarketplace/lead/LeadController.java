package com.localservicemarketplace.lead;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lead")
@PreAuthorize("hasAnyAuthority({'app-market-place-user','app-market-place-partner'})")
public class LeadController {
    private final LeadService leadService;
    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }
    // Constructor for the LeadController, injecting the LeadService


    // POST endpoint to register a new lead
    @PostMapping("/book")
    public ResponseEntity<Lead> registerLead(@RequestBody Lead lead) {
        // Save the lead and return it with a CREATED status
        Lead savedLead = leadService.save(lead);
        return new ResponseEntity<>(savedLead, HttpStatus.CREATED);
    }

    // GET endpoint to find leads by partnerId and serviceId
    @GetMapping("/find/{partnerId}/{serviceId}")
    public List<Lead> findLeadsByPartnerIdAndServiceId(@PathVariable String partnerId, @PathVariable Long serviceId) {
        return leadService.findByPartnerIdAndServiceId(partnerId, serviceId);
    }

    // GET endpoint to find pending leads by partnerId and serviceId
    @GetMapping("/pending/{partnerId}/{serviceId}")
    public ResponseEntity<List<Lead>> findPendingLeadsByPartnerAndService(
            @PathVariable String partnerId,
            @PathVariable Long serviceId) {

        // Find pending leads and return them with an OK status
        List<Lead> pendingLeads = leadService.findPendingLeadsByPartnerIdAndServiceId(partnerId, serviceId);
        return new ResponseEntity<>(pendingLeads, HttpStatus.OK);
    }

    // PUT endpoint to update lead status by leadId and leadStatus
    @PutMapping("/updateLeadStatus/{leadId}/{leadStatus}")
    public ResponseEntity<Lead> updateLeadStatus(@PathVariable Long leadId, @PathVariable Lead.LeadStatus leadStatus) {
        // Update lead status and return the updated lead with an OK status
        Lead updatedLead = leadService.updateLeadStatus(leadId, leadStatus);
        return ResponseEntity.ok(updatedLead);
    }

    // PUT endpoint to update the total amount for a lead
    @PutMapping("/updateTotalAmount")
    public ResponseEntity<Lead> updateTotalAmount(@RequestBody Lead lead) {
        // Update the total amount for a lead and return the updated lead with an OK status
        Lead updatedLead = leadService.save(lead);
        return ResponseEntity.ok(updatedLead);
    }
    // GET endpoint to find leads by userId
    @GetMapping("/find/{userId}")
    public List<Lead> findLeadsByUserId(@PathVariable String userId) {
        // Call the service method to retrieve leads by userId
        return leadService.findByUserId(userId);
    }
}
