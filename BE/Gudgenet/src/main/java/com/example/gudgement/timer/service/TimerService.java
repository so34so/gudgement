package com.example.gudgement.timer.service;

public interface TimerService {
    void startTimer(String key, Runnable task, long delayInSeconds);

    void cancelTimer(String key);
}
