USE [master]
GO
CREATE LOGIN [DAI-Disney] WITH PASSWORD=N'DAI-Disney', DEFAULT_DATABASE=[DAI-Disney], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO
USE [DAI-Disney]
GO
CREATE USER [DAI-Disney] FOR LOGIN [DAI-Disney]
GO
USE [DAI-Disney]
GO
ALTER ROLE [db_owner] ADD MEMBER [DAI-Disney]
GO