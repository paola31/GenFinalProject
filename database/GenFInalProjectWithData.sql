-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: GenFinalProject
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `GenFinalProject`
--

/*!40000 DROP DATABASE IF EXISTS `GenFinalProject`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `GenFinalProject` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `GenFinalProject`;

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categories`
--

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` (`id`, `name`, `description`) VALUES (1,'Botellas y Termos','Productos reutilizables para bebidas'),(2,'Higiene Personal','Alternativas ecológicas para el cuidado personal'),(3,'Hogar Ecológico','Productos sostenibles para el hogar'),(4,'Energía Renovable','Soluciones de energía limpia'),(5,'Limpieza Ecológica','Productos de limpieza biodegradables'),(6,'Accesorios Reutilizables','Alternativas ecológicas a productos desechables');
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OrderProducts`
--

DROP TABLE IF EXISTS `OrderProducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OrderProducts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `OrderProducts_FK` (`order_id`),
  KEY `OrderProducts_FK_1` (`product_id`),
  CONSTRAINT `OrderProducts_FK` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`id`),
  CONSTRAINT `OrderProducts_FK_1` FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OrderProducts`
--

LOCK TABLES `OrderProducts` WRITE;
/*!40000 ALTER TABLE `OrderProducts` DISABLE KEYS */;
INSERT INTO `OrderProducts` (`id`, `order_id`, `product_id`, `quantity`) VALUES (106,1,19,3),(107,1,16,1),(108,2,17,2),(109,2,18,4),(110,3,19,5),(111,3,20,2),(112,4,21,1),(113,4,22,3),(114,5,23,2),(115,5,24,1),(116,21,25,4),(117,26,26,3),(118,27,27,5),(119,28,28,1),(120,38,29,2);
/*!40000 ALTER TABLE `OrderProducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_date` datetime NOT NULL,
  `state` varchar(100) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Orders_FK` (`user_id`),
  CONSTRAINT `Orders_FK` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` (`id`, `purchase_date`, `state`, `total`, `user_id`) VALUES (1,'2024-02-14 10:30:00','Completado',45.99,1),(2,'2024-02-13 15:45:00','Pendiente',120.00,2),(3,'2024-02-12 08:20:00','Completado',19.99,3),(4,'2024-02-11 18:10:00','Cancelado',8.75,4),(5,'2024-02-10 12:05:00','Completado',35.00,5),(21,'2024-02-01 10:30:00','pending',150.50,1),(22,'2024-02-02 11:45:00','completed',230.99,2),(23,'2024-02-03 14:15:00','shipped',75.25,3),(24,'2024-02-04 09:10:00','pending',110.00,4),(25,'2024-02-05 16:20:00','cancelled',55.75,5),(26,'2024-02-06 12:30:00','processing',89.99,1),(27,'2024-02-07 18:40:00','completed',200.00,2),(28,'2024-02-08 07:55:00','pending',132.40,3),(29,'2024-02-09 15:05:00','shipped',98.70,4),(30,'2024-02-10 20:25:00','cancelled',47.60,5),(31,'2024-02-11 13:35:00','processing',125.80,1),(32,'2024-02-12 17:45:00','completed',185.30,2),(33,'2024-02-13 08:50:00','pending',210.90,3),(34,'2024-02-14 19:15:00','shipped',95.00,4),(35,'2024-02-15 22:05:00','processing',170.25,5),(36,'2024-02-01 10:30:00','pending',150.50,1),(37,'2024-02-02 11:45:00','completed',230.99,2),(38,'2024-02-03 14:15:00','shipped',75.25,3),(39,'2024-02-04 09:10:00','pending',110.00,4),(40,'2024-02-05 16:20:00','cancelled',55.75,5),(41,'2024-02-06 12:30:00','processing',89.99,1),(42,'2024-02-07 18:40:00','completed',200.00,2),(43,'2024-02-08 07:55:00','pending',132.40,3),(44,'2024-02-09 15:05:00','shipped',98.70,4),(45,'2024-02-10 20:25:00','cancelled',47.60,5),(46,'2024-02-11 13:35:00','processing',125.80,1),(47,'2024-02-12 17:45:00','completed',185.30,2),(48,'2024-02-13 08:50:00','pending',210.90,3),(49,'2024-02-14 19:15:00','shipped',95.00,4),(50,'2024-02-15 22:05:00','processing',170.25,5);
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Products_FK` (`category_id`),
  CONSTRAINT `Products_FK` FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` (`id`, `name`, `quantity`, `price`, `description`, `image`, `category_id`) VALUES (16,'Botella de acero inoxidable',50,15.99,'Botella térmica de 500ml','botella.jpg',1),(17,'Termo de bambú',30,22.50,'Termo ecológico con filtro para té','termo.jpg',1),(18,'Cepillo de dientes de bambú',100,3.99,'Cepillo biodegradable con cerdas suaves','cepillo.jpg',2),(19,'Jabón artesanal ecológico',80,5.50,'Jabón natural sin químicos dañinos','jabon.jpg',2),(20,'Bolsa reutilizable de algodón',200,2.99,'Bolsa ecológica para compras','bolsa.jpg',3),(21,'Panel solar portátil',15,120.00,'Panel solar plegable para cargar dispositivos','panel.jpg',4),(22,'Batería recargable solar',25,35.00,'Batería portátil cargada con energía solar','bateria.jpg',4),(23,'Detergente biodegradable',60,8.75,'Detergente ecológico para ropa','detergente.jpg',5),(24,'Esponja vegetal',90,4.50,'Esponja natural y compostable','esponja.jpg',5),(25,'Cubertería de bambú',40,12.99,'Set de cubiertos reutilizables','cubiertos.jpg',6),(26,'Pajillas de acero inoxidable',150,6.50,'Pack de 4 pajillas con cepillo de limpieza','pajillas.jpg',6),(27,'Rasuradora reutilizable',50,19.99,'Afeitadora de acero inoxidable con hojas reemplazables','rasuradora.jpg',2),(28,'Vasos de bambú',30,9.99,'Set de 4 vasos ecológicos','vasos.jpg',3),(29,'Filtro de agua portátil',20,45.00,'Filtro ecológico para purificar agua','filtro.jpg',3),(30,'Cargador solar USB',35,25.99,'Cargador de dispositivos con energía solar','cargador.jpg',4);
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL unique,
  `phone` varchar(100) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` (`name`, `email`, `phone`, `password`, `id`) VALUES ('Juan Perez', 'juan@gmail.com', '3214567890', 'asd321', 1),('Ana Gomez','ana@gmail.com', '3112345678', 'asd321', 2),('Carlos Ruiz','carlos@gmail.com', '3145678901', 'asd321', 3),('María Lopez','maria@gmail.com', '3109876543', 'asd321', 4),('Luis Hernandez','luis@gmail.com', '3123456789', 'asd321', 5);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'GenFinalProject'
--

--
-- Dumping routines for database 'GenFinalProject'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-15  3:29:33
