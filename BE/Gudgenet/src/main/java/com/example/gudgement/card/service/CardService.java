package com.example.gudgement.card.service;

import com.example.gudgement.account.entity.VirtualAccount;

public interface CardService {
    void generateAndStoreCards(VirtualAccount virtualAccountId, String roomNumber, String user);

    String getRandomUsedCard(String roomNumber, String user);
}
