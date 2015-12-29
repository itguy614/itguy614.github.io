---
layout: post
title: Ubuntu OCFS2 Cluster
categories: ['ubuntu']
---
In the last article, we configured a server to communicate with an iSCSI target on a Nimble Array. We now need to format that volume with a file system. Our ultimate goal will be that the volume can be shared with multiple Linux systems.

There are a two choices when looking at a file system. GFS2 and [OCFS2][1]. For this implementation, we will be using [OCFS2][1]. A description from Oracle is as follows:

> OCFS2 is a general-purpose shared-disk cluster file system for Linux capable of providing both high performance and high availability. As it provides local file system semantics, it can be used with almost all applications. Cluster-aware applications can make use of cache-coherent parallel I/Os from multiple nodes to scale out applications easily. Other applications can make use of the file system facilities to fail-over running application in the event of a node failure.

#### Prerequisites

First off, let install OCFS2.

    # sudo apt-get install ocfs2-tools

#### Partitioning

Our volume is available at **/dev/mapper/data**. The first step will be to to partition the volume.

    # sudo fdisk /dev/mapper/data

Create a new primary partition and using the entire disk. Change the partition ID to Linux LVM (8e).

Once you create the partition, be sure to reread the partition table.

    # sudo partprobe

#### LVM Configuration

In order to accommodate growing the volume later on, the first step will be to use LVM to create the actual logical volume.

    # sudo pvcreate /dev/mapper/data1
    # sudo vgcreate data_vg /dev/mapper/data1
    # sudo lvcreate -n data_lv -L 5g data_vg

#### OCFS Cluster

Your logical volume is now ready for use. The first step will be to configure the OCFS2 cluster. This is done by editing **/etc/ocfs2/cluster.conf**.

    node:
        ip_port=7777
        ip_address=10.2.10.46
        number=0
        name=ubuntutest
        cluster=data-share

    cluster:
        node_count=1
        name=data-share

For each node you will have connecting to the cluster, add another node section to this document. Be sure that each node has a unique number. Then increase the node_count value in the cluster.

#### OCFS2 Filesystem

Next up is configuring OCFS2 itself. You will need to create and edit **/etc/default/o2cb**.

    # sudo chconfig /etc/default/o2cb O2CB_ENABLED true
    # sudo chconfig /etc/default/o2cb O2CB_BOOTCLUSTER data-share

> *chconfig* is a small bash script to execute a sed command to change the value of configuration property to a specific value. It is useful in cases where configuration files are written in the form of property=value. It is available on [github][2].

Now, restart OCFS Cluster and OCFS2 file system.

    # sudo service o2cb restart
    # sudo service ocfs2 restart

There are two steps left, create the file system on the drive and mount the volume.

    # mkfs.ocfs2 -L data-share /dev/data_vg/data_lv
    # mkdir /mnt/data-share
    # mount -L data-share /mnt/data-share

You can now access the volume on the mount point **/mnt/data-share**.

 [1]: https://oss.oracle.com/projects/ocfs2/
 [2]: https://github.com/itguy614/bash-scripts
