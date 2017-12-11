package com.repository;

import com.entity.ShareData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShareRepository extends JpaRepository<ShareData, Long> {
    List<ShareData> findBySharedItemAndSharedWith(int sharedItem, String sharedWith);

    List<ShareData> findBySharedWith(String sharedWith);
}