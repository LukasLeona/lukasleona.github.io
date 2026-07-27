-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: iskolarlink
-- ------------------------------------------------------
-- Server version	8.0.35

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

--
-- Table structure for table `COSOA_ANNs`
--

DROP TABLE IF EXISTS `COSOA_ANNs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COSOA_ANNs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cosoa_ann_photo` varchar(255) DEFAULT NULL,
  `cosoa_ann_title` varchar(255) NOT NULL,
  `cosoa_ann_link` varchar(255) NOT NULL,
  `cosoa_ann_body` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COSOA_ANNs`
--

LOCK TABLES `COSOA_ANNs` WRITE;
/*!40000 ALTER TABLE `COSOA_ANNs` DISABLE KEYS */;
INSERT INTO `COSOA_ANNs` VALUES (1,'cosoa_ann_sample.png','This is the title','This is the subtitle','This is the body. Loren Ipsum','2023-09-12 18:17:05','2023-09-12 18:17:05'),(2,'cosoa_ann_sample.png','This is the title 2','This is the subtitle 2','This is the body. Loren Ipsum 2','2023-09-12 18:21:30','2023-09-12 18:21:30'),(3,'cosoa_ann_sample.png','This is the title 3','This is the subtitle 3','This is the body. Loren Ipsum 3','2023-09-12 18:21:40','2023-09-12 18:21:40'),(4,'cosoa_ann_sample.png','This is the title 4','This is the subtitle 4','This is the body. Loren Ipsum 4','2023-09-12 18:22:33','2023-09-12 18:22:33');
/*!40000 ALTER TABLE `COSOA_ANNs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-28 18:43:34
