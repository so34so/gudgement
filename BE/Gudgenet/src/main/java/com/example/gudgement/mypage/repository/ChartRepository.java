package com.example.gudgement.mypage.repository;

import com.example.gudgement.member.entity.Member;
import com.example.gudgement.mypage.entity.Chart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChartRepository extends JpaRepository<Chart, Long> {
    Optional<Chart> findByMemberIdAndMonthAndWeek(Member member, int month, int week);
}
