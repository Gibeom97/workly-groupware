package com.workly.final_project.member.model.dao;

import java.util.List;

import com.workly.final_project.common.model.vo.Attachment;
import com.workly.final_project.common.model.vo.PageInfo;
import com.workly.final_project.member.model.dto.MemberDTO;
import com.workly.final_project.member.model.vo.Member;

public interface MemberDao {

	Member loginMember(Member m);

	List<Member> selectMemberList(PageInfo pi);

	int insertMember(Member m);

	int insertAttchment(Attachment at);

	int selectMemberCount();

	MemberDTO selectMember(int userNo);
}
