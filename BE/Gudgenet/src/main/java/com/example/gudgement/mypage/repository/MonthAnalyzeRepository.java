package com.example.gudgement.mypage.repository;

import com.example.gudgement.mypage.entity.MonthAnalyze;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MonthAnalyzeRepository extends JpaRepository<MonthAnalyze, Long> {
    Optional<MonthAnalyze> findByYearAndMonthAndVirtualAccountId(int year, int month, Long virtualAccountId);
    void deleteByYearAndMonthAndVirtualAccountId(int year, int month, Long virtualAccountId);
}
