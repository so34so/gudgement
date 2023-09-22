package com.example.gudgement.member.common.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.context.annotation.Configuration;


@OpenAPIDefinition(
        info = @Info(
                title = "거지먼트 API 명세서",
                description = "API Document",
                version = "v0.1",
                termsOfService = "http://www.tg360tech.com/terms",
                license = @License(
                        name = "Apache License Version 2.0",
                        url = "http://www.apache.org/licenses/LICENSE-2.0"
                ),
                contact = @Contact(
                        name = "dev",
                        email = "dev@tg360tech.com"
                )
        ),
        tags = {
                @Tag(name = "Common", description = "공통 기능"),
                @Tag(name = "Shop", description = "상점 기능"),
                @Tag(name = "Inventory", description = "인벤토리 기능"),
                @Tag(name = "Progress", description = "진행도 기능"),
                @Tag(name = "Undefined", description = "미정의 기능"),
        }
)
@Configuration
public class SpringDocConfig {
}

