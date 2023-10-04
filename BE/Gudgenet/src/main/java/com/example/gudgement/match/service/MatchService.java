package com.example.gudgement.match.service;

import com.example.gudgement.match.dto.MatchDto;

public interface MatchService {
    void addUserToGroup(MatchDto matchDtp);

    void removeUserFromGroup(MatchDto matchDto);

/*    void addUserToRoomAndTier(MatchDto matchDto);

    Set<String> getUsersInRoomAndTier(MatchDto matchDto);

    void removeUserFromRoomAndTier(MatchDto matchDto);

    long getUsersCountInRoomAndTier(String room, String tier);*/
}

