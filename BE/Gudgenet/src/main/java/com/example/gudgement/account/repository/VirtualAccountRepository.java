package com.example.gudgement.account.repository;

import com.example.gudgement.account.entity.VirtualAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VirtualAccountRepository extends JpaRepository<VirtualAccount, Long> {
    List<VirtualAccount> findAllByEmail(String email);
}
