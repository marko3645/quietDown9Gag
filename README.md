# 9GAG — Always Show Video Controls

A tiny WebExtension that watches 9GAG for newly added `<video>` elements and forces native controls on them. Works on Chrome/Edge/Brave/Opera/Firefox.

## Why?
9GAG doesn't allow you to pause or seek in GIFS or Videos, nevermind changing the volume; This aims to fix that.

## What it does
- Adds the `controls` attribute to every `<video>` (existing and newly added)
- Re-applies controls if a script strips them
- Runs on all frames on `9gag.com`
