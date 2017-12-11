package com.service;

import com.entity.GroupMembers;
import com.entity.Grouping;
import com.repository.GroupRepository;
import com.repository.GroupingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private GroupingRepository groupingRepository;

    public GroupMembers addData(GroupMembers data){
        return groupRepository.save(data);
    }

}