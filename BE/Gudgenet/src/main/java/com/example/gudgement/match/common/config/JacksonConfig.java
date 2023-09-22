package com.example.gudgement.match.common.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();

        // 필요한 Jackson 설정을 추가할 수 있습니다.
        // 예를 들어, 날짜 형식을 설정하거나 다른 직렬화 옵션을 구성할 수 있습니다.
        // objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd"));

        return objectMapper;
    }
}