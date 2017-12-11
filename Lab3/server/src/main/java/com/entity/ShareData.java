package com.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class ShareData {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)

    private Integer id;

    private Integer sharedItem;

    private String sharedWith;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSharedItem() {
        return sharedItem;
    }

    public void setSharedItem(Integer sharedItem) {
        this.sharedItem = sharedItem;
    }

    public String getSharedWith() {
        return sharedWith;
    }

    public void setSharedWith(String sharedWith) {
        this.sharedWith = sharedWith;
    }
}