package com.controller;

import com.entity.*;

import java.io.File;
import java.nio.file.Files;

import com.service.*;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.nio.file.Path;

import java.nio.file.Paths;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;

@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/group") // This means URL's start with /file (after Application path)
public class GroupController {

    @Autowired
    private UserService userService;

    @Autowired
    private FileService fileService;

    @Autowired
    private FileLogService fileLogService;

    @Autowired
    private GroupService groupService;

    @PostMapping(path = "/createGruop", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> shareData(@RequestBody String data, HttpSession session) {
        System.out.println("I am in share file in spring boot side");
        if (session.getAttribute("username") != null) {
            JSONObject jsonObject = new JSONObject(data);
            System.out.println(jsonObject);
            String groupName = jsonObject.getString("groupName");
            String username = session.getAttribute("name").toString();

            GroupMembers groupMembers = new GroupMembers();
            Grouping grouping = new Grouping();
            grouping.setName(groupName);

            groupMembers = groupService.addData(groupMembers);
            System.out.println(groupMembers);
            if(groupMembers!=null){
                return new ResponseEntity(null, HttpStatus.CREATED);
            }
            else {
                return new ResponseEntity(null, HttpStatus.MOVED_PERMANENTLY);
            }

        } else {
            System.out.println("Session Expired");
            return new ResponseEntity(null, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }
    }

    @PostMapping(path = "/addMember")
    public ResponseEntity<?> getDataSharedWithUser(@RequestBody String data, HttpSession session) {
        System.out.println("In add member");
        String username = session.getAttribute("name").toString();

        if (session.getAttribute("username") != null) {
            JSONObject jsonObject = new JSONObject(data);
            System.out.println(jsonObject);
            String groupName = jsonObject.getString("groupName");
            String name = session.getAttribute("name").toString();

            //GroupMembers groupMembers = new GroupMembers();
            Grouping grouping = new Grouping();
            grouping.setName(groupName);

            //groupMembers = groupService.addData(groupMembers);
            //System.out.println(groupMembers);
            if(grouping!=null){
                return new ResponseEntity(null, HttpStatus.CREATED);
            }
            else {
                return new ResponseEntity(null, HttpStatus.MOVED_PERMANENTLY);
            }

        } else {
            System.out.println("Session Expired");
            return new ResponseEntity(null, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }

    }

    @PostMapping(path = "/deleteMember", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> changeStarredStatus(@RequestBody String storage, HttpSession session) {
        if (session.getAttribute("name") != null) {
            String username = session.getAttribute("name").toString();
//            console.log(JSON.stringify(req.body));
            JSONObject jsonObject = new JSONObject(storage);
            System.out.println(jsonObject);
            int itemid = jsonObject.getInt("id");
            boolean status = jsonObject.getBoolean("status");

            int updateStatus = fileService.changeStarredStatus(itemid, status);
            System.out.println("Update Status : " + updateStatus);
            if (updateStatus == 1) {
                return new ResponseEntity(null, HttpStatus.CREATED);
            } else {
                return new ResponseEntity(null, HttpStatus.NO_CONTENT);
            }
        } else {
            System.out.println("Session Expired");
            return new ResponseEntity(null, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }
    }


}
