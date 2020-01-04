-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 04, 2020 at 04:51 PM
-- Server version: 5.7.28-0ubuntu0.18.04.4
-- PHP Version: 7.2.24-0ubuntu0.18.04.1

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
-- Table structure for table `chatRooms`
--

CREATE TABLE `chatRooms` (
  `id` int(11) NOT NULL,
  `sender` int(11) DEFAULT NULL,
  `receiver` int(11) DEFAULT NULL,
  `messages` text,
  `receiverName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chatRooms`
--

INSERT INTO `chatRooms` (`id`, `sender`, `receiver`, `messages`, `receiverName`) VALUES
(2, 16, 18, NULL, 'ion'),
(3, 16, 19, NULL, 'van'),
(7, 16, 15, NULL, 'asd');

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
  `blacklist` tinyint(1) NOT NULL DEFAULT '0',
  `salary_from` int(11) DEFAULT NULL,
  `salary_to` int(11) DEFAULT NULL,
  `salary_currency` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


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
-- Table structure for table `job_application`
--

CREATE TABLE `job_application` (
  `id` int(11) NOT NULL,
  `job_id` int(11) DEFAULT NULL,
  `jobseeker_id` int(11) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--


--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `reporter_id` int(11) DEFAULT NULL,
  `reported_user_id` int(11) DEFAULT NULL,
  `reason` text CHARACTER SET utf8,
  `message` text CHARACTER SET utf8,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `blacklist` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `reporter_id`, `reported_user_id`, `reason`, `message`, `date`, `blacklist`) VALUES
(6, 16, 15, 'Nepoliticos sau Nepotrivit', 'sdfsd', '2019-11-07 02:12:03', 'yes'),
(7, 16, 15, 'Nepoliticos sau Nepotrivit', 'kjn\r\n', '2019-11-07 02:12:13', 'yes'),
(8, 16, 15, 'Nepoliticos sau Nepotrivit', 'sdf', '2019-11-07 02:14:59', 'yes'),
(9, 16, 15, 'Fraud', '', '2019-11-07 02:15:03', 'yes'),
(10, 15, 16, 'Nepoliticos sau Nepotrivit', 'kjkb', '2019-11-07 02:29:25', 'no'),
(11, 15, 15, 'Spam', 'mklmkm', '2019-12-18 01:51:44', NULL);

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
  `employer_location` varchar(250) DEFAULT NULL,
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
  `job_seeker_availability` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `blacklist` varchar(11) DEFAULT NULL,
  `checked` varchar(11) DEFAULT NULL,
  `member` tinyint(1) DEFAULT NULL,
  `membership_approved_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Indexes for dumped tables
--

--
-- Indexes for table `chatRooms`
--
ALTER TABLE `chatRooms`
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
-- Indexes for table `job_application`
--
ALTER TABLE `job_application`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
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
-- AUTO_INCREMENT for table `chatRooms`
--
ALTER TABLE `chatRooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
--
-- AUTO_INCREMENT for table `jobseeker_experience`
--
ALTER TABLE `jobseeker_experience`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
--
-- AUTO_INCREMENT for table `job_application`
--
ALTER TABLE `job_application`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
