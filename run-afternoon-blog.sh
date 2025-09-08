#!/bin/bash
# AcePlan Afternoon Blog Post Generator (12pm/3pm)
cd /Users/VR/AcePlan/tennis-racket-finder
python3 website-blog-generator.py << EOF
3
EOF
echo "$(date): Afternoon blog post generation and publishing completed" >> cron.log
