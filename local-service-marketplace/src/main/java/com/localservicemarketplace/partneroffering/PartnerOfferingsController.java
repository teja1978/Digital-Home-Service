package com.localservicemarketplace.partneroffering;

import com.localservicemarketplace.offering.Offering;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/market-place-partner/partner-offerings")
@PreAuthorize("hasAnyAuthority({'app-market-place-user','app-market-place-partner'})")
public class PartnerOfferingsController {
    private final PartnerOfferingsService partnerOfferingsService;

    // Constructor for the PartnerOfferingsController, injecting the PartnerOfferingsService
    public PartnerOfferingsController(PartnerOfferingsService partnerOfferingsService) {
        this.partnerOfferingsService = partnerOfferingsService;
    }

    // POST endpoint to register a partner for a specific offering
    @PostMapping("/register/{offeringId}")
    public ResponseEntity<PartnerOfferings> registerPartner(@RequestBody PartnerOfferings partnerOfferings,
                                                            @PathVariable Long offeringId) {
        // Set the offering for the partnerOfferings using the provided offeringId
        partnerOfferings.setOffering(new Offering(offeringId));
        // Add the partnerOfferings and return the saved partnerOfferings with a CREATED status
        PartnerOfferings savedPartnerOfferings = partnerOfferingsService.add(partnerOfferings);
        return new ResponseEntity<>(savedPartnerOfferings, HttpStatus.CREATED);
    }

    // GET endpoint to find offerings by partnerId
    @GetMapping("/find/{partnerId}")
    public ResponseEntity<List<PartnerOfferings>> findOfferingsByPartnerId(@PathVariable String partnerId) {
        // Call the partnerOfferingsService to find offerings by partnerId and return with an OK status
        return new ResponseEntity<>(partnerOfferingsService.findByPartnerId(partnerId), HttpStatus.OK);
    }

    // GET endpoint to find partners by serviceId
    @GetMapping("/by-service/{serviceId}")
    public ResponseEntity<List<PartnerOfferings>> findPartnerByServiceId(@PathVariable Long serviceId) {
        // Retrieve partner offerings by serviceId
        List<PartnerOfferings> partnerOfferingsList = partnerOfferingsService.findByServiceId(serviceId);
        if (partnerOfferingsList.isEmpty()) {
            // Return NO_CONTENT status if the list is empty
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        // Return the partner offerings list with an OK status
        return new ResponseEntity<>(partnerOfferingsList, HttpStatus.OK);
    }
}
