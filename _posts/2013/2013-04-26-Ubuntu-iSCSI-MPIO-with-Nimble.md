---
layout: post
title: Ubuntu iSCSI MPIO with Nimble
categories: ['nimble','ubuntu']
---
With the implementation of a new Nimble Storage Array, HCL is changing the storage strategy away from fiber channel to iSCSI. If you have not looked at a Nimble array, you really should. Fantastic!

The Nimble allows for four Ethernet ports for iSCSI traffic. To have the highest amount of bandwidth and redundancy, MPIO needs to be configured on the system to communicate with the Nimble.

Target (SAN)

*   Nimble Storage Array CS220-X2
*   Discovery IP: 172.16.2.10
*   Data IP's: 172.16.2.11, 172.16.2.12, 172.16.13, 172.16.2.14

Initiator (Client)

*   Ubuntu 12.04 LTS
*   Data IP: 10.2.10.46
*   iSCSI IP: 172.16.2.50

#### Software Prerequisite

    # sudo apt-get install open-iscsi open-iscsi-utils multipath-tools

#### IQN

iSCSI uses an IQN to to refer to targets and initiators. Once you install the open-iscsi package, an IQN will be created for you. This can be found in the /etc/iscsi/initiatorname.iscsi file.

    # cat /etc/iscsi/initiatorname.iscsi
    ## DO NOT EDIT OR REMOVE THIS FILE!
    ## If you remove this file, the iSCSI daemon will not start.
    ## If you change the InitiatorName, existing access control lists
    ## may reject this initiator.  The InitiatorName must be unique
    ## for each iSCSI initiator.  Do NOT duplicate iSCSI InitiatorNames.
    InitiatorName=iqn.1993-08.org.debian:01:48a7e07cd57c

Use this initiator IQN to configure your volume on the Nimble array and to create your initiator group. As a practice, we have decided to build our initiator groups based on IQN vs. the IP address of the initiator systems.

#### Set iSCSI startup to automatic

    # sudo ./chconfig /etc/iscsi/iscsid.conf node.startup automatic

> *chconfig* is a small bash script to execute a sed command to change the value of configuration property to a specific value. It is useful in cases where configuration files are written in the form of property=value. It is available on [github][1].

#### Discover the Target

    # sudo iscsiadm -m discovery -t sendtargets -p 172.16.2.10
    172.16.2.12:3260,2460 iqn.2007-11.com.nimblestorage:ubuntutest-v681ac6f7ff909e57.0000000a.978a58a0
    172.16.2.11:3260,2460 iqn.2007-11.com.nimblestorage:ubuntutest-v681ac6f7ff909e57.0000000a.978a58a0
    172.16.2.13:3260,2460 iqn.2007-11.com.nimblestorage:ubuntutest-v681ac6f7ff909e57.0000000a.978a58a0
    172.16.2.14:3260,2460 iqn.2007-11.com.nimblestorage:ubuntutest-v681ac6f7ff909e57.0000000a.978a58a0

If everything is running correctly up to this point, you will see all four paths to the Nimble in the output along with the IQNs of the volumes that you have created. In my case, the volume name is *ubuntutest*.

#### Configure Multipath

This step is important to do prior to loging into each of the storage paths.

The first step is to log into one of the data targets.

    # sudo iscsiadm -m node --targetname "iqn.2007-11.com.nimblestorage:ubuntutest-v681ac6f7ff909e57.0000000a.978a58a0" --portal "172.16.2.11:3260" --login

Once you are logged in, you will be able to get the wwid of the drive. You will need this for the /etc/multipath.conf. This file configures all of your multipath preferences. To get the wwid...

    # sudo multipath -ll
    202e7bcc950e534c26c9ce900a0588a97 dm-2 Nimble,Server
    size=5.0G features='0' hwhandler='0' wp=rw
    `-+- policy='round-robin 0' prio=1 status=active
      `- 3:0:0:0 sdb 8:16 active ready running

In my case, the wwid is **202e7bcc950e534c26c9ce900a0588a97**. Now, open /etc/multipath.conf in your favorite editor and edit the file so it matches something like this...

    defaults {
        udev_dir /dev
        polling_interval 10
        prio_callout /bin/true
        path_checker readsector0
        prio const
        fallback immediate
        use_friendly_name yes
    }

    devices {
        device {
                vendor "Nimble*"
                product "*"

                path_grouping_policy multibus

                path_selector "round-robin 0"
                # path_selector "queue-length 0"
                # path_selector "service-time 0"
        }
    }

    multipaths {
        multipath {
                wwid 202e7bcc950e534c26c9ce900a0588a97
                alias data
        }
    }

Now would be a good point to reload the multipath service.

    # sudo service multipath-tools reload

#### Continue to log into the iSCSI targets

    # sudo iscsiadm -m node --targetname "iqn.2007-11.com.nimblestorage:ubuntutest-v681ac6f7ff909e57.0000000a.978a58a0" --portal "172.16.2.12:3260" --login

    # sudo iscsiadm -m node --targetname "iqn.2007-11.com.nimblestorage:ubuntutest-v681ac6f7ff909e57.0000000a.978a58a0" --portal "172.16.2.13:3260" --login

    # sudo iscsiadm -m node --targetname "iqn.2007-11.com.nimblestorage:ubuntutest-v681ac6f7ff909e57.0000000a.978a58a0" --portal "172.16.2.14:3260" --login

Once you are completed logging into each target, you can verify your multipath configuration.

    # sudo multipath -ll
    data (202e7bcc950e534c26c9ce900a0588a97) dm-2 Nimble,Server
    size=5.0G features='0' hwhandler='0' wp=rw
    `-+- policy='round-robin 0' prio=1 status=active
      |- 14:0:0:0 sdb 8:16 active ready  running
      |- 12:0:0:0 sdc 8:32 active ready  running
      |- 13:0:0:0 sdd 8:48 active ready  running
      `- 11:0:0:0 sde 8:64 active ready  running

The drive will be available at **/dev/mapper/data**.

Next up will be creating a LVM volume and formatting with OCFS2 for shared storage in a cluster.

 [1]: https://github.com/itguy614/bash-scripts
