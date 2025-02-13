import { useState } from "react";
import styles from "./ManagePermission.module.css";

const ManagePermission = () => {
  const [openSections, setOpenSections] = useState({ inhumanResources: true });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.treeContainer}>
        <div className={styles.section}>
          <div className={styles.sectionHeader} onClick={() => toggleSection("inhumanResources")}> 
            {openSections.inhumanResources ? "▼" : "▶"} 인사팀
          </div>
          {openSections.inhumanResources && (
            <div className={styles.subSection}>
              <div className={styles.subHeader}>↳ 팀장</div>
              <div className={styles.subItem}>↳ 과장</div>
              <div className={styles.subItem}>↳ 차장</div>
              <div className={styles.subItem}>↳ 대리</div>
              <div className={styles.subItem}>↳ 사원</div>
            </div>
          )}
        </div>

        {[
          "경영지원팀", "마케팅팀", "보안팀", "법무법인팀", "디자인팀", "개발운영팀", "서비스 운영팀",
        ].map((team) => (
          <div key={team} className={styles.section}>
            <div className={styles.sectionHeader} onClick={() => toggleSection(team)}>
              ▶ {team}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.switchContainer}>
        {["급여관리", "인사관리", "권한관리", "조직도관리"].map((label) => (
          <div key={label} className={styles.switchRow}>
            <label className={styles.switch}>
              <input type="checkbox" defaultChecked />
              <span className={styles.slider}></span>
            </label>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePermission;
