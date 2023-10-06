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
-- Table structure for table `game_room`
--

DROP TABLE IF EXISTS `game_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_room` (
  `room_id` bigint NOT NULL AUTO_INCREMENT,
  `room_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=295 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_room`
--

LOCK TABLES `game_room` WRITE;
/*!40000 ALTER TABLE `game_room` DISABLE KEYS */;
INSERT INTO `game_room` VALUES (1,'4db8a2'),(2,'2b3d29'),(3,'0a821d'),(4,'0a821d'),(5,'148077'),(6,'148077'),(7,'148077'),(8,'68eb41'),(9,'68eb41'),(10,'110e91'),(11,'e1c787'),(12,'e1c787'),(13,'148077'),(14,'148077'),(15,'e1c787'),(16,'348bf3'),(17,'348bf3'),(18,'cb05c0'),(19,'cb05c0'),(20,'1411db'),(21,'1411db'),(22,'38bd32'),(23,'32e7b3'),(24,'32e7b3'),(25,'3a5277'),(26,'3a5277'),(27,'ed59e1'),(28,'5399e3'),(29,'5399e3'),(30,'63db93'),(31,'139d1f'),(32,'862d52'),(33,'862d52'),(34,'a01f5c'),(35,'68c5cf'),(36,'68c5cf'),(37,'68c5cf'),(38,'68c5cf'),(39,'68c5cf'),(40,'68c5cf'),(41,'04125f'),(42,'04125f'),(43,'3f9456'),(44,'a822d3'),(45,'5e6aa3'),(46,'5e6aa3'),(47,'645c41'),(48,'e1b563'),(49,'e1b563'),(50,'e1b563'),(51,'e1b563'),(52,'e1b563'),(53,'e1b563'),(54,'e1b563'),(55,'d90b60'),(56,'bf6056'),(57,'f5a6f7'),(58,'0169e1'),(59,'6dbdb5'),(60,'a24247'),(61,'3d891f'),(62,'71ed02'),(63,'7e0c6d'),(64,'7e0c6d'),(65,'842f31'),(66,'737f7b'),(67,'5beb66'),(68,'3c4845'),(69,'cf2f86'),(70,'af4fb4'),(71,'ac9c6a'),(72,'af582c'),(73,'30afb6'),(74,'62d8a5'),(75,'e35b1d'),(76,'738205'),(77,'5d101f'),(78,'ab22e9'),(79,'5f33cc'),(80,'6c4add'),(81,'f92f32'),(82,'63945d'),(83,'e0b185'),(84,'4460df'),(85,'1afb3b'),(86,'b707a1'),(87,'0357d1'),(88,'8bdc6d'),(89,'d612f4'),(90,'acb195'),(91,'2c8b53'),(92,'32eb38'),(93,'081a89'),(94,'081a89'),(95,'081a89'),(96,'892aca'),(97,'892aca'),(98,'ce2250'),(99,'ce2250'),(100,'b77e42'),(101,'d45b93'),(102,'d45b93'),(103,'15bd94'),(104,'dc6e8a'),(105,'3bb9b2'),(106,'3bb9b2'),(107,'8f8a9e'),(108,'42142b'),(109,'8b2b68'),(110,'041b97'),(111,'50fe1b'),(112,'ef98cd'),(113,'ebf26d'),(114,'d98b0f'),(115,'9e8fee'),(116,'247c5b'),(117,'dd53f4'),(118,'300a3d'),(119,'4ea71c'),(120,'3ab90c'),(121,'8373ba'),(122,'fff960'),(123,'777cd4'),(124,'777cd4'),(125,'824e0d'),(126,'d1dc5e'),(127,'3e0d92'),(128,'3a9377'),(129,'2ccdd3'),(130,'38ffc1'),(131,'249220'),(132,'35134a'),(133,'e78108'),(134,'4b7250'),(135,'03e9a1'),(136,'728712'),(137,'670851'),(138,'79ef69'),(139,'a9314e'),(140,'0e7310'),(141,'4ac0d5'),(142,'36117b'),(143,'71ec2b'),(144,'0f8317'),(145,'15d5cf'),(146,'1f6d6c'),(147,'5d34dd'),(148,'7858fc'),(149,'a83dc4'),(150,'386990'),(151,'439dd0'),(152,'bc4a4c'),(153,'63a326'),(154,'46d0aa'),(155,'bfb42c'),(156,'cb6bc5'),(157,'b6bcd8'),(158,'107c8f'),(159,'b70b9a'),(160,'52d096'),(161,'bf6e56'),(162,'a7a22c'),(163,'288a2b'),(164,'3be3e2'),(165,'9855a1'),(166,'35c8d1'),(167,'5574c3'),(168,'da593b'),(169,'7352d2'),(170,'55fe3d'),(171,'b3e819'),(172,'1b0deb'),(173,'627ddd'),(174,'a268a7'),(175,'1d468f'),(176,'ff10bd'),(177,'938c30'),(178,'12a7d3'),(179,'e8682a'),(180,'1a63a5'),(181,'040f68'),(182,'50fb0e'),(183,'a78f4b'),(184,'42e17e'),(185,'427b94'),(186,'9756b6'),(187,'b19972'),(188,'3bce0c'),(189,'557afa'),(190,'772898'),(191,'0551bc'),(192,'2b332c'),(193,'b5ef82'),(194,'86b79e'),(195,'6e337a'),(196,'3e0867'),(197,'e6b6e3'),(198,'5a682a'),(199,'af7fbd'),(200,'46ecb0'),(201,'b902d6'),(202,'949fba'),(203,'56b12c'),(204,'de7309'),(205,'575d7c'),(206,'78b829'),(207,'62396c'),(208,'b29ab6'),(209,'8feef3'),(210,'36ab2a'),(211,'c8847d'),(212,'bdfa1e'),(213,'84ead4'),(214,'08f25c'),(215,'b19a10'),(216,'607efa'),(217,'1410ed'),(218,'294718'),(219,'155324'),(220,'38c4e1'),(221,'3da51a'),(222,'8fd623'),(223,'84a387'),(224,'539a00'),(225,'34ba03'),(226,'40a882'),(227,'788976'),(228,'8422f5'),(229,'e71d4f'),(230,'58e0f2'),(231,'ceac4f'),(232,'a1a7cb'),(233,'fc71c3'),(234,'4d79b2'),(235,'4d79b2'),(236,'4d79b2'),(237,'9d8597'),(238,'89e3c3'),(239,'06dc21'),(240,'909582'),(241,'c3dff2'),(242,'6a1da4'),(243,'64dbdb'),(244,'3969f3'),(245,'debf86'),(246,'d4bfdf'),(247,'579d32'),(248,'755617'),(249,'a6716c'),(250,'a9b529'),(251,'c852fc'),(252,'590e71'),(253,'590e71'),(254,'72227b'),(255,'c45f32'),(256,'206133'),(257,'fae5d5'),(258,'d264b5'),(259,'598099'),(260,'d307bb'),(261,'0e0fa9'),(262,'e215a7'),(263,'42b18f'),(264,'2a4056'),(265,'e92791'),(266,'68c6a5'),(267,'1b7f65'),(268,'0140a3'),(269,'37700b'),(270,'17bd12'),(271,'113f98'),(272,'198e29'),(273,'62278e'),(274,'454af5'),(275,'97b79f'),(276,'709d5b'),(277,'1419b1'),(278,'859a30'),(279,'cba0d9'),(280,'e5af82'),(281,'58b3c1'),(282,'dbabf3'),(283,'630545'),(284,'094806'),(285,'86be20'),(286,'cda2a0'),(287,'9dae9f'),(288,'9404fa'),(289,'8be8dd'),(290,'b8daa1'),(291,'552f93'),(292,'801d48'),(293,'59b186'),(294,'2e4b33');
/*!40000 ALTER TABLE `game_room` ENABLE KEYS */;
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
