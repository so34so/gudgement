package com.example.gudgement.account.repository;

import com.example.gudgement.account.entity.VirtualAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VirtualAccountRepository extends JpaRepository<VirtualAccount, Long> {
}
