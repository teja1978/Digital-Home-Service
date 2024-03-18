package com.localservicemarketplace.offering;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OfferingService {

    private final OfferingRepository offeringRepository;
    // Constructor for the OfferingService, injecting the OfferingRepository
    public OfferingService(OfferingRepository offeringRepository) {
        this.offeringRepository = offeringRepository;
    }

    // Method to retrieve a list of all offerings
    public List<Offering> findAllOfferings() {
        // Call the offeringRepository to find and return all offerings
        return offeringRepository.findAll();
    }

    // Method to retrieve the name of an offering by its offeringId
    public Offering findOfferingNameById(Long offeringId) {
        // Call the offeringRepository to find and return the offering by its ID
        return offeringRepository.findOfferingById(offeringId);
    }
}
