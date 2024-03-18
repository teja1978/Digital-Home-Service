package com.localservicemarketplace.feedback;

import com.localservicemarketplace.lead.Lead;
import com.localservicemarketplace.lead.LeadService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class FeedbackService {

    private final FeedbackRespository feedbackRespository;
    private final LeadService leadService;

    public FeedbackService(FeedbackRespository feedbackRespository, LeadService leadService) {
        this.feedbackRespository = feedbackRespository;
        this.leadService = leadService;
    }

    public List<Feedback> getFeedbackByPartnerIdAndServiceId(String partnerId, int serviceId) {
        return feedbackRespository.findByPartneridAndServiceid(partnerId, serviceId);
    }

    public Feedback saveFeedbackAndUpdateLeadStatus(Feedback feedback) {
        leadService.updateLeadStatus(feedback.getLeadId(), Lead.LeadStatus.FEEDBACK_COMPLETE);
        return feedbackRespository.save(feedback);
    }
}
