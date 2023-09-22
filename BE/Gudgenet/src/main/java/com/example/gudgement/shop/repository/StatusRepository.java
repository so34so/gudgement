package com.example.gudgement.shop.repository;
import com.example.gudgement.shop.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status,Long> {

    boolean existsByItemId(Long itemId);

}
