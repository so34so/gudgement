package com.example.gudgement.progress.repository;

import com.example.gudgement.member.entity.Member;
import com.example.gudgement.progress.entity.Progress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProgressRepository extends JpaRepository<Progress,Long> {
    Progress findByMemberAndProgressName(Member memberId, String progressName);
    void deleteAllByMember(Member member);
}
