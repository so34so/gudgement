-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: database-1.cjfyk8ntjeyl.ap-northeast-2.rds.amazonaws.com    Database: gudgement
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` bigint NOT NULL,
  `age` int DEFAULT NULL,
  `create_at` datetime(6) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `email_approve` bit(1) NOT NULL,
  `exp` bigint NOT NULL,
  `firebase_token` longtext,
  `gender` int DEFAULT NULL,
  `grade` varchar(255) NOT NULL,
  `level` int NOT NULL,
  `month_overconsumption` bigint DEFAULT NULL,
  `nickname` varchar(255) NOT NULL,
  `nickname_approve` bit(1) NOT NULL,
  `pedometer` int NOT NULL DEFAULT '0',
  `refresh_token` varchar(255) DEFAULT NULL,
  `tiggle` bigint NOT NULL,
  `virtual_account_id` bigint DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (3025827319,0,'2023-10-04 15:21:09.176625','haegu@gu.com',_binary '',0,'eGSRm1bRSPGYzsmGbu3JhD:APA91bFUSn3w2lyvjbQg6ilSWPAy2_9RNIkQ4pn0y_RkDbXA47KpJvrHgUXT8BFqe2V3vgJWdUvNicj7aRkJxmznoc3RFBtgeGvEYJzVSfb8_E6x4ZZLq46813y7DAH9tS4hvrdj_NZ7',0,'ROLE_USER',1,100000,'햐구우',_binary '',0,'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MzAyNTgyNzMxOSwiZW1haWwiOiJHdWRnZW1lbnQiLCJleHAiOjE3MDE3MTA2MzAsImlhdCI6MTY5NjUyNjYzMH0.5xp3S88ywXpcUHGRjX5LQCB71lecGZT0CBhgqUtcxqs',500,52),(3027166249,0,'2023-10-03 20:43:42.445722','kwmw0427@naver.com',_binary '',5,NULL,0,'ROLE_SILVER',3,30000,'건미누',_binary '',0,'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MzAyNzE2NjI0OSwiZW1haWwiOiJHdWRnZW1lbnQiLCJleHAiOjE3MDE1NjYxNzQsImlhdCI6MTY5NjM4MjE3NH0.8e0oVGQ6GNLmNEiiZccMt5covphqab0lyi0oD3iMT7A',9999400,3),(3029231130,0,'2023-10-05 21:45:16.268886','yms1789@naver.com',_binary '',0,'fFE5XIL_RvefPIopjim9by:APA91bHnZ39LjQphNoPW7RAL5ghsu-mYzPABs87aL80Ww1cw4-QemUHXY-u-1Xhb2ZaDfnJMPhSoSmfSmwFsi-S0fhZe38t7elsDeODs3vf3fyat0z3emUhpMGbbG2Le0i8PeyrRi1Vl',0,'ROLE_SILVER',1,40000,'aaaa',_binary '',0,'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MzAyOTIzMTEzMCwiZW1haWwiOiJHdWRnZW1lbnQiLCJleHAiOjE3MDE3MzczNDYsImlhdCI6MTY5NjU1MzM0Nn0.8fpstN9fSlwNfjPwb5Cwsadm0-7R5GA21LfBw28iUio',430,6),(3032257068,0,'2023-10-03 01:33:38.376555','hotchapa@naver.com',_binary '',13,'f5me9HdMQY-CvSXeUn4Dot:APA91bFeRbj5wt9KQU3qOo9dQ0k10X8e8GYOqWlwpnB02X5N3_rkqo-MhP76Jm0vxUzDKfGT7GCGq1iqCvuZrWFD2uhzrBihpfhGzhWvC7mBL7sLjdy-_smFEsB380tHEXuXs5hHc5Xh',0,'ROLE_GOLD',4,100000,'KII',_binary '',0,'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MzAzMjI1NzA2OCwiZW1haWwiOiJHdWRnZW1lbnQiLCJleHAiOjE3MDE3Mzk2OTUsImlhdCI6MTY5NjU1NTY5NX0.Gs3yc4P-QkUshzOG8xwR0jTKShU3ES_miOpuSY1wx_w',1692,4),(3037833878,0,'2023-10-04 13:47:30.773696','no_ahsark@nate.com',_binary '\0',0,NULL,0,'ROLE_USER',1,NULL,'노아',_binary '\0',0,'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MzAzNzgzMzg3OCwiZW1haWwiOiJHdWRnZW1lbnQiLCJleHAiOjE3MDE1ODkyMjIsImlhdCI6MTY5NjQwNTIyMn0.o7E_PGHiGVSaK6cRfrQWWz5JsjJEm6Hpn-IXSQfW278',500,NULL),(3038083026,0,'2023-10-05 14:08:08.388321','koo3435@gmail.com',_binary '',6,'e4bR9HmRS6S4hY2QiLSUFl:APA91bHLxpHdmv3egragBnrywk9jzm16-V6dD1bxNz_5y_JIxznagMkQNEwR4P-E3mu-Fa7wLJd95868J91p3GOyXlmd2xjvjZmmxc6GIhGUZOWFS_5CyCn6amYZrl4gdFGQxLpJuQ7Q',0,'ROLE_GOLD',3,1000000,'so34so',_binary '',0,'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MzAzODA4MzAyNiwiZW1haWwiOiJHdWRnZW1lbnQiLCJleHAiOjE3MDE3NDEyNzcsImlhdCI6MTY5NjU1NzI3N30.vg00VeSV5jjZRvV9IXKjHcfDfXwFrx7zmhFI-O2XKiA',1642,5),(3050099506,0,'2023-10-04 22:29:29.156631','Gudgement',_binary '\0',0,NULL,0,'ROLE_USER',1,NULL,'거지먼트',_binary '\0',0,'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MzA1MDA5OTUwNiwiZW1haWwiOiJHdWRnZW1lbnQiLCJleHAiOjE3MDE2NTY4MDMsImlhdCI6MTY5NjQ3MjgwM30.DzBq1rmEeTiTihsM1Jc9WbROzct2xWdGhDIxtCjoBfs',500,NULL);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-06 10:59:49
