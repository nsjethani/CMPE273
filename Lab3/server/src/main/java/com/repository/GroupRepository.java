package com.repository;

import com.entity.GroupMembers;
import com.entity.Grouping;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GroupRepository extends CrudRepository<GroupMembers, Long>{

    
}
