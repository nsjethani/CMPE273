package com.controller;

import com.entity.*;

import java.io.File;
import java.nio.file.Files;

import com.service.FileLogService;
import com.service.FileService;
import com.service.ShareService;
import com.service.UserService;
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
@RequestMapping(path="/file") // This means URL's start with /file (after Application path)
public class FileController {

    @Autowired
    private UserService userService;

    @Autowired
    private FileService fileService;

    @Autowired
    private FileLogService fileLogService;

    @Autowired
    private ShareService shareService;

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

            String username = session.getAttribute("id").toString();
            FileDetails insertFolder = fileService.addData(fileDetails);

            FileOperationLogs fileOperationLogs = new FileOperationLogs();
            fileOperationLogs.setAction_type("File Uploaded");
            fileOperationLogs.setCreation_time(new Date());
            fileOperationLogs.setFile_id(insertFolder.getId());
            fileOperationLogs.setFile_name(file.getOriginalFilename());
            fileOperationLogs.setUserid(Integer.parseInt(username));

            fileLogService.addData(fileOperationLogs);

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

            FileDetails insertFolder = fileService.addData(fileDetails);

            System.out.println("insert folder is "+String.valueOf(insertFolder.getId()));

            fileService.createFile(receivedName,receivedPath,Integer.parseInt(username));

            FileOperationLogs fileOperationLogs = new FileOperationLogs();
            fileOperationLogs.setAction_type("Directory Creation");
            fileOperationLogs.setCreation_time(new Date());
            fileOperationLogs.setFile_id(insertFolder.getId());
            fileOperationLogs.setFile_name(receivedName);
            fileOperationLogs.setUserid(Integer.parseInt(username));

            fileLogService.addData(fileOperationLogs);

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

