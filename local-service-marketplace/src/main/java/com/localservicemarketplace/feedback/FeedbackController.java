package com.localservicemarketplace.feedback;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/feedback")
@PreAuthorize("hasAuthority('app-market-place-user')")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/{partnerid}/{serviceid}")
    public ResponseEntity<List<Feedback>> getFeedback(@PathVariable String partnerid, @PathVariable int serviceid) {
        List<Feedback> feedbacks = feedbackService.getFeedbackByPartnerIdAndServiceId(partnerid, serviceid);
        return ResponseEntity.ok(feedbacks);
    }

    @PostMapping("/add")
    public ResponseEntity<Feedback> addFeedback(@RequestBody Feedback feedback) {
        Feedback savedFeedback = feedbackService.saveFeedbackAndUpdateLeadStatus(feedback);
        return ResponseEntity.ok(savedFeedback);
    }

}
