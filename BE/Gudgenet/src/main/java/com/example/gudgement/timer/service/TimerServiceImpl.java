package com.example.gudgement.timer.service;

import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.*;

@Slf4j
@Service
@NoArgsConstructor
public class TimerServiceImpl implements TimerService{
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private final Map<String, ScheduledFuture<?>> timers = new ConcurrentHashMap<>();

    public void startTimer(String key, Runnable task, long delayInSeconds) {
        ScheduledFuture<?> timeoutTask = scheduler.schedule(task, delayInSeconds, TimeUnit.SECONDS);
        timers.put(key, timeoutTask);
    }

    public void cancelTimer(String key) {
        ScheduledFuture<?> timeoutTask = timers.get(key);
        if (timeoutTask != null && !timeoutTask.isDone()) {
            timeoutTask.cancel(false);
            timers.remove(key);
        }
    }
}
