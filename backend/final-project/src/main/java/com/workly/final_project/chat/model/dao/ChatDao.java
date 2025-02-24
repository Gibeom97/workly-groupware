package com.workly.final_project.chat.model.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

import com.workly.final_project.member.model.dto.MemberDeptPositionDTO;

@Mapper
public interface ChatDao {
    List<MemberDeptPositionDTO> getChatMembers();
}

