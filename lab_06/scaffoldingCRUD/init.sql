CREATE DATABASE Canchitas_iw;
GO

USE Canchitas_iw;
GO

CREATE TABLE Empresa (
    id_empresa INT PRIMARY KEY IDENTITY(1,1),
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(150),
    telefono VARCHAR(20),
    email VARCHAR(100)
);
GO

CREATE TABLE Cancha (
    id_cancha INT PRIMARY KEY IDENTITY(1,1),
    id_empresa INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    tipo VARCHAR(50),
    precio_hora DECIMAL(8,2),

    CONSTRAINT FK_Cancha_Empresa
    FOREIGN KEY (id_empresa)
    REFERENCES Empresa(id_empresa)
);
GO

INSERT INTO Empresa (nombre, direccion, telefono, email)
VALUES
('EmpresaA', 'Direccion A', '999111111', 'empresaA@gmail.com'),
('EmpresaB', 'Direccion B', '999222222', 'empresaB@gmail.com');
GO

INSERT INTO Cancha (id_empresa, nombre, tipo, precio_hora)
VALUES
(1, 'CanchaA', 'Futbol', 50),
(1, 'CanchaB', 'Voley', 35),
(2, 'CanchaC', 'Basket', 45);
GO