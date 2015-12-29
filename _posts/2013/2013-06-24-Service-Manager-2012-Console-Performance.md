---
layout: post
title: Service Manager 2012 Console Performance
categories: ['lync','scsm']
---
The TS department made a switch to Service Manager a few weeks ago and some of us have been less than impressed with the performance of the console. The application would hang for an incredible amount of time when opening a form. In some cases, when opening a form it would hang the application so badly that a reboot was in order. The one symptom that was interesting was that the Lync 2013 window always seemed to pop up when this occurred.

#### The solution

Open your control panel and click into "Programs and Features". Look for an older version of Lync. In our case Lync 2010 was still installed even though 2013 was in use. Once Lync 2010 was removed and Lync 2013 repaired, the SCSM console was performing like a champ.

#### Notes

A bit of Googling reveals that this issue is pretty well known. It looks like SCSM SP1 CU3 does not resolve the issue
