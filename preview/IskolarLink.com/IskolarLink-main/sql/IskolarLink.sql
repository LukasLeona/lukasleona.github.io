CREATE DATABASE  IF NOT EXISTS `iskolarlink` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `iskolarlink`;
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
-- Table structure for table `advisers`
--

DROP TABLE IF EXISTS `advisers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `advisers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orgId` int NOT NULL,
  `adviser_name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orgId` (`orgId`),
  CONSTRAINT `advisers_ibfk_1` FOREIGN KEY (`orgId`) REFERENCES `organizations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advisers`
--

LOCK TABLES `advisers` WRITE;
/*!40000 ALTER TABLE `advisers` DISABLE KEYS */;
INSERT INTO `advisers` VALUES (60,28,'John Doe','2023-11-17 02:21:18','2023-11-17 02:21:18'),(61,28,' Jane Doe','2023-11-17 02:21:18','2023-11-17 02:21:18');
/*!40000 ALTER TABLE `advisers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `application_periods`
--

DROP TABLE IF EXISTS `application_periods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application_periods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `application_period` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application_periods`
--

LOCK TABLES `application_periods` WRITE;
/*!40000 ALTER TABLE `application_periods` DISABLE KEYS */;
INSERT INTO `application_periods` VALUES (1,1,'2023-10-13 01:17:12','2023-11-06 07:27:56');
/*!40000 ALTER TABLE `application_periods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cosoa_anns`
--

DROP TABLE IF EXISTS `cosoa_anns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cosoa_anns` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cosoa_ann_photo` varchar(255) DEFAULT NULL,
  `cosoa_ann_title` varchar(255) NOT NULL,
  `cosoa_ann_link` varchar(255) NOT NULL,
  `cosoa_ann_body` varchar(1300) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cosoa_anns`
--

LOCK TABLES `cosoa_anns` WRITE;
/*!40000 ALTER TABLE `cosoa_anns` DISABLE KEYS */;
INSERT INTO `cosoa_anns` VALUES (6,'cosoa_ann_sample.png','Testing 8','https://web.facebook.com/nanalis.09','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod nisi nisl, et ultricies justo rhoncus a. Nunc porta metus leo, sed blandit metus ultricies ut. Mauris feugiat sodales ipsum ut iaculis. Sed a dolor sed sem condimentum tincidunt. Phasellus fringilla, ante eu commodo vehicula, mauris augue mattis sapien, et rutrum erat leo non erat. Vestibulum et elit vitae orci efficitur iaculis. Morbi mattis lacus sit amet risus facilisis fermentum. Suspendisse quis ex in nibh euismod egestas a sit amet dui. Nullam efficitur libero at dignissim ultricies. Maecenas commodo ligula sit amet luctus hendrerit. Nullam non facilisis dolor, quis ornare sapien. Nullam lacus dolor, porta sit amet nulla et, bibendum hendrerit turpis. Aliquam eu volutpat urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.','2023-11-18 15:19:51','2023-11-18 15:19:51'),(7,'cosoa_ann_sample.png','Testing 9','https://web.facebook.com/nanalis.09','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod nisi nisl, et ultricies justo rhoncus a. Nunc porta metus leo, sed blandit metus ultricies ut. Mauris feugiat sodales ipsum ut iaculis. Sed a dolor sed sem condimentum tincidunt. Phasellus fringilla, ante eu commodo vehicula, mauris augue mattis sapien, et rutrum erat leo non erat. Vestibulum et elit vitae orci efficitur iaculis. Morbi mattis lacus sit amet risus facilisis fermentum. Suspendisse quis ex in nibh euismod egestas a sit amet dui. Nullam efficitur libero at dignissim ultricies. Maecenas commodo ligula sit amet luctus hendrerit. Nullam non facilisis dolor, quis ornare sapien. Nullam lacus dolor, porta sit amet nulla et, bibendum hendrerit turpis. Aliquam eu volutpat urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.','2023-11-18 15:19:58','2023-11-18 15:19:58'),(8,'cosoa_ann_sample.png','Testing 10','https://web.facebook.com/nanalis.09','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod nisi nisl, et ultricies justo rhoncus a. Nunc porta metus leo, sed blandit metus ultricies ut. Mauris feugiat sodales ipsum ut iaculis. Sed a dolor sed sem condimentum tincidunt. Phasellus fringilla, ante eu commodo vehicula, mauris augue mattis sapien, et rutrum erat leo non erat. Vestibulum et elit vitae orci efficitur iaculis. Morbi mattis lacus sit amet risus facilisis fermentum. Suspendisse quis ex in nibh euismod egestas a sit amet dui. Nullam efficitur libero at dignissim ultricies. Maecenas commodo ligula sit amet luctus hendrerit. Nullam non facilisis dolor, quis ornare sapien. Nullam lacus dolor, porta sit amet nulla et, bibendum hendrerit turpis. Aliquam eu volutpat urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.','2023-11-18 15:20:04','2023-11-18 15:20:04'),(9,'cosoa_ann_sample.png','Testing 11','https://www.facebook.com/','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod nisi nisl, et ultricies justo rhoncus a. Nunc porta metus leo, sed blandit metus ultricies ut. Mauris feugiat sodales ipsum ut iaculis. Sed a dolor sed sem condimentum tincidunt. Phasellus fringilla, ante eu commodo vehicula, mauris augue mattis sapien, et rutrum erat leo non erat. Vestibulum et elit vitae orci efficitur iaculis. Morbi mattis lacus sit amet risus facilisis fermentum. Suspendisse quis ex in nibh euismod egestas a sit amet dui. Nullam efficitur libero at dignissim ultricies. Maecenas commodo ligula sit amet luctus hendrerit. Nullam non facilisis dolor, quis ornare sapien. Nullam lacus dolor, porta sit amet nulla et, bibendum hendrerit turpis. Aliquam eu volutpat urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.','2023-11-19 13:33:48','2023-11-19 13:33:48');
/*!40000 ALTER TABLE `cosoa_anns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cosoa_events`
--

DROP TABLE IF EXISTS `cosoa_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cosoa_events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `link` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cosoa_events`
--

LOCK TABLES `cosoa_events` WRITE;
/*!40000 ALTER TABLE `cosoa_events` DISABLE KEYS */;
INSERT INTO `cosoa_events` VALUES (1,'Testing 1','2023-11-21 00:00:00','Testing 1','Testing 1','2023-11-19 17:25:12','2023-11-19 17:25:12'),(2,'Testing 2','2023-11-23 00:00:00','Testing 2','Testing 2','2023-11-19 17:31:54','2023-11-19 17:31:54'),(3,'Testing 3','2023-12-22 00:00:00','Testing 3','Testing 3','2023-11-19 18:25:43','2023-11-19 18:25:43');
/*!40000 ALTER TABLE `cosoa_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cosoa_members`
--

DROP TABLE IF EXISTS `cosoa_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cosoa_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `position` varchar(255) NOT NULL,
  `studentId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  CONSTRAINT `cosoa_members_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cosoa_members`
--

LOCK TABLES `cosoa_members` WRITE;
/*!40000 ALTER TABLE `cosoa_members` DISABLE KEYS */;
INSERT INTO `cosoa_members` VALUES (1,'Chairperson',1,'2023-10-14 16:27:35','2023-10-14 16:27:35'),(3,'General Staff',3,'2023-10-14 16:47:27','2023-10-14 16:47:27'),(4,'Document Management',4,'2023-10-14 16:48:09','2023-10-14 16:48:09');
/*!40000 ALTER TABLE `cosoa_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cosoa_profiles`
--

DROP TABLE IF EXISTS `cosoa_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cosoa_profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `org_name` varchar(255) NOT NULL,
  `org_picture` varchar(255) NOT NULL,
  `mission` varchar(1500) NOT NULL,
  `vision` varchar(1500) NOT NULL,
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
-- Dumping data for table `cosoa_profiles`
--

LOCK TABLES `cosoa_profiles` WRITE;
/*!40000 ALTER TABLE `cosoa_profiles` DISABLE KEYS */;
INSERT INTO `cosoa_profiles` VALUES (1,'Commission on Student Organizations and Accreditation (COSOA)','cosoa.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.','09123456789','pupcosoa@pup.edu.ph',NULL,NULL,NULL,NULL,'2023-11-17 04:47:21','2023-11-17 19:41:39');
/*!40000 ALTER TABLE `cosoa_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memberships`
--

DROP TABLE IF EXISTS `memberships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memberships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orgId` int NOT NULL,
  `studentId` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orgId` (`orgId`),
  KEY `studentId` (`studentId`),
  CONSTRAINT `memberships_ibfk_1` FOREIGN KEY (`orgId`) REFERENCES `organizations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `memberships_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memberships`
--

LOCK TABLES `memberships` WRITE;
/*!40000 ALTER TABLE `memberships` DISABLE KEYS */;
INSERT INTO `memberships` VALUES (3,28,1,'Accepted','2023-11-17 02:21:18','2023-11-17 08:02:41');
/*!40000 ALTER TABLE `memberships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `org_applications`
--

DROP TABLE IF EXISTS `org_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `org_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cosoaId` int DEFAULT NULL,
  `studentId` int DEFAULT NULL,
  `orgId` int NOT NULL,
  `application_status` varchar(255) NOT NULL,
  `feedback` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cosoaId` (`cosoaId`),
  KEY `studentId` (`studentId`),
  KEY `orgId` (`orgId`),
  CONSTRAINT `org_applications_ibfk_1` FOREIGN KEY (`cosoaId`) REFERENCES `cosoa_members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `org_applications_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `org_applications_ibfk_3` FOREIGN KEY (`orgId`) REFERENCES `organizations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `org_applications`
--

LOCK TABLES `org_applications` WRITE;
/*!40000 ALTER TABLE `org_applications` DISABLE KEYS */;
INSERT INTO `org_applications` VALUES (105,NULL,1,28,'Pending',NULL,'2023-11-17 02:21:18','2023-11-17 02:21:18'),(108,1,1,28,'IE1','Revision','2023-11-17 03:02:46','2023-11-17 03:02:46'),(109,1,1,28,'IE1','Revision Complete','2023-11-17 03:04:51','2023-11-17 03:04:51'),(111,1,1,28,'IE2',NULL,'2023-11-17 03:30:29','2023-11-17 03:30:29'),(112,1,1,28,'IE2','Revision','2023-11-17 03:36:18','2023-11-17 03:36:18'),(113,1,1,28,'IE2','Revision Complete','2023-11-17 04:09:59','2023-11-17 04:09:59'),(114,1,1,28,'FE1',NULL,'2023-11-17 07:45:10','2023-11-17 07:45:10'),(115,1,1,28,'FE1','Revision','2023-11-17 07:49:18','2023-11-17 07:49:18'),(116,1,1,28,'FE1','Revision Complete','2023-11-17 07:53:11','2023-11-17 07:53:11'),(117,1,1,28,'FE2',NULL,'2023-11-17 07:53:58','2023-11-17 07:53:58'),(118,1,1,28,'FE2','Revision','2023-11-17 07:58:41','2023-11-17 07:58:41'),(119,1,1,28,'FE2','Revision Complete','2023-11-17 08:00:56','2023-11-17 08:00:56'),(120,1,1,28,'Accredited',NULL,'2023-11-17 08:01:25','2023-11-17 08:01:25');
/*!40000 ALTER TABLE `org_applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizations`
--

DROP TABLE IF EXISTS `organizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `socn` varchar(255) DEFAULT NULL,
  `org_name` varchar(255) NOT NULL,
  `jurisdiction` varchar(255) NOT NULL,
  `subjurisdiction` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `is_accredited` tinyint(1) NOT NULL,
  `application_status` varchar(255) NOT NULL,
  `org_status` varchar(255) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `membership_period` tinyint(1) NOT NULL,
  `mission` varchar(1500) DEFAULT NULL,
  `vision` varchar(1500) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `organizations_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES (28,'2324-001-A-CCIS','The Programmers\' Guild (TPG)','Local Student Organization','College of Computer and Information Sciences | CCIS','Academic Organization',1,'Accredited','Active',NULL,0,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis maximus augue, eu faucibus magna. Aliquam nec sem sit amet augue aliquet condimentum in vel leo. Integer fringilla nisi eu maximus tincidunt. Suspendisse vel placerat eros. Maecenas id sollicitudin nisi. Aenean risus augue, posuere vel placerat quis, rutrum id lacus. Cras sagittis dictum nisi eget vehicula.','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis maximus augue, eu faucibus magna. Aliquam nec sem sit amet augue aliquet condimentum in vel leo. Integer fringilla nisi eu maximus tincidunt. Suspendisse vel placerat eros. Maecenas id sollicitudin nisi. Aenean risus augue, posuere vel placerat quis, rutrum id lacus. Cras sagittis dictum nisi eget vehicula.',29,'2023-11-17 02:21:18','2023-11-17 08:02:41');
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requirements`
--

DROP TABLE IF EXISTS `requirements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requirements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orgId` int NOT NULL,
  `requirement_name` varchar(255) NOT NULL,
  `requirement` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Pending',
  `remarks` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orgId` (`orgId`),
  CONSTRAINT `requirements_ibfk_1` FOREIGN KEY (`orgId`) REFERENCES `organizations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requirements`
--

LOCK TABLES `requirements` WRITE;
/*!40000 ALTER TABLE `requirements` DISABLE KEYS */;
INSERT INTO `requirements` VALUES (61,28,'AD001','./org_applications/accreditation/28/AD001.pdf','Approved','aerqwewqeq','2023-11-17 02:21:18','2023-11-17 07:58:37'),(62,28,'AD002','./org_applications/accreditation/28/AD002.pdf','Approved','lacks signatures','2023-11-17 02:21:18','2023-11-17 08:01:17'),(63,28,'AD003','./org_applications/accreditation/28/AD003.pdf','Approved','Lacks Signatures','2023-11-17 02:21:18','2023-11-17 08:01:19'),(64,28,'AD004','./org_applications/accreditation/28/AD004.pdf','Approved','lacks signatures','2023-11-17 02:21:18','2023-11-17 08:01:20'),(65,28,'AD005','./org_applications/accreditation/28/AD005.pdf','Approved','wqewqeqw','2023-11-17 02:21:18','2023-11-17 07:59:03'),(66,28,'AD006','./org_applications/accreditation/28/AD006.pdf','Approved',NULL,'2023-11-17 02:21:18','2023-11-17 07:59:05'),(67,28,'AD007','./org_applications/accreditation/28/AD007.pdf','Approved',NULL,'2023-11-17 02:21:18','2023-11-17 07:59:07'),(68,28,'AD008','./org_applications/accreditation/28/AD008.pdf','Approved','ewrwereweww','2023-11-17 02:21:18','2023-11-17 07:59:10'),(69,28,'AF001','./org_applications/accreditation/28/AF001.pdf','Approved','ewkwiukfewhukwdnaiqheruiqqkj','2023-11-17 02:21:18','2023-11-17 07:59:12'),(70,28,'AD009','./org_applications/accreditation/28/AD009.pdf','Approved','wqeweqweqw','2023-11-17 02:21:18','2023-11-17 07:59:11');
/*!40000 ALTER TABLE `requirements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `socials`
--

DROP TABLE IF EXISTS `socials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `socials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `facebook` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `socials_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `socials`
--

LOCK TABLES `socials` WRITE;
/*!40000 ALTER TABLE `socials` DISABLE KEYS */;
INSERT INTO `socials` VALUES (1,'https://www.facebook.com/nanalis.09',NULL,NULL,'https://www.linkedin.com/nanalis.09',1,'2023-10-28 16:13:24','2023-11-02 16:54:44');
/*!40000 ALTER TABLE `socials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_num` varchar(255) NOT NULL,
  `student_Lname` varchar(255) NOT NULL,
  `student_Fname` varchar(255) NOT NULL,
  `student_Mname` varchar(255) DEFAULT NULL,
  `student_suffix` varchar(255) DEFAULT NULL,
  `department` varchar(255) NOT NULL,
  `year_level` varchar(255) NOT NULL,
  `is_verified` tinyint(1) NOT NULL,
  `cor` varchar(255) DEFAULT NULL,
  `cor_remarks` varchar(255) DEFAULT NULL,
  `is_cosoa` tinyint(1) NOT NULL,
  `is_web_admin` tinyint(1) NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_num` (`student_num`),
  KEY `userId` (`userId`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'2020-08275-MN-0','Nanalis','Byron Stephen','Cariaso','','College of Computer and Information Sciences | CCIS','3',1,NULL,NULL,1,1,1,'2023-09-12 18:36:39','2023-10-14 16:15:41'),(3,'2020-09275-MN-0','Sarmiento','Renee Larnie','Aweqwiwqe','','CCIS','3',0,NULL,NULL,1,0,4,'2023-09-12 18:47:02','2023-09-12 18:47:02'),(4,'2020-01275-MN-0','Secima','Kimberly','Mwqiewiq','','CCIS','3',0,NULL,NULL,1,0,5,'2023-09-12 18:47:49','2023-09-12 18:47:49'),(10,'2020-12342-MN-0','Merilo','Ger Bryan','Lwkeioq','N/A','College of Communication | COC','4th Year',0,NULL,NULL,0,0,17,'2023-10-31 14:11:28','2023-11-02 14:51:07'),(11,'2020-12345-MN-0','Leona','Luke Mark','Cavite','N/A','College of Computer and Information Sciences | CCIS','4th Year',0,NULL,NULL,0,0,18,'2023-11-06 07:24:52','2023-11-06 07:24:52');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'byronstephencnanalis@iskolarngbayan.pup.edu.ph','$2b$10$7MhI8NVYHkJawD6qd3/g5.x.F19T8sDPRkQ6nEiKecNKzge/rvNvC',NULL,NULL,'student','2023-09-12 15:49:06','2023-09-12 15:49:06'),(4,'reneelarnieasarmiento@iskolarngbayan.pup.edu.ph','$2b$10$PNL/kEEgISZ5pZE1e37RNuU.38F3jrZqeO.NyNpqlSlDcnzvBhKwK',NULL,NULL,'student','2023-09-12 18:44:00','2023-09-12 18:44:00'),(5,'kimberlymsecima@iskolarngbayan.pup.edu.ph','$2b$10$Wy0Xskm8A7Hds3Ubp1hFIOleEA0tcifGrJZXwSvKS.5NIbCOhgPW6',NULL,NULL,'student','2023-09-12 18:44:22','2023-09-12 18:44:22'),(8,'alainjasonbundalian@iskolarngbayan.pup.edu.ph','$2b$10$ZQfJDSX8M3mO88.m8DJ4luWIT/oVg8dyBYVepd.g.k4U2U7CCQlVm',NULL,NULL,'student','2023-10-02 10:33:40','2023-10-02 10:33:40'),(10,'johndoe@iskolarngbayan.pup.edu.ph','$2b$10$uZjdi6fVxe.XJUHb4OAW6ufoZtelX69pYtILQfs8e1KnBZtHtGxwW',NULL,NULL,'student','2023-10-03 11:20:31','2023-10-03 11:20:31'),(12,'justinangeles@iskolarngbayan.pup.edu.ph','$2b$10$YRqAxdmdKEw0cm4IGpkqtuUvNYhJWxid4P8DLNELZmNPQNl6dwYyy',NULL,NULL,'student','2023-10-08 15:03:45','2023-10-08 15:03:45'),(17,'germerilo@iskolarngbayan.pup.edu.ph','$2b$10$IZiRDho.5j3emwcNHrHCHOHMuu3Ahq5jKnGwW/dOyqizvk5OULiZy','10.png',NULL,'student','2023-10-31 14:11:28','2023-11-02 16:10:41'),(18,'lukemarkcleona@iskolarngbayan.pup.edu.ph','$2b$10$5wV8GYR0yJ1QsCc9xvGLtOwXd2g4GpJEF7z/TrTaFdTkr4WQycW0m',NULL,NULL,'student','2023-11-06 07:24:52','2023-11-06 07:24:52'),(29,'tpgtest@iskolarngbayan.pup.edu.ph','$2b$10$KwpdQWImiLlw1qDVIjbQFeJu2aqPyBh0n1ctHdJxSVOdvWV0Y/ZNG',NULL,NULL,'organization','2023-11-17 08:02:41','2023-11-17 08:02:41');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-20 14:48:16
