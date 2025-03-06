package com.workly.final_project.member.model.dao;

import java.util.List;

import com.workly.final_project.common.model.vo.Attachment;
import com.workly.final_project.common.model.vo.PageInfo;
import com.workly.final_project.member.model.dto.ChangePwd;
import com.workly.final_project.member.model.dto.MemberDTO;
import com.workly.final_project.member.model.vo.CategoryFilter;
import com.workly.final_project.member.model.vo.Department;
import com.workly.final_project.member.model.vo.Member;
import com.workly.final_project.member.model.vo.Position;

public interface MemberDao {

	MemberDTO loginMember(Member m);

	List<Member> selectMemberList(PageInfo pi, CategoryFilter filter);

	int insertAttachment(Attachment at);

	int selectMemberCount(CategoryFilter filter);
	
	MemberDTO selectMember(int userNo);

	List<Position> selectPosiList();

	List<Department> selectDeptList();

	int updateMember(Member m);

	int deleteAttachment(Member m);

	int checkAttachment(Member m);

	List<MemberDTO> selectModalMemberList();

	Member currentPwdCheck(int userNo);

	int updatePassword(ChangePwd changePwd);
	
	void initUserNoSeq();
}
