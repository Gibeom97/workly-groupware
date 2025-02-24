package com.workly.final_project.common.utils;

import java.sql.Timestamp;

public class TimestampConverter {

    public static Timestamp convertOracleTimestamp(Object dbTimestamp) {
        if (dbTimestamp == null) {
            return null; // null 값이면 그대로 반환
        }
        if (dbTimestamp instanceof Timestamp) {
            return (Timestamp) dbTimestamp; // 이미 Timestamp라면 그대로 반환
        }
        throw new IllegalArgumentException("지원되지 않는 타입: " + dbTimestamp.getClass().getName());
    }
}
