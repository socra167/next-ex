package com.next.domain.post.post.dto;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.lang.NonNull;

import com.next.domain.post.post.entity.Post;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PageDto {
	@NonNull
	private List<PostDto> items;
	@NonNull
	private int currentPageNo;
	@NonNull
	private int totalPages;
	@NonNull
	private long totalItems;
	@NonNull
	private int pageSize;

	public PageDto(Page<Post> postPage) {
		this.items = postPage.getContent().stream().map(PostDto::new).toList();
		this.currentPageNo = postPage.getNumber() + 1;
		this.totalPages = postPage.getTotalPages();
		this.totalItems = postPage.getTotalElements();
		this.pageSize = postPage.getSize();
	}
}
