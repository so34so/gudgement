package com.example.gudgement.mypage.repository;

import com.example.gudgement.member.entity.Member;
import com.example.gudgement.mypage.entity.Chart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChartRepository extends JpaRepository<Chart, Long> {
    Optional<Chart> findByMemberIdAndYearAndMonthAndWeek(Member member,int year, int month, int week);
    void deleteAllByMemberId(Member member);
    Optional<Chart> findByAccountIdAndYearAndMonthAndWeek(Long accountId, int year, int month, int week);
}
