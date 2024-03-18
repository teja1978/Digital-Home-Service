
package com.localservicemarketplace.partneroffering;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.localservicemarketplace.offering.Offering;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "partner_offerings")
public class PartnerOfferings {

    public enum Gender {
        MALE, FEMALE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "partnerid", nullable = false)
    private String partnerId;


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Column(name = "firstName", nullable = false)
    private String firstName;

    @Column(name = "lastName", nullable = false)
    private String lastName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "offeringId")
    private Offering offering;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Column(name = "age")
    private Integer age;

    @Column(name = "phonenumber", length = 20)
    private String phoneNumber;

    @Column(name = "service", length = 255)
    private String service;

    @Column(name = "address", length = 500)
    private String address;

    @Column(name = "perhourbaseprice", precision = 10, scale = 2)
    private BigDecimal perHourBasePrice;

    @Column(name = "fieldexperience")
    private Integer fieldExperience;

    @Column(name = "companyorganization", length = 255)
    private String companyOrganization;

    // Constructors
    public PartnerOfferings() {
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public BigDecimal getPerHourBasePrice() {
        return perHourBasePrice;
    }

    public void setPerHourBasePrice(BigDecimal perHourBasePrice) {
        this.perHourBasePrice = perHourBasePrice;
    }

    public Integer getFieldExperience() {
        return fieldExperience;
    }

    public void setFieldExperience(Integer fieldExperience) {
        this.fieldExperience = fieldExperience;
    }

    public String getCompanyOrganization() {
        return companyOrganization;
    }

    public void setCompanyOrganization(String companyOrganization) {
        this.companyOrganization = companyOrganization;
    }

    public String getPartnerId() {
        return partnerId;
    }

    public void setPartnerId(String partnerId) {
        this.partnerId = partnerId;
    }

    public Offering getOffering() {
        return offering;
    }

    public void setOffering(Offering offering) {
        this.offering = offering;
    }
}
