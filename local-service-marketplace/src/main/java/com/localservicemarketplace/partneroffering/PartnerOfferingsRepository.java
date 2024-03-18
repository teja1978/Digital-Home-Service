package com.localservicemarketplace.partneroffering;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PartnerOfferingsRepository extends JpaRepository<PartnerOfferings, Long> {

    List<PartnerOfferings> findByPartnerId(String id);
    List<PartnerOfferings> findByOfferingId(Long offeringId);
}
