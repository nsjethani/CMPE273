package com.controller;

import com.entity.User;
import com.service.ProfileService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;

@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/profile") // This means URL's start with /profile (after Application path)
public class ProfileController {

    @Autowired
    ProfileService profileService;

    @PostMapping(path="/fetchUserProfile",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getprofile(@RequestBody Integer user, HttpSession session)
    {
        System.out.println("in fetchuser profile");
        return new ResponseEntity(profileService.fetchProfile(user),HttpStatus.OK);
    }

    @PostMapping(path="/saveUserProfile",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public  ResponseEntity<?> saveProfile(@RequestBody User user) {
        System.out.println("in save user profile");
        profileService.saveProfile(user);
        return new ResponseEntity(null,HttpStatus.CREATED);
    }
}
