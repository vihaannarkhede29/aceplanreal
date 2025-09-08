#!/bin/bash

# AcePlan Tennis Blog Post Generator - Cron Setup Script
# =====================================================
# 
# This script sets up automated daily blog post generation using cron jobs.
# It will generate a new tennis blog post every day at 6 AM.
#
# Website: https://aceplan.me
# Racket Database: 100+ tennis rackets

echo "AcePlan Tennis Blog Post Generator - Cron Setup"
echo "=============================================="
echo "Website: https://aceplan.me"
echo ""

# Get the current directory (where the script is located)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "Script directory: $SCRIPT_DIR"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if the blog generator script exists
if [ ! -f "$SCRIPT_DIR/auto-blog-generator.js" ]; then
    echo "Error: auto-blog-generator.js not found in $SCRIPT_DIR"
    exit 1
fi

# Create the cron job command
CRON_COMMAND="0 6 * * * cd $SCRIPT_DIR && node auto-blog-generator.js daily >> $SCRIPT_DIR/cron.log 2>&1"

echo "Setting up cron job..."
echo "Command: $CRON_COMMAND"
echo ""

# Add the cron job
(crontab -l 2>/dev/null; echo "$CRON_COMMAND") | crontab -

if [ $? -eq 0 ]; then
    echo "✅ Cron job set up successfully!"
    echo ""
    echo "The blog generator will run daily at 6:00 AM"
    echo "Generated posts will be saved in: $SCRIPT_DIR/generated_posts/"
    echo "Logs will be saved in: $SCRIPT_DIR/cron.log"
    echo ""
    echo "To view your current cron jobs, run: crontab -l"
    echo "To remove this cron job, run: crontab -e (then delete the line)"
    echo ""
    echo "To test the generator manually, run:"
    echo "  node auto-blog-generator.js daily"
    echo "  node auto-blog-generator.js weekly"
    echo "  node auto-blog-generator.js single"
else
    echo "❌ Failed to set up cron job. Please try again."
    exit 1
fi

echo ""
echo "🎾 Happy blogging with AcePlan!"
echo "Visit: https://aceplan.me"
