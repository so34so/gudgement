# 거지먼트 Gudgement

<img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/asset/appicon.png" width="150"/>

개발 기간 : 2023.08.21 ~ 2023.10.06</br>
개발 인원 : 6명

<br>

## 프로젝트 소개

게이미피케이션을 통한 과소비 줄이기 습관 형성 서비스

<br>

## 서비스 주요 기능

- 접근성 좋은 게임을 통한 과소비 지양에 주안점을 둠 (게임을 하면 할수록 소비 습관이 개선되는 효과)
- 소비 내역 기반으로 인디언 포커를 진행하여 소비 내역 인지와 소비 습관 개선을 기대
- 목표 소비 금액을 설정하여 소비 내용 및 패턴 조회
- 상점 기능을 통해 캐릭터 커스터마이징
- 랭킹 기능을 통한 경쟁 심리 자극
- 만보기 기능 및 만보기로만 얻을 수 있는 게임 리워드 구현

<br>

## 구현 기능 목록

- 로그인
  카카오 인증 로그인

  <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/screenshotLogin.png" width="150"/>

- 계좌 등록

  <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/screenshotReaccount.png" width="150"/>

- 인디언 포커 게임
  최대 베팅량 선택 기능, 대전 자동 매칭 기능, 소비내역 기반의 인디언 포커 게임 기능, 소비 아이템 기능 (게임 변수 창출), 1:1 채팅 기능

  <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/screenshotPlay.png" width="150"/>
  <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/screenshotMatch.png" width="150"/>

- 마이 페이지
  소비 진행 그래프 : 목표 소비 금액 / 전체 기간을 하여 하루 할당 금액 이상 사용시 빨강, 이하 사용시 초록
  분석 기능 : 소비 목표에 따라 위험도 추가 표시(안정, 경고, 위험 등)
  월별 결산 기능 : 소비 목표에 따른 순위 및 빈도, 고가 기준으로 어디에 가장 많이, 크게 소비하였는지 점검
  만보기 기능 : 걸음 수 측정 및 전용 리워드 구현

  <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/screenshotAnaylsis.png" width="150"/>
  <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/screenshotAnalysisMonth.png" width="150"/>
  <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/screenshotGoal.png" width="150"/>

- 상점
  캐릭터, 칭호, 치장 아이템 구현, 업적 달성 시 해금 기능

  <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/screenshotShop.png" width="150"/>
  <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/screenshotShopInvent.png" width="150"/>

- 홈
  캐릭터 외형 조회, 현재 소비 금액 확인 기능,

  <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/screenshotHome.png" width="150"/>

- 랭킹
  내 순위 및 상위권 유저 랭킹 조회 기능

  <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/screenshotRanking.png" width="150"/>

<br>

## 특장점

- 핀테크 요소 (과소비 줄이는 짠테크) + 게이미피케이션 요소 (재미)를 결합

- 모든 게임 리소스 자체 제작

- 간편한 카카오 로그인을 통한 회원가입

- 일별 소비내역을 분석해 과소비시 FCM 알림을 전달

- 소켓 통신을 통한 1:1매칭 게임 구현

- 앱 내 걸음 수를 불러와서 일정 걸음수 이상 달성했을 시 앱 내 재화 지급

- JWT를 활용한 소셜 로그인

- react-query를 통해 서버의 상태를 불러오고, 캐싱하며, 지속적으로 동기화 및 업데이트

<br>

## KKOGKKOG GAMES 팀원 소개

| 이름 | 강해빈                                                                                              | 김지훈                                                                                              | 여민수                                                                                              |
| :--: | :-------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
|      | <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/kkogkkogGames.png" width="150"/> | <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/kkogkkogGames.png" width="150"/> | <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/kkogkkogGames.png" width="150"/> |
| 역할 | FRONT-END                                                                                           | FRONT-END                                                                                           | FRONT-END                                                                                           |
| 담당 | ∙ 회원 관리 <br> ∙ 소비 내역 분석                                                                   | ∙ 게임 <br> ∙ 매칭 시스템                                                                           | ∙ 초기 환경 구축 <br> ∙ 커스터마이징 <br> ∙ 페이지 라우팅 <br> ∙ 푸시알림                           |

