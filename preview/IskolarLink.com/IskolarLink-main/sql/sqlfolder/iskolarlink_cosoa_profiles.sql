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
-- Table structure for table `COSOA_Profiles`
--

DROP TABLE IF EXISTS `COSOA_Profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COSOA_Profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `org_name` varchar(255) NOT NULL,
  `org_picture` varchar(255) NOT NULL,
  `mission` varchar(600) NOT NULL,
  `vision` varchar(600) NOT NULL,
  `contact_number` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `social1` varchar(255) DEFAULT NULL,
  `social2` varchar(255) DEFAULT NULL,
  `social3` varchar(255) DEFAULT NULL,
  `social4` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COSOA_Profiles`
--

LOCK TABLES `COSOA_Profiles` WRITE;
/*!40000 ALTER TABLE `COSOA_Profiles` DISABLE KEYS */;
INSERT INTO `COSOA_Profiles` VALUES (1,'Commission On Student Organization and Accreditation (COSOA)','cosoa.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum tortor nulla, eu auctor lectus pretium eu. Integer ut facilisis nisl. Ut dictum nunc vel purus convallis efficitur. Phasellus eget lacus volutpat arcu volutpat tincidunt.','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum tortor nulla, eu auctor lectus pretium eu. Integer ut facilisis nisl. Ut dictum nunc vel purus convallis efficitur. Phasellus eget lacus volutpat arcu volutpat tincidunt.','09123456789','cosoa@iskolarngbayan.pup.edu.ph',NULL,NULL,NULL,NULL,'2023-11-25 03:03:22','2023-11-25 03:03:22');
/*!40000 ALTER TABLE `COSOA_Profiles` ENABLE KEYS */;
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
