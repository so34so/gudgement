package com.example.gudgement.stomp.dto;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class DataDto {
    private String type;
    private String code;
    private Object data;

    @Builder
    public DataDto(String type, String code, Object data){
        this.type = type;
        this.code = code;
        this.data = data;
    }

}
