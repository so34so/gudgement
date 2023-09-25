package com.example.gudgement.account.service;

import com.example.gudgement.account.dto.VirtualAccountDto;
import com.example.gudgement.account.entity.VirtualAccount;
import com.example.gudgement.account.repository.VirtualAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VirtualAccountServiceImpl implements VirtualAccountService {

    private final VirtualAccountRepository virtualAccountRepository;

    @Override
    public VirtualAccountDto create(VirtualAccountDto virtualAccountDto) {
        // Convert DTO to Entity
        VirtualAccount account = new VirtualAccount(virtualAccountDto.getBankName(),
                virtualAccountDto.getAccountNumber(),
                virtualAccountDto.getAccountHolder(),
                virtualAccountDto.getEmail(),
                virtualAccountDto.getBalance());

        // Save Entity in the database and get the saved entity
        VirtualAccount savedAccount = this.virtualAccountRepository.save(account);

        // Convert saved Entity back to DTO and return it.
        return new VirtualAccountDto(savedAccount.getVirtualAccountId(),
                savedAccount.getBankName(),
                savedAccount.getAccountNumber(),
                savedAccount.getAccountHolder(),
                savedAccount.getEmail(),
                savedAccount.getBalance());
    }

    @Override
    public List<VirtualAccountDto> getAll() {
        List<VirtualAccount> accounts = virtualAccountRepository.findAll();
        return accounts.stream()
                .map(account -> new VirtualAccountDto(account.getVirtualAccountId(),
                        account.getBankName(),
                        account.getAccountNumber(),
                        account.getAccountHolder(),
                        account.getEmail(),
                        account.getBalance()))
                .collect(Collectors.toList());
    }

    @Override
    public VirtualAccountDto getById(Long id) {
        VirtualAccount account = virtualAccountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("가상 계좌가 존재하지 않습니다. ID: " + id));
        return new VirtualAccountDto(account.getVirtualAccountId(),
                account.getBankName(),
                account.getAccountNumber(),
                account.getAccountHolder(),
                account.getEmail(),
                account.getBalance());
    }

    @Override
    public void delete(Long id) {
        VirtualAccount account = virtualAccountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("가상 계좌가 존재하지 않습니다. ID: " + id));
        virtualAccountRepository.delete(account);
    }

}
