package com.example.gudgement.member.service;

import com.example.gudgement.account.dto.TransactionHistoryDto;
import com.example.gudgement.account.dto.VirtualAccountDto;
import com.example.gudgement.account.entity.TransactionHistory;
import com.example.gudgement.account.entity.VirtualAccount;
import com.example.gudgement.account.repository.TransactionHistoryRepository;
import com.example.gudgement.account.repository.VirtualAccountRepository;
import com.example.gudgement.account.service.TransactionHistoryService;
import com.example.gudgement.account.service.VirtualAccountService;
import com.example.gudgement.member.dto.Rate;
import com.example.gudgement.member.dto.request.LoginDto;
import com.example.gudgement.member.dto.request.MemberCreateDto;
import com.example.gudgement.member.dto.response.MemberResponseDto;
import com.example.gudgement.member.dto.response.MemberVerifyResponseDto;
import com.example.gudgement.member.entity.Grade;
import com.example.gudgement.member.entity.Member;
import com.example.gudgement.member.exception.EmailLogicException;
import com.example.gudgement.member.repository.MemberRepository;
import com.example.gudgement.member.exception.BaseErrorException;
import com.example.gudgement.member.exception.ErrorCode;
import com.example.gudgement.shop.entity.Inventory;
import com.example.gudgement.shop.entity.Item;
import com.example.gudgement.shop.repository.InventoryRepository;
import com.example.gudgement.mypage.exception.AccountException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.internal.util.privilegedactions.LoadClass;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.NonUniqueResultException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
=======
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final InventoryRepository inventoryRepository;

    private final VirtualAccountService virtualAccountService;
    private final VirtualAccountRepository virtualAccountRepository;
    private final TransactionHistoryService transactionHistoryService;
    private final TransactionHistoryRepository transactionHistoryRepository;

    private static String[] bank_name = {"대구은행", "경남은행", "하나은행", "농협은행", "신한은행", "국민은행", "카카오뱅크"
            , "S&C제일은행", "광주은행", "기업은행", "우리은행"};
    private static String[][] account_name = {
                    {"Smart 정기예금", "e-스마트 적금", "Happy 청년 정기예금"},
                    {"Smart 정기예금", "e-스마트 적금", "Happy 청년 정기예금"},
                    {"하나원큐 체크카드 자동적금", "뉴스탠다드 정기예금", "아이사랑 적립식 보험"},
                    {"NH 희망 적금", "NH 스마일 저축보험", "NH 온라인 정기예금"},
                    {"스마트 모아저축", "S클래스 VIP 저축예금", "신한저축계좌"},
                    {"Liiv M 적금", "K-easy 스맛 폰 예적립식", "KB Star 정기"},
                    {"카카오뱅크 자유적립식", "카카오뱅크 연동정기", "카카오뱅크 타임디파짓"},
                    {"SC Dream 정기", "SC 청년 Dream 적금", "i-SC모아저축"},
                    {"GJ 스맛정", "GJ 에듀 샘이벤트" , "GJ My Car 자동차 대출"},
                    {"IBK 기업청약" , "IBK e-정당" , "IBK 워킹맘 우대 종합"},
                    {"우리 아이 통장" , "Woori Smart 주거래" , "We 첫 직장인 첫 계좌"}};
    private static List<String> account_number = Arrays.asList("940311-556-4511-01", "508-124-17535-52", "113-4445978-85", "1977-88520-5543-054",
            "13-13558-5469-4", "6-4555-11264-563-5", "171-4450-4579-6","508-117-4525-6", "940302-00-024486", "4-7778-2456-21","78-5543-45788-4");

    private static String[] Destination = {
            "카카오페이", "쉼터", "탐앤탐스", "스타벅스 코리아","버거킹 인의점",
            "쿠팡","씨유구미강동점","007마트 인동점","GS 구미진평점","(주) 우아한형제들",
            "(주) 우아한형제들","투썸플레이스 구미 진","한국맥도날드 (유)","GS 진평베스트점","카카오페이",
            "투썸플레이스 인동점","올리브영","강고기집 진평점","진미축산","권민우","여민수", "카카오법인택시_5",
             };
    @Override
    @Transactional
    public MemberResponseDto memberCreate(MemberCreateDto memberCreateDto) {
        Member member = memberRepository.saveAndFlush(Member.builder()
                .email(memberCreateDto.getEmail())
                .gender(memberCreateDto.getGender())
                .age(memberCreateDto.getAge())
                .nickname(memberCreateDto.getNickname())
                .build());

        return MemberResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .tiggle(member.getTiggle())
                .exp(member.getExp())
                .level(member.getLevel())
                .pedometer(member.getPedometer())
                .build();
    }

    @Override
    @Transactional
    public MemberVerifyResponseDto verifyMember(LoginDto loginDto) {
        Member member = memberRepository.findByMemberId(loginDto.getId()).orElseThrow(() -> {
                    throw new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER);
                });

        if (member == null) {
            return MemberVerifyResponseDto.builder()
                    .isValid(false)
                    .build();
        }
        return MemberVerifyResponseDto.builder()
                .id(member.getMemberId())
                .isValid(true)
                .build();
    }

    @Override
    public MemberResponseDto loadInfo(Long id) {
        Member member = memberRepository.findByMemberId(id).orElseThrow(() -> {
            throw new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER);
        });

        log.info("이메일 체크 ===================================");
        if (member.getEmail().equals("Gudgement") && !member.isEmailApprove()) {
            throw new EmailLogicException(ErrorCode.NOT_AUTHORIZATION_EMAIL);
            }
        log.info("인증된 이메일 =================================");

        log.info("닉네임 설정 판별 ==============================");
        if (!member.isNicknameApprove()) {
            throw new BaseErrorException(ErrorCode.NOT_REGISTRATION_NICKNAME);
        }
        log.info("닉네임 설정 확인 ==============================");

        Rate memberRate = memberRating(member);

        List<Inventory> equippedInventories = inventoryRepository.findByMemberAndEquipped(member, true);
        List<Item> equippedItems = new ArrayList<>();
        for (Inventory inventory : equippedInventories) {
            equippedItems.add(inventory.getItemId()); // assuming getItemId() returns an Item object.
        }

        return MemberResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .emailApprove(member.isEmailApprove())
                .nicknameApprove(member.isNicknameApprove())
                .setItems(equippedItems)
                .tiggle(member.getTiggle())
                .level(member.getLevel())
                .exp(member.getExp())
                .pedometer(member.getPedometer())
                .rate(memberRate)
                .build();
    }

    // 잔액 갱신 중요
    // 개인 소비 금액에 따른 레이팅 판별 기능
    @Override
    public Rate memberRating(Member member) {
        Long total = 0L;
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime beginningOfMonth = LocalDateTime.of(now.getYear(), now.getMonth(), 1, 0, 0, 0);

        VirtualAccount account = virtualAccountRepository.findByVirtualAccountId(member.getVirtualAccountId()).orElseThrow(() -> {
            throw new AccountException(ErrorCode.NOT_FOUND_ACCOUNT);
        });
        
        // 이번 달 총 소비 금액
        total = transactionHistoryRepository.findByVirtualAccountIdAndTransactionDateBetweenAndType(account, beginningOfMonth, now, 1)
                .stream()
                .mapToLong(TransactionHistory::getAmount)
                .sum();

        log.info("개인 목표 금액 유무 점검 중...");
        if (member.getMonthOverconsumption() != null) {
            log.info("개인 과소비 기준이 있는 유저");
            log.info("목표 대비 소비 금액 비율 산정 중...");
            double amountRate = total / member.getMonthOverconsumption();
            System.out.println(amountRate);

            return Rate.builder()
                .totalAmount(total)
                .rate(amountRate)
                .balance(account.getBalance())
                .build();
            
        }

        log.info("개인 과소비 기준이 없는 유저.");
        return Rate.builder()
                .totalAmount(total)
                .rate(null)
                .balance(account.getBalance())
                .build();
    }

    @Override
    @Transactional
    public void updateRefreshToken(String email, String refreshToken) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() ->
             new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER)
        );
        member.updateRefreshToken(refreshToken);
        memberRepository.save(member);
    }

    @Override
    @Transactional
    public void updateEmail(Long id, String email) {
        Member member = memberRepository.findByMemberId(id).orElseThrow(() ->
                new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER));

        member.updateEmail(email);
        memberRepository.saveAndFlush(member);
        Random rd = new Random();
        int cnt = 0;
        Collections.shuffle(account_number);

        // 가상 계좌 랜덤 생성
        System.out.println(bank_name.length);
        System.out.println(account_name.length);
        do {
            int random_num = rd.nextInt(bank_name.length);
            virtualAccountService.create(VirtualAccountDto.builder()
                            .bankName(bank_name[random_num])
                            .accountNumber(account_number.get(cnt))
                            .accountName(account_name[random_num][rd.nextInt(3)])
                            .accountHolder(member.getNickname())
                            .email(email)
                            .balance(rd.nextInt(100000) * 100)
                    .build());
            cnt++;
        } while(cnt <= rd.nextInt(6));

        
        // 거래 내역 생성
        List<VirtualAccount> accounts = virtualAccountRepository.findAllByEmail(email);

        for (int i = 0; i < 100; i++) {
            int random_num = rd.nextInt(bank_name.length);
            transactionHistoryService.create(TransactionHistoryDto.builder()
                    .virtualAccountId(accounts.get(rd.nextInt(accounts.size())).getVirtualAccountId())
                    .type(1)
                    .amount(rd.nextInt(9999) * 10)
                    .depositSource(".")
                    .withdrawalDestination(Destination[rd.nextInt(Destination.length)])
                    .transactionDate(getDateTime())
                    .build());
        }
    }

    @Override
    @Transactional
    public void updateNickname(Long id, String nickname) {
        Member member = memberRepository.findByMemberId(id).orElseThrow(() ->{
                throw new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER);
        });

        member.updateNickname(nickname);
        memberRepository.save(member);
    }

    @Override
    public boolean validNickname(String nickname) {
        return !memberRepository.existsByNickname(nickname);
    }

    @Override
    @Transactional
    public void addTiggle(Long id) {
        Member member = memberRepository.findByMemberId(id).orElseThrow(() ->{
            throw new BaseErrorException(ErrorCode.NOT_FOUND_MEMBER);
        });

        member.addTiggle(300L); // 기존 tiggles 값에 300을 더한 값을 저장

        memberRepository.save(member); // 변경된 정보 저장
    }

    public LocalDateTime getDateTime() {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusMonths(3);

        long startSeconds = startDate.toEpochSecond(ZoneOffset.UTC);
        long endSeconds = endDate.toEpochSecond(ZoneOffset.UTC);

        long randomEpochSecond = ThreadLocalRandom
                .current()
                .nextLong(startSeconds, endSeconds);

        return LocalDateTime.ofEpochSecond(randomEpochSecond, 0, ZoneOffset.UTC);
    }

    // 이전 달 소비내역 기준 grade 산정
    @Override
    public void updateGrade(Member member) {
        if (!member.getGrade().equals(Grade.ROLE_USER)) { return; }

        Long total = 0L;
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime lastMonthFirst = LocalDateTime.of(now.getYear(), now.getMonth().minus(1), 1, 0, 0, 0);
        LocalDateTime lastMonthEnd = LocalDateTime.of(now.getYear(), now.getMonth(), 1, 0, 0, 0);

        VirtualAccount account = virtualAccountRepository.findByVirtualAccountId(member.getVirtualAccountId()).orElseThrow(() -> {
            throw new AccountException(ErrorCode.NOT_FOUND_ACCOUNT);
        });

        // 이번 달 총 소비 금액
        total = transactionHistoryRepository.findByVirtualAccountIdAndTransactionDateBetweenAndType(account, lastMonthFirst, lastMonthEnd, 1)
                .stream()
                .mapToLong(TransactionHistory::getAmount)
                .sum();

        if (total < 1000000) {
            member.updateGrade(Grade.ROLE_GOLD);
            memberRepository.save(member);
            return;
        }
        if (total < 2000000) {
            member.updateGrade(Grade.ROLE_SILVER);
            memberRepository.save(member);
            return;
        }

        member.updateGrade(Grade.ROLE_BRONZE);
        memberRepository.save(member);
    }
}

