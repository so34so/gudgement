package com.example.gudgement.shop.repository;

import com.example.gudgement.shop.entity.Progress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProgressRepository extends JpaRepository<Progress,Long> {
    /*List<Progress> findByMemberId(Member memberId);*/
}
