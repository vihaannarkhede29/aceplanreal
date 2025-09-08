#!/bin/bash
# AcePlan Evening Blog Post Generator (5pm/7pm)
cd /Users/VR/AcePlan/tennis-racket-finder
python3 website-blog-generator.py << EOF
4
EOF
echo "$(date): Evening blog post generation and publishing completed" >> cron.log
