package com.example.gudgement.match.service;

import com.example.gudgement.match.dto.MatchDto;
import com.example.gudgement.member.entity.Member;

public interface MatchService {
    void requestMatch(MatchDto matchDto);

    void cancelMatch(MatchDto matchRequest);
}
