#!/usr/bin/env python3
"""
AcePlan Advanced Tennis Blog Scheduler
=====================================

Advanced scheduling system for tennis blog generation:
- Weekdays: 9am, 5pm
- Weekends: 9am, 12pm, 3pm, 7pm
- Unique content themes for each time slot
- Integration with Google Sheets database
- Automated cron job management

Author: AcePlan Team
Website: https://aceplan.me
"""

import os
import sys
import argparse
import logging
import datetime
import time
import random
import schedule
import threading
from pathlib import Path
from typing import Optional, List

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import the enhanced blog generator module
import importlib.util
spec = importlib.util.spec_from_file_location('enhanced_blog_generator', 'enhanced-blog-generator.py')
enhanced_blog_generator = importlib.util.module_from_spec(spec)
spec.loader.exec_module(enhanced_blog_generator)
EnhancedTennisBlogGenerator = enhanced_blog_generator.EnhancedTennisBlogGenerator

class AdvancedBlogScheduler:
    def __init__(self, log_file: str = "advanced_blog_scheduler.log"):
        """
        Initialize the advanced blog scheduler.
        
        Args:
            log_file (str): Path to log file
        """
        self.log_file = log_file
        self.setup_logging()
        self.generator = None
        self.running = False
        
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
            self.generator = EnhancedTennisBlogGenerator()
            self.logger.info("Enhanced blog generator initialized successfully")
            return True
        except Exception as e:
            self.logger.error(f"Failed to initialize blog generator: {e}")
            return False
    
    def generate_morning_post(self):
        """Generate morning blog post (9am)."""
        self.logger.info("Generating morning blog post (9am)...")
        
        if not self.initialize_generator():
            return False
            
        try:
            # Morning themes: Top 10 lists, technique guides
            morning_themes = [
                "top_10_spin_rackets",
                "top_10_control_rackets", 
                "top_10_power_rackets",
                "tennis_technique_guide"
            ]
            
            theme = random.choice(morning_themes)
            content = self.generator.generate_blog_post(theme)
            
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"morning_blog_{timestamp}.txt"
            filepath = self.generator.save_post(content, filename)
            
            self.logger.info(f"Morning post generated successfully: {filepath}")
            return True
        except Exception as e:
            self.logger.error(f"Failed to generate morning post: {e}")
            return False
    
    def generate_afternoon_post(self):
        """Generate afternoon blog post (12pm/3pm)."""
        self.logger.info("Generating afternoon blog post...")
        
        if not self.initialize_generator():
            return False
            
        try:
            # Afternoon themes: Individual reviews, UTR improvement, comparisons
            afternoon_themes = [
                "individual_racket_review",
                "improve_utr_fast",
                "equipment_comparison",
                "top_10_beginner_rackets"
            ]
            
            theme = random.choice(afternoon_themes)
            content = self.generator.generate_blog_post(theme)
            
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"afternoon_blog_{timestamp}.txt"
            filepath = self.generator.save_post(content, filename)
            
            self.logger.info(f"Afternoon post generated successfully: {filepath}")
            return True
        except Exception as e:
            self.logger.error(f"Failed to generate afternoon post: {e}")
            return False
    
    def generate_evening_post(self):
        """Generate evening blog post (5pm/7pm)."""
        self.logger.info("Generating evening blog post...")
        
        if not self.initialize_generator():
            return False
            
        try:
            # Evening themes: Success stories, training tips, motivational content
            evening_themes = [
                "player_success_story",
                "tennis_training_tips",
                "tennis_technique_guide",
                "equipment_comparison"
            ]
            
            theme = random.choice(evening_themes)
            content = self.generator.generate_blog_post(theme)
            
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"evening_blog_{timestamp}.txt"
            filepath = self.generator.save_post(content, filename)
            
            self.logger.info(f"Evening post generated successfully: {filepath}")
            return True
        except Exception as e:
            self.logger.error(f"Failed to generate evening post: {e}")
            return False
    
    def setup_schedule(self):
        """Setup the scheduling system."""
        # Clear any existing schedules
        schedule.clear()
        
        # Weekday schedule (Monday-Friday): 9am, 5pm
        schedule.every().monday.at("09:00").do(self.generate_morning_post)
        schedule.every().monday.at("17:00").do(self.generate_evening_post)
        
        schedule.every().tuesday.at("09:00").do(self.generate_morning_post)
        schedule.every().tuesday.at("17:00").do(self.generate_evening_post)
        
        schedule.every().wednesday.at("09:00").do(self.generate_morning_post)
        schedule.every().wednesday.at("17:00").do(self.generate_evening_post)
        
        schedule.every().thursday.at("09:00").do(self.generate_morning_post)
        schedule.every().thursday.at("17:00").do(self.generate_evening_post)
        
        schedule.every().friday.at("09:00").do(self.generate_morning_post)
        schedule.every().friday.at("17:00").do(self.generate_evening_post)
        
        # Weekend schedule (Saturday-Sunday): 9am, 12pm, 3pm, 7pm
        schedule.every().saturday.at("09:00").do(self.generate_morning_post)
        schedule.every().saturday.at("12:00").do(self.generate_afternoon_post)
        schedule.every().saturday.at("15:00").do(self.generate_afternoon_post)
        schedule.every().saturday.at("19:00").do(self.generate_evening_post)
        
        schedule.every().sunday.at("09:00").do(self.generate_morning_post)
        schedule.every().sunday.at("12:00").do(self.generate_afternoon_post)
        schedule.every().sunday.at("15:00").do(self.generate_afternoon_post)
        schedule.every().sunday.at("19:00").do(self.generate_evening_post)
        
        self.logger.info("Schedule setup completed:")
        self.logger.info("Weekdays: 9am, 5pm")
        self.logger.info("Weekends: 9am, 12pm, 3pm, 7pm")
    
    def run_scheduler(self):
        """Run the scheduler continuously."""
        self.running = True
        self.logger.info("Advanced blog scheduler started")
        
        while self.running:
            try:
                schedule.run_pending()
                time.sleep(60)  # Check every minute
            except KeyboardInterrupt:
                self.logger.info("Scheduler stopped by user")
                self.running = False
            except Exception as e:
                self.logger.error(f"Scheduler error: {e}")
                time.sleep(60)
    
    def stop_scheduler(self):
        """Stop the scheduler."""
        self.running = False
        self.logger.info("Scheduler stop requested")
    
    def generate_immediate_post(self, time_slot: str):
        """Generate a post immediately for testing."""
        self.logger.info(f"Generating immediate post for {time_slot}")
        
        if time_slot == "morning" or time_slot == "9am":
            return self.generate_morning_post()
        elif time_slot == "afternoon" or time_slot in ["12pm", "3pm"]:
            return self.generate_afternoon_post()
        elif time_slot == "evening" or time_slot in ["5pm", "7pm"]:
            return self.generate_evening_post()
        else:
            self.logger.error(f"Unknown time slot: {time_slot}")
            return False
    
    def create_cron_scripts(self):
        """Create cron job scripts for different time slots."""
        scripts = {
            "morning": """#!/bin/bash
# AcePlan Morning Blog Post Generator (9am)
cd /Users/VR/AcePlan/tennis-racket-finder
python3 advanced-scheduler.py --immediate morning
echo "$(date): Morning blog post generation completed" >> cron.log
""",
            "afternoon": """#!/bin/bash
# AcePlan Afternoon Blog Post Generator (12pm/3pm)
cd /Users/VR/AcePlan/tennis-racket-finder
python3 advanced-scheduler.py --immediate afternoon
echo "$(date): Afternoon blog post generation completed" >> cron.log
""",
            "evening": """#!/bin/bash
# AcePlan Evening Blog Post Generator (5pm/7pm)
cd /Users/VR/AcePlan/tennis-racket-finder
python3 advanced-scheduler.py --immediate evening
echo "$(date): Evening blog post generation completed" >> cron.log
"""
        }
        
        for time_slot, script_content in scripts.items():
            filename = f"run-{time_slot}-blog.sh"
            with open(filename, "w") as f:
                f.write(script_content)
            os.chmod(filename, 0o755)
            self.logger.info(f"Created cron script: {filename}")
        
        # Create the complete cron setup
        cron_setup = """# AcePlan Tennis Blog Generator - Complete Cron Setup
# =====================================================

# Weekdays: 9am, 5pm
0 9 * * 1-5 /Users/VR/AcePlan/tennis-racket-finder/run-morning-blog.sh
0 17 * * 1-5 /Users/VR/AcePlan/tennis-racket-finder/run-evening-blog.sh

# Weekends: 9am, 12pm, 3pm, 7pm
0 9 * * 6,0 /Users/VR/AcePlan/tennis-racket-finder/run-morning-blog.sh
0 12 * * 6,0 /Users/VR/AcePlan/tennis-racket-finder/run-afternoon-blog.sh
0 15 * * 6,0 /Users/VR/AcePlan/tennis-racket-finder/run-afternoon-blog.sh
0 19 * * 6,0 /Users/VR/AcePlan/tennis-racket-finder/run-evening-blog.sh
"""
        
        with open("cron-setup.txt", "w") as f:
            f.write(cron_setup)
        
        self.logger.info("Created cron-setup.txt with complete cron configuration")
        print("\nTo set up the complete cron schedule:")
        print("1. Run: crontab -e")
        print("2. Copy the contents of cron-setup.txt into your crontab")
        print("3. Save and exit")

