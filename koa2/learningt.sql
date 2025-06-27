/*
 Navicat Premium Dump SQL

 Source Server         : test1
 Source Server Type    : MySQL
 Source Server Version : 80042 (8.0.42)
 Source Host           : localhost:3306
 Source Schema         : learningt

 Target Server Type    : MySQL
 Target Server Version : 80042 (8.0.42)
 File Encoding         : 65001

 Date: 26/06/2025 22:05:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `adminId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `adminId`(`adminId` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', 'admin');
INSERT INTO `admin` VALUES (2, '超级管理员', 'root123');

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 60 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES (56, 1, 9);
INSERT INTO `cart` VALUES (57, 1, 10);
INSERT INTO `cart` VALUES (58, 1, 6);
INSERT INTO `cart` VALUES (59, 1, 3);

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `courseId` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `teacherId` int NULL DEFAULT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `price` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`courseId`) USING BTREE,
  INDEX `teacherId`(`teacherId` ASC) USING BTREE,
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `teacher` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (1, '/image/cqwm.jpg', '《苍穹外卖》是一套完整的企业级外卖平台开发课程，涵盖后端技术如Spring Boot、MyBatis、Redis等，前端使用Vue框架构建界面。通过真实业务流程如用户下单、商家接单、骑手配送等模块开发，帮助学员全面提升项目实战能力。', 4, '苍穹外卖--黑马', 888.00);
INSERT INTO `course` VALUES (2, '/image/redis.jpg', '《Redis从入门到精通》课程详细讲解Redis基础知识及高级应用，包括五种数据类型、持久化机制、事务处理、发布订阅、分布式锁等内容。课程配套案例丰富，帮助你掌握Redis在高并发场景下的使用技巧和企业应用经验。', 2, 'Redis从入门到精通', 199.00);
INSERT INTO `course` VALUES (3, '/image/rabbitmq.jpg', '《两天学会RabbitMQ》是一门快速入门RabbitMQ消息队列的实战课程，从消息模型原理到交换机、队列、路由绑定等概念，再到Spring整合RabbitMQ的实践操作，帮助你快速掌握并应用在实际项目中。', 4, '两天学会RabbitMQ', 599.00);
INSERT INTO `course` VALUES (6, '/image/mysql.jpg', '《MySQL入门到入土》带你系统学习MySQL数据库，从基本的增删改查、索引优化、事务处理到慢查询分析、主从复制、高可用架构等内容，理论与实战结合，帮助你深入理解数据库的使用与优化。', 4, 'MySQL入门到入土', 599.00);
INSERT INTO `course` VALUES (7, '/image/xczx.jpg', '《JVM入门到起飞》全面讲解Java虚拟机的工作原理，包括类加载机制、内存结构、垃圾回收算法、性能调优及调试工具等内容，是提升Java程序性能和排查问题的重要技能课程。', 5, 'JVM入门到起飞', 599.00);
INSERT INTO `course` VALUES (8, '/image/java.png', '《Java基础篇（上）》是为Java零基础入门者设计的课程，内容涵盖变量、流程控制、数组、面向对象编程、常用API等。课程结合大量案例练习，帮助你打好坚实的Java编程基础，为后续学习做准备。', 6, 'Java基础篇（上）', 299.00);
INSERT INTO `course` VALUES (9, '/image/spring.jpg', '《Spring-6》课程以最新版本的Spring框架为基础，系统讲解IOC容器、AOP、事务管理、声明式配置等核心内容，并结合实际案例完成后端接口的搭建和测试，适合具备基础Java能力的开发者进阶。', 2, 'Spring-6', 199.00);
INSERT INTO `course` VALUES (10, '/image/rjwm.jpg', '《Spring-Cloud快速上手》专注于微服务架构设计与实现，内容涵盖服务注册发现、配置中心、负载均衡、服务网关、断路器等Spring Cloud核心组件，带你快速构建稳定的微服务系统。', 7, '瑞吉外卖', 159.00);
INSERT INTO `course` VALUES (11, '/image/linux.jpg', '《Linux基础》课程从Linux系统的安装配置讲起，讲解常用命令、用户权限管理、软件安装、服务配置、Shell脚本等内容，适合希望在开发运维方向发展的同学打好系统基础。', 8, 'Linux基础', 189.00);
INSERT INTO `course` VALUES (12, '/image/hmtt.jpg', '《Spring Boot项目实战》基于Spring Boot框架，带领学员构建一个完整的Web项目，从项目搭建、接口开发、数据持久化到部署上线，全面提升你的全栈开发实战能力，是通向企业级项目的必修课。', 7, 'Spring Boot项目实战', 299.00);
INSERT INTO `course` VALUES (13, '/image/javaweb.jpg', '《JavaWeb项目实战》以真实的企业级Web系统为蓝本，讲解Servlet、JSP、Filter、Listener、MVC架构等关键技术点，并结合MySQL数据库、前端HTML+CSS+JS等，实现一个完整的管理系统项目。', 10, 'JavaWeb项目实战', 249.00);
INSERT INTO `course` VALUES (14, '/image/hmtt.jpg', '《黑马头条》是一门基于真实业务需求设计的移动新闻客户端实战课程，涉及前后端分离架构、App接口开发、文章管理、用户推荐、数据统计分析等模块，适合提升项目设计能力的进阶学习者。', 11, '黑马头条', 399.00);
INSERT INTO `course` VALUES (15, '/image/docker.jpg', '《Docker速通》是一门针对开发者快速掌握Docker容器技术的实用课程，讲解镜像构建、容器管理、数据卷、网络配置以及常见问题排查，帮助你轻松完成开发环境部署和服务容器化。', 4, 'Docker速通', 149.00);
INSERT INTO `course` VALUES (16, '/image/python.jpg', '大数据处理流程与工具', 13, '大数据基础课程', 399.00);
INSERT INTO `course` VALUES (17, '/image/kafka.jpg', '网络安全基础知识', 12, '信息安全与网络防护', 289.00);
INSERT INTO `course` VALUES (21, '/images/vue3.png', '系统学习 Vue.js 3.0', 2, '新课程 - redission', 599.00);

-- ----------------------------
-- Table structure for purchase_order
-- ----------------------------
DROP TABLE IF EXISTS `purchase_order`;
CREATE TABLE `purchase_order`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `purchase_time` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of purchase_order
-- ----------------------------
INSERT INTO `purchase_order` VALUES (1, 1, 5, 599.00, '2025-06-23 09:36:33');
INSERT INTO `purchase_order` VALUES (2, 1, 4, 599.00, '2025-06-23 09:50:19');
INSERT INTO `purchase_order` VALUES (3, 1, 6, 599.00, '2025-06-23 10:14:46');
INSERT INTO `purchase_order` VALUES (4, 1, 1, 199.00, '2025-06-23 14:33:08');
INSERT INTO `purchase_order` VALUES (5, 2, 2, 299.00, '2025-06-23 14:33:08');
INSERT INTO `purchase_order` VALUES (6, 3, 3, 199.00, '2025-06-23 14:33:08');
INSERT INTO `purchase_order` VALUES (7, 4, 4, 159.00, '2025-06-23 14:33:08');
INSERT INTO `purchase_order` VALUES (8, 1, 5, 188.00, '2025-06-23 14:33:08');
INSERT INTO `purchase_order` VALUES (9, 2, 6, 199.00, '2025-06-23 14:33:08');
INSERT INTO `purchase_order` VALUES (10, 3, 7, 599.00, '2025-06-23 14:33:08');
INSERT INTO `purchase_order` VALUES (11, 4, 8, 299.00, '2025-06-23 14:33:08');
INSERT INTO `purchase_order` VALUES (12, 2, 9, 249.00, '2025-06-23 14:33:08');
INSERT INTO `purchase_order` VALUES (13, 1, 10, 399.00, '2025-06-23 14:33:08');
INSERT INTO `purchase_order` VALUES (14, 1, 13, 249.00, '2025-06-24 15:21:18');
INSERT INTO `purchase_order` VALUES (15, 1, 11, 189.00, '2025-06-24 15:26:58');
INSERT INTO `purchase_order` VALUES (16, 1, 15, 149.00, '2025-06-24 15:53:36');
INSERT INTO `purchase_order` VALUES (17, 1, 3, 599.00, '2025-06-24 16:08:19');
INSERT INTO `purchase_order` VALUES (18, 15, 1, 188.00, '2025-06-24 17:35:04');
INSERT INTO `purchase_order` VALUES (19, 15, 2, 199.00, '2025-06-24 17:35:19');
INSERT INTO `purchase_order` VALUES (20, 1, 12, 299.00, '2025-06-24 17:39:09');
INSERT INTO `purchase_order` VALUES (21, 15, 14, 399.00, '2025-06-24 17:44:23');
INSERT INTO `purchase_order` VALUES (22, 15, 13, 249.00, '2025-06-24 17:44:33');
INSERT INTO `purchase_order` VALUES (23, 15, 11, 189.00, '2025-06-24 17:57:11');
INSERT INTO `purchase_order` VALUES (24, 1, 14, 399.00, '2025-06-24 22:30:54');
INSERT INTO `purchase_order` VALUES (25, 1, 10, 159.00, '2025-06-24 23:44:23');
INSERT INTO `purchase_order` VALUES (26, 1, 8, 299.00, '2025-06-25 11:08:27');
INSERT INTO `purchase_order` VALUES (27, 1, 13, 249.00, '2025-06-25 11:08:51');
INSERT INTO `purchase_order` VALUES (28, 1, 14, 399.00, '2025-06-25 11:08:51');
INSERT INTO `purchase_order` VALUES (29, 1, 15, 149.00, '2025-06-25 11:08:51');
INSERT INTO `purchase_order` VALUES (30, 1, 1, 188.00, '2025-06-25 11:09:15');
INSERT INTO `purchase_order` VALUES (31, 1, 2, 199.00, '2025-06-25 11:09:15');
INSERT INTO `purchase_order` VALUES (32, 1, 3, 599.00, '2025-06-25 11:09:15');
INSERT INTO `purchase_order` VALUES (33, 1, 6, 599.00, '2025-06-25 11:09:15');
INSERT INTO `purchase_order` VALUES (34, 1, 11, 189.00, '2025-06-25 11:09:15');
INSERT INTO `purchase_order` VALUES (35, 1, 12, 299.00, '2025-06-25 11:09:15');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES (2, '王静');
INSERT INTO `teacher` VALUES (4, '胡晓飞');
INSERT INTO `teacher` VALUES (5, '刘曼曼');
INSERT INTO `teacher` VALUES (6, '王强');
INSERT INTO `teacher` VALUES (7, '周杰伦');
INSERT INTO `teacher` VALUES (8, '陈奕迅');
INSERT INTO `teacher` VALUES (9, '孙燕姿');
INSERT INTO `teacher` VALUES (10, '刘亦菲');
INSERT INTO `teacher` VALUES (11, '梁朝伟');
INSERT INTO `teacher` VALUES (12, '迪丽热巴');
INSERT INTO `teacher` VALUES (13, '古力娜扎');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `studentId` char(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `balance` decimal(10, 2) NULL DEFAULT 0.00,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `studentId`(`studentId` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '1', '1', 3719.00, '张乐');
INSERT INTO `user` VALUES (2, '22021320404', '1', 2000.00, '刘宇恒');
INSERT INTO `user` VALUES (3, '22021320430', '1', 2000.00, '罗享童');
INSERT INTO `user` VALUES (4, '22021320408', '1', 1000.00, '赵淑林');
INSERT INTO `user` VALUES (5, '22021320403', '1', 1000.00, '卢颖');
INSERT INTO `user` VALUES (6, '20230002', 'abc234', 200.00, '钱二');
INSERT INTO `user` VALUES (7, '20230003', 'abc345', 300.00, '孙三');
INSERT INTO `user` VALUES (8, '20230004', 'abc456', 400.00, '李四');
INSERT INTO `user` VALUES (9, '20230005', 'abc567', 500.00, '周五');
INSERT INTO `user` VALUES (10, '20230006', 'abc678', 600.00, '吴六');
INSERT INTO `user` VALUES (11, '20230007', 'abc789', 700.00, '郑七');
INSERT INTO `user` VALUES (12, '20230008', 'abc890', 800.00, '王八');
INSERT INTO `user` VALUES (13, '20230009', 'abc901', 900.00, '冯九');
INSERT INTO `user` VALUES (14, '20230010', 'abc012', 1000.00, '陈十');
INSERT INTO `user` VALUES (15, '222222', '222222', 9476.00, '222222');
INSERT INTO `user` VALUES (16, '22021320421', '111111', 4000.00, '张乐乐');

-- ----------------------------
-- Table structure for user_course
-- ----------------------------
DROP TABLE IF EXISTS `user_course`;
CREATE TABLE `user_course`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `courseId` int NOT NULL,
  `purchase_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `userId`(`userId` ASC, `courseId` ASC) USING BTREE,
  INDEX `courseId`(`courseId` ASC) USING BTREE,
  CONSTRAINT `user_course_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `user_course_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `course` (`courseId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_course
-- ----------------------------
INSERT INTO `user_course` VALUES (47, 1, 8, '2025-06-25 11:08:27');
INSERT INTO `user_course` VALUES (48, 1, 13, '2025-06-25 11:08:51');
INSERT INTO `user_course` VALUES (49, 1, 14, '2025-06-25 11:08:51');
INSERT INTO `user_course` VALUES (50, 1, 15, '2025-06-25 11:08:51');
INSERT INTO `user_course` VALUES (51, 1, 1, '2025-06-25 11:09:15');
INSERT INTO `user_course` VALUES (52, 1, 2, '2025-06-25 11:09:15');
INSERT INTO `user_course` VALUES (53, 1, 3, '2025-06-25 11:09:15');
INSERT INTO `user_course` VALUES (54, 1, 6, '2025-06-25 11:09:15');
INSERT INTO `user_course` VALUES (55, 1, 11, '2025-06-25 11:09:15');
INSERT INTO `user_course` VALUES (56, 1, 12, '2025-06-25 11:09:15');

SET FOREIGN_KEY_CHECKS = 1;
