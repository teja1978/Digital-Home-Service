package com.localservicemarketplace.feedback;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FeedbackRespository extends JpaRepository<Feedback, Integer> {
    List<Feedback> findByPartneridAndServiceid(String partnerid, int serviceid);
}
