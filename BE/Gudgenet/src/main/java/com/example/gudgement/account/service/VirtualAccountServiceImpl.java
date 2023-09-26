package com.example.gudgement.account.service;

import com.example.gudgement.account.dto.VirtualAccountDto;
import com.example.gudgement.account.dto.VirtualAccountWithSelectedDto;
import com.example.gudgement.account.entity.VirtualAccount;
import com.example.gudgement.account.repository.VirtualAccountRepository;
import com.example.gudgement.member.entity.Member;
import com.example.gudgement.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VirtualAccountServiceImpl implements VirtualAccountService {

    private final MemberRepository memberRepository;
    private final VirtualAccountRepository virtualAccountRepository;

    @Override
    public VirtualAccountDto create(VirtualAccountDto virtualAccountDto) {
        // Convert DTO to Entity
        VirtualAccount account = new VirtualAccount(virtualAccountDto.getBankName(),
                virtualAccountDto.getAccountName(),
                virtualAccountDto.getAccountNumber(),
                virtualAccountDto.getAccountHolder(),
                virtualAccountDto.getEmail(),
                virtualAccountDto.getBalance());

        // Save Entity in the database and get the saved entity
        VirtualAccount savedAccount = this.virtualAccountRepository.save(account);

        // Convert saved Entity back to DTO and return it.
        return new VirtualAccountDto(savedAccount.getVirtualAccountId(),
                savedAccount.getBankName(),
                savedAccount.getAccountName(),
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
                        account.getAccountName(),
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
                account.getAccountName(),
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

    @Override
    public List<VirtualAccountWithSelectedDto> getVirtualAccountsByEmail(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("멤버가 존재하지 않습니다. Email: " + email));

        //VirtualAccount selectedAccount = member.getVirtualAccount();
        Long selectedAccountId = member.getVirtualAccountId();
        VirtualAccount selectedAccount = null;
        if (selectedAccountId != null) {
            selectedAccount = virtualAccountRepository.findById(selectedAccountId)
                    .orElseThrow(() -> new RuntimeException("선택된 가상계좌가 존재하지 않습니다. ID: " + selectedAccountId));
        }


        List<VirtualAccount> accounts = virtualAccountRepository.findAllByEmail(email);
        return accounts.stream()
                .map(account -> {
                    VirtualAccountWithSelectedDto dto = new VirtualAccountWithSelectedDto();
                    dto.setVirtualAccountId(account.getVirtualAccountId());
                    dto.setBankName(account.getBankName());
                    dto.setAccountName(account.getAccountName());
                    dto.setAccountNumber(account.getAccountNumber());
                    dto.setAccountHolder(account.getAccountHolder());
                    dto.setEmail(account.getEmail());
                    dto.setBalance(account.getBalance());

                    // 현재 멤버의 선택된 가상 계좌인 경우 true, 아니면 false.
                    if (selectedAccountId != null) {
                        boolean isSelected = (account.getVirtualAccountId() == selectedAccountId);
                        dto.setSelected(isSelected);
                    } else {
                        // 만약 선택된 계좌가 없다면 모두 false.
                        dto.setSelected(false);
                    }

                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void updateSelectedVirtualAccount(String email, Long virtualAccountId) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("멤버가 존재하지 않습니다. Email: " + email));
        member.setVirtualAccountId(virtualAccountId);
        memberRepository.save(member);
    }
}
