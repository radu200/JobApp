-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 23, 2019 at 09:54 PM
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
(8, 5, 'Tehnologie si Inginerie', 'dfgxcvvcxxx', 'vvvvvvvvvvvvvvvv', 'Chisinau', 'Timp deplin', NULL, 'Începeți imediat', '345', 'experiență necesara', 'Engleza,Germana', NULL, '/uploads/jobs/6a4104ba6dff2ac989f34ee5ab1b3bb7', NULL, NULL, NULL),
(9, 5, 'Frumuseţe si Bunastare', 'asd', 'fgh', 'Chisinau', 'Timp deplin', NULL, 'Începeți imediat', '5334', 'experiență necesara', 'Engleza,Germana', NULL, '/uploads/jobs/df5746c7ff61fc6b2a6538d4d36babe0', NULL, NULL, NULL);

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
  `years` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
('30omQw-VExb2YsTVEelmgKKTUaYbP5J9', 1566671869, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('8YvtpxzIsMFgwqjA2IWJnhzJ1npi3Me5', 1566671869, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('NTdqRAvmsdJFVG_0t12F0vP4X0AA7Rsn', 1566670975, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('UGj0bKBSiei-ovlhDxI5qgcdOjx1ukrI', 1566679119, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"id\":5,\"password\":\"$2b$10$an6luxS59D2Q/frynsXmR.Zt.Rs7c1AKSaLzLmdi7ywwxzkebB2C2\",\"type\":\"employer\",\"email\":\"raduprodan200@gmail.com\",\"first_name\":\"radu\",\"last_name\":\"prodan\"}}}'),
('WUhBaIYQN6EnA5b0mNP4RzO3YdgZRcvG', 1566671748, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),
('ocZDVAlvW2bKYneJo6sgOjHwuMOux-09', 1566671870, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');

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
  `start_time` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `job_seeker_about_me` text CHARACTER SET utf8,
  `job_seeker_languages` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `job_seeker_education` text CHARACTER SET utf8,
  `job_seeker_location` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `job_seeker_availability` varchar(250) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `date_registered`, `email`, `email_confirmation_token`, `email_token_expire`, `first_name`, `last_name`, `password`, `type`, `company_description`, `company_name`, `company_location`, `company_type`, `avatar`, `forgotPasswordToken`, `forgotPasswordTokenExpires`, `terms_conditions`, `email_status`, `job_seeker_employment_type`, `start_time`, `job_seeker_about_me`, `job_seeker_languages`, `job_seeker_education`, `job_seeker_location`, `job_seeker_availability`) VALUES
(4, '2019-08-23 19:47:35', 'canticum999@gmail.com', '097f54bdba1cc80dcda83abc20c4b86b', '2019-08-23 20:47:35', 'radu', 'prodan', '$2b$10$aD5PrfizqTY2VGcpOAb1GuleH75GMqFALQZdA25i3y6Q/ZKGjadv6', 'employer', NULL, NULL, NULL, NULL, NULL, NULL, '2019-08-23 19:47:35', 'agreed', 'unverified', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, '2019-08-23 19:55:07', 'raduprodan200@gmail.com', NULL, '2019-08-23 20:07:21', 'radu', 'prodan', '$2b$10$an6luxS59D2Q/frynsXmR.Zt.Rs7c1AKSaLzLmdi7ywwxzkebB2C2', 'employer', NULL, NULL, NULL, NULL, NULL, NULL, '2019-08-23 20:07:21', 'agreed', 'verified', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `jobseeker_experience`
--
ALTER TABLE `jobseeker_experience`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
