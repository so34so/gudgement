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
-- Table structure for table `month_analyze`
--

DROP TABLE IF EXISTS `month_analyze`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `month_analyze` (
  `analyze_id` bigint NOT NULL AUTO_INCREMENT,
  `best_amount` bigint NOT NULL,
  `best_destination` varchar(255) NOT NULL,
  `count` int DEFAULT NULL,
  `frequency_amount` bigint NOT NULL,
  `frequency_count` int NOT NULL,
  `frequency_destination` varchar(255) NOT NULL,
  `last_month_amount` bigint NOT NULL,
  `last_month_amount_rate` double DEFAULT NULL,
  `member_id` bigint NOT NULL,
  `month` int NOT NULL,
  `ranking` double DEFAULT NULL,
  `this_month_amount` bigint NOT NULL,
  `this_month_amount_rate` double DEFAULT NULL,
  `virtual_account_id` bigint NOT NULL,
  `year` int NOT NULL,
  PRIMARY KEY (`analyze_id`)
) ENGINE=InnoDB AUTO_INCREMENT=259 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `month_analyze`
--

LOCK TABLES `month_analyze` WRITE;
/*!40000 ALTER TABLE `month_analyze` DISABLE KEYS */;
INSERT INTO `month_analyze` VALUES (82,97970,'스타벅스 코리아',2,124620,3,'(주) 우아한형제들',813210,NULL,0,9,1,588140,588.14,46,2023),(145,98390,'탐앤탐스',NULL,106580,3,'진미축산',612030,NULL,0,8,NULL,0,NULL,46,2023),(210,69000,'코코리움 범어본점',1,15000,6,'쉼터',36610,NULL,0,9,1,647677,92.53,4,2023),(215,20000,'동대문엽기떡볶이 구미인동점',NULL,9250,2,'쉼터',0,NULL,0,8,NULL,36610,NULL,4,2023),(219,75900,'카카오페이',3,75900,1,'카카오페이',588140,NULL,0,10,3,75900,75.9,46,2023),(220,88320,'쿠팡',NULL,12580,1,'씨유구미강동점',148050,NULL,0,9,NULL,224260,NULL,52,2023),(222,97250,'.',NULL,1319660,26,'.',1043750,NULL,0,9,NULL,1861290,NULL,3,2023),(223,97950,'진미축산',NULL,97950,1,'진미축산',0,NULL,0,7,NULL,251720,NULL,52,2023),(226,96610,'007마트 인동점',NULL,239790,5,'(주) 우아한형제들',1612940,NULL,0,9,NULL,1157240,NULL,58,2023),(238,27540,'007마트 인동점',4,1980,1,'진미축산',1157240,NULL,0,10,4,29520,73.8,58,2023),(239,96940,'진미축산',NULL,217590,4,'카카오페이',844280,NULL,0,8,NULL,1612940,NULL,58,2023),(245,86840,'스타벅스 코리아',NULL,69480,8,'쉼터',232220,NULL,0,9,NULL,731818,NULL,5,2023),(246,95530,'투썸플레이스 인동점',NULL,4600,2,'쉼터',474000,NULL,0,8,NULL,232220,NULL,5,2023),(250,99420,'(주) 우아한형제들',NULL,103240,2,'스타벅스 코리아',0,NULL,0,7,NULL,474000,NULL,5,2023),(253,18000,'네네치킨 임수황상점',4,18000,1,'네네치킨 임수황상점',647677,92.53,0,10,3,46830,46.83,4,2023),(256,16800,'한국맥도날드 (유)',1,4700,1,'공차 평택고덕점',731818,NULL,0,10,1,21500,2.15,5,2023),(257,81250,'강고기집 진평점',4,38330,2,'(주) 우아한형제들',1820270,NULL,0,10,4,549910,1374.78,6,2023),(258,99950,'카카오페이',NULL,214450,6,'진미축산',0,NULL,0,7,NULL,1412580,NULL,6,2023);
/*!40000 ALTER TABLE `month_analyze` ENABLE KEYS */;
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

-- Dump completed on 2023-10-06 10:59:51
