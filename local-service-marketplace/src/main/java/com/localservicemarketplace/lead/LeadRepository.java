package com.localservicemarketplace.lead;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
    List<Lead> findByPartnerIdAndServiceId(String partnerId, Long serviceId);
    List<Lead> findByPartnerIdAndServiceIdAndStatus(String partnerId, Long serviceId, Lead.LeadStatus status);

    List<Lead> findByUserId(String userId);

    Optional<Lead> findByPartnerIdAndUserIdAndServiceId(String partnerId, String userId, int serviceId);

}
