#!/bin/bash
# AcePlan Evening Blog Post Generator (5pm/7pm)
cd /Users/VR/AcePlan/tennis-racket-finder
python3 advanced-scheduler.py --immediate evening
echo "$(date): Evening blog post generation completed" >> cron.log
