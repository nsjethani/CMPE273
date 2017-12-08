package com.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class User {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String fname;

    private String lname;

    private String email;

    private String password;

    private String overview;


    public String getHighschool() {
        return highschool;
    }

    public void setHighschool(String highschool) {
        this.highschool = highschool;
    }

    public String getBachelors() {
        return bachelors;
    }

    public void setBachelors(String bachelors) {
        this.bachelors = bachelors;
    }

    public String getMasters() {
        return masters;
    }

    public void setMasters(String masters) {
        this.masters = masters;
    }

    public String getOtheredu() {
        return otheredu;
    }

    public void setOtheredu(String otheredu) {
        this.otheredu = otheredu;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getLifeevent() {
        return lifeevent;
    }

    public void setLifeevent(String lifeevent) {
        this.lifeevent = lifeevent;
    }

    public String getMusic() {
        return music;
    }

    public void setMusic(String music) {
        this.music = music;
    }



    public String getSports() {
        return sports;
    }

    public void setSports(String sports) {
        this.sports = sports;
    }

    public String getWork() {
        return work;
    }

    public void setWork(String work) {
        this.work = work;
    }

    private String highschool;
    private String bachelors;
    private String masters;
    private String otheredu;
    private String mobile;
    private String work;

    public String getFavshow() {
        return favshow;
    }

    public void setFavshow(String favshow) {
        this.favshow = favshow;
    }

    private String lifeevent;
    private String music;
    private String favshow;
    private String sports;
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}