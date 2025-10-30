# 9GAG — Always Show Video Controls

A tiny WebExtension that watches 9GAG for newly added `<video>` elements and forces native controls on them. Works on Chrome/Edge/Brave/Opera/Firefox.

## Why?
Some feeds hide native controls or swap players dynamically. This content script ensures you always get play/pause, scrub, volume, etc.

## What it does
- Adds the `controls` attribute to every `<video>` (existing and newly added)
- Re-applies controls if a script strips them
- Runs on all frames on `9gag.com`
