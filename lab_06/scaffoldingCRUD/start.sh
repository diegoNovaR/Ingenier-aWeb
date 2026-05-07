#!/bin/bash

/opt/mssql/bin/sqlservr &

echo "Esperando SQL Server..."
sleep 20

/opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "Password123*" -C -i /init.sql

wait