package com.localservicemarketplace.offering;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferingRepository extends JpaRepository<Offering, Integer> {
    Offering findOfferingById(Long id);
}
