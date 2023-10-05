package com.example.gudgement.match.service;

import com.example.gudgement.match.dto.MatchDto;

public interface MatchService {
    void addUserToGroup(MatchDto matchDtp);

    void removeUserFromGroup(MatchDto matchDto);

}

