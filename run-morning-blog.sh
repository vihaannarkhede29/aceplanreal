#!/bin/bash
# AcePlan Morning Blog Post Generator (9am)
cd /Users/VR/AcePlan/tennis-racket-finder
python3 advanced-scheduler.py --immediate morning
echo "$(date): Morning blog post generation completed" >> cron.log
