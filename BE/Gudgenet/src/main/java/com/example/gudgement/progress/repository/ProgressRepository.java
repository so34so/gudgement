package com.example.gudgement.progress.repository;

import com.example.gudgement.progress.entity.Progress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProgressRepository extends JpaRepository<Progress,Long> {
    Progress findByMemberIdAndConditionName(Member memberId, String progressName);
}
