package com.controller;

import com.entity.FileDetails;
import java.nio.file.Files;
import com.entity.FileData;
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
@RequestMapping(path="/file") // This means URL's start with /file (after Application path)
public class FileController {



    @Autowired
    private FileService fileService;

    @PostMapping(path = "/upload")
    public ResponseEntity<?> uploadfile(@RequestPart("myfile") MultipartFile file, @RequestPart("path") String uploadPath, HttpSession session) {


        if (session.getAttribute("id") != null) {
            String strFileName = null;
            System.out.println("i am in upload file" + file.getOriginalFilename());
            if (!file.isEmpty()) {
                try {
                    byte[] bytes = file.getBytes(); // converting file into bytes
                    Path path = Paths.get(uploadPath + "/" + file.getOriginalFilename()); // giving path
                    Files.write(path, bytes);  // this line will create a file from the request
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }
            FileDetails fileDetails = new FileDetails();
            fileDetails.setName(file.getOriginalFilename());
            fileDetails.setPath(uploadPath);
            fileDetails.setCreationtime(new Date());
            fileDetails.setType("f");
            fileDetails.setOwnerusername(session.getAttribute("id").toString());

            fileService.addData(fileDetails);
            return new ResponseEntity(null, HttpStatus.CREATED);
        }
        else
        {
            System.out.println("Session Expired");
            return new ResponseEntity(null, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }

    }



    @PostMapping(path = "/createDir", consumes = MediaType.APPLICATION_JSON_VALUE)
    public  ResponseEntity<?> createDirectory(@RequestBody String user, HttpSession session){
        System.out.println("i am in create directory");
        System.out.println(session.getAttribute("id"));
     
        if(session.getAttribute("id")!=null){
            JSONObject jsonObject = new JSONObject(user);
            System.out.println(jsonObject);
            String receivedPath = jsonObject.getString("dirpath");
            String receivedName = jsonObject.getString("foldername");

            String username = session.getAttribute("id").toString();
            String userDirpath = "D:/uploads"+"/"+receivedPath;


            String createDirpath = userDirpath+"/"+receivedName;
            System.out.println("Create Directory Path: "+createDirpath);

            FileDetails fileDetails = new FileDetails();
            fileDetails.setName(receivedName);
            fileDetails.setPath(receivedPath);
            fileDetails.setCreationtime(new Date());
            fileDetails.setType("d");
            fileDetails.setOwnerusername(username);

            fileService.addData(fileDetails);

            fileService.createFile(receivedName,receivedPath,Integer.parseInt(username));
            return new ResponseEntity(null, HttpStatus.CREATED);
        }
        else {
            System.out.println("Session Expired");
        }
        return new ResponseEntity(null, HttpStatus.MOVED_PERMANENTLY);
    }

    @PostMapping(path="/getfiles",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getDirectoryData(@RequestBody String user, HttpSession session)
    {
        System.out.println("in get files");
        System.out.println(session.getAttribute("id"));

        JSONObject jsonObject = new JSONObject(user);
        System.out.println(jsonObject);
        System.out.println(jsonObject.getString("path"));
        System.out.println("Path : " + jsonObject.getString("path"));
        if(session.getAttribute("id")!=null) {
            String username = session.getAttribute("id").toString();
            String clientPath = jsonObject.getString("path");
            String dirpath;
            if (clientPath.equals("") || clientPath == null || clientPath.equals("/")) {
                dirpath = ("./dropboxstorage/" + username + "/" );
            }
            else {
                dirpath = ( clientPath);
            }
            System.out.println("Directory Path : " + dirpath);

            JSONObject jsonObj;

            dirpath=dirpath.replace("//","/");

            List<FileDetails> storageList = fileService.findByPath(dirpath);
            List<FileDetails> starredList = fileService.findByPath(dirpath);
            System.out.println("storage list size "+storageList.size());
            System.out.println("storage list "+storageList);

            FileData filess = new FileData();
            filess.setFiles(storageList);
            filess.setStaredList(starredList);


            if(storageList.size()>0){
                return new ResponseEntity(filess, HttpStatus.CREATED);
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
