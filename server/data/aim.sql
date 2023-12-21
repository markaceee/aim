CREATE DATABASE  IF NOT EXISTS `aim` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `aim`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: aim
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `user_authentication`
--

DROP TABLE IF EXISTS `user_authentication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_authentication` (
  `user_id` int NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  KEY `u_auth_id_idx` (`user_id`),
  CONSTRAINT `u_auth_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_authentication`
--

LOCK TABLES `user_authentication` WRITE;
/*!40000 ALTER TABLE `user_authentication` DISABLE KEYS */;
INSERT INTO `user_authentication` VALUES (8,'$2a$10$saYktC/xPJdb428SY7JOp.0HagTy8klrU5IXUVLJl3bsHkChexwjC'),(9,'$2a$10$nhaZ3Kt5iwPibGgzWupuFeBFyh.7r0/pbujuuPn092d1dMhMtztd.'),(10,'$2a$10$BQp/R3DPCXvmF7kdkUgZMOKT43fXind3xVw2JGGiEsz2lBlUnZRSO'),(12,'$2a$10$W/zO27uMcWesm.dNMtd1Bevkf1qLdU21jDz0ffjkK10uiyHZzAU76');
/*!40000 ALTER TABLE `user_authentication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_details`
--

DROP TABLE IF EXISTS `user_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_details` (
  `user_id` int NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `middle_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `gender` enum('MALE','FEMALE') DEFAULT NULL,
  KEY `u_details_id_idx` (`user_id`),
  CONSTRAINT `u_details_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_details`
--

LOCK TABLES `user_details` WRITE;
/*!40000 ALTER TABLE `user_details` DISABLE KEYS */;
INSERT INTO `user_details` VALUES (8,'mark','m','mark','2023-11-15','address','MALE'),(9,'mark','m','mark','2023-11-15','address','MALE'),(10,'mark','m','mark','2023-11-15','address','MALE'),(12,'test','t','test','2023-11-15','address','MALE');
/*!40000 ALTER TABLE `user_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `skype_id` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `picture` BLOB DEFAULT NULL,
  `payment_mode` varchar(45) DEFAULT NULL,
  `areas_for_improvement` varchar(45) DEFAULT NULL,
  `role` enum('ADMIN','STUDENT','INSTRUCTOR') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

ALTER TABLE users MODIFY COLUMN picture BLOB;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (8,'32','mark@gmail.com','','','','ADMIN'),(9,'1','mark1@gmail.com','','','','ADMIN'),(10,'3','mark2@gmail.com','','','','ADMIN'),(12,NULL,'test@gmail.com','',NULL,'','ADMIN');
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

-- Dump completed on 2023-11-16 12:50:55
