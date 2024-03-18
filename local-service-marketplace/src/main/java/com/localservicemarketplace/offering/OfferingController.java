package com.localservicemarketplace.offering;

import com.localservicemarketplace.Response;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/market-place")
@PreAuthorize("hasAnyAuthority({'app-market-place-user','app-market-place-partner'})")
public class OfferingController {

    private final OfferingService offeringService;

    // Constructor for the OfferingController, injecting the OfferingService
    public OfferingController(OfferingService offeringService) {
        this.offeringService = offeringService;
    }

    // GET endpoint to retrieve a list of all offerings
    @GetMapping("/offerings")
    public Response<List<Offering>> findAllOfferings() {
        // Call the offeringService to find and return all offerings in a Response object
        return new Response<>(offeringService.findAllOfferings());
    }

    // GET endpoint to retrieve the name of an offering by its offeringId
    @GetMapping("/offerings/{offeringId}")
    public Offering getOfferingName(@PathVariable Long offeringId) {
        // Implement logic to retrieve the offering name by offeringId using the offeringService
        return offeringService.findOfferingNameById(offeringId);
    }
}
