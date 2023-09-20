package com.example.gudgement.progress.service;

import com.example.gudgement.member.entity.Member;

public interface ProgressService {

    boolean checkUnlockStatus(Member memberId, String progressName, int progressValue);

}
