#!/bin/bash
# AcePlan Afternoon Blog Post Generator (12pm/3pm)
cd /Users/VR/AcePlan/tennis-racket-finder
python3 advanced-scheduler.py --immediate afternoon
echo "$(date): Afternoon blog post generation completed" >> cron.log
