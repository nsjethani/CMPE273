package com.repository;
import com.entity.FileDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
public interface FileRepository extends CrudRepository<FileDetails, Long>{
    List<FileDetails> findByPath(String Path);
    FileDetails findById(int id);
    List<FileDetails> findByOwnerusernameAndStarred(String username, boolean status);

    @Modifying
    @Transactional
    @Query("UPDATE FileDetails fd SET fd.sharedstatus = :status where fd.id = :id")
    int updateSharedStatus(@Param("id") int id, @Param("status") boolean status);

    @Modifying
    @Transactional
    @Query("UPDATE FileDetails fd SET fd.starred = :status where fd.id = :id")
    int updateStarredStatus(@Param("id") int id, @Param("status") boolean status);

    @Modifying
    @Transactional
    @Query("delete from FileDetails fd where fd.path LIKE :path%")
    void deleteByPathLike(@Param("path") String path);
}
