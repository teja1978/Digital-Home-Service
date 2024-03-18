package com.localservicemarketplace.partneroffering;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class PartnerOfferingsService {

    private final PartnerOfferingsRepository partnerOfferingsRepository;
    // Constructor for the PartnerOfferingsService, injecting the PartnerOfferingsRepository
    public PartnerOfferingsService(PartnerOfferingsRepository partnerOfferingsRepository) {
        this.partnerOfferingsRepository = partnerOfferingsRepository;
    }

    // Method to add partner offerings
    public PartnerOfferings add(PartnerOfferings partnerOfferings) {
        // Save the partner offerings and return the saved entity
        return partnerOfferingsRepository.save(partnerOfferings);
    }

    // Method to find partner offerings by partnerId
    public List<PartnerOfferings> findByPartnerId(String id) {
        // Call the partnerOfferingsRepository to find and return partner offerings by partnerId
        return partnerOfferingsRepository.findByPartnerId(id);
    }

    // Method to find partner offerings by serviceId
    public List<PartnerOfferings> findByServiceId(Long serviceId) {
        // This is a placeholder method; you would implement the query logic here,
        // most likely using a JPA repository, to find partner offerings by serviceId
        return partnerOfferingsRepository.findByOfferingId(serviceId);
    }
}
