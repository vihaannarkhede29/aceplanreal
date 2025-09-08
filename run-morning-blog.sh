#!/bin/bash
# AcePlan Morning Blog Post Generator (9am)
cd /Users/VR/AcePlan/tennis-racket-finder
python3 website-blog-generator.py << EOF
2
EOF
echo "$(date): Morning blog post generation and publishing completed" >> cron.log
