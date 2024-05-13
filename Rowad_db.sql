-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 13, 2022 at 02:14 PM
-- Server version: 5.7.23-23
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `realias6_elRowad`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `permessions` tinyint(1) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar` text,
  `phone` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `permessions`, `email`, `avatar`, `phone`, `user_name`, `password`, `session_id`) VALUES
(1, 'Youssef', 1, 'youssef.badr.1991@gmail.com', '/uploads/images/avatar/79736937_101720714660941_6965755488831012864_o.jpeg', '01097268352', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '6b0b9de5f409f931614a76e068af4c07f220f8f0'),
(7, 'Ahmed', NULL, 'engahmedmedhat2012@gmail.com', '/uploads/images/services/2021/05/27/elrowad_services_60af0eb774752.shtml', NULL, 'medhat', '25f9e794323b453885f5181f1b624d0b', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `applicants`
--

CREATE TABLE `applicants` (
  `applicant_id` bigint(20) NOT NULL,
  `id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `apply_date` date DEFAULT NULL,
  `apply_time` time DEFAULT NULL,
  `cv` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `applicants`
--

INSERT INTO `applicants` (`applicant_id`, `id`, `name`, `email`, `phone`, `apply_date`, `apply_time`, `cv`) VALUES
(1, 1, 'ahmed ashraf ahmed', 'ahmed_ashraf318@yahoo.com', '01124343755', '2021-01-20', '20:41:10', 'technical-office-engineer_ahmed_ashraf_ahmed_6008794664923.pdf'),
(2, 1, 'George Hatem Habib', 'georgehatem77@gmail.com', '01288380884', '2021-01-23', '10:51:18', 'technical-office-engineer_George_Hatem_Habib_600be3860a3be.pdf'),
(3, 1, 'اسلام', 'eslam_ashor2012@yahoo.com', '01009452018', '2021-03-07', '22:54:58', 'technical-office-engineer_اسلام_60453da224736.pdf'),
(4, 1, 'اكرم احمد مختار ', 'eng.akram.aziz@gmail.com', '01115834764', '2021-03-09', '14:51:18', 'technical-office-engineer_اكرم_احمد_مختار__60476f4699623.pdf'),
(5, 1, 'محمد فوزي عبدالعظيم محمود', 'mhmdfwzy672@gmail.com', '01122110377', '2021-03-29', '12:24:38', 'technical-office-engineer_محمد_فوزي_عبدالعظيم_محمود_6061aae679a71.pdf'),
(6, 1, 'Hossam', 'hossamziaad@gmail.com', '01120888568', '2021-04-23', '06:07:43', 'technical-office-engineer_Hossam_6082480fca944.pdf'),
(7, 1, 'أحمد مصطفي محمد الششتاوي', 'ahmedelsheshtawy1295@gmail.com', '01129502938', '2021-05-09', '23:39:32', 'technical-office-engineer_أحمد_مصطفي_محمد_الششتاوي_60985694be111.pdf'),
(8, 1, 'الشربيني حسن الشربيني حمزه ', 'elsherbinyhasan43@gmail.com', '01013123466', '2021-05-12', '11:33:28', 'technical-office-engineer_الشربيني_حسن_الشربيني_حمزه__609ba0e801a35.pdf'),
(9, 1, 'hussein elmahdy', 'hussein.elmahdy93@gmail.com', '01069554584', '2021-06-16', '00:10:31', 'technical-office-engineer_hussein_elmahdy_60c9255783735.pdf'),
(10, 1, 'mohamed samir', 'engineer.mohamed16253470@gmail.com', '01144200539', '2021-07-23', '15:01:42', 'technical-office-engineer_mohamed_samir_60fabdb6d1fea.pdf'),
(11, 1, 'محمود نادر أحمد عبد اللاه ', 'civil.nader456@gmail.com', '01112614827', '2021-08-19', '16:35:19', 'technical-office-engineer_محمود_نادر_أحمد_عبد_اللاه__611e6c270bdb8.pdf'),
(12, 1, 'Mohamed Mostafa', 'mohamedm.yassin0@gmail.com', '01225867730', '2021-08-27', '00:24:14', 'technical-office-engineer_Mohamed_Mostafa_6128148e9049c.pdf'),
(13, 1, 'محمد محمود محب', 'eng.momoheb@gmail.com', '01065591114', '2021-09-04', '12:50:25', 'technical-office-engineer_محمد_محمود_محب_61334f70ccbc4.pdf'),
(14, 1, 'shady emad', 'shadyemadf24@gmail.com', '01116727772', '2021-09-22', '12:11:22', 'technical-office-engineer_shady_emad_614b0149e5644.pdf'),
(15, 1, 'محمد احمد البنداري', 'melbendary1994@gmail.com', '+201017786882', '2021-11-27', '21:25:02', 'technical-office-engineer_محمد_احمد_البنداري_61a2860e5a7e6.pdf'),
(16, 1, 'Ezz Eldean Osama  Farahat', 'ezzofarahat@gmail.com', '+201098377900', '2022-01-01', '12:27:15', 'technical-office-engineer_Ezz_Eldean_Osama__Farahat_61d02c83c0b22.pdf'),
(17, 1, 'Dyaa sobhy mohamed', 'sobhydyaa@gmail.com', '01550452820', '2022-01-04', '19:24:29', 'technical-office-engineer_Dyaa_sobhy_mohamed_61d482cd573e3.pdf'),
(18, 1, 'Dyaa sobhy mohamed', 'sobhydyaa@gmail.com', '01550452820', '2022-01-04', '19:24:32', 'technical-office-engineer_Dyaa_sobhy_mohamed_61d482d0b254c.pdf'),
(19, 1, 'Ebram Magdy', 'ebrammagdy98@gmail.com', '01284736819', '2022-01-06', '02:19:18', 'technical-office-engineer_Ebram_Magdy_61d6358656781.pdf'),
(20, 1, 'أحمد بربش', 'ahmedbirbsh95@gmail.com', '01004992398', '2022-01-15', '15:20:25', 'technical-office-engineer_أحمد_بربش_61e2ca197a501.pdf'),
(21, 1, 'عمرو سعيد مصطفى', 'amrsaid3122@gmail.com', '01159129503', '2022-02-01', '18:51:19', 'technical-office-engineer_عمرو_سعيد_مصطفى_61f96507bbdd7.pdf'),
(22, 1, 'ahmed sabala', 'ahmedsabala90@gmail.com', '01093991957', '2022-02-21', '17:29:53', 'technical-office-engineer_ahmed_sabala_6213aff0cb50f.pdf'),
(23, 1, 'نورهان محمود غانم', 'nora86388@gmail.com', '01141417177', '2022-03-14', '17:34:04', 'technical-office-engineer_نورهان_محمود_غانم_622f606c48bd8.pdf'),
(24, 1, 'Omar mahmoud abdelslam', 'omarabdelslam1996@gmail.com', '01114891187', '2022-05-20', '21:14:06', 'technical-office-engineer_Omar_mahmoud_abdelslam_6287e87e3ebf6.pdf'),
(25, 1, 'Hedra Zaki Wahba', 'hedrazaki1@gmail.com', '01228079044', '2022-06-02', '09:04:17', 'technical-office-engineer_Hedra_Zaki_Wahba_629860f197094.pdf'),
(26, 1, 'Amer Mohamed Abd-Elhamed ', 'Amermohamedabdelhamed@gmail.com', '01113769658', '2022-08-22', '09:59:15', 'technical-office-engineer_Amer_Mohamed_Abd-Elhamed__63033753026f5.pdf'),
(27, 1, 'Mahmoud Sabry Abdallah', 'mahmoudsabry2491@gmail.com', '01067993128', '2022-08-28', '20:34:52', 'technical-office-engineer_Mahmoud_Sabry_Abdallah_630bb54c08706.pdf'),
(28, 2, 'Mahmoud Sabry Abdallah', 'mahmoudsabry2491@gmail.com', '01067993128', '2022-08-28', '20:37:22', 'hacked-by-shahan-haxorasd_Mahmoud_Sabry_Abdallah_630bb5e24306d.pdf'),
(29, 2, 'Mohamed Alborji', 'alborji88@yahoo.com', '+201062713662', '2022-09-19', '00:35:31', 'hacked-by-amir-aslam_Mohamed_Alborji_63279d335324d.pdf'),
(30, 1, 'اسلام  الشربيني ', 'e.sherbeny@gmail.com', '01092703831', '2022-09-30', '21:37:30', 'technical-office-engineer_اسلام__الشربيني__6337457a612a1.pdf'),
(31, 1, 'Hager Hossney Hassan Elattar', 'hageralattar68@gmail.com', '01554746016', '2022-10-24', '20:03:25', 'technical-office-engineer_Hager_Hossney_Hassan_Elattar_6356d36d59082.pdf'),
(32, 2, 'HAISAM GAMALELDIN MOHAMED', 'hissamellethy@gmail.com', '+201229955540', '2022-10-26', '14:02:26', 'hacked-by-amir-aslam_HAISAM_GAMALELDIN_MOHAMED_635921d2a73f9.pdf'),
(33, 1, 'احمد قدرى عبد العزيز فرج', 'eng.ahmedkadry@gmail.com', '01096987500', '2022-10-30', '21:22:45', 'technical-office-engineer_احمد_قدرى_عبد_العزيز_فرج_635ecf0543369.pdf'),
(34, 2, 'Mahmoud Aldweek', 'mahoudaldweek@outlook.com', '01004424869', '2022-11-06', '23:22:22', 'hacked-by-amir-aslam_Mahmoud_Aldweek_6368258eb7a0a.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `careers`
--

CREATE TABLE `careers` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `body` text,
  `image` text,
  `modified_date` date DEFAULT NULL,
  `modified_time` time DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `creation_time` time DEFAULT NULL,
  `ar_title` varchar(255) DEFAULT NULL,
  `ar_tags` varchar(255) DEFAULT NULL,
  `ar_description` varchar(255) DEFAULT NULL,
  `ar_body` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `careers`
--

INSERT INTO `careers` (`id`, `title`, `slug`, `tags`, `description`, `body`, `image`, `modified_date`, `modified_time`, `status`, `creation_date`, `creation_time`, `ar_title`, `ar_tags`, `ar_description`, `ar_body`) VALUES
(1, 'Technical office engineer', 'technical-office-engineer', 'Technical office engineer', 'Technical office engineer', '&lt;h2&gt;Technical office engineer&lt;/h2&gt;\r\n\r\n&lt;h3&gt;&lt;br /&gt;\r\n&lt;span style=&quot;font-size:18px&quot;&gt;Job duties:&lt;/span&gt;&lt;/h3&gt;\r\n\r\n&lt;ul style=&quot;margin-left:80px&quot;&gt;\r\n	&lt;li&gt;&lt;span style=&quot;font-size:14px&quot;&gt;Bid pricing and quantities inventory.&lt;/span&gt;&lt;/li&gt;\r\n	&lt;li&gt;&lt;span style=&quot;font-size:14px&quot;&gt;Follow-up work and inventory quantities.&lt;/span&gt;&lt;/li&gt;\r\n	&lt;li&gt;&lt;span style=&quot;font-size:14px&quot;&gt;Preparing technical and financial offers.&lt;/span&gt;&lt;/li&gt;\r\n	&lt;li&gt;&lt;span style=&quot;font-size:14px&quot;&gt;Review of abstracts.&lt;/span&gt;&lt;/li&gt;\r\n	&lt;li&gt;&lt;span style=&quot;font-size:14px&quot;&gt;Avoid Excel and Microsoft.&lt;/span&gt;&lt;/li&gt;\r\n	&lt;li&gt;&lt;span style=&quot;font-size:14px&quot;&gt;Using computer programs.&lt;/span&gt;&lt;/li&gt;\r\n	&lt;li&gt;&lt;span style=&quot;font-size:14px&quot;&gt;Preparing technical feasibility studies.&lt;/span&gt;&lt;/li&gt;\r\n	&lt;li&gt;&lt;span style=&quot;font-size:14px&quot;&gt;Use AutoCAD.&lt;/span&gt;&lt;/li&gt;\r\n&lt;/ul&gt;\r\n\r\n&lt;p&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Experience: 3 years - 5 years&lt;br /&gt;\r\nSpecialization: civil or architecture&lt;br /&gt;\r\nThe salary is determined in the interview&lt;br /&gt;\r\nThe Fifth Settlement&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;a href=&quot;mailto:jobs@elrowad-eg.com&quot;&gt;jobs@elrowad-eg.com&lt;/a&gt;&lt;/p&gt;\r\n', 'careers/2021/01/19/elrowad_careers_60060717b7662.jpg', '2021-01-19', '00:21:56', 1, '2021-01-19', '00:15:49', 'مهندس مكتب فني ', 'مهندس مكتب فني ', 'مهندس مكتب فني ', '<h2 style=\"text-align:right\"><span style=\"font-size:18px\">مهندس مكتب فني</span></h2>\r\n\r\n<p style=\"margin-left:40px; text-align:right\"><strong><span style=\"font-size:14px\">مهام الوظيفة:</span></strong></p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:16px\">تسعير عطاءات وحصر كميات.</span></p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:16px\">متابعه اعمال وحصر الكميات.</span></p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:16px\">اعداد عروض فنيه وماليه.</span></p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:16px\">مراجعه مستخلصات.</span></p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:16px\">اجاده اكسيل وميكروسوفت.</span></p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:16px\">استخدام برامج الحاسب الالي.</span></p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:16px\">اعداد دراسات الجدوي الفنيه.</span></p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:16px\">استخدام الاوتوكاد</span>.</p>\r\n\r\n<p style=\"text-align:right\">&nbsp;</p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:14px\"><strong>الخبره</strong>:&nbsp; 3 سنوات - 5 سنوات</span></p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:14px\"><strong>التخصص </strong>: مدني او عماره</span></p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:14px\">يتم تحديد الراتب في المقابله</span></p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:14px\">التجمع الخامس</span></p>\r\n\r\n<p style=\"text-align:right\"><a href=\"mailto:jobs@elrowad-eg.com\">jobs@elrowad-eg.com</a></p>\r\n'),
(2, 'HACKED BY AMIR ASLAM', 'hacked-by-amir-aslam', '', 'PAKISTAN ZINDABAD ', '&lt;p&gt;HACKED BY AMIR ASLAM&lt;/p&gt;\r\n', '', '2022-08-28', '23:24:44', 1, '2021-05-27', '05:16:55', 'asdasd', '', '', '<p>asdasd</p>\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `body` text,
  `logo` text,
  `creation_date` date DEFAULT NULL,
  `creation_time` time DEFAULT NULL,
  `modified_date` date DEFAULT NULL,
  `modified_time` time DEFAULT NULL,
  `ar_name` varchar(255) DEFAULT NULL,
  `ar_tags` varchar(255) DEFAULT NULL,
  `ar_description` varchar(300) DEFAULT NULL,
  `ar_body` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `slug`, `tags`, `description`, `body`, `logo`, `creation_date`, `creation_time`, `modified_date`, `modified_time`, `ar_name`, `ar_tags`, `ar_description`, `ar_body`) VALUES
(2, 'New-urban', 'new-urban', '', '', '<p>New-urban</p>\r\n', 'clients/2020/07/21/elrowad_clients_5f16f48243306.jpg', '2020-07-21', '15:58:37', '2020-07-21', '15:58:37', 'New-urban', '', '', '<p>New-urban</p>\r\n'),
(3, 'military', 'military', '', '', '<p>military</p>\r\n', 'clients/2020/07/21/elrowad_clients_5f16f4a921172.jpg', '2020-07-21', '15:59:14', '2020-07-21', '15:59:14', 'military', '', '', '<p>military</p>\r\n'),
(4, 'educational', 'educational', '', 'educational', '<p>educational</p>\r\n', 'clients/2020/07/21/elrowad_clients_5f16f4c22fb1a.jpg', '2020-07-21', '15:59:38', '2020-07-21', '15:59:38', 'educational', '', '', '<p>educational</p>\r\n'),
(5, 'saic', 'saic', '', 'saic', '<p>saic</p>\r\n', 'clients/2020/07/21/elrowad_clients_5f16f4ddcb85f.png', '2020-07-21', '16:00:06', '2020-07-21', '16:00:06', 'saic', '', '', '<p style=\"text-align: center;\">saic</p>\r\n'),
(6, 'hassan allam', 'hassan-allam', '', 'hassan allam', '<p>hassan allam</p>\r\n', 'clients/2020/07/21/elrowad_clients_5f16f4f569a75.jpg', '2020-07-21', '16:00:28', '2020-07-21', '16:00:28', 'hassan allam', '', '', '<p>hassan allam</p>\r\n'),
(7, 'alrowad', 'alrowad', '', '', '<p>alrowad</p>\r\n', 'clients/2020/07/21/elrowad_clients_5f16f51854c79.png', '2020-07-21', '16:01:06', '2020-07-21', '16:01:06', 'alrowad', '', '', '<p>alrowad</p>\r\n'),
(8, 'almarasem', 'almarasem', '', '', '<p>almarasem</p>\r\n', 'clients/2020/07/21/elrowad_clients_5f16f535ba3a7.jpg', '2020-07-21', '16:01:32', '2021-05-27', '05:18:16', 'almarasem', '', '', '<p>almarasem</p>\r\n'),
(9, 'azhar', 'azhar', '', '', '<p>azhar</p>\r\n', 'clients/2020/07/21/elrowad_clients_5f16f54f302e1.jpg', '2020-07-21', '16:01:54', '2020-07-21', '16:01:54', 'azhar', '', '', '<p>azhar</p>\r\n'),
(10, 'awqaf', 'awqaf', '', '', '<p>awqaf</p>\r\n', 'clients/2020/07/21/elrowad_clients_5f16f5639c4a4.jpg', '2020-07-21', '16:02:13', '2020-07-21', '16:02:13', 'awqaf', '', '', '<p>awqaf</p>\r\n'),
(11, 'asdas', 'asdas', '', 'asd', '<p>asdasd</p>\r\n', '', '2021-05-27', '05:18:57', '2021-05-27', '05:18:57', 'asd', '', '', '<p>asdasd</p>\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `body` text,
  `image` text,
  `alt` varchar(255) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `creation_time` time DEFAULT NULL,
  `modified_date` date DEFAULT NULL,
  `modified_time` time DEFAULT NULL,
  `section_id` int(11) DEFAULT NULL,
  `ar_title` varchar(255) DEFAULT NULL,
  `ar_tags` varchar(255) DEFAULT NULL,
  `ar_description` varchar(300) DEFAULT NULL,
  `ar_body` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `slug`, `tags`, `description`, `body`, `image`, `alt`, `creation_date`, `creation_time`, `modified_date`, `modified_time`, `section_id`, `ar_title`, `ar_tags`, `ar_description`, `ar_body`) VALUES
(3, 'All arabic Phases School', 'all-arabic-phases-school', '', 'Construction ', '<p><span style=\"font-size:16px\"><strong>Owner:</strong></span></p>\r\n\r\n<p>Educational Buildings Authority</p>\r\n\r\n<p><strong><span style=\"font-size:16px\">Project Name:</span></strong></p>\r\n\r\n<p>All arabic Phases School<br />\r\n<strong><span style=\"font-size:16px\">Location:</span></strong></p>\r\n\r\n<p>Cairo - Menshat Naser</p>\r\n\r\n<p><span style=\"font-size:16px\"><strong>Scope:</strong></span></p>\r\n\r\n<p>Construction&nbsp;</p>\r\n\r\n<p><strong><span style=\"font-size:16px\">Year:</span></strong></p>\r\n\r\n<p>2019/2020</p>\r\n', 'projects/2020/07/21/elrowad_projects_5f170328ec1e8.jpg', 'All arabic Phases School', '2020-07-21', '17:01:13', '2020-07-27', '16:40:53', 6, 'مدرسة جميع مراحل عربي', '', 'بناء متكامل', '<p style=\"text-align:right\"><span style=\"font-size:16px\"><strong>المالك:</strong></span></p>\r\n\r\n<p style=\"text-align:right\">هيئه الابنيه التعليميه</p>\r\n\r\n<p style=\"text-align:right\"><strong><span style=\"font-size:16px\">اسم المشروع:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">مدرسة جميع مراحل عربي<br />\r\n<strong><span style=\"font-size:16px\">العنوان:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">القاهره - منشاه ناصر</p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:16px\"><strong>نوع الاعمال:</strong></span></p>\r\n\r\n<p style=\"text-align:right\">بناء متكامل<br />\r\n<strong><span style=\"font-size:16px\">السنه:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">2019/2020</p>\r\n'),
(4, 'Moustafa Kamel Language School', 'moustafa-kamel-language-school', '', 'Integrated building (ramp)', '<p><span style=\"font-size:16px\"><strong>Owner:</strong></span></p>\r\n\r\n<p>Educational Buildings Authority</p>\r\n\r\n<p><strong><span style=\"font-size:16px\">Project Name:</span></strong></p>\r\n\r\n<p>Moustafa Kamel Language School<br />\r\n<strong><span style=\"font-size:16px\">Location:</span></strong></p>\r\n\r\n<p>Cairo - Helwan&nbsp;</p>\r\n\r\n<p><span style=\"font-size:16px\"><strong>Scope:</strong></span></p>\r\n\r\n<p>Integrated building (ramp)</p>\r\n\r\n<p><strong><span style=\"font-size:16px\">Year:</span></strong></p>\r\n\r\n<p>2020</p>\r\n', 'projects/2020/07/27/elrowad_projects_5f1ee8372a857.jpg', 'Moustafa Kamel Language School', '2020-07-25', '15:29:36', '2020-07-27', '16:50:11', 6, 'مدرسه مصطفي كامل لغات', '', 'بناء متكامل (تعليه)', '<p style=\"text-align:right\"><span style=\"font-size:16px\"><strong>المالك:</strong></span></p>\r\n\r\n<p style=\"text-align:right\">هيئه الابنيه التعليميه</p>\r\n\r\n<p style=\"text-align:right\"><strong><span style=\"font-size:16px\">اسم المشروع:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">مدرسه مصطفي كامل لغات<br />\r\n<strong><span style=\"font-size:16px\">العنوان:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">القاهره - حلوان</p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:16px\"><strong>نوع الاعمال:</strong></span></p>\r\n\r\n<p style=\"text-align:right\">بناء متكامل (تعليه)<br />\r\n<strong><span style=\"font-size:16px\">السنه:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">2020</p>\r\n'),
(5, 'Official language school', 'official-language-school', '', 'Building integrated (expansion - a buffer)', '<p><span style=\"font-size:16px\"><strong>Owner:</strong></span></p>\r\n\r\n<p>Educational Buildings Authority</p>\r\n\r\n<p><strong><span style=\"font-size:16px\">Project Name:</span></strong></p>\r\n\r\n<p>Official language school<br />\r\n<strong><span style=\"font-size:16px\">Location:</span></strong></p>\r\n\r\n<p>Cairo - Al Mokatem</p>\r\n\r\n<p><span style=\"font-size:16px\"><strong>Scope:</strong></span></p>\r\n\r\n<p>Building integrated (expansion - a buffer)</p>\r\n\r\n<p><strong><span style=\"font-size:16px\">Year:</span></strong></p>\r\n\r\n<p>2018/2019</p>\r\n', 'projects/2020/07/27/elrowad_projects_5f1ed32dc0fa4.jpg', 'Official language school', '2020-07-25', '15:43:02', '2020-07-27', '15:17:20', 6, 'مدرسه رسميه لغات', '', ' بناء متكامل ( توسعات - تعليه) ', '<p style=\"text-align:right\"><span style=\"font-size:16px\"><strong>المالك:</strong></span></p>\r\n\r\n<p style=\"text-align:right\">هيئه الابنيه التعليميه</p>\r\n\r\n<p style=\"text-align:right\"><strong><span style=\"font-size:16px\">اسم المشروع:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">مدرسة جميع مراحل عربي<br />\r\n<strong><span style=\"font-size:16px\">العنوان:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">القاهره - المقطم</p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:16px\"><strong>نوع الاعمال:</strong></span></p>\r\n\r\n<p style=\"text-align:right\">&nbsp;بناء متكامل ( توسعات - تعليه)&nbsp;<br />\r\n<strong><span style=\"font-size:16px\">السنه:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">2018/2019</p>\r\n'),
(6, 'Summits International Schools', 'summits-international-schools', '', 'Construction ', '&lt;p&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;Owner:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Al-Qemam for educational projects and advanced schools&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Project Name:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Summits International Schools&lt;br /&gt;\r\n&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Location:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Cairo - Maadi&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;Scope:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Construction&amp;nbsp;&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Year:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;2019/2020&lt;/p&gt;\r\n', 'projects/2020/07/25/elrowad_projects_5f1c38065127e.jpg', 'Summits International Schools', '2020-07-25', '15:48:38', '2020-07-25', '15:48:38', 6, 'مدارس Summits International ', '', 'بناء متكامل', '&lt;p style=&quot;text-align:right&quot;&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;المالك:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;شركه القمم للمشروعات التعليميه والمدارس المتطوره&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;اسم المشروع:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;مدارس Summits International&amp;nbsp;&lt;br /&gt;\r\n&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;العنوان:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;القاهره - المعادي&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;نوع الاعمال:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;بناء متكامل&lt;br /&gt;\r\n&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;السنه:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;2012/2013&lt;/p&gt;\r\n'),
(7, 'Privilege Language schools', 'privilege-language-schools', '', 'Privilege Language schools', '&lt;p&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;Owner:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Al-Qemam for educational projects and advanced schools&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Project Name:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Privilege Language schools&lt;br /&gt;\r\n&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Location:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Cairo - Maadi&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;Scope:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Construction&amp;nbsp;&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Year:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;2019/2020&lt;/p&gt;\r\n', 'projects/2020/07/25/elrowad_projects_5f1c38830b9cb.jpg', 'Privilege Language schools', '2020-07-25', '15:52:11', '2020-07-25', '15:52:11', 6, 'مدارس Privilege للغات', '', 'بناء متكامل', '&lt;p style=&quot;text-align:right&quot;&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;المالك:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;شركه القمم للمشروعات التعليميه والمدارس المتطوره&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;اسم المشروع:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;مدارس Privilege للغات&amp;nbsp;&lt;br /&gt;\r\n&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;العنوان:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;القاهره - المعادي&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;نوع الاعمال:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;بناء متكامل&lt;br /&gt;\r\n&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;السنه:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;2012/2013&lt;/p&gt;\r\n'),
(8, 'New Cairo Hospital', 'new-cairo-hospital', '', 'Excavation and foundations and concrete structure', '&lt;p&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;Owner:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;HIG&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Project Name:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;New Cairo Hospital&lt;br /&gt;\r\n&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Location:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Cairo - New Cairo&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;Scope:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Excavation and foundations and concrete structure&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Year:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;2014&lt;/p&gt;\r\n', 'projects/2020/07/25/elrowad_projects_5f1c395e17571.jpg', 'New Cairo Hospital', '2020-07-25', '15:57:00', '2020-07-25', '15:57:00', 5, 'مستشفي القاهره الجديده', '', 'اعمال الحفر والاساسات والهيكل الخرساني', '&lt;p style=&quot;text-align:right&quot;&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;المالك:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;مجموعه الاستثمار الصحي (HIG)&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;اسم المشروع:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;مستشفي القاهره الجديده&lt;br /&gt;\r\n&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;العنوان:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;القاهره - القاهره الجديده&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;نوع الاعمال:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;اعمال الحفر والاساسات والهيكل الخرساني&lt;br /&gt;\r\n&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;السنه:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;2014&lt;/p&gt;\r\n'),
(9, 'Al Zahraa University Hospital', 'al-zahraa-university-hospital', '', '2006/2005: Renovations (Development of the Reception and Emergency Section)2007/2006: Renovations (Batinah Department Development)', '<p><span style=\"font-size:16px\"><strong>Owner:</strong></span></p>\r\n\r\n<p>AL Azhar University</p>\r\n\r\n<p><strong><span style=\"font-size:16px\">Project Name:</span></strong></p>\r\n\r\n<p>Al Zahraa University Hospital<br />\r\n<strong><span style=\"font-size:16px\">Location:</span></strong></p>\r\n\r\n<p>Cairo&nbsp;</p>\r\n\r\n<p><span style=\"font-size:16px\"><strong>Scope:</strong></span></p>\r\n\r\n<p><strong>2006/2005:</strong> Renovations (Development of the Reception and Emergency Section)</p>\r\n\r\n<p><strong>2007/2006: </strong>Renovations (Batinah Department Development)</p>\r\n\r\n<p>&nbsp;</p>\r\n', '', 'Al Zahraa Hospital', '2020-07-25', '16:06:08', '2021-08-04', '15:39:45', 5, 'مستشفي الزهراء الجامعي', '', '2006/2005 :  ترميمات (تطوير قسم الاستقبال والطوارئ)\r\n2007/2006 : ترميمات (تطوير قسم الباطنه)\r\n', '<p style=\"text-align:right\"><span style=\"font-size:16px\"><strong>المالك:</strong></span></p>\r\n\r\n<p style=\"text-align:right\">جامعه الازهر</p>\r\n\r\n<p style=\"text-align:right\"><strong><span style=\"font-size:16px\">اسم المشروع:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">مستشفي الزهراء الجامعي<br />\r\n<strong><span style=\"font-size:16px\">العنوان:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">القاهره&nbsp;</p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:16px\"><strong>نوع الاعمال:</strong></span></p>\r\n\r\n<p style=\"text-align:right\"><strong>2006/2005 :&nbsp;</strong> ترميمات (تطوير قسم الاستقبال والطوارئ)<br />\r\n<strong>2007/2006 :</strong> ترميمات (تطوير قسم الباطنه)</p>\r\n'),
(10, 'Cairo University Hospitals (Kasr El Ainy)', 'cairo-university-hospitals-kasr-el-ainy', '', 'Renovations (maintenance and development work for the oncology and nuclear medicine hospital building in Kasr El Ainy)', '<p><span style=\"font-size:16px\"><strong>Owner:</strong></span></p>\r\n\r\n<p>Cairo University</p>\r\n\r\n<p><strong><span style=\"font-size:16px\">Project Name:</span></strong></p>\r\n\r\n<p>Cairo University Hospitals (Kasr El Ainy)<br />\r\n<strong><span style=\"font-size:16px\">Location:</span></strong></p>\r\n\r\n<p>Cairo&nbsp;</p>\r\n\r\n<p><span style=\"font-size:16px\"><strong>Scope:</strong></span></p>\r\n\r\n<p>Renovations (maintenance and development work for the oncology and nuclear medicine hospital building in <span style=\"color:rgb(0, 0, 0); font-family:poppins,sans-serif\">Kasr El Ainy</span>)</p>\r\n\r\n<p><strong><span style=\"font-size:16px\">Year:</span></strong></p>\r\n\r\n<p>2006/2007</p>\r\n', 'projects/2020/07/25/elrowad_projects_5f1c3cd136844.jpg', '', '2020-07-25', '16:11:05', '2020-07-25', '16:53:38', 5, 'مستشفيات جامعه القاهره (القصر العيني)', '', 'ترميمات (اعمال صيانه وتطوير لمبني مستشفي الاورام والطب النووي بالقصر العيني)', '<p style=\"text-align:right\"><span style=\"font-size:16px\"><strong>المالك:</strong></span></p>\r\n\r\n<p style=\"text-align:right\">جامعه القاهره</p>\r\n\r\n<p style=\"text-align:right\"><strong><span style=\"font-size:16px\">اسم المشروع:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">مستشفيات جامعه القاهره (القصر العيني)<br />\r\n<strong><span style=\"font-size:16px\">العنوان:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">القاهره&nbsp;</p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:16px\"><strong>نوع الاعمال:</strong></span></p>\r\n\r\n<p style=\"text-align:right\">ترميمات (اعمال صيانه وتطوير لمبني مستشفي الاورام والطب النووي بالقصر العيني)<br />\r\n<strong><span style=\"font-size:16px\">السنه:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">2006/2007</p>\r\n'),
(11, 'Ghabbour Auto', 'ghabbour-auto', '', 'Marble', '<p><span style=\"font-size:16px\"><strong>Main Contractor:</strong></span></p>\r\n\r\n<p>SIAC</p>\r\n\r\n<p><strong><span style=\"font-size:16px\">Project Name:</span></strong></p>\r\n\r\n<p>Ghabbour Auto<br />\r\n<strong><span style=\"font-size:16px\">Location:</span></strong></p>\r\n\r\n<p>Cairo - Ring Road</p>\r\n\r\n<p><span style=\"font-size:16px\"><strong>Scope:</strong></span></p>\r\n\r\n<p>Marble</p>\r\n\r\n<p><strong><span style=\"font-size:16px\">Year:</span></strong></p>\r\n\r\n<p>2014</p>\r\n', 'projects/2020/07/27/elrowad_projects_5f1eeea211b9c.jpg', 'Ghabbour Auto', '2020-07-27', '07:51:18', '2020-07-27', '17:12:04', 2, 'معرض  غبور ', '', 'اعمال رخام', '<p style=\"text-align:right\"><span style=\"font-size:16px\"><strong>مقاول رئيسي:</strong></span></p>\r\n\r\n<p style=\"text-align:right\">سياك</p>\r\n\r\n<p style=\"text-align:right\"><strong><span style=\"font-size:16px\">اسم المشروع:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">معرض&nbsp; غبور&nbsp;</p>\r\n\r\n<p style=\"text-align:right\"><strong><span style=\"font-size:16px\">العنوان:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">القاهره - الطريق الدائري</p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:16px\"><strong>نوع الاعمال:</strong></span></p>\r\n\r\n<p style=\"text-align:right\">اعمال رخام<br />\r\n<strong><span style=\"font-size:16px\">السنه:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">2014</p>\r\n'),
(12, 'Magara Mall', 'magara-mall', '', 'Marble', '&lt;p&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;Main Contractor:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;SIAC&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Project Name:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Magara Mall&lt;br /&gt;\r\n&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Location:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Giza - Shikh Zayed&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;Scope:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Marble&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Year:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;2019&lt;/p&gt;\r\n', 'projects/2020/07/27/elrowad_projects_5f1e6c9726acc.jpg', '', '2020-07-27', '07:58:10', '2020-07-27', '07:58:10', 2, 'مول المجره', '', 'اعمال رخام', '&lt;p style=&quot;text-align:right&quot;&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;مقاول رئيسي:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;سياك&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;اسم المشروع:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;مول المجره&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;العنوان:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;الجيزه - الشيخ زايد&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;نوع الاعمال:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;اعمال رخام&lt;br /&gt;\r\n&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;السنه:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;2019&lt;/p&gt;\r\n'),
(13, 'Ministry of Housing, Utilities and Urban Communities', 'ministry-of-housing,-utilities-and-urban-communities', '', 'Marble', '<p><span style=\"font-size:16px\"><strong>Main Contractor:</strong></span></p>\r\n\r\n<p><span dir=\"ltr\">Hassan Allam Holding</span></p>\r\n\r\n<p><strong><span style=\"font-size:16px\">Project Name:</span></strong></p>\r\n\r\n<p>Ministry of Housing, Utilities and Urban Communities<br />\r\n<strong><span style=\"font-size:16px\">Location:</span></strong></p>\r\n\r\n<p>New Administrative Capital</p>\r\n\r\n<p><span style=\"font-size:16px\"><strong>Scope:</strong></span></p>\r\n\r\n<p>Marble</p>\r\n\r\n<p><strong><span style=\"font-size:16px\">Year:</span></strong></p>\r\n\r\n<p>2019/2020</p>\r\n', 'projects/2020/07/27/elrowad_projects_5f1e70a2c71ca.jpg', '', '2020-07-27', '08:14:58', '2020-07-27', '08:15:51', 3, 'وزارة الاسكان والمرافق والمجتمعات العمرانية', '', 'اعمال رخام', '<p style=\"text-align:right\"><span style=\"font-size:16px\"><strong>مقاول رئيسي:</strong></span></p>\r\n\r\n<p style=\"text-align:right\">ابناء حسن علام</p>\r\n\r\n<p style=\"text-align:right\"><strong><span style=\"font-size:16px\">اسم المشروع:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">وزارة الاسكان والمرافق والمجتمعات العمرانية</p>\r\n\r\n<p style=\"text-align:right\"><strong><span style=\"font-size:16px\">العنوان:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">العاصمه الاداريه الجديده</p>\r\n\r\n<p style=\"text-align:right\"><span style=\"font-size:16px\"><strong>نوع الاعمال:</strong></span></p>\r\n\r\n<p style=\"text-align:right\">اعمال رخام<br />\r\n<strong><span style=\"font-size:16px\">السنه:</span></strong></p>\r\n\r\n<p style=\"text-align:right\">2019/2020</p>\r\n'),
(14, 'Ministry of Foreign Affairs', 'ministry-of-foreign-affairs', '', 'Marble', '&lt;p&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;Main Contractor:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;SIAC&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Project Name:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Ministry of Foreign Affairs&lt;br /&gt;\r\n&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Location:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;New Administrative Capital&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;Scope:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Marble&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Year:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;2019/2020&lt;/p&gt;\r\n', 'projects/2020/07/27/elrowad_projects_5f1e72bbf01ac.jpeg', '', '2020-07-27', '08:24:48', '2020-07-27', '08:24:48', 3, 'وزاره الخارجيه', '', 'اعمال رخام', '&lt;p style=&quot;text-align:right&quot;&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;مقاول رئيسي:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;سياك&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;اسم المشروع:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;وزاره الخارجيه&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;العنوان:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;العاصمه الاداريه الجديده&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;نوع الاعمال:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;اعمال رخام&lt;br /&gt;\r\n&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;السنه:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;2019/2020&lt;/p&gt;\r\n'),
(15, 'Dar Massr - Social Housing', 'dar-massr-social-housing', '', 'Construction', '&lt;p&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;Main Contractor:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Engineering Authority of the Armed Forces&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Project Name:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Dar Massr&lt;br /&gt;\r\n&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Location:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Badr City&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;Scope:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;Construction&lt;/p&gt;\r\n\r\n&lt;p&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;Year:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p&gt;2015/2017&lt;/p&gt;\r\n', 'projects/2020/07/27/elrowad_projects_5f1e748eaa961.jpg', '', '2020-07-27', '08:36:06', '2020-07-27', '08:36:06', 1, 'مشروع دار مصر - اسكان اجتماعي', '', 'بناء متكامل', '&lt;p style=&quot;text-align:right&quot;&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;مقاول رئيسي:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;الهيئه الهندسيه للقوات المسلحه&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;اسم المشروع:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;مشروع دار مصر - اسكان اجتماعي&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;العنوان:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;مدينه بدر&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;&lt;span style=&quot;font-size:16px&quot;&gt;&lt;strong&gt;نوع الاعمال:&lt;/strong&gt;&lt;/span&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;بناء متكامل&lt;br /&gt;\r\n&lt;strong&gt;&lt;span style=&quot;font-size:16px&quot;&gt;السنه:&lt;/span&gt;&lt;/strong&gt;&lt;/p&gt;\r\n\r\n&lt;p style=&quot;text-align:right&quot;&gt;2015/2017&lt;/p&gt;\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `project_multiphotos`
--

CREATE TABLE `project_multiphotos` (
  `img_id` int(10) UNSIGNED NOT NULL,
  `id` int(10) UNSIGNED DEFAULT NULL,
  `src` text,
  `alt` varchar(255) DEFAULT NULL,
  `type` varchar(55) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `project_multiphotos`
--

INSERT INTO `project_multiphotos` (`img_id`, `id`, `src`, `alt`, `type`) VALUES
(19, 8, 'projects/2020/07/25/elrowad_projects_5f1c396df2cc3.jpg', NULL, NULL),
(20, 8, 'projects/2020/07/25/elrowad_projects_5f1c396ee2df0.jpg', NULL, NULL),
(24, 12, 'projects/2020/07/27/elrowad_projects_5f1e6c9fce01d.jpg', NULL, NULL),
(25, 12, 'projects/2020/07/27/elrowad_projects_5f1e6c9fdbc43.jpg', NULL, NULL),
(26, 12, 'projects/2020/07/27/elrowad_projects_5f1e6c9fec213.jpg', NULL, NULL),
(36, 13, 'projects/2020/07/27/elrowad_projects_5f1e710997229.jpg', NULL, NULL),
(37, 13, 'projects/2020/07/27/elrowad_projects_5f1e7109cd223.jpg', NULL, NULL),
(38, 13, 'projects/2020/07/27/elrowad_projects_5f1e710a08846.jpg', NULL, NULL),
(39, 13, 'projects/2020/07/27/elrowad_projects_5f1e710a36427.jpg', NULL, NULL),
(40, 13, 'projects/2020/07/27/elrowad_projects_5f1e710a63b66.jpg', NULL, NULL),
(41, 13, 'projects/2020/07/27/elrowad_projects_5f1e710a90d1c.jpg', NULL, NULL),
(42, 13, 'projects/2020/07/27/elrowad_projects_5f1e710ac10ff.jpg', NULL, NULL),
(43, 13, 'projects/2020/07/27/elrowad_projects_5f1e710aef0a8.jpg', NULL, NULL),
(44, 13, 'projects/2020/07/27/elrowad_projects_5f1e710b2856a.jpg', NULL, NULL),
(45, 13, 'projects/2020/07/27/elrowad_projects_5f1e710b558ab.jpg', NULL, NULL),
(46, 13, 'projects/2020/07/27/elrowad_projects_5f1e710b830f2.jpg', NULL, NULL),
(47, 13, 'projects/2020/07/27/elrowad_projects_5f1e710baf519.jpg', NULL, NULL),
(48, 13, 'projects/2020/07/27/elrowad_projects_5f1e710bdcbae.jpg', NULL, NULL),
(49, 14, 'projects/2020/07/27/elrowad_projects_5f1e72d310e57.jpeg', NULL, NULL),
(50, 14, 'projects/2020/07/27/elrowad_projects_5f1e72d345d46.jpeg', NULL, NULL),
(51, 14, 'projects/2020/07/27/elrowad_projects_5f1e72d36ea93.jpeg', NULL, NULL),
(52, 14, 'projects/2020/07/27/elrowad_projects_5f1e72d39b3b3.jpeg', NULL, NULL),
(53, 14, 'projects/2020/07/27/elrowad_projects_5f1e72d3c707a.jpeg', NULL, NULL),
(54, 14, 'projects/2020/07/27/elrowad_projects_5f1e72d3f2515.jpeg', NULL, NULL),
(55, 14, 'projects/2020/07/27/elrowad_projects_5f1e72d43adc5.jpeg', NULL, NULL),
(56, 14, 'projects/2020/07/27/elrowad_projects_5f1e72d465b86.jpeg', NULL, NULL),
(57, 14, 'projects/2020/07/27/elrowad_projects_5f1e72d48a2f3.jpeg', NULL, NULL),
(58, 14, 'projects/2020/07/27/elrowad_projects_5f1e72d4ad43d.jpeg', NULL, NULL),
(59, 14, 'projects/2020/07/27/elrowad_projects_5f1e72d4d0c9e.jpeg', NULL, NULL),
(60, 14, 'projects/2020/07/27/elrowad_projects_5f1e72d4f3b84.jpeg', NULL, NULL),
(61, 14, 'projects/2020/07/27/elrowad_projects_5f1e72d52db9f.jpeg', NULL, NULL),
(62, 15, 'projects/2020/07/27/elrowad_projects_5f1e74e4b6646.jpg', NULL, NULL),
(63, 15, 'projects/2020/07/27/elrowad_projects_5f1e74e515c99.jpg', NULL, NULL),
(64, 15, 'projects/2020/07/27/elrowad_projects_5f1e74ea3f63f.jpg', NULL, NULL),
(65, 15, 'projects/2020/07/27/elrowad_projects_5f1e74ee5c79d.jpg', NULL, NULL),
(66, 15, 'projects/2020/07/27/elrowad_projects_5f1e74f27388c.jpg', NULL, NULL),
(67, 15, 'projects/2020/07/27/elrowad_projects_5f1e74f5d22fa.jpg', NULL, NULL),
(68, 5, 'projects/2020/07/27/elrowad_projects_5f1ed3bb9c92f.jpg', NULL, NULL),
(69, 5, 'projects/2020/07/27/elrowad_projects_5f1ed3be4fca0.jpg', NULL, NULL),
(70, 5, 'projects/2020/07/27/elrowad_projects_5f1ed3c06dacc.jpg', NULL, NULL),
(71, 5, 'projects/2020/07/27/elrowad_projects_5f1ed3c495d88.jpg', NULL, NULL),
(72, 5, 'projects/2020/07/27/elrowad_projects_5f1ed3c950a07.jpg', NULL, NULL),
(73, 3, 'projects/2020/07/27/elrowad_projects_5f1ee74d57dc1.jpg', NULL, NULL),
(74, 3, 'projects/2020/07/27/elrowad_projects_5f1ee752c79e3.jpg', NULL, NULL),
(75, 3, 'projects/2020/07/27/elrowad_projects_5f1ee75776931.jpg', NULL, NULL),
(76, 3, 'projects/2020/07/27/elrowad_projects_5f1ee75b232ed.jpg', NULL, NULL),
(79, 4, 'projects/2020/07/27/elrowad_projects_5f1ee953854d1.jpg', NULL, NULL),
(80, 4, 'projects/2020/07/27/elrowad_projects_5f1ee9558179a.jpg', NULL, NULL),
(81, 11, 'projects/2020/07/27/elrowad_projects_5f1eee76032ff.jpg', NULL, NULL),
(82, 11, 'projects/2020/07/27/elrowad_projects_5f1eee7b5f7de.jpg', NULL, NULL),
(83, 11, 'projects/2020/07/27/elrowad_projects_5f1eee818d47d.jpg', NULL, NULL),
(84, 11, 'projects/2020/07/27/elrowad_projects_5f1eee87da00b.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project_sections`
--

CREATE TABLE `project_sections` (
  `section_id` tinyint(4) UNSIGNED NOT NULL,
  `section_name` varchar(65) NOT NULL,
  `section_slug` varchar(65) DEFAULT NULL,
  `section_tags` varchar(255) DEFAULT NULL,
  `section_description` varchar(255) DEFAULT NULL,
  `section_ar_name` varchar(65) DEFAULT NULL,
  `section_ar_tags` varchar(255) DEFAULT NULL,
  `section_ar_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- Dumping data for table `project_sections`
--

INSERT INTO `project_sections` (`section_id`, `section_name`, `section_slug`, `section_tags`, `section_description`, `section_ar_name`, `section_ar_tags`, `section_ar_description`) VALUES
(1, 'Residential', 'residential', '', '', 'سكني', '', ''),
(2, 'Commercial', 'commercial', '', '', 'تجاري', '', ''),
(3, 'Administration', 'administration', '', '', 'اداري', '', ''),
(4, 'Industrial', 'industrial', '', '', 'صناعي', '', ''),
(5, 'Hospitals', 'hospitals', '', '', 'مستشفيات', '', ''),
(6, 'Schools', 'schools', '', '', 'مدارس', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `body` text,
  `image` text,
  `alt` varchar(255) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  `creation_time` time DEFAULT NULL,
  `modified_date` date DEFAULT NULL,
  `modified_time` time DEFAULT NULL,
  `ar_title` varchar(255) DEFAULT NULL,
  `ar_tags` varchar(255) DEFAULT NULL,
  `ar_description` varchar(300) DEFAULT NULL,
  `ar_body` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `title`, `slug`, `tags`, `description`, `body`, `image`, `alt`, `creation_date`, `creation_time`, `modified_date`, `modified_time`, `ar_title`, `ar_tags`, `ar_description`, `ar_body`) VALUES
(1, 'sd', 'sdfsd', '', 'sdfsdf', '<p>sdfsdf</p>\r\n', '', '', '2021-05-27', '05:04:45', '2021-05-27', '05:04:45', 'sdfsdfsdf', '', '', '<p>sdfsdf</p>\r\n'),
(2, 'dfsdf', 'dfsdfsdfsdf', '', 'sdfsdf', '<p>sdfsdf</p>\r\n', 'services/2021/05/27/elrowad_services_60af0eb774752.jpg', '', '2021-05-27', '05:13:34', '2021-05-27', '05:15:16', 'sdfsdf', '', '', '<p>sdfsdf</p>\r\n');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`,`user_name`) USING BTREE,
  ADD UNIQUE KEY `user_name` (`user_name`) USING BTREE;

--
-- Indexes for table `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`applicant_id`);

--
-- Indexes for table `careers`
--
ALTER TABLE `careers`
  ADD PRIMARY KEY (`id`,`slug`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`,`slug`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`,`slug`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `project_multiphotos`
--
ALTER TABLE `project_multiphotos`
  ADD PRIMARY KEY (`img_id`),
  ADD UNIQUE KEY `id` (`img_id`) USING BTREE;

--
-- Indexes for table `project_sections`
--
ALTER TABLE `project_sections`
  ADD PRIMARY KEY (`section_id`,`section_name`) USING BTREE,
  ADD UNIQUE KEY `id` (`section_id`),
  ADD UNIQUE KEY `name` (`section_name`),
  ADD UNIQUE KEY `section_slug` (`section_slug`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`,`slug`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `applicants`
--
ALTER TABLE `applicants`
  MODIFY `applicant_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `careers`
--
ALTER TABLE `careers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `project_multiphotos`
--
ALTER TABLE `project_multiphotos`
  MODIFY `img_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `project_sections`
--
ALTER TABLE `project_sections`
  MODIFY `section_id` tinyint(4) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
