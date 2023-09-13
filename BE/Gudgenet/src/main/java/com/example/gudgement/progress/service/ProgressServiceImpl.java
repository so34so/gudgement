package com.example.gudgement.progress.service;

import com.example.gudgement.member.db.entity.Member;
import com.example.gudgement.progress.entity.Progress;
import com.example.gudgement.progress.repository.ProgressRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class ProgressServiceImpl implements ProgressService{

    private final ProgressRepository progressRepository;

    public boolean checkUnlockStatus(Member memberId, String progressName, int progressValue) {
       Progress progress =  progressRepository.findByMemberIdAndProgressName(memberId, progressName);

       if(progress != null && progress.getProgressValue()>=progressValue) {
           return true;
       }else{
           return false;
       }

    }

}
