package com.workly.final_project.member.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Repository;

import com.workly.final_project.common.model.vo.Attachment;
import com.workly.final_project.common.model.vo.PageInfo;
import com.workly.final_project.common.model.vo.PageRow;
import com.workly.final_project.member.model.dto.CategoryPrDTO;
import com.workly.final_project.member.model.dto.ChangePwd;
import com.workly.final_project.member.model.dto.MemberDTO;
import com.workly.final_project.member.model.vo.CategoryFilter;
import com.workly.final_project.member.model.vo.Department;
import com.workly.final_project.member.model.vo.Member;
import com.workly.final_project.member.model.vo.Position;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MemberDaoImpl implements MemberDao {
	
	private final SqlSession session;
	
	@Override
	public MemberDTO loginMember(Member m) {
		return session.selectOne("member.loginMember", m);
	}

	@Override
	public int selectMemberCount(CategoryFilter filter) {
		return session.selectOne("member.selectCategoryMemberCount", filter);
	}

	@Override
	public List<Member> selectMemberList(PageInfo pi, CategoryFilter filter) {
		int startRow = (pi.getCurrentPage() - 1) * pi.getContentsLimit() + 1;
		int endRow = startRow + pi.getContentsLimit() - 1;
		
		PageRow pr = new PageRow();
		pr.setStartRow(startRow);
		pr.setEndRow(endRow);
		
		CategoryPrDTO dto = new CategoryPrDTO(filter, pr);
		
		return session.selectList("member.selectMemberList", dto);
	}

	@Override
	public int insertAttachment(Attachment at) {
		return session.insert("member.insertAttachment", at);
	}

	@Override
	public MemberDTO selectMember(int userNo) {
		return session.selectOne("member.selectMember", userNo);
	}
	
	@Override
	public List<Department> selectDeptList() {
		return session.selectList("member.selectDeptList");
	}

	@Override
	public List<Position> selectPosiList() {
		return session.selectList("member.selectPosiList");
	}

	@Override
	public int updateMember(Member m) {
		return session.update("member.updateMember", m);
	}

	@Override
	public int deleteAttachment(Member m) {
		return session.update("member.deleteAttachment", m);
	}

	@Override
	public int checkAttachment(Member m) {
		return session.selectOne("member.checkAttachment", m);
	}

	@Override
	public List<MemberDTO> selectModalMemberList() {
		return session.selectList("member.selectModalMemberList");
	}

	@Override
	public Member currentPwdCheck(int userNo) {
		return session.selectOne("member.currentPwdCheck", userNo);
	}

	@Override
	public int updatePassword(ChangePwd changePwd) {
		return session.update("member.updatePassword", changePwd);
	}

	@Override
	@Scheduled(cron = "0 0 0 1 1 *")
	public void initUserNoSeq() {
		session.update("member.initUserNoSeq");
	}
}
