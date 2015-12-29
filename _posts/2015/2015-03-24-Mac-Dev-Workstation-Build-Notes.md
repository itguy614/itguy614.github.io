---
layout: post
title: Mac Dev Workstation Build Notes
categories: ['development', 'macos']
---

Similar to my [Windows Dev Workstation Build Notes](/2015/01/Windows-Dev-Workstation-Build-Notes/) post, I wanted to do the same thing for the Mac side of the house.  As things change I will be keeping this document updated.

### Install homebrew

    # ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

Install some taps

    # brew update
    # brew tap homebrew/homebrew-php
    # brew tap homebrew/dupes
    # brew tap homebrew/versions

Update some core utilities

    # brew install coreutils findutils bash

### Update the version of PHP

    # brew install bzip2
    # brew install php55 php55-mcrypt

Update the Apache configutation to use the fresh install of php

    # sudo nano /etc/apache2/httpd.conf

Update the line to be...

    LoadModule php5_module /usr/local/opt/php55/libexec/apache2/libphp5.so

Restart Apache

    # sudo apachectl restart

### Create Project Folders

    # mkdir ~/Projects
    # mkdir ~/Projects-Personal
    # mkdir ~/Projects-External

I like to keep my personal projects separate from projects I may do for work or for a client.  To do this, my personal projects go into the Projects-Personal folder.  For systems where I know all of the projects are personal, I create a symbolic link from Projects-Personal to Projects.  This will keep all of my alias's and tools working correctly.

### Create Sites Folder

    # mkdir ~/Sites

### dnsmasq

Dnsmasq will respong with the localhost IP address for any domain in the .dev TLD.  For instance http://blog.dev will now be 127.0.0.1.  This is needed for the Apache configuration.

    # brew install dnsmasq
    # cp /usr/local/opt/dnsmasq/dnsmasq.conf.example /usr/local/etc/dnsmasq.conf
    # sudo cp -fv /usr/local/opt/dnsmasq/*.plist /Library/LaunchDaemons
    # sudo chown root /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist

Edit the configuration editor

    # nano /usr/local/etc/dnsmasq.conf

You only have to add one line

    address=/.dev/127.0.0.1

Now to start up dnsmasq

    # sudo launchctl load /Library/LaunchDaemons/homebrew.mxcl.dnsmasq.plist

### Apache

There are many guides on the net relating to getting the built in Apache server running.  Once you have it running, this is how I configured my virtual hosts.

The goal is to have dynamic hosting based upon the URL.  I will be using dnsmasq to return localhost for any url in the .dev TLD.  My vhost configuration will take that and map it to the appropriate folder in my Sites folder based upon the domain.  For example, http://blog.dev will be hosted out of ```~/Sites/blog``` which is a symbolic link to ```~/Projects/blog/_site```.  If that all sounds like voodoo, it is.

Edit ```/etc/apache2/extra/httpd-vhosts.conf``` with your favorite editor.  Replace the content with this, replacing the path to your user folder.

    <Directory "/www">
        Options Indexes MultiViews FollowSymLinks
        AllowOverride All
        Order allow,deny
        Allow from all
    </Directory>

    <Virtualhost *:80>
        VirtualDocumentRoot "/www/home/wwwroot"
        ServerName home.dev
        UseCanonicalName Off
    </Virtualhost>

    <Virtualhost *:80>
        VirtualDocumentRoot "/Users/kurt/Sites/%1"
        ServerName sites.dev
        ServerAlias *.dev
        UseCanonicalName Off
    </Virtualhost>

Edit ```/etc/apache2/httpd.conf```.  Uncomment the line for vhost support.

    Include /private/etc/apache2/extra/httpd-vhosts.conf

Restart Apache and you should be all set.

### Install GitFlow

Totally optional.  This is a good methodology for projects that have a set release schedule.  I only use it on two projects.

    # brew install git-flow-avh

### Jekyll

    # sudo gem install jekyll rouge

### Composer

    brew install homebrew/php/composer

### Node

    # brew install node

### Bower

    # npm install bower -g

### Gulp

    # npm install gulp -g
