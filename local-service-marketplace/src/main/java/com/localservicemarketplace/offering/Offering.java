package com.localservicemarketplace.offering;

import jakarta.persistence.*;

@Entity
@Table(name = "offering")
public class Offering {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    public Offering(String name) {
        this.name = name;
    }

    public Offering() {

    }

    public Offering(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Offering(Long offeringId) {
        this.id=offeringId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
