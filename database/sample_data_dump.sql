/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 5.6.24-log : Database - winter_internship
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`winter_internship` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `winter_internship`;

/*Table structure for table `order_details` */

DROP TABLE IF EXISTS `order_details`;

CREATE TABLE `order_details` (
  `Order_ID` int(11) NOT NULL,
  `Customer_Name` varchar(100) DEFAULT NULL,
  `Customer_ID` int(11) DEFAULT NULL,
  `Order_Amount` int(11) DEFAULT NULL,
  `Approval_Status` varchar(100) DEFAULT NULL,
  `Approved_By` varchar(100) DEFAULT NULL,
  `Notes` varchar(1000) DEFAULT NULL,
  `Order_Date` datetime DEFAULT NULL,
  PRIMARY KEY (`Order_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `order_details` */

insert  into `order_details`(`Order_ID`,`Customer_Name`,`Customer_ID`,`Order_Amount`,`Approval_Status`,`Approved_By`,`Notes`,`Order_Date`) values 
(958208,'Permalink',958,10110,'Approved','Laura Smith','Approved on 16th November','2020-09-01 00:00:00'),
(958221,'Sysko',612,26650,'Awaiting Approval',NULL,NULL,'2020-09-19 00:00:00'),
(958245,'BrightStar Pvt Ltd',665,7180,'Rejected','David Lee','Blocked Order','2020-09-20 00:00:00'),
(958269,'CityLine',519,68572,'Awaiting Approval',NULL,NULL,'2019-12-04 00:00:00'),
(958293,'CityBank',931,98445,'Approved','Matthew Vance',NULL,'2019-10-03 00:00:00'),
(958317,'Xinex',825,8780,'Approved','David Lee','Order Approved','2019-12-06 00:00:00'),
(958318,'HP',984,51074,'Rejected','Matthew Vance',NULL,'2019-10-04 00:00:00'),
(958341,'Livingston',1074,11164,'Rejected','Laura Smith','Order rejected by Laura','2020-10-30 00:00:00'),
(958365,'Puma',1164,21254,'Approved','Laura Smith',NULL,'2020-10-31 00:00:00'),
(958389,'Crocs',1254,41344,'Approved','Laura Smith',NULL,'2020-11-01 00:00:00'),
(958413,'Nitco',1344,81434,'Awaiting Approval',NULL,NULL,'2020-11-04 00:00:00'),
(958700,'Nike',1064,111700,'Approved','Matthew Vance','Approved','2020-09-18 00:00:00'),
(958720,'Adidas',1011,661064,'Awaiting Approval',NULL,'Order created','2020-09-02 00:00:00'),
(958744,'Medico',772,10825,'Awaiting Approval',NULL,NULL,'2019-12-05 00:00:00'),
(958768,'WPOLogistics',718,34771,'Rejected','Laura Smith','On Hold','2020-09-21 00:00:00'),
(958792,'Sysmex',878,9310,'Approved','David Lee',NULL,'2019-10-02 00:00:00'),
(959413,'Johnson & Johnson',1434,15240,'Approved','Laura Smith',NULL,'2020-11-05 00:00:00'),
(960413,'Garnier',90,6187,'Approved','David Lee','Approved on 12.09.20','2020-11-06 00:00:00'),
(961511,'Apollo Pvt Ltd',187,277,'Approved','David Lee','Approved on 18.09.20','2020-11-07 00:00:00'),
(962609,'MaxTerm',277,4367,'Approved','David Lee','Approved on 22.09.20','2020-11-08 00:00:00');

/*Table structure for table `user_details` */

DROP TABLE IF EXISTS `user_details`;

CREATE TABLE `user_details` (
  `pk_user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `user_level` varchar(20) DEFAULT NULL,
  `order_range` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`pk_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `user_details` */

insert  into `user_details`(`pk_user_id`,`username`,`password`,`user_level`,`order_range`) values 
(1,'David_Lee','Project@123','Level 1','<=10,000'),
(2,'Laura_Smith','Project@1234','Level 2','>10,000 and <=50,000'),
(3,'Matthew_Vance','Project@12345','Level 3','>50,000');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
