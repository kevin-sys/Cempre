-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2020 a las 21:23:15
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cemprebd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docente`
--

CREATE TABLE `docente` (
  `Identificacion` varchar(20) NOT NULL,
  `Apellidos` varchar(30) NOT NULL,
  `Nombres` varchar(30) NOT NULL,
  `lugarnacimiento` varchar(30) NOT NULL,
  `fechanacimiento` date NOT NULL,
  `genero` varchar(2) NOT NULL,
  `direccion` varchar(60) NOT NULL,
  `ciudad` varchar(30) NOT NULL,
  `correo` varchar(35) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `celular` varchar(10) NOT NULL,
  `nacionalidad` varchar(20) NOT NULL,
  `estadocivil` varchar(20) NOT NULL,
  `ProgramaAcademico` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `docente`
--

INSERT INTO `docente` (`Identificacion`, `Apellidos`, `Nombres`, `lugarnacimiento`, `fechanacimiento`, `genero`, `direccion`, `ciudad`, `correo`, `telefono`, `celular`, `nacionalidad`, `estadocivil`, `ProgramaAcademico`) VALUES
('8080089889', 'daza lopez', 'kevin', 'valledupar', '1890-10-10', 'M', 'barrio nando marin', 'valledupar', 'kevingc@gmail.com', '3113940', '3113940272', 'colombia', 'Soltero/a', 'Ingenieria Electronica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `NIT` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `NombreEmpresa` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Direccion` text COLLATE utf8mb4_spanish_ci NOT NULL,
  `Pais` varchar(70) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Departamento` varchar(70) COLLATE utf8mb4_spanish_ci NOT NULL,
  `Ciudad` varchar(70) COLLATE utf8mb4_spanish_ci NOT NULL,
  `RazonSocial` varchar(70) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`NIT`, `NombreEmpresa`, `Direccion`, `Pais`, `Departamento`, `Ciudad`, `RazonSocial`) VALUES
('3434349', 'ACAVEL', 'barrio nando marin', 'Colombia', 'cesar', 'valledupar', 'ACAVEL S A S'),
('8948938941', 'Avianca', 'Barrio mareigua', 'Colombia', 'Antioquia', 'Medellin', 'Avianca SAS'),
('904838494', 'Yogurt del cesar', 'barrio nando marin', 'Colombia', 'cesar', 'valledupar', 'yogurt SAS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `Identificacion` varchar(20) NOT NULL,
  `Apellidos` varchar(30) NOT NULL,
  `Nombres` varchar(30) NOT NULL,
  `lugarnacimiento` varchar(30) NOT NULL,
  `fechanacimiento` date NOT NULL,
  `genero` varchar(2) NOT NULL,
  `direccion` varchar(60) NOT NULL,
  `ciudad` varchar(30) NOT NULL,
  `correo` varchar(35) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `celular` varchar(10) NOT NULL,
  `nacionalidad` varchar(20) NOT NULL,
  `estadocivil` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`Identificacion`, `Apellidos`, `Nombres`, `lugarnacimiento`, `fechanacimiento`, `genero`, `direccion`, `ciudad`, `correo`, `telefono`, `celular`, `nacionalidad`, `estadocivil`) VALUES
('8080089889', 'daza lopez', 'kevin', '', '1980-10-01', 'M', 'barrio nando marin', 'valledupar', 'kevingc@gmail.com', '5577727', '3113940272', '', 'Soltero/a');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `Usuario` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `Contraseña` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `FechaRegistro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Identificacion` varchar(15) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`Usuario`, `Contraseña`, `FechaRegistro`, `Identificacion`) VALUES
('CEMPRE', 'CEMPRE', '2020-12-12 19:01:06', '1065');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `docente`
--
ALTER TABLE `docente`
  ADD PRIMARY KEY (`Identificacion`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`NIT`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`Identificacion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`Usuario`),
  ADD UNIQUE KEY `UKID` (`Identificacion`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
