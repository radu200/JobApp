-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 13, 2019 at 09:33 PM
-- Server version: 5.7.27-0ubuntu0.18.04.1
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
  `test` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `employer_id`, `category`, `position`, `description`, `city`, `employment_type`, `schedule_details`, `start_time`, `salary`, `experience`, `language`, `language_level`, `image`, `commission`, `currency`, `test`) VALUES
(30, 15, 'Barista și Barman', 'sdf', 'xcv', 'Cricova', 'Timp deplin', NULL, 'Începeți imediat', '123', 'experiență necesara', 'Spaniola,Araba', NULL, '/uploads/jobs/2e5b3fdd88241392be13f225aecbe30e', NULL, NULL, NULL);

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
(1, 16, 'Barista si Barman', 'barman', 'mlg', '', '03/16/2012', '10/31/2019', '7', '7', '15');

-- --------------------------------------------------------

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
-- Dumping data for table `job_application`
--

INSERT INTO `job_application` (`id`, `job_id`, `jobseeker_id`, `date`, `status`) VALUES
(1, 30, 16, '2019-11-02 22:04:51', 'active');

-- --------------------------------------------------------

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
(10, 15, 16, 'Nepoliticos sau Nepotrivit', 'kjkb', '2019-11-07 02:29:25', 'yes');

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
('pTa_ZwpW4xGCrNbRq35A0dSTVBHbySIa', 1573767120, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"id\":15,\"blacklist\":\"no\",\"password\":\"$2b$10$HERF/3K9GFf1SRUrnKKFD.hCW87h9Ctlii5.otJIpzOys1Ph5O9AS\",\"type\":\"employer\",\"email\":\"raduprodan200@gmail.com\",\"first_name\":\"asd\",\"last_name\":\"asd\"}}}'),
('quJfAtLQyHa3X7cy1OeiGI-RYq-KAUnk', 1573689666, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"id\":15,\"blacklist\":\"no\",\"password\":\"$2b$10$HERF/3K9GFf1SRUrnKKFD.hCW87h9Ctlii5.otJIpzOys1Ph5O9AS\",\"type\":\"employer\",\"email\":\"raduprodan200@gmail.com\",\"first_name\":\"asd\",\"last_name\":\"asd\"}}}');

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
  `socket_id` varchar(20) DEFAULT NULL,
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
  `checked` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `date_registered`, `email`, `email_confirmation_token`, `email_token_expire`, `first_name`, `last_name`, `socket_id`, `password`, `type`, `ip_adress`, `software`, `preferred_lang`, `company_description`, `company_name`, `company_location`, `company_type`, `employer_location`, `avatar`, `forgotPasswordToken`, `forgotPasswordTokenExpires`, `terms_conditions`, `email_status`, `job_seeker_employment_type`, `job_seeker_about_me`, `job_seeker_languages`, `job_seeker_education`, `job_seeker_location`, `job_seeker_availability`, `blacklist`, `checked`) VALUES
(15, '2019-10-06 16:37:57', 'raduprodan200@gmail.com', '207a258c3cb0adedd8c1e653886f5d1b', '2019-11-13 21:31:52', 'asd', 'asd', NULL, '$2b$10$HERF/3K9GFf1SRUrnKKFD.hCW87h9Ctlii5.otJIpzOys1Ph5O9AS', 'employer', '::1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36', 'en-GB,en-US,en', NULL, NULL, NULL, NULL, 'Chisinau', '/uploads/users/636556d93d3fd5c35b457ad5ef1c6e40', NULL, '2019-11-13 21:31:52', 'agreed', 'verified', NULL, NULL, NULL, NULL, NULL, NULL, 'yes', 'yes'),
(16, '2019-10-06 17:26:16', 'employee1111@gmail.com', 'cc5787d81f247a76759c08d1172e783f', '2019-11-13 21:31:53', 'dsad', 'asd', NULL, '$2b$10$7M60vvDOdqMmltnlRTA3u.LRB8UrT5JDeBUb.xTdyu9OvIbDJDwF.', 'jobseeker', '::1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36', 'en-GB,en-US,en', NULL, NULL, NULL, NULL, NULL, '/uploads/users/76c9e493d8bdf441c863e7b9d503b63c', NULL, '2019-11-13 21:31:53', 'agreed', 'verified', 'Timp deplin', '', NULL, '', 'Chisinau', NULL, 'yes', 'yes'),
(17, '2019-10-06 19:39:09', 'employee11assdad11@gmail.com', 'ad63ad1e8317d145bbcc00f3ddc801c8', '2019-11-13 21:31:54', 'asd', 'asd', NULL, '$2b$10$io.7k0LEl9Z9ytSh1H5DpO9DrjsNFSO3SqpI/E4cCPj8COJNO3hFm', 'employer', '::1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36', 'en-GB,en-US,en', NULL, NULL, NULL, NULL, 'Chisinau', NULL, NULL, '2019-11-13 21:31:54', 'agreed', 'unverified', NULL, NULL, NULL, NULL, NULL, NULL, 'yes', 'yes'),
(18, '2019-10-06 19:43:20', 'employee9@mail.com', 'af555964432ab5acba561c9067b1a62c', '2019-11-13 21:31:54', 'radu', 'prodan', NULL, '$2b$10$/FWa5leg6OKj0B6zXfnEeOJrUUCJ8ovmwP5JuR8JOE0y1kJp4NbH.', 'employer', '::1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36', 'en-GB,en-US,en', NULL, NULL, NULL, NULL, 'Chisinau', NULL, NULL, '2019-11-13 21:31:54', 'agreed', 'unverified', NULL, NULL, NULL, NULL, NULL, NULL, 'yes', 'yes'),
(19, '2019-11-06 22:51:59', 'employee113311@gmail.com', '8dd345cf865ea1913a85cd2f380a96f5', '2019-11-13 21:31:55', 'radu', 'prodan', NULL, '$2b$10$yLcIyiV.wYYl176EH8NsFurH8cAbPol8dFwbcOy0C//JEaU9sQfj6', 'employer', '::1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 'en-GB,en-US,en', NULL, NULL, NULL, NULL, 'Chisinau', '/uploads/users/e893d7499f519ed80137c0161c01f422', NULL, '2019-11-13 21:31:55', 'agreed', 'verified', NULL, NULL, NULL, NULL, NULL, NULL, 'yes', 'yes'),
(20, '2019-11-06 22:58:23', 'employee11111@gmail.com', '8b9fdc8ddc47122a70c026238b0d586e', '2019-11-13 21:31:55', '111', '111', NULL, '$2b$10$3Yx9edyriBlR6Rja0W.PsO4ckhZmts1IL4KFP5ZgywVu5Ov0ZCFAO', 'employer', '::1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36', 'en-GB,en-US,en', NULL, NULL, NULL, NULL, 'Chisinau', NULL, NULL, '2019-11-13 21:31:55', 'agreed', 'unverified', NULL, NULL, NULL, NULL, NULL, NULL, 'yes', 'yes');

--
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `jobseeker_experience`
--
ALTER TABLE `jobseeker_experience`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `job_application`
--
ALTER TABLE `job_application`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
