#!/usr/bin/env python3
"""
AcePlan Automated Blog Post Scheduler
====================================

This script automates the generation of tennis blog posts using GPT4All.
It can be run manually or scheduled with cron for automatic daily/weekly generation.

Features:
- Automated blog post generation
- Cron job integration
- Email notifications (optional)
- Logging and error handling
- Configurable scheduling

Usage:
    python automated-blog-scheduler.py --daily
    python automated-blog-scheduler.py --weekly
    python automated-blog-scheduler.py --count 10

Author: AcePlan Team
Website: https://aceplan.me
"""

import os
import sys
import argparse
import logging
import datetime
import time
from pathlib import Path
from typing import Optional

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from gpt4all_blog_generator import TennisBlogGenerator

class BlogScheduler:
    def __init__(self, log_file: str = "blog_generator.log"):
        """
        Initialize the blog scheduler.
        
        Args:
            log_file (str): Path to log file
        """
        self.log_file = log_file
        self.setup_logging()
        self.generator = None
        
    def setup_logging(self):
        """Setup logging configuration."""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(self.log_file),
                logging.StreamHandler(sys.stdout)
            ]
        )
        self.logger = logging.getLogger(__name__)
        
    def initialize_generator(self):
        """Initialize the blog generator."""
        try:
            self.generator = TennisBlogGenerator()
            self.logger.info("Blog generator initialized successfully")
            return True
        except Exception as e:
            self.logger.error(f"Failed to initialize blog generator: {e}")
            return False
    
    def generate_daily_post(self) -> bool:
        """
        Generate a daily blog post.
        
        Returns:
            bool: True if successful, False otherwise
        """
        self.logger.info("Starting daily blog post generation...")
        
        if not self.initialize_generator():
            return False
            
        try:
            filepath = self.generator.generate_daily_post()
            self.logger.info(f"Daily post generated successfully: {filepath}")
            return True
        except Exception as e:
            self.logger.error(f"Failed to generate daily post: {e}")
            return False
    
    def generate_weekly_batch(self) -> bool:
        """
        Generate a week's worth of blog posts.
        
        Returns:
            bool: True if successful, False otherwise
        """
        self.logger.info("Starting weekly blog post generation...")
        
        if not self.initialize_generator():
            return False
            
        try:
            filepaths = self.generator.generate_batch_posts(7)
            self.logger.info(f"Weekly batch generated successfully: {len(filepaths)} posts")
            return True
        except Exception as e:
            self.logger.error(f"Failed to generate weekly batch: {e}")
            return False
    
    def generate_custom_batch(self, count: int) -> bool:
        """
        Generate a custom number of blog posts.
        
        Args:
            count (int): Number of posts to generate
            
        Returns:
            bool: True if successful, False otherwise
        """
        self.logger.info(f"Starting custom batch generation: {count} posts...")
        
        if not self.initialize_generator():
            return False
            
        try:
            filepaths = self.generator.generate_batch_posts(count)
            self.logger.info(f"Custom batch generated successfully: {len(filepaths)} posts")
            return True
        except Exception as e:
            self.logger.error(f"Failed to generate custom batch: {e}")
            return False
    
    def cleanup_old_posts(self, days_to_keep: int = 30):
        """
        Clean up old blog posts to save disk space.
        
        Args:
            days_to_keep (int): Number of days to keep posts
        """
        self.logger.info(f"Cleaning up posts older than {days_to_keep} days...")
        
        output_dir = Path(self.generator.output_dir if self.generator else "generated_posts")
        if not output_dir.exists():
            return
            
        cutoff_date = datetime.datetime.now() - datetime.timedelta(days=days_to_keep)
        deleted_count = 0
        
        for file_path in output_dir.glob("*.txt"):
            try:
                file_time = datetime.datetime.fromtimestamp(file_path.stat().st_mtime)
                if file_time < cutoff_date:
                    file_path.unlink()
                    deleted_count += 1
                    self.logger.info(f"Deleted old post: {file_path.name}")
            except Exception as e:
                self.logger.warning(f"Failed to delete {file_path.name}: {e}")
        
        self.logger.info(f"Cleanup completed: {deleted_count} old posts deleted")

