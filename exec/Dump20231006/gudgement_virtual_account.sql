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
-- Table structure for table `virtual_account`
--

DROP TABLE IF EXISTS `virtual_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `virtual_account` (
  `virtual_account_id` bigint NOT NULL AUTO_INCREMENT,
  `account_holder` varchar(255) NOT NULL,
  `account_name` varchar(255) NOT NULL,
  `account_number` varchar(255) NOT NULL,
  `balance` bigint NOT NULL,
  `bank_name` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `member_id` bigint DEFAULT NULL,
  PRIMARY KEY (`virtual_account_id`),
  KEY `FK3i4j9fv15w5smwli0dxao6do5` (`member_id`),
  CONSTRAINT `FK3i4j9fv15w5smwli0dxao6do5` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `virtual_account`
--

LOCK TABLES `virtual_account` WRITE;
/*!40000 ALTER TABLE `virtual_account` DISABLE KEYS */;
INSERT INTO `virtual_account` VALUES (1,'강노아','신자유_YoungPlus통장','196-13-117376',90000,'대구은행','no_ahsark@nate.com',NULL),(2,'강해빈','우리 SUPER 통장','1002-634-896619',672238,'우리은행','aubrienid@naver.com',NULL),(3,'권민우','듀얼 K 입출금통장','100-128-350080',187308,'케이뱅크','kwmw0427@naver.com',NULL),(4,'김지훈','카카오뱅크 입출금통장','3333-06-5356120',375068,'카카오뱅크','hotchapa@naver.com',NULL),(5,'김민석','쏠편한 입출금통장','110472692004',500000,'신한은행','koo3435@gmail.com',NULL),(6,'여민수','토스뱅크 통장','100001143086',727067,'토스뱅크','yms1789@naver.com',NULL),(7,'해구','카카오뱅크 연동정기','13-13558-5469-4',9894000,'카카오뱅크','haegu@haegu.com',NULL),(8,'해구','카카오뱅크 타임디파짓','940311-556-4511-01',1446000,'카카오뱅크','haegu@haegu.com',NULL),(9,'해구','GJ My Car 자동차 대출','78-5543-45788-4',2291500,'광주은행','haegu@haegu.com',NULL),(10,'해구','Liiv M 적금','171-4450-4579-6',2069600,'국민은행','haegu@haegu.com',NULL),(11,'haegu','GJ My Car 자동차 대출','940311-556-4511-01',5428000,'광주은행','hae@gu.com',NULL),(12,'haegu','하나원큐 체크카드 자동적금','113-4445978-85',3773300,'하나은행','hae@gu.com',NULL),(13,'해구','e-스마트 적금','6-4555-11264-563-5',9159200,'경남은행','hae@gsu.com',NULL),(14,'해구','e-스마트 적금','4-7778-2456-21',6153700,'대구은행','hae@gsu.com',NULL),(15,'해구','IBK 기업청약','171-4450-4579-6',1651800,'기업은행','hae@gsu.com',NULL),(16,'해구','K-easy 스맛 폰 예적립식','508-117-4525-6',2516700,'국민은행','hae@gsu.com',NULL),(17,'해구우','S클래스 VIP 저축예금','4-7778-2456-21',9932000,'신한은행','hae@hae.com',NULL),(18,'해구우','NH 온라인 정기예금','940311-556-4511-01',8750400,'농협은행','hae@hae.com',NULL),(19,'해구우','Happy 청년 정기예금','113-4445978-85',622900,'경남은행','hae@hae.com',NULL),(20,'aaaa','카카오뱅크 자유적립식','78-5543-45788-4',6457000,'카카오뱅크','aaaa@naver.com',NULL),(21,'aaaa','NH 희망 적금','508-124-17535-52',1448000,'농협은행','aaaa@naver.com',NULL),(22,'aaaa','i-SC모아저축','6-4555-11264-563-5',6069400,'S&C제일은행','aaaa@naver.com',NULL),(23,'aaaa','IBK e-정당','508-117-4525-6',1570400,'기업은행','aaaa@naver.com',NULL),(24,'여민수','KB Star 정기','508-117-4525-6',7863700,'국민은행','aaaa@naver.com',NULL),(25,'여민수','Happy 청년 정기예금','6-4555-11264-563-5',9739300,'경남은행','aaaa@naver.com',NULL),(26,'여민수','GJ My Car 자동차 대출','508-124-17535-52',490200,'광주은행','aaaa@naver.com',NULL),(27,'여민수','Happy 청년 정기예금','13-13558-5469-4',8536700,'대구은행','aaaaa@naver.com',NULL),(28,'여민수','e-스마트 적금','6-4555-11264-563-5',2538300,'대구은행','aaaaa@naver.com',NULL),(29,'여민수','Woori Smart 주거래','940302-00-024486',4577100,'우리은행','aaaaa@naver.com',NULL),(30,'권민우','IBK e-정당','940302-00-024486',8684900,'기업은행','kwmw0427@naver.com',NULL),(31,'권민우','GJ My Car 자동차 대출','1977-88520-5543-054',8969400,'광주은행','kwmw0427@naver.com',NULL),(32,'권민우','SC 청년 Dream 적금','113-4445978-85',5873200,'S&C제일은행','kwmw0427@naver.com',NULL),(33,'권민우','GJ My Car 자동차 대출','508-124-17535-52',1445900,'광주은행','kwmw0427@naver.com',NULL),(34,'권민우','GJ My Car 자동차 대출','113-4445978-85',6493900,'광주은행','kwmw0427@naver.com',NULL),(35,'권민우','Liiv M 적금','6-4555-11264-563-5',1918500,'국민은행','kwmw0427@naver.com',NULL),(36,'권민우','S클래스 VIP 저축예금','171-4450-4579-6',2490100,'신한은행','kwmw0427@naver.com',NULL),(37,'권민우','Happy 청년 정기예금','78-5543-45788-4',9303300,'경남은행','kwmw0427@naver.com',NULL),(38,'권민우','K-easy 스맛 폰 예적립식','1977-88520-5543-054',4086500,'국민은행','kwmw0427@naver.com',NULL),(39,'권민우','카카오뱅크 타임디파짓','4-7778-2456-21',9154100,'카카오뱅크','kwmw0427@naver.com',NULL),(40,'권민우','NH 온라인 정기예금','78-5543-45788-4',9809800,'농협은행','kwmw0427@naver.com',NULL),(41,'권민우','Happy 청년 정기예금','6-4555-11264-563-5',236000,'경남은행','kwmw0427@naver.com',NULL),(42,'권민우','하나원큐 체크카드 자동적금','508-117-4525-6',8962800,'하나은행','kwmw0427@naver.com',NULL),(43,'해구','Woori Smart 주거래','940302-00-024486',3529600,'우리은행','hae@gu.com',NULL),(44,'강 해','We 첫 직장인 첫 계좌','940311-556-4511-01',1266200,'우리은행','haegu@haegu.com',NULL),(45,'해구','GJ My Car 자동차 대출','171-4450-4579-6',2243100,'광주은행','haegu@gu.com',NULL),(46,'해구','카카오뱅크 자유적립식','113-4445978-85',5114000,'카카오뱅크','haegu@gu.com',NULL),(47,'해구','Happy 청년 정기예금','13-13558-5469-4',5255400,'경남은행','haegu@gu.com',NULL),(48,'해구우','KB Star 정기','508-124-17535-52',2573000,'국민은행','hae@gu.com',NULL),(49,'해구우','S클래스 VIP 저축예금','4-7778-2456-21',9124700,'신한은행','hae@gu.com',NULL),(50,'해구우','하나원큐 체크카드 자동적금','171-4450-4579-6',7158500,'하나은행','hae@gu.com',NULL),(51,'해구우','NH 스마일 저축보험','78-5543-45788-4',2716700,'농협은행','hae@gu.com',NULL),(52,'해구','Happy 청년 정기예금','78-5543-45788-4',5567500,'대구은행','haegu@gu.com',NULL),(53,'해구','Happy 청년 정기예금','113-4445978-85',3836800,'경남은행','haegu@gu.com',NULL),(54,'해구','Liiv M 적금','4-7778-2456-21',9477300,'국민은행','haegu@gu.com',NULL),(55,'해구','카카오뱅크 연동정기','508-117-4525-6',8545900,'카카오뱅크','haegu@gu.com',NULL),(56,'여민수','Woori Smart 주거래','13-13558-5469-4',4730600,'우리은행','yms1789@naver.com',NULL),(57,'여민수','IBK 기업청약','508-124-17535-52',5597500,'기업은행','yms1789@naver.com',NULL),(58,'여민수','Happy 청년 정기예금','508-117-4525-6',8888400,'경남은행','yms1789@naver.com',NULL),(59,'여민수','Woori Smart 주거래','6-4555-11264-563-5',7752800,'우리은행','yms1789@naver.com',NULL),(60,'여민수','Happy 청년 정기예금','6-4555-11264-563-5',4413600,'경남은행','yms1789@naver.com',NULL),(61,'여민수','아이사랑 적립식 보험','940302-00-024486',1980900,'하나은행','yms1789@naver.com',NULL),(62,'김민석','Happy 청년 정기예금','13-13558-5469-4',1929100,'대구은행','koo3435@gmail.com',NULL),(63,'김민석','e-스마트 적금','1977-88520-5543-054',5700600,'대구은행','koo3435@gmail.com',NULL),(64,'김민석','IBK 기업청약','940311-556-4511-01',7499000,'기업은행','koo3435@gmail.com',NULL),(65,'김민석','Happy 청년 정기예금','940302-00-024486',2220000,'대구은행','koo3435@gmail.com',NULL),(66,'여민수','카카오뱅크 자유적립식','78-5543-45788-4',5369700,'카카오뱅크','yms1789@naver.com',NULL),(67,'여민수','카카오뱅크 연동정기','1977-88520-5543-054',8752100,'카카오뱅크','yms1789@naver.com',NULL),(68,'여민수','카카오뱅크 타임디파짓','940311-556-4511-01',1643100,'카카오뱅크','yms1789@naver.com',NULL),(69,'여민수','e-스마트 적금','13-13558-5469-4',4476600,'경남은행','yms1789@naver.com',NULL),(70,'여민수','i-SC모아저축','940311-556-4511-01',2268800,'S&C제일은행','yms1789@naver.com',NULL),(71,'여민수','GJ 에듀 샘이벤트','508-117-4525-6',6194700,'광주은행','yms1789@naver.com',NULL),(72,'여민수','GJ 에듀 샘이벤트','6-4555-11264-563-5',8407300,'광주은행','yms1789@naver.com',NULL),(73,'여민수','GJ 에듀 샘이벤트','4-7778-2456-21',9985000,'광주은행','yms1789@naver.com',NULL),(74,'여민수','K-easy 스맛 폰 예적립식','171-4450-4579-6',40200,'국민은행','yms1789@naver.com',NULL),(75,'여민수','Happy 청년 정기예금','78-5543-45788-4',4048500,'경남은행','yms1789@naver.com',NULL),(76,'여민수','Happy 청년 정기예금','940311-556-4511-01',2172400,'경남은행','yms1789@naver.com',NULL),(77,'여민수','Happy 청년 정기예금','6-4555-11264-563-5',2560800,'대구은행','yms1789@naver.com',NULL),(78,'여민수','GJ My Car 자동차 대출','508-124-17535-52',1213100,'광주은행','yms1789@naver.com',NULL),(79,'여민수','IBK 기업청약','113-4445978-85',1375900,'기업은행','yms1789@naver.com',NULL),(80,'여민수','NH 스마일 저축보험','4-7778-2456-21',2702700,'농협은행','yms1789@naver.com',NULL),(81,'여민수','Happy 청년 정기예금','940302-00-024486',7707000,'경남은행','yms1789@naver.com',NULL),(82,'여민수','아이사랑 적립식 보험','940311-556-4511-01',5688600,'하나은행','yms1789@naver.com',NULL),(83,'여민수','Happy 청년 정기예금','940302-00-024486',5981400,'경남은행','yms1789@naver.com',NULL),(84,'여민수','SC Dream 정기','13-13558-5469-4',3567500,'S&C제일은행','yms1789@naver.com',NULL);
/*!40000 ALTER TABLE `virtual_account` ENABLE KEYS */;
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

-- Dump completed on 2023-10-06 10:59:46
