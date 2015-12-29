---
layout: post
title: Windows Dev Workstation Build Notes
categories: ['development']
---

I got ahold of the Windows 10 Technical Preview so I had to reinstall all of my development tools.  I wanted to take the opportunity to document how I like to setup my system.

### Assumptions ###

1. Guess what!  I'm doing this for a Windows 10 Tech Preview system.  Everything is fairly generic and should work with previous version.

### Windows Path *e.g. /usr/bin* ###

I like to keep a bunch of batch files and other executables handy by stuffing them into a ```bin``` folder that is in my user profile.

1. Create the ```bin``` foler in %userprofile%.
2. Add ```%userprofile%\bin``` to your user's path.

### [Sublime Text](http://www.sublimetext.com/) ###

Do not pass go, do not collect $200 dollars.  You will absolutely need a good text editor.  Even if you live and breath Visual Studio this tool will find a way into your heart.

1. Download the [Sublime Text 3](http://www.sublimetext.com/3) installation application.
2. Install the application accepting all of the defaults.
3. Create a batch file named ```subl.bat``` in your ```bin``` directory.  The file should have the following contents. `@start "sublime" "%ProgramW6432%\Sublime Text 3\sublime_text.exe" %*`
4. Configure Sublime Text to your liking.  I have also posted a separate article on a starting point for [setup](http://wolfienet.com/2014/12/SublimtText-Setup/).

*You may want to also install my favorite monospace font, [Source Code Pro](https://github.com/adobe-fonts/source-code-pro/releases/tag/1.017R).

### [Git](http://git-scm.com/) ###

Git is the glue.  Every project I work on resides in a Git repo, whether it is local or hosted with GitLab or GitHub.  I have even extended this out and have some automation setup to pull switch configs and keep them updated in a Git repo.

1. Download the [Git Installer](http://git-scm.com/download/win).
2. Install the application.  When asked about the PATH, select "Use Git and optional Unix tools from the Windows Command Prompt".
3. If everything installed correctly, you will be able to open a new command prompt and execute ```git --version```.

### Project Folders ###

I organize my projects into three folders.  One for work projects, one for personal projects, and one for external projects.  Create the following folders:

```
%userprofile%\Projects
%userprofile%\Projects-Personal
%userprofile%\Projects-External
```

### [CLINK](http://mridgers.github.io/clink/) ###

> Clink combines the native Windows shell cmd.exe with the powerful command line editing features of the GNU Readline library, which provides rich completion, history, and line-editing capabilities. Readline is best known for its use in the well-known Unix shell Bash, the standard shell for Mac OS X and many Linux distributions.

1. Download the [installation](https://github.com/mridgers/clink/releases/download/0.4.3/clink_0.4.3_setup.exe).
2. Install normally with defaults.

### [CLINK Git Prompt](https://github.com/djs/clink-gitprompt) ###

1. Open a command prompt
2. Change directory to your external projects folder.  (e.g. ```cd %userprofile%\Projects-External```)
3. Clone the repository
```
git clone https://github.com/djs/clink-gitprompt.git
```
4. Create a link to the lua file
```
ln %userprofile%\Projects-External\clink-gitprompt\git_prompt.lua %localappdata%\clink\git_prompt.lua
```

### [GOW](https://github.com/bmatzelle/gow) ###

> Gow (Gnu On Windows) is the lightweight alternative to Cygwin. It uses a convenient Windows installer that installs about 130 extremely useful open source UNIX applications compiled as native win32 binaries. It is designed to be as small as possible, about 10 MB, as opposed to Cygwin which can run well over 100 MB depending upon options.

1. Open a command prompt
2. Change directory to your external projects folder.  (e.g. ```cd %userprofile%\Projects-External```)
3. Clone the GOW repository
```
git clone https://github.com/bmatzelle/gow.git
```
4. Add ```%userprofile%\Projects-External\gow\bin``` to your users path.

### [GitFlow](https://github.com/petervanderdoes/gitflow) ###

1. Download the [getopt binary archive](http://lrn.no-ip.info/other/mingw/mingw32/getopt/1.1.4-1/getopt-1.1.4-1-mingw32-bin.tar.lzma), extract the getopt.exe and copy it in ```C:\Program Files (x86)\Git\bin```.

1. Open a command prompt
2. Change directory to your external projects folder.  (e.g. ```cd %userprofile%\Projects-External```)
3. Clone the gitflow repository
```
git clone https://github.com/petervanderdoes/gitflow.git
```
4. Change into the gitfloe directory
```
cd gitflow
```
5. Run the installation
```
contrib\msysgit-install.cmd "C:\Program Files (x86)\Git"
```

### SysInternals ###

1. Open a command prompt
2. Change directory to your external projects folder.  (e.g. ```cd %userprofile%\Projects-External```)
3. Clone the sysinternals repository
```
git clone https://github.com/kbandla/sysinternals.git
```
4. Add ```%userprofile%\Projects-External\sysinternals\tools``` to your user path.

### Ruby ###

1. Download the Windows installer from the official Ruby site.  [http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)
2. Run the installer and install with default selections.

### Ruby DevKit ###

1. Download the 2.1 Dev Kit from the official Ruby Site.  This is a self extracting file.  [http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)
2. Run the installer and extract the files to ```c:\ruby21-devkit```.
3. Register the Dev Kit with Ruby
```
cd c:\ruby21-devkit
ruby dk.rb init
ruby dk.rb install
```

### Update the Ruby Gem SSL ###

I ran into an issue where I was unable to install any Gems.  I found the solution from [luislavena](https://gist.github.com/luislavena/f064211759ee0f806c88).  I choose the manual installation.

1. Download [AddTrustExternalCARoot-2048.pem](https://raw.githubusercontent.com/rubygems/rubygems/master/lib/rubygems/ssl_certs/AddTrustExternalCARoot-2048.pem)
2. Place the file into ```C:\Ruby21-x64\lib\ruby\2.1.0\rubygems\ssl_certs```

### Jekyll ###

```
gem install jekyll
gem install rouge
```

### IIS ###

I know, use Apache or Nginx.  Well, IIS works fine for the majority of my development work and gives me another platform to test on.  I also develop on Mac OS and Linux so I feel like I hit the big three well enough.

1. From an **elevated** PowerShell prompt
```
enable-windowsoptionalfeature -online -featurename IIS-WebServerRole
```
2. Download the [Microsoft Web Platform Installer](http://www.microsoft.com/web/downloads/platform.aspx).
3. Run the installer
4. Once completed, open the IIS Manager and start the Web Platform Installer.  Install the following components.
- URL Rewrite 2.0
- PHP 5.6.0

### Composer ###

1. Download composer.phar from [https://getcomposer.org/composer.phar](https://getcomposer.org/composer.phar) and place it in your ```bin``` directory.
2. Create ```composer.bat``` in your bin directory with the following contents.
```
@php "%~dp0composer.phar" %*
```

### Node ###

Download and install the Node MSI installer. [http://nodejs.org/dist/v0.10.35/x64/node-v0.10.35-x64.msi](http://nodejs.org/dist/v0.10.35/x64/node-v0.10.35-x64.msi)

### Grunt ###

```
npm install -g grunt-cli
```

### Bower ###

```
npm install -g bower
```

### Python ###

1. Download and install the Python 3 MSI installer.  [https://www.python.org/ftp/python/3.4.2/python-3.4.2.amd64.msi](https://www.python.org/ftp/python/3.4.2/python-3.4.2.amd64.msi)
2. Install with regular options, however **DO** select the option to "Add python.exe to Path"

### MariaDB ###

1. Download and install the MariaDB MSI installer.  [https://downloads.mariadb.org/f/mariadb-10.0.16/winx64-packages/mariadb-10.0.16-winx64.msi/from/http%3A/nyc2.mirrors.digitalocean.com/mariadb?serve](https://downloads.mariadb.org/f/mariadb-10.0.16/winx64-packages/mariadb-10.0.16-winx64.msi/from/http%3A/nyc2.mirrors.digitalocean.com/mariadb?serve)
2. Install with all default options.  Be sure to remember your root password.
