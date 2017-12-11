package com.controller;

import com.entity.User;
import com.service.FileService;
import com.service.UserService;
import org.json.JSONObject;
import org.json.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.List;

import org.w3c.dom.html.HTMLParagraphElement;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/user") // This means URL's start with /demo (after Application path)
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private FileService fileService;

    @PostMapping(path="/add",consumes = MediaType.APPLICATION_JSON_VALUE) // Map ONLY POST Requests
    public  ResponseEntity<?> addNewUser (@RequestBody User user) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        String receivedPass = user.getPassword();
        String newPass = userService.generateHash(receivedPass);
        user.setPassword(newPass);
        userService.addUser(user);
        System.out.println("user is "+user.getId());
        fileService.createFile(String.valueOf(user.getId()), "./uploads/", -1);
        System.out.println("Saved");
        return new ResponseEntity(null,HttpStatus.CREATED);
    }

    @GetMapping(path="/hello")
    public String hello(){
        return "Hello!";
    }

    @GetMapping(path="/all",produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON with the users
        return userService.getAllUsers();
    }

    @PostMapping(path="/login",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody String user, HttpSession session)
    {
        JSONObject jsonObject = new JSONObject(user);
        System.out.println("password is ");
        System.out.println(userService.generateHash(jsonObject.getString("password")));

        List<User> userList = userService.login(jsonObject.getString("username"),userService.generateHash(jsonObject.getString("password")));

        System.out.println("user length is "+userList);

        session.setAttribute("name",jsonObject.getString("username"));
        if(userList.size()>0)
            session.setAttribute("id",userList.get(0).getId());
        return new ResponseEntity(userService.login(jsonObject.getString("username"),userService.generateHash(jsonObject.getString("password"))),HttpStatus.OK);
    }

    @PostMapping(value = "/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<?> logout(HttpSession session) {
        System.out.println(session.getAttribute("name"));
        session.invalidate();
        return  new ResponseEntity(HttpStatus.OK);
    }
}
