package com.repository;
import com.entity.FileDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
public interface FileRepository extends CrudRepository<FileDetails, Long>{
    List<FileDetails> findByPath(String Path);
}
