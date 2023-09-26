package com.example.gudgement.mypage.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

@Slf4j
@Service
public class MyPageServiceImpl implements MyPageService{

    private SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd", Locale.KOREA);

    //
    @Override
    public int getWeekOfMonth(String date) {
        Calendar calendar = Calendar.getInstance();
        String[] dates = date.split("-");
        int year = Integer.parseInt(dates[0]);
        int month = Integer.parseInt(dates[1]);
        int day = Integer.parseInt(dates[2]);
        calendar.set(year, month-1, day);

        return calendar.get(Calendar.WEEK_OF_MONTH);
    }

}