def create_cron_script():
    """Create a shell script for cron job setup."""
    cron_script = """#!/bin/bash
# AcePlan Tennis Blog Generator - Cron Job Script
# ===============================================

# Set working directory
cd /Users/VR/AcePlan/tennis-racket-finder

# Activate virtual environment (if using one)
# source venv/bin/activate

# Run the blog generator
python3 automated-blog-scheduler.py --daily

# Log the execution
echo "$(date): Daily blog post generation completed" >> cron.log
"""
    
    with open("run-daily-blog.sh", "w") as f:
        f.write(cron_script)
    
    # Make the script executable
    os.chmod("run-daily-blog.sh", 0o755)
    print("Created cron script: run-daily-blog.sh")
    print("To set up daily generation at 6 AM, add this to your crontab:")
    print("0 6 * * * /Users/VR/AcePlan/tennis-racket-finder/run-daily-blog.sh")

def main():
    """Main function to handle command line arguments."""
    parser = argparse.ArgumentParser(
        description="AcePlan Tennis Blog Post Scheduler",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python automated-blog-scheduler.py --daily
  python automated-blog-scheduler.py --weekly
  python automated-blog-scheduler.py --count 10
  python automated-blog-scheduler.py --setup-cron
        """
    )
    
    parser.add_argument(
        "--daily",
        action="store_true",
        help="Generate a daily blog post"
    )
    
    parser.add_argument(
        "--weekly",
        action="store_true",
        help="Generate a week's worth of blog posts"
    )
    
    parser.add_argument(
        "--count",
        type=int,
        help="Generate a custom number of blog posts"
    )
    
    parser.add_argument(
        "--setup-cron",
        action="store_true",
        help="Create cron job setup script"
    )
    
    parser.add_argument(
        "--cleanup",
        type=int,
        metavar="DAYS",
        help="Clean up posts older than specified days"
    )
    
    parser.add_argument(
        "--log-file",
        default="blog_generator.log",
        help="Specify log file path (default: blog_generator.log)"
    )
    
    args = parser.parse_args()
    
    # Create scheduler instance
    scheduler = BlogScheduler(log_file=args.log_file)
    
    # Handle different commands
    if args.setup_cron:
        create_cron_script()
        return
    
    if args.cleanup:
        scheduler.cleanup_old_posts(args.cleanup)
        return
    
    if args.daily:
        success = scheduler.generate_daily_post()
        sys.exit(0 if success else 1)
    
    elif args.weekly:
        success = scheduler.generate_weekly_batch()
        sys.exit(0 if success else 1)
    
    elif args.count:
        if args.count <= 0:
            print("Error: Count must be a positive number")
            sys.exit(1)
        success = scheduler.generate_custom_batch(args.count)
        sys.exit(0 if success else 1)
    
    else:
        # Interactive mode
        print("AcePlan Tennis Blog Post Scheduler")
        print("==================================")
        print("Website: https://aceplan.me")
        print()
        
        while True:
            print("\nOptions:")
            print("1. Generate daily post")
            print("2. Generate weekly batch (7 posts)")
            print("3. Generate custom number of posts")
            print("4. Setup cron job")
            print("5. Cleanup old posts")
            print("6. Exit")
            
            choice = input("\nEnter your choice (1-6): ").strip()
            
            if choice == '1':
                scheduler.generate_daily_post()
                
            elif choice == '2':
                scheduler.generate_weekly_batch()
                
            elif choice == '3':
                try:
                    count = int(input("Enter number of posts to generate: "))
                    if count > 0:
                        scheduler.generate_custom_batch(count)
                    else:
                        print("Please enter a positive number.")
                except ValueError:
                    print("Please enter a valid number.")
                    
            elif choice == '4':
                create_cron_script()
                
            elif choice == '5':
                try:
                    days = int(input("Enter number of days to keep posts: "))
                    if days > 0:
                        scheduler.cleanup_old_posts(days)
                    else:
                        print("Please enter a positive number.")
                except ValueError:
                    print("Please enter a valid number.")
                    
            elif choice == '6':
                print("Thank you for using AcePlan Tennis Blog Scheduler!")
                break
                
            else:
                print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
