package com.service;
import java.util.List;

import com.entity.FileOperationLogs;
import com.repository.FileLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FileLogService {

    @Autowired
    private FileLogRepository fileLogRepository;

    public void addData(FileOperationLogs data){
        fileLogRepository.save(data);
    }

    public List<FileOperationLogs> findByUserid(int username){
        return fileLogRepository.findByUserid(username);
    }
}
