FROM mcr.microsoft.com/mssql/server:2022-latest

USER root

COPY init.sql /init.sql
COPY start.sh /start.sh

RUN chmod +x /start.sh

CMD ["/bin/bash", "/start.sh"]