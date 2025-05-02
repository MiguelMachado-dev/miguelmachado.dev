---
date: 2020-07-27 12:05:00
image: /assets/img/alexa-echo-dot.jpg
title: How I automated my PC using Alexa and programming
description: How to use shell scripts, vbs and nodejs to automate your computer
  with Alexa and TriggerCMD
main-class: misc
color: "#7AAB13"
background: "#31C4F3"
category: alexa
---

## Introduction

A week ago I bought an Echo Dot from Amazon, and since then I've fallen in love with automation.

Today I'll show you how I used scripts to do the automation of some things here.

![Image of an Echo Dot](/assets/img/alexa-echo-dot.jpg)

### TriggerCMD

First, we are going to use TriggerCMD. TRIGGERcmd is a cloud service that allows you to securely and remotely run commands on your computers.

There are many ways to trigger your commands, including IFTTT, Alexa, Google Home, SmartThings, and Zapier.

In this post, we are going to use Alexa.

TriggerCMD works with Windows, Mac and Linux.

#### Creating an account

You need to go to [TriggerCMD login page](https://www.triggercmd.com/user/auth/login).
You can use a different email from your Amazon account. Your TriggerCMD account will be used to link your Amazon account using the TriggerCMD Alexa Skill.

#### Downloading TriggerCMD Agent

After creating an account, download the TriggerCMD Agent for your OS [clicking here.](https://www.triggercmd.com/en/)

Now, go to [TriggerCMD instructions](https://www.triggercmd.com/user/computer/create) and copy your token, it will be used after installing TriggerCMD Agent on your computer

Now that you have linked your TriggerCMD account with your computer using TriggerCMD Agent and your token, you can create some commands and linking it to your Alexa, using TriggerCMD skill!

#### Understanding more about TriggerCMD

You can check [this video](https://www.youtube.com/watch?v=9Jm_s9sTZXw), so you can understand a little better how to sync your account with Alexa Skill and create some commands using TriggerCMD GUI.

#### Creating your commands

![TriggerCMD GUI](/assets/img/trigger-cmd-gui.png)

I have created a command called "work" that runs a `work.bat` file on my PC.

```shell
:: Open project on Code and run dev server
cd C:\www\prion\mainProject
start cmd /k npm run dev
code .
```

That's it. You synchronize a service that is running on your computer that is activated by another one, which in this case is Alexa.

And you can go a little further, like, creating a `.vbs` script that opens Spotify on a specific playlist on your computer and plays it. Like this:

```vb
Set WshShell = WScript.CreateObject("WScript.Shell")
Comandline = "start spotify"
WScript.sleep 5000
CreateObject("WScript.Shell").Run("spotify:playlist:0CtF5Q52iAOxdUkSIh5hBM")
WScript.sleep 3000
WshShell.SendKeys "{ENTER}"
WScript.sleep 1000
WshShell.SendKeys "^{s}"
WScript.sleep 100
WshShell.SendKeys "^{RIGHT}"
```

To open the Spotify playlist you just need to copy the URI :D

That's it for today! I hope I could help you to understand a little bit this world of automation!

Any typos or grammar errors? Let me know in the comments section!

Want to dive a little better on something in this post? Let me know too and I can create another post about it!
