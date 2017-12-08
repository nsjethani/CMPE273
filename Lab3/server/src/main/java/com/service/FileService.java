package com.service;
import java.io.File;
import java.util.List;

import com.entity.FileDetails;
import com.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    public boolean createFile(String strName, String path, int nTrUserId) {
        System.out.println("in create file");
        File file = null;
        if ("".equalsIgnoreCase(path)) {
            System.out.println("in if");
            file = new File( strName);
        } else {
            System.out.println("in else");
            System.out.println("path is "+"D:/uploads" + "/" + path + "/" + strName);
            file = new File( path + "/" + strName);
        }

        if (!file.exists()) {
            if (file.mkdirs()) {
                System.out.println("Done");
            }
        }
        return true;
    }

    public void addData(FileDetails data){
        fileRepository.save(data);
    }

    public List<FileDetails> findByPath(String username){
        return fileRepository.findByPath(username);
    }
}
