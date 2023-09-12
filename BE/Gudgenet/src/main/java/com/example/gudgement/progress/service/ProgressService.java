package com.example.gudgement.progress.service;

import com.example.gudgement.progress.entity.Progress;
import com.example.gudgement.progress.repository.ProgressRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class ProgressService {
    
    private final ProgressRepository progressRepository;

    public boolean checkUnlockStatus(Member memberId, String conditionName, int conditionValue) {
       Progress progress =  progressRepository.findByMemberIdAndConditionName(memberId, conditionName);

       if(progress != null && progress.getProgressValue()>=conditionValue) {
           return true;
       }else{
           return false;
       }

    }

}
