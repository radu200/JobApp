-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 30, 2019 at 11:50 PM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.19-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jobApp`
--

-- --------------------------------------------------------

--
-- Table structure for table `applied_jobs`
--

CREATE TABLE `applied_jobs` (
  `id` int(11) NOT NULL,
  `job_id` int(11) DEFAULT NULL,
  `jobseeker_id` int(11) DEFAULT NULL,
  `employer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `applied_jobs`
--

INSERT INTO `applied_jobs` (`id`, `job_id`, `jobseeker_id`, `employer_id`) VALUES
(1, 5, 6, NULL),
(2, 5, 6, NULL),
(3, 4, 6, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `employer_id` int(11) DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `position` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `description` text CHARACTER SET utf8,
  `city` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `employment_type` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `schedule_details` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `start_time` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `salary` varchar(250) DEFAULT NULL,
  `experience` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `language` text CHARACTER SET utf8,
  `language_level` varchar(250) DEFAULT NULL,
  `image` varchar(250) DEFAULT NULL,
  `commission` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `currency` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `test` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `employer_id`, `category`, `position`, `description`, `city`, `employment_type`, `schedule_details`, `start_time`, `salary`, `experience`, `language`, `language_level`, `image`, `commission`, `currency`, `test`) VALUES
(4, 76, 'Sofer', 'sdf', 'asd', 'Chisinau', 'Timp deplin', NULL, 'Începeți imediat', '123', 'experiență necesara', 'Engleza,Germana', NULL, '/uploads/jobs/f6a5983c661f08bf11e7492d7df321cb', NULL, NULL, NULL),
(5, 76, 'Bucătărie portar', 'asd', 'asd', 'Chisinau', 'Timp deplin', NULL, 'Începeți imediat', '123', 'experiență necesara', 'Engleza,Germana', NULL, '/uploads/jobs/dc20853732ab87d6d2659be82c9ca440', NULL, NULL, NULL),
(15, 5, 'Barista și Barman', 'dvnbn', '\r\ndsdf\r\n', 'Chisinau', 'Timp Deplin', NULL, NULL, '345345', 'experiență necesara', NULL, NULL, '/uploads/jobs/a3a0d979f0a261295adc7e0e8395b5f9', NULL, NULL, NULL),
(17, 5, 'Îngrijitorii și sănătatea', 'ion', 'cioban\r\n', 'Chisinau', 'Timp deplin', NULL, NULL, '234', 'experiență necesara', NULL, NULL, '/uploads/jobs/f85bf3cad7b804e76bb670b1b242625a', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jobseeker_experience`
--

CREATE TABLE `jobseeker_experience` (
  `id` int(11) NOT NULL,
  `jobseeker_id` int(20) DEFAULT NULL,
  `category` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `position` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `company_name` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `responsibilities` text CHARACTER SET utf8,
  `start_date` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `end_date` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `years` varchar(11) DEFAULT NULL,
  `months` varchar(11) DEFAULT NULL,
  `days` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jobseeker_experience`
--

INSERT INTO `jobseeker_experience` (`id`, `jobseeker_id`, `category`, `position`, `company_name`, `responsibilities`, `start_date`, `end_date`, `years`, `months`, `days`) VALUES
(1, 6, 'Barista Barman', 'sdf', 'sdf', 'dsfdsf', '08/21/2019', '08/23/2019', '0', '0', '2'),
(2, 7, 'Frumuseţe si Bunastare', 'sdf', 'dsf', 'sdf', '08/28/2015', '08/22/2019', '3', '11', '24'),
(3, 7, 'Frumuseţe si Bunastare', 'sdf', 'dsf', 'sdf', '08/28/2015', '08/22/2019', '3', '11', '24'),
(4, 7, 'Frumuseţe si Bunastare', 'sdf', 'dsf', 'sdf', '08/28/2015', '08/22/2019', '3', '11', '24'),
(5, 8, 'Frumuseţe si Bunastare', 'asd', 'dsf', 'asdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', '08/15/2013', '08/08/2019', '5', '11', '22'),
(6, 8, 'Barista Barman', 'barman', 'mlg', 'sadffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', '08/22/2015', '08/17/2019', '3', '11', '25'),
(7, 9, 'Frumuseţe si Bunastare', 'ingrijitor', 'mld', 'sadddddddd', '08/13/2014', '08/02/2019', '4', '11', '19'),
(8, 9, 'Frumuseţe si Bunastare', 'ingrijitor', 'mld', 'sadddddddd', '08/13/2014', '08/02/2019', '4', '11', '19');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('-stQPlYbaEZ2LNTOTj4JovxIhZ1AFvtK', 1567276998, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"id\":6,\"password\":\"$2b$10$QniWIMCYUSlqK/kz.MWMgeW1Xxy1Y2pLp.34PFFQDMTMhOUXfpEs2\",\"type\":\"jobseeker\",\"email\":\"employee1111@gmail.com\",\"first_name\":\"radu\",\"last_name\":\"prodan\"}}}'),
('AVOZvGlylIo26VW0eGkCsw7mYG1IXNOW', 1567268277, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"id\":5,\"password\":\"$2b$10$an6luxS59D2Q/frynsXmR.Zt.Rs7c1AKSaLzLmdi7ywwxzkebB2C2\",\"type\":\"employer\",\"email\":\"raduprodan200@gmail.com\",\"first_name\":\"radu\",\"last_name\":\"prodan\"}}}'),
('INya5J_qFa9NmjGbbDvRpfxr2-mmAMYX', 1567291779, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"succes_msg\":[{\"msg\":\"Ai aplicat cu success! Multa Bafta!\"}]},\"passport\":{\"user\":{\"id\":6,\"password\":\"$2b$10$QniWIMCYUSlqK/kz.MWMgeW1Xxy1Y2pLp.34PFFQDMTMhOUXfpEs2\",\"type\":\"jobseeker\",\"email\":\"employee1111@gmail.com\",\"first_name\":\"radu\",\"last_name\":\"prodan\"}}}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `date_registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `email_confirmation_token` varchar(40) CHARACTER SET utf8 DEFAULT NULL,
  `email_token_expire` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `first_name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `type` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `ip_adress` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `software` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `preferred_lang` varchar(255) DEFAULT NULL,
  `company_description` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `company_name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `company_location` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `company_type` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `forgotPasswordToken` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `forgotPasswordTokenExpires` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `terms_conditions` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `email_status` varchar(40) CHARACTER SET utf8 DEFAULT NULL,
  `job_seeker_employment_type` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `job_seeker_about_me` text CHARACTER SET utf8,
  `job_seeker_languages` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `job_seeker_education` text CHARACTER SET utf8,
  `job_seeker_location` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `job_seeker_availability` varchar(250) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `date_registered`, `email`, `email_confirmation_token`, `email_token_expire`, `first_name`, `last_name`, `password`, `type`, `ip_adress`, `software`, `preferred_lang`, `company_description`, `company_name`, `company_location`, `company_type`, `avatar`, `forgotPasswordToken`, `forgotPasswordTokenExpires`, `terms_conditions`, `email_status`, `job_seeker_employment_type`, `job_seeker_about_me`, `job_seeker_languages`, `job_seeker_education`, `job_seeker_location`, `job_seeker_availability`) VALUES
(4, '2019-08-23 19:47:35', 'canticum999@gmail.com', '097f54bdba1cc80dcda83abc20c4b86b', '2019-08-24 22:57:30', 'radu', 'prodan', '$2b$10$aD5PrfizqTY2VGcpOAb1GuleH75GMqFALQZdA25i3y6Q/ZKGjadv6', 'employer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-08-24 22:57:30', 'agreed', 'verified', NULL, NULL, NULL, NULL, NULL, NULL),
(5, '2019-08-23 19:55:07', 'raduprodan200@gmail.com', NULL, '2019-08-30 18:23:27', 'radu', 'prodan', '$2b$10$an6luxS59D2Q/frynsXmR.Zt.Rs7c1AKSaLzLmdi7ywwxzkebB2C2', 'employer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/uploads/users/d6d4efa97223813dd51360bc95c5bfbb', NULL, '2019-08-30 18:23:27', 'agreed', 'verified', NULL, NULL, NULL, NULL, NULL, NULL),
(6, '2019-08-24 18:30:26', 'employee1111@gmail.com', '032103fd9927b0ee1c306aa0035cf991', '2019-08-30 18:27:29', 'radu', 'prodan', '$2b$10$QniWIMCYUSlqK/kz.MWMgeW1Xxy1Y2pLp.34PFFQDMTMhOUXfpEs2', 'jobseeker', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/uploads/users/6b4f3555e3975249c2655ef272c8155c', NULL, '2019-08-30 18:27:29', 'agreed', 'verified', 'Cu jumătate de normă', 'dfgdf', 'dfgdfg', 'dfgdfgdfg', 'Chisinau', 'Sunt disponibil pentru începerea imediata'),
(7, '2019-08-24 21:54:24', 'angajat1@mail.com', 'e5a527b9ac8492f5a442edf60f52dddb', '2019-08-24 23:21:16', 'radu', 'prodan', '$2b$10$EYp7vRUfxDKcUXMAa.ksjecciRSIfP7wCL6wE7xC0y1JwdvGkv2DW', 'jobseeker', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/uploads/users/17bc6e51c839d5820b39844212cf7a2e', NULL, '2019-08-24 23:21:16', 'agreed', 'verified', NULL, NULL, NULL, NULL, 'Chisinau', NULL),
(8, '2019-08-24 23:24:47', 'angajat3@mail.com', '51e647c2d81ef367177c8df4370278d2', '2019-08-30 14:12:35', 'radu', 'prodan', '$2b$10$omg29icSiP.nxqcg84nvaOT2ZPG3q7xxIKRILd6APX3HIk42u3PSK', 'jobseeker', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/uploads/users/9c0771c8f3aa2b813a754f1baba6a4a9', NULL, '2019-08-30 14:12:35', 'agreed', 'verified', 'Cu jumătate de normă', 'asdddddddddddddddddddddddddddddddddddddddddddddfgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg', 'engleza', 'universiatte', 'chisinau', 'Sunt disponibil, dar nu imediat'),
(9, '2019-08-29 18:44:05', 'arad@SDF.COM', 'da08067cb6a0d22cde8a8d4d4b7e02ec', '2019-08-29 22:55:21', 'JLJ', 'KJKLJKJ', '$2b$10$yGULfgVbK5CCV906u291JewVmq4sTOQl2SbXeO6rqNNCCKPh45Y9W', 'jobseeker', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '/uploads/users/c421b6fdf9e4913e8910d378a8652f08', NULL, '2019-08-29 22:55:21', 'agreed', 'unverified', 'Timp deplin', 'dsfdsf', 'rusa engleza', 'educatie', 'balti', NULL),
(10, '2019-08-29 18:46:32', 'raduprodan2EE00@gmail.com', 'c9d6161952fd6ef99b9d045cb4269030', '2019-08-29 19:46:32', 'radu', 'prodan', '$2b$10$TqODnVBiTq8sTqUNzoodXuJkYoOapT5fZg6CwzqIon.NGnYgyXrjO', 'employer', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-08-29 18:46:32', 'agreed', 'unverified', NULL, NULL, NULL, NULL, NULL, NULL),
(11, '2019-08-30 16:01:51', 'employee111asd1@gmail.com', '3c740b691e2644573edc64c534481ce5', '2019-08-30 17:01:51', 'asd', 'sad', '$2b$10$kXPvtXRqHwuYmmkfrIFdpOikLV6jwaq9nredl7YVat/hhatlQ6O92', 'employer', '::1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-08-30 16:01:51', 'agreed', 'unverified', NULL, NULL, NULL, NULL, NULL, NULL),
(12, '2019-08-30 16:05:18', 'employee11asdddddddddd11@gmail.com', '6c062986b39a7b2f4ef37642d2792d4c', '2019-08-30 17:05:18', '111', '11', '$2b$10$WtvEr0F1pFH1zN00/SFRv.D3a162l4e3MkN58vpPVwfypdMr5Kmt6', 'jobseeker', '::1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36', 'en-GB,en-US,en', NULL, NULL, NULL, NULL, NULL, NULL, '2019-08-30 16:05:18', 'agreed', 'unverified', NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applied_jobs`
--
ALTER TABLE `applied_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobseeker_experience`
--
ALTER TABLE `jobseeker_experience`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applied_jobs`
--
ALTER TABLE `applied_jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `jobseeker_experience`
--
ALTER TABLE `jobseeker_experience`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
