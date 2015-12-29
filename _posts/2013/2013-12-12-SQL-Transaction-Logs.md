---
layout: post
title: SQL Transaction Logs
categories: ['sql']
---
I got an alert that the data volume containing transaction logs was growing quickly and that the volume would soon be totally full.  This was really strange since the scheduled job to perform transaction log backups was performing correctly and there were no apparent errors.  The first thing I wanted to check was the status of the VLF's in the log file.

    DBCC LogInfo();

![DBCC LogInFo Results](/assets/img/2013/2013-12-12-SQL-Transaction-Logs/dbcc_loginfo.png)

The results listed thousands of VLF's all with a status of two.  A status of two means that this portion of the log is still active and will not be reused until a transaction log backup is run.  Well, I tried that and had the same results when I check the VLF's again.

I did a bit of google mining and found a couple resources talking about a query to look at why the transaction logs were not being trimmed.

    SELECT name, recovery_model_desc, log_reuse_wait_desc FROM sys.databases WHERE name='esxi_51'

![log reuse wait desc](/assets/img/2013/2013-12-12-SQL-Transaction-Logs/log_reuse.png)

This picture doesn't show it however the log_reuse_wait_desc field was returning that it was pending replication.  Replication?!?!  This database was never configured for replication.  It makes sense that the log file would continue to grow since replication had not taken place.  To disable the replication...

    EXEC sp_removedbreplication esxi_51

Once that was all corrected, I employed the black magic method of shrinking log files.  Note, this should only be used in extream cases since it will trim the heck out of the log file.

    ALTER DATABASE [esxi_51] SET RECOVERY SIMPLE WITH rollback immediate
    DBCC SHRINKFILE(esxi_51_log)
    ALTER DATABASE [esxi_51] SET RECOVERY FULL WITH rollback immediate

Note my log file that was close to 300G was back to a more reasonable 1G size.
