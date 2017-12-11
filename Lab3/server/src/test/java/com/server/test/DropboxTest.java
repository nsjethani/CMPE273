package com.server.test;

import com.entity.FileDetails;
import com.entity.FileOperationLogs;
import com.entity.ShareData;
import com.entity.User;
import com.service.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DropboxTest {

    @Autowired
    UserService userService;
    @Autowired
    FileService fileService;
    @Autowired
    ShareService shareService;
    @Autowired
    FileLogService fileLogService;
    @Autowired
    ProfileService profileService;

    public void setUp(){

    }

    public void tearDown(){

    }

    @Test
    public void UserLoginTrue() {
        List<User> userList = userService.login("neha@gmail.com",userService.generateHash("1234"));
        System.out.println(userList);
        if(userList.size()==1){
            assert true;
        }
        else {
            assert false;
        }
    }

    @Test
    public void FindUserByEmail() {
        List<User> userList = userService.findByEmail("neha@gmail.com");
        System.out.println(userList);
        if(userList.size()==1){
            assert true;
        }
        else {
            assert false;
        }
    }

    @Test
    public void findUsers()
    {
        Iterable<User> userList = userService.getAllUsers();
        System.out.println(userList);
        if(userList.spliterator().getExactSizeIfKnown()>0)
        {
            assert true;
        }
        else {
            assert false;
        }
    }
    @Test
    public void UserLoginFalse() {
        List<User> userList = userService.login("m@m.com",userService.generateHash("m"));
        System.out.println(userList);
        if(userList.size()==0){
            assert true;
        }
        else {
            assert false;
        }
    }

    @Test
    public void getUserProfile() {
        User user = profileService.fetchProfile(34);
        System.out.println(user);
        if(user!=null){
            assert true;
        }
        else {
            assert false;
        }
    }

    @Test
    public void getFileDetails() {
        List<FileDetails> fileDetails = fileService.findByPath("./uploads/33");
        System.out.println(fileDetails);
        if(fileDetails!=null){
            assert true;
        }
        else {
            assert false;
        }
    }

    @Test
    public void starFile() {
        int result = fileService.changeStarredStatus(1, true);
        System.out.println("result : "+result);
        if(result==1){
            assert true;
        }
        else {
            assert false;
        }
    }

    @Test
    public void shredFiles() {
        List<ShareData> sharedDetailsList = shareService.findBySharedWith("q@q.com");
        System.out.println("result : "+sharedDetailsList.size());
        if(sharedDetailsList!=null){
            assert true;
        }
        else {
            assert false;
        }
    }

    @Test
    public void getUserLogs(){
        List<FileOperationLogs> logs = fileLogService.findByUserid(33);
        if(logs!=null){
            assert true;
        }
        else {
            assert false;
        }
    }
    @Test
    public void folderCreation() {
        if(fileService.createFile("dropbox","./uploads/1",-1)) {
            assert true;
        }
        else {
            assert false;
        }
    }


}
