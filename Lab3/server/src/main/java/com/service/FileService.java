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
            System.out.println("path is :" + path + "/" + strName);
            file = new File( path + "/" + strName);
        }

        if (!file.exists()) {
            if (file.mkdirs()) {
                System.out.println("Done");
            }
        }
        return true;
    }

    public FileDetails addData(FileDetails data){
       return fileRepository.save(data);
    }

    public List<FileDetails> findByPath(String username){
        return fileRepository.findByPath(username);
    }

    public int changeSharedStatus(int itemId, boolean status){
        return fileRepository.updateSharedStatus(itemId, status);
    }

    public List<FileDetails> findByOwnerusernameAndStarred(String username, boolean status){
        return fileRepository.findByOwnerusernameAndStarred(username, status);
    }

    public int changeStarredStatus(int itemId, boolean status){
        return fileRepository.updateStarredStatus(itemId, status);
    }

    public FileDetails findById(int id){
        return fileRepository.findById(id);
    }

    public void deleteItem(FileDetails data){
        fileRepository.delete(data);
    }

    public void deleteRecur(File file){

        for (File childFile : file.listFiles()) {

            if (childFile.isDirectory()) {
                deleteRecur(childFile);
            } else {
                if (!childFile.delete()) {
                    System.out.println("error in recursion");
                }
            }
        }

        if (!file.delete()) {
            System.out.println("error in recursion 1");

        }
    }

    public void deleteFolderEntry(String path){
        fileRepository.deleteByPathLike(path);
    }
}
