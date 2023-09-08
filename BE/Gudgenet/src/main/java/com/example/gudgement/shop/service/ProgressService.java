package com.example.gudgement.shop.service;

import com.example.gudgement.shop.dto.ProgressDto;
import com.example.gudgement.shop.repository.ProgressRepository;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@NoArgsConstructor
public class ProgressService {

    /*private final ProgressRepository progressRepository;

    @Transactional(readOnly = true)
    public List<ProgressDto> findProgressByMember(Member memberId){
        return progressRepository.findByMemberId(memberId);
    }*/
}
