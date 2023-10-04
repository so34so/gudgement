package com.example.gudgement.ranking.service;

import com.example.gudgement.member.entity.Member;
import com.example.gudgement.member.repository.MemberRepository;
import com.example.gudgement.ranking.dto.RankingDto;
import com.example.gudgement.ranking.dto.TotalRankingDto;
import com.example.gudgement.shop.entity.Inventory;
import com.example.gudgement.shop.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RankingServiceImpl implements RankingService{

    private final MemberRepository memberRepository;
    private final InventoryRepository inventoryRepository;

    @Override
    public List<RankingDto> getTop100Ranks() {
        List<Member> members = memberRepository.findAll(Sort.by(Sort.Direction.DESC, "exp")).stream().limit(100).collect(Collectors.toList());
        AtomicInteger rank = new AtomicInteger(1);
        return members.stream().map(member -> {
            RankingDto dto = new RankingDto();
            dto.setRanking(rank.getAndIncrement());
            dto.setNickname(member.getNickname());
            dto.setLevel(member.getLevel());

            // Get equipped item of type 'character' and set its image to the DTO.
            Optional<Inventory> equippedItemOpt = inventoryRepository.findEquippedCharacterItemByMember(member);
            if (equippedItemOpt.isPresent()) {
                Inventory equippedItem = equippedItemOpt.get();
                dto.setCharacter(equippedItem.getItemId().getImage());
            } else {
                dto.setCharacter(null);
            }

            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public RankingDto getMemberRank(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new IllegalArgumentException("Invalid memberId: " + memberId));
        int rank = memberRepository.findRankByMemberId(memberId);

        // Create the ranking DTO for the requested user.
        RankingDto rankingDTO = new RankingDto();
        rankingDTO.setRanking(rank);
        rankingDTO.setNickname(member.getNickname());
        rankingDTO.setLevel(member.getLevel());

        // Get equipped item of type 'character' and set its image to the DTO.
        Optional<Inventory> equippedItemOpt = inventoryRepository.findEquippedCharacterItemByMember(member);
        if (equippedItemOpt.isPresent()) {
            Inventory equippedItem = equippedItemOpt.get();
            rankingDTO.setCharacter(equippedItem.getItemId().getImage());
        } else {
            rankingDTO.setCharacter(null);
        }

        return rankingDTO;
    }

    @Override
    public TotalRankingDto getRanks(Long memberId) {
        List<RankingDto> top100Ranks = getTop100Ranks();
        RankingDto memberRank = getMemberRank(memberId);

        TotalRankingDto total = new TotalRankingDto();
        total.setMyRanking(memberRank);
        total.setRankingList(top100Ranks);

        return total;
    }
}
