package com.next.domain.member.member.dto;

import java.time.LocalDateTime;

import org.springframework.lang.NonNull;

import com.next.domain.member.member.entity.Member;

import lombok.Getter;

@Getter
public class MemberDto {
    @NonNull
    private long id;
    @NonNull
    private LocalDateTime createdDate;
    @NonNull
    private LocalDateTime modifiedDate;
    @NonNull
    private String nickname;

    public MemberDto(Member member) {
        this.id = member.getId();
        this.createdDate = member.getCreatedDate();
        this.modifiedDate = member.getModifiedDate();

        this.nickname = member.getNickname();
    }
}
