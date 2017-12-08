package com.controller;
import com.entity.FileData;
import com.entity.User;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import java.io.File;
import org.springframework.web.bind.annotation.*;


@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/dir")
class listFiles {


    @PostMapping(path="/list")
    public ResponseEntity<?> getFiles(@RequestBody String fileDetails){
        JSONArray sendFiles = new JSONArray();
        System.out.println(fileDetails);
        JSONObject returnlist = new JSONObject();
        JSONObject input = new JSONObject(fileDetails);
        String filelist="";
        File folder=new File(input.getString("dir"));
        //File folder=new File("N://SOP");
        //Get files
        File[] files=folder.listFiles();
        int i=0;
        for (File file : files) {
            returnlist = new JSONObject();
            i++;
            String key = "File";
            //System.out.println(key);
            if(file.isFile()){
                //System.out.println("File : "+file.getName());
                filelist+="\n "+"File :"+file.getName();
                returnlist.append(key,file.getName());
            }else{
               // System.out.println("Folder : "+file.getName());
                key = "Folder";
                filelist+="\n "+"Folder :"+file.getName();
                returnlist.append(key,file.getName());
            }
            sendFiles.put(returnlist);
        }
        FileData filess= new FileData();
        filess.setStrData(sendFiles.toString());
       System.out.println(filess);
       return new ResponseEntity(filess,HttpStatus.OK);
        // return new ResponseEntity<String>( filelist, HttpStatus.OK);
    }


    }


  /*  @RequestMapping("/list")
    public String getFiles(){
        String filelist="";
        File folder=new File("N:\\SOP");
        //Get files

        File[] files=folder.listFiles();
        for (File file : files) {
            if(file.isFile()){
                System.out.println("File : "+file.getName());
                filelist+="\n "+"File :"+file.getName();
            }else{
                System.out.println("Folder : "+file.getName());
                filelist+="\n "+"Folder :"+file.getName();
            }
        }
        return filelist;
}*/