| 이름 | 강노아                                                                                              | 권민우                                                                                              | 김민석                                                                                              |
| :--: | :-------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
|      | <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/kkogkkogGames.png" width="150"/> | <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/kkogkkogGames.png" width="150"/> | <img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/kkogkkogGames.png" width="150"/> |
| 역할 | INFRA, BACK-END                                                                                     | 팀장, BACK-END                                                                                      | BACK-END                                                                                            |
| 담당 | ∙ 서버 구축 <br> ∙ 계좌 <br> ∙ 랭킹 시스템                                                          | ∙ 초기 환경 구축 <br> ∙ 회원관리 <br> ∙ 푸시알림 <br> ∙ 소비 내역 분석                              | ∙ 게임 <br> ∙ 매칭 시스템 <br> ∙ 커스터마이징                                                       |

<br>

## 기술 스택 ∙ 개발 환경


<table>
<tr>
 <td align="center">프론트엔드</td>
 <td>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=React&logoColor=ffffff"/>  <img src="https://img.shields.io/badge/androidstudio-3DDC84?style=for-the-badge&logo=androidstudio&logoColor=ffffff"/> <br>

  <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=ffffff"/>  <br>

React-Native CLI: 0.72.4 <br>

ANDROID SDK & NDK VERSION <br>
└─ MIN_SDK: 26 <br>
└─ COMPILE_SDK: 34 <br>
└─ NDK_VERSION: 23.1.7779620 <br>
Virtual Device <br>
└─ Pixel 7 <br>
└─ API 33 <br>

</tr>
<tr>
 <td align="center">백엔드</td>
 <td>
  <img src="https://img.shields.io/badge/Java-orange?style=for-the-badge&logo=Java&logoColor=white"/>
  <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=ffffff"/> 
  <img src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=ffffff"/>

  <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=ffffff"/><br>
  Java 11 <br>
  └─ java OpenJDK <br>
  └─ Spring Boot <br>
  │　└─ Spring Data JPA <br>
  │　└─ Spring Data redis <br>
  │　└─ oauth2 <br>
  │　└─ JWT <br>
  │　└─ JUnit <br>
  │　└─ Lombok <br>
  │　└─ SpringDocs <br>
  └─ Gradle 8.2.1 <br>

Python 3.10 <br>
└─ Flask <br>

</tr>
<tr>
 <td align="center">서버</td>
 <td>
  <img src="https://img.shields.io/badge/ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=ffffff"/><br>
Ubuntu 20.04 <br>
Docker 24.0.5 <br>
Docker-Compose 1.25.0 <br>
Jenkins 2.414.1 <br>
</tr>
<tr>
 <td align="center">데이터베이스</td>
 <td>
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=ffffff"/><br>
  MySQL 8.0.33
  </td>
</tr>
<tr>
<tr>
 <td align="center">포맷팅</td>
 <td>
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=ffffff"/> 
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=ffffff"/> 
  </td>
</tr>
<tr>
 <td align="center">IDE</td>
 <td>
  <img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=ffffff"/> 
  <img src="https://img.shields.io/badge/intellijidea-000000?style=for-the-badge&logo=intellijidea&logoColor=ffffff"/> 
 </td>
</tr>
<tr>
 <td align="center">형상 / 이슈 관리</td>
 <td>
    <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>
    <img src="https://img.shields.io/badge/Gitlab-FC6D26?style=for-the-badge&logo=Gitlab&logoColor=white"/> 
    <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white"/>
       <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"/> 
 </td>
</tr>
<tr>
 <td align="center">UXUI</td>
 <td>
    <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"/>
 </td>
</tr>
<tr>
 <td align="center">기타</td>
 <td>
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"/>
<img src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"/>
<img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white"/>
  <img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white"/>
<img src="https://img.shields.io/badge/Mattermost-0058CC?style=for-the-badge&logo=Mattermost&logoColor=white"/> <br>
S3 2.2.6 <br>
postman 10.17.0 <br>
mattermost 7.8.6 <br>

 </td>
</tr>
</table>



<br>

## 아키텍처

<img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/architectureGudgement.png" width="1500"/>

<br>

## ERD

<img src="https://gudgement.s3.ap-northeast-2.amazonaws.com/readme/erd.jpg" width="1500"/>

<br>
