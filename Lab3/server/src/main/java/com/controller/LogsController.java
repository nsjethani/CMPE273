package com.controller;

import com.entity.FileDetails;
import java.nio.file.Files;
import com.entity.FileData;
import com.entity.FileOperationLogs;
import com.service.FileLogService;
import com.service.FileService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import java.util.List;
import java.nio.file.Path;

import java.nio.file.Paths;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;

@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/logs") // This means URL's start with /file (after Application path)
public class LogsController {

    @Autowired
    private FileLogService fileLogService;

    @PostMapping(path="/filelogs",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getLogData(HttpSession session)
    {
        System.out.println("in get file logs");
        System.out.println(session.getAttribute("id"));

        if(session.getAttribute("id")!=null) {
            String username = session.getAttribute("id").toString();
            List<FileOperationLogs> logList = fileLogService.findByUserid(Integer.parseInt(username));

            System.out.println("log list size "+logList.size());
            System.out.println("log list "+logList);


            if(logList.size()>0){
                return new ResponseEntity(logList, HttpStatus.CREATED);
            }
            else {
                return new ResponseEntity(null, HttpStatus.NO_CONTENT);
            }
        }
        else{
            System.out.println("Session Expired");
            return new ResponseEntity(null, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }
    }

}
