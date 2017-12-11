package com.repository;

import com.entity.FileOperationLogs;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FileLogRepository extends CrudRepository<FileOperationLogs, Long> {
        List<FileOperationLogs> findByUserid(int id);
}