    @PostMapping(path = "/share", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> shareData(@RequestBody String data, HttpSession session) {
        System.out.println("I am in share file in spring boot side");
        try {
            if (session.getAttribute("id") != null) {
                String username = session.getAttribute("id").toString();
                JSONObject jsonObject = new JSONObject(data);
                System.out.println("input here is "+jsonObject);
                int sharedItemId = jsonObject.getInt("itemid");
                System.out.println(sharedItemId);
                JSONArray userdataArray = jsonObject.getJSONArray("userdata");
                System.out.println("input user emails are "+userdataArray);
                System.out.println("length of userdata array "+userdataArray.length());
                boolean status = false;
                for (int i=0; i<userdataArray.length(); i++){
                    String user = userdataArray.getString(i);
                    if(!user.equals(username)) {
                        List<User> userList = userService.findByEmail(user);
                        System.out.println("data from database is "+userList);
                        if(userList.size()==1){
                            List<ShareData> sharedDetailsList = shareService.findBySharedItemAndSharedWith(sharedItemId, user);
                            if(sharedDetailsList.size()==0){
                                ShareData sharedDetails = new ShareData();
                                sharedDetails.setSharedItem(sharedItemId);
                                sharedDetails.setSharedWith(user);
                                shareService.shareData(sharedDetails);
                                int sharedStatus = fileService.changeSharedStatus(sharedItemId, true);
                                if(sharedStatus==1){
                                    System.out.println("File/Folder shared successfully");
                                    status = true;
                                }
                                else {
                                    System.out.println("Error");
                                }
                            }
                            else if(userList.size()==1){
                                System.out.println("This file has been already shared with user");
                            }
                            else {
                                System.out.println("Error");
                            }
                        }
                        else {
                            System.out.println("User does not exist with given email : "+ user);
                        }
                    }
                }
                if(status){
                    return new ResponseEntity(null, HttpStatus.OK);
                }
                else {
                    return new ResponseEntity(null, HttpStatus.MOVED_PERMANENTLY);
                }

            } else {
                System.out.println("Session Expired");
                return new ResponseEntity(null, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
            }
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity(null, HttpStatus.MOVED_PERMANENTLY);
//            res.status(301).send({"message" : e});
        }
    }

    @PostMapping(path = "/getShareFiles")
    public ResponseEntity<?> getDataSharedWithUser(HttpSession session) {
        System.out.println("In share file");
        try {
            if (session.getAttribute("name") != null) {

                String username = session.getAttribute("name").toString();
                System.out.println("In get DataSharedWithUser: " + username);
                List<ShareData> sharedDetailsList = shareService.findBySharedWith(username);
                if(sharedDetailsList.size()>0){
                    System.out.println("your share list is "+sharedDetailsList);
                    List<FileDetails> fileList = new ArrayList<FileDetails>();
                    for(ShareData shared : sharedDetailsList){
                        fileList.add(fileService.findById(shared.getSharedItem()));
                    }
                    System.out.println("My storage list");
                    System.out.println(fileList);
                    return new ResponseEntity(fileList, HttpStatus.OK);
                }
                else {
                    return new ResponseEntity(null, HttpStatus.NO_CONTENT);
                }

            } else {
                System.out.println("Session Expired");
                return new ResponseEntity(null, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
            }
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity(null, HttpStatus.MOVED_PERMANENTLY);
//            res.status(301).send({"message" : e});
        }
    }

    @PostMapping(path = "/changeStar", consumes = MediaType.APPLICATION_JSON_VALUE)
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

    @PostMapping(path = "/getStarData", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> fetchStarredData(HttpSession session) {
        System.out.println("hello, i am fetching starred data ");
        try {
            if (session.getAttribute("id") != null) {
                String username = session.getAttribute("id").toString();
                System.out.println("Username in starred file is "+username);
                List<FileDetails> storageList = fileService.findByOwnerusernameAndStarred(username, true);
                System.out.println("Length of starred file is "+String.valueOf(storageList.size()));
                if (storageList.size() > 0) {
                    return new ResponseEntity(storageList, HttpStatus.CREATED);
                } else {
                    return new ResponseEntity(null, HttpStatus.NO_CONTENT);
                }
            } else {
                System.out.println("Session Expired");
                return new ResponseEntity(null, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
            }
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity(null, HttpStatus.MOVED_PERMANENTLY);
        }
    }

    @PostMapping(path = "/deletefile", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteFile(@RequestBody FileDetails file,HttpSession session) {
        System.out.println("in delete file ");
        try {
            if (session.getAttribute("id") != null) {

                JSONObject jsonObject = new JSONObject(file);
                System.out.println("received file for detetion is "+jsonObject);
                String receivedPath = jsonObject.getString("path");
                String receivedName = jsonObject.getString("name");

                String username = session.getAttribute("id").toString();
                String userDirpath = receivedPath+"/"+receivedName;

                System.out.println("Delete Directory Path: "+userDirpath);

                File deleteFile = new File(userDirpath);

                if(deleteFile.isDirectory()){
                    fileService.deleteRecur(deleteFile);
                    fileService.deleteFolderEntry(userDirpath);
                    FileDetails fileDetails = new FileDetails();
                    fileDetails.setId(jsonObject.getInt("id"));
                    fileService.deleteItem(fileDetails);
                }
                else{
                    if(deleteFile.delete()){
                        System.out.println(deleteFile.getName() + " is deleted!");
                        FileDetails fileDetails = new FileDetails();
                        fileDetails.setId(jsonObject.getInt("id"));
                        fileService.deleteItem(fileDetails);
                    }else{
                        System.out.println("Delete operation is failed.");
                    }
                }

                FileOperationLogs fileOperationLogs = new FileOperationLogs();
                fileOperationLogs.setAction_type("Item Deletion");
                fileOperationLogs.setCreation_time(new Date());
                fileOperationLogs.setFile_id(jsonObject.getInt("id"));
                fileOperationLogs.setFile_name(receivedName);
                fileOperationLogs.setUserid(Integer.parseInt(username));

                fileLogService.addData(fileOperationLogs);

                return new ResponseEntity(null, HttpStatus.OK);

            } else {
                System.out.println("Session Expired");
                return new ResponseEntity(null, HttpStatus.NON_AUTHORITATIVE_INFORMATION);
            }
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity(null, HttpStatus.NO_CONTENT);
        }
    }



}
