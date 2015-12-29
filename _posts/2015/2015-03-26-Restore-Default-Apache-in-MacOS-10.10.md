---
layout: post
title: Restore Default Apache in MacOS 10.10 After Removing Server.app
categories: ['development', 'macos']
---

I was experimenting with the Apple Server application for Mac OS 10.10.  It is nice but a bit limited for my development machine.  I wanted to revert back to the default Apache that came with 10.10.  Simply removing the Server application did not resolve the issue.  After a bit of Googling I was coming up with no results.  Running this command, I was getting a clue...

`# apachectl start`

> /System/Library/LaunchDaemons/org.apache.httpd.plist: Operation already in progress

This was interesting.  When I opened up that file it still referenced the Apache installation that came along with Server.app.  I was able to restore get things going by updating that file with the following contents.

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>Disabled</key>
        <true/>
        <key>Label</key>
        <string>org.apache.httpd</string>
        <key>EnvironmentVariables</key>
        <dict>
            <key>XPC_SERVICES_UNAVAILABLE</key>
            <string>1</string>
        </dict>
        <key>ProgramArguments</key>
        <array>
            <string>/usr/sbin/httpd</string>
            <string>-D</string>
            <string>FOREGROUND</string>
        </array>
        <key>OnDemand</key>
        <false/>
    </dict>
    </plist>

After that, kill ant httpd process that is running and then start the webserver.

`# apachectl start`
