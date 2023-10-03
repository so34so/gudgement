package com.example.gudgement.member.repository;

import com.example.gudgement.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);
    Optional<Member> findByRefreshToken(String refreshToken);
    Optional<Member> findByMemberId(Long memberId);
    Optional<Member> findByNickname(String nickname);
    boolean existsByMemberId(Long memberId);
    boolean existsByEmail(String email);
    boolean existsByMemberIdAndEmail(Long memberId, String email);
    boolean existsByNickname(String nickname);
    
    String findNicknameByMemberId(Long memberId);
    void deleteByMemberId(Long memberId);
}
