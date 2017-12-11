package com.service;

import com.entity.ShareData;
import com.repository.ShareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShareService {
    @Autowired
    private ShareRepository shareRepository;

    public List<ShareData> findBySharedItemAndSharedWith(int sharedItemId, String sharedWith){
        return shareRepository.findBySharedItemAndSharedWith(sharedItemId, sharedWith);
    }

    public List<ShareData> findBySharedWith(String sharedWith){
        return shareRepository.findBySharedWith(sharedWith);
    }

    public void shareData(ShareData shareData){
        shareRepository.save(shareData);
    }
}