package com.example.gudgement.match.event;

import com.example.gudgement.match.dto.MatchDto;
import org.springframework.context.ApplicationEvent;

public class MatchRequestEvent extends ApplicationEvent {
    private final MatchDto matchDto;

    public MatchRequestEvent(Object source, MatchDto matchDto) {
        super(source);
        this.matchDto = matchDto;
    }

    public MatchDto getMatchDto() {
        return matchDto;
    }

}
