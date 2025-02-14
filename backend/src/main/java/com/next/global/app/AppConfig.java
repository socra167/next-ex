package com.next.global.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Getter;

@Configuration
public class AppConfig {

    public static boolean isNotProd() {
        return true;
    }

    @Getter
    public static ObjectMapper objectMapper;

    @Autowired
    public void setObjectMapper(ObjectMapper objectMapper) {
        AppConfig.objectMapper = objectMapper;
    }

    public static String getSiteFrontUrl() {
        return "http://localhost:3000";
    }

}
