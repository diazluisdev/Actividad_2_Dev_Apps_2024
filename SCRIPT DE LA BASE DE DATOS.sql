-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 07-04-2024 a las 22:55:13
-- Versión del servidor: 5.7.11
-- Versión de PHP: 5.6.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `appkodular`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_gastos`
--

CREATE TABLE `categoria_gastos` (
  `id_categoria` int(11) NOT NULL,
  `id_usuario` varchar(15) DEFAULT NULL,
  `fecha_categoria` date DEFAULT NULL,
  `nombre_categoria` varchar(150) DEFAULT NULL,
  `descripcion_categoria` varchar(350) DEFAULT NULL,
  `icono` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fuente_ingresos`
--

CREATE TABLE `fuente_ingresos` (
  `id_ingreso` int(11) NOT NULL,
  `id_usuario` varchar(15) DEFAULT NULL,
  `fecha_recepcion_fuente` date DEFAULT NULL,
  `nombre_fuente` varchar(250) DEFAULT NULL,
  `descripcion_fuente` varchar(250) DEFAULT NULL,
  `icono` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos`
--

CREATE TABLE `gastos` (
  `id_gastos` int(100) NOT NULL,
  `id_usuario` varchar(15) DEFAULT NULL,
  `fecha_gasto` date DEFAULT NULL,
  `nombre_gasto` varchar(250) DEFAULT NULL,
  `valor_gasto` double DEFAULT NULL,
  `categoria_gasto` varchar(100) DEFAULT NULL,
  `descripcion_gasto` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `cedula` varchar(15) NOT NULL,
  `tipo_identificacion` varchar(15) DEFAULT NULL,
  `contrasena` varchar(50) DEFAULT NULL,
  `pregunta_contra` varchar(250) DEFAULT NULL,
  `respuesta_contra` varchar(250) DEFAULT NULL,
  `primer_nombre` varchar(100) DEFAULT NULL,
  `segundo_nombre` varchar(100) DEFAULT NULL,
  `primer_apellido` varchar(100) DEFAULT NULL,
  `segundo_apellido` varchar(100) DEFAULT NULL,
  `genero` varchar(50) DEFAULT NULL,
  `correo` varchar(150) DEFAULT NULL,
  `numero_tel` varchar(15) DEFAULT NULL,
  `foto` varchar(250) DEFAULT NULL,
  `rol` varchar(15) DEFAULT NULL,
  `pais` varchar(100) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- Indices de la tabla `categoria_gastos`
--
ALTER TABLE `categoria_gastos`
  ADD PRIMARY KEY (`id_categoria`),
  ADD KEY `indice_categoria_id_usuario` (`id_usuario`);

--
-- Indices de la tabla `fuente_ingresos`
--
ALTER TABLE `fuente_ingresos`
  ADD PRIMARY KEY (`id_ingreso`),
  ADD KEY `indice_fuente_id_usuario` (`id_usuario`);

--
-- Indices de la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD PRIMARY KEY (`id_gastos`),
  ADD KEY `indice_gastos_id_usuarios` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`cedula`),
  ADD UNIQUE KEY `correo` (`correo`);


-- AUTO_INCREMENT de la tabla `categoria_gastos`
--
ALTER TABLE `categoria_gastos`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `fuente_ingresos`
--
ALTER TABLE `fuente_ingresos`
  MODIFY `id_ingreso` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `gastos`
--
ALTER TABLE `gastos`
  MODIFY `id_gastos` int(100) NOT NULL AUTO_INCREMENT;

--
-- Filtros para la tabla `categoria_gastos`
--
ALTER TABLE `categoria_gastos`
  ADD CONSTRAINT `fk_categoria_gastos_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`cedula`);

--
-- Filtros para la tabla `fuente_ingresos`
--
ALTER TABLE `fuente_ingresos`
  ADD CONSTRAINT `fk_fuente_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`cedula`);

--
-- Filtros para la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD CONSTRAINT `fk_gastos_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`cedula`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