def main():
    """Main function to handle command line arguments."""
    parser = argparse.ArgumentParser(
        description="AcePlan Advanced Tennis Blog Scheduler",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python advanced-scheduler.py --start                    # Start the scheduler
  python advanced-scheduler.py --immediate morning        # Generate morning post now
  python advanced-scheduler.py --immediate afternoon      # Generate afternoon post now
  python advanced-scheduler.py --immediate evening        # Generate evening post now
  python advanced-scheduler.py --setup-cron               # Create cron scripts
        """
    )
    
    parser.add_argument(
        "--start",
        action="store_true",
        help="Start the advanced scheduler"
    )
    
    parser.add_argument(
        "--immediate",
        choices=["morning", "afternoon", "evening", "9am", "12pm", "3pm", "5pm", "7pm"],
        help="Generate a post immediately for the specified time slot"
    )
    
    parser.add_argument(
        "--setup-cron",
        action="store_true",
        help="Create cron job setup scripts"
    )
    
    parser.add_argument(
        "--log-file",
        default="advanced_blog_scheduler.log",
        help="Specify log file path"
    )
    
    args = parser.parse_args()
    
    # Create scheduler instance
    scheduler = AdvancedBlogScheduler(log_file=args.log_file)
    
    # Handle different commands
    if args.setup_cron:
        scheduler.create_cron_scripts()
        return
    
    if args.immediate:
        success = scheduler.generate_immediate_post(args.immediate)
        sys.exit(0 if success else 1)
    
    if args.start:
        scheduler.setup_schedule()
        scheduler.run_scheduler()
        return
    
    # Interactive mode
    print("AcePlan Advanced Tennis Blog Scheduler")
    print("=====================================")
    print("Website: https://aceplan.me")
    print("Database: https://docs.google.com/spreadsheets/d/1BDcm92RBg6Wnh63XlN5ktkOWz9tUQ1ZRAjJhouCaUos/edit?gid=0#gid=0")
    print()
    
    while True:
        print("\nOptions:")
        print("1. Start scheduler (continuous)")
        print("2. Generate morning post (9am style)")
        print("3. Generate afternoon post (12pm/3pm style)")
        print("4. Generate evening post (5pm/7pm style)")
        print("5. Setup cron jobs")
        print("6. Exit")
        
        choice = input("\nEnter your choice (1-6): ").strip()
        
        if choice == '1':
            scheduler.setup_schedule()
            print("Starting scheduler... Press Ctrl+C to stop")
            try:
                scheduler.run_scheduler()
            except KeyboardInterrupt:
                print("\nScheduler stopped")
                
        elif choice == '2':
            scheduler.generate_immediate_post("morning")
            
        elif choice == '3':
            scheduler.generate_immediate_post("afternoon")
            
        elif choice == '4':
            scheduler.generate_immediate_post("evening")
            
        elif choice == '5':
            scheduler.create_cron_scripts()
            
        elif choice == '6':
            print("Thank you for using AcePlan Advanced Tennis Blog Scheduler!")
            break
            
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
