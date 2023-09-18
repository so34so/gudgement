package com.example.gudgement.member.db.repository;

import com.example.gudgement.member.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    Optional<Member> findByRefreshToken(String refreshToken);
    Optional<Member> findByMemberId(Long memberId);
    boolean existsByMemberId(Long memberId);
    boolean existsByMemberIdAndEmail(Long memberId, String email);
}
