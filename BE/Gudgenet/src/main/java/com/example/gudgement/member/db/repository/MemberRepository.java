package com.example.gudgement.member.db.repository;

import com.example.gudgement.member.db.dto.response.MemberResponseDto;
import com.example.gudgement.member.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    Member findByMemberId(Long memberId);
}
