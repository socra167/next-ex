package com.next.global.exception;

import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.next.global.app.AppConfig;
import com.next.global.dto.Empty;
import com.next.global.dto.RsData;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RsData<Empty>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {

        String message = e.getBindingResult().getFieldErrors()
                .stream()
                .map(fe -> fe.getField() + " : " + fe.getCode() + " : "  + fe.getDefaultMessage())
                .sorted()
                .collect(Collectors.joining("\n"));

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(
                        new RsData<>(
                                "400-1",
                                message
                        )
                );
    }

    @ResponseStatus // SpringDoc에서 메서드 인식할 수 있도록
    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<RsData<Empty>> ServiceExceptionHandle(ServiceException ex) {

        // 개발 모드에서만 작동되도록.
        if(AppConfig.isNotProd()) ex.printStackTrace();

        return ResponseEntity
                .status(ex.getStatusCode())
                .body(
                        new RsData<>(
                                ex.getCode(),
                                ex.getMsg()
                        )
                );
    }

}
