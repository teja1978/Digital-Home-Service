package com.localservicemarketplace.lead;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "lead")
public class Lead {
    public enum LeadStatus {
        PENDING, ACCEPTED, REJECTED, IN_SERVICE, SERVICED, PAYMENT_PENDING, COMPLETE, FEEDBACK_COMPLETE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "userid", nullable = false)
    private String userId;

    @Column(name = "partnerid", nullable = false)
    private String partnerId;

    @Column(name = "serviceid", nullable = false)
    private int serviceId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private LeadStatus status = LeadStatus.PENDING;

    @Column(name = "address")
    private String address;

    @Column(name = "name")
    private String name;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "date_of_service")
    private LocalDate dateOfService;

    @Column(name = "totalAmount")
    private Double totalAmount;

    public Lead() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPartnerId() {
        return partnerId;
    }

    public void setPartnerId(String partnerId) {
        this.partnerId = partnerId;
    }

    public int getServiceId() {
        return serviceId;
    }

    public void setServiceId(int serviceId) {
        this.serviceId = serviceId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserid() {
        return userId;
    }

    public void setUserid(String userid) {
        this.userId = userid;
    }

    public String getPartnerid() {
        return partnerId;
    }

    public void setPartnerid(String partnerid) {
        this.partnerId = partnerid;
    }

    public int getServiceid() {
        return serviceId;
    }

    public void setServiceid(int serviceid) {
        this.serviceId = serviceid;
    }

    public LeadStatus getStatus() {
        return status;
    }

    public void setStatus(LeadStatus status) {
        this.status = status;
    }


    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUsername() {
        return name;
    }

    public void setUsername(String username) {
        this.name = username;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String userName) {
        this.name = userName;
    }

    public LocalDate getDateOfService() {
        return dateOfService;
    }

    public void setDateOfService(LocalDate dateOfService) {
        this.dateOfService = dateOfService;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
