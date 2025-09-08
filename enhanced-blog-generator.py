#!/usr/bin/env python3
"""
AcePlan Enhanced Tennis Blog Generator with GPT4All
=================================================

This script generates unique, SEO-optimized tennis blog posts using GPT4All
with content from the actual AcePlan 100-racket database.

Features:
- Uses real racket data from Google Sheets database
- Generates unique content themes (Top 10 lists, UTR improvement, individual racket reviews)
- Advanced scheduling (weekdays: 9am, 5pm | weekends: 9am, 12pm, 3pm, 7pm)
- Includes affiliate links from the database
- Multiple content templates for variety

Author: AcePlan Team
Website: https://aceplan.me
Database: https://docs.google.com/spreadsheets/d/1BDcm92RBg6Wnh63XlN5ktkOWz9UQ1ZRAjJhouCaUos/edit?gid=0#gid=0
"""

import os
import json
import random
import datetime
import requests
import csv
import io
from typing import List, Dict, Any, Optional
import time
from pathlib import Path

# GPT4All imports
try:
    from gpt4all import GPT4All
    GPT4ALL_AVAILABLE = True
except ImportError:
    GPT4ALL_AVAILABLE = False
    print("Warning: GPT4All not installed. Install with: pip install gpt4all")

class EnhancedTennisBlogGenerator:
    def __init__(self, output_dir: str = "generated_posts", model_name: str = "orca-mini-3b-gguf2-q4_0.gguf"):
        """
        Initialize the enhanced blog post generator.
        
        Args:
            output_dir (str): Directory to save generated posts
            model_name (str): GPT4All model to use
        """
        self.output_dir = output_dir
        self.model_name = model_name
        self.model = None
        self.ensure_output_directory()
        
        # Initialize GPT4All model
        if GPT4ALL_AVAILABLE:
            try:
                print(f"Loading GPT4All model: {model_name}")
                self.model = GPT4All(model_name)
                print("GPT4All model loaded successfully!")
            except Exception as e:
                print(f"Error loading GPT4All model: {e}")
                print("Falling back to template-based generation")
                self.model = None
        else:
            print("GPT4All not available, using template-based generation")
        
        # Load racket data from Google Sheets
        self.rackets = self.load_rackets_from_sheets()
        
        # Content themes for unique posts
        self.content_themes = [
            "top_10_spin_rackets",
            "top_10_control_rackets", 
            "top_10_power_rackets",
            "top_10_beginner_rackets",
            "improve_utr_fast",
            "individual_racket_review",
            "tennis_technique_guide",
            "equipment_comparison",
            "player_success_story",
            "tennis_training_tips"
        ]
        
        # SEO keywords
        self.seo_keywords = [
            "tennis drills", "best tennis racket", "improve footwork", "AcePlan",
            "tennis training", "tennis equipment", "tennis technique", "tennis tips",
            "tennis racket guide", "tennis practice", "tennis improvement", "tennis coaching",
            "UTR improvement", "tennis spin rackets", "tennis control rackets", "tennis power rackets"
        ]

    def ensure_output_directory(self):
        """Create output directory if it doesn't exist."""
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)
            print(f"Created output directory: {self.output_dir}")

    def load_rackets_from_sheets(self) -> List[Dict]:
        """Load racket data from Google Sheets CSV export."""
        # Google Sheets CSV export URL
        sheets_url = "https://docs.google.com/spreadsheets/d/1BDcm92RBg6Wnh63XlN5ktkOWz9tUQ1ZRAjJhouCaUos/export?format=csv&gid=0"
        
        try:
            print("Loading racket data from Google Sheets...")
            response = requests.get(sheets_url)
            response.raise_for_status()
            
            # Parse CSV data
            csv_data = csv.DictReader(io.StringIO(response.text))
            rackets = []
            
            for row in csv_data:
                if row.get('Name') and row.get('Name').strip():  # Skip empty rows
                    racket = {
                        'id': row.get('#', '').strip(),
                        'name': row.get('Name', '').strip(),
                        'type': row.get('Type', '').strip(),
                        'weight': row.get('Weight (Unstrung, g)', '').strip(),
                        'head_size': row.get('Head Size (in²)', '').strip(),
                        'balance': row.get('Balance (cm)', '').strip(),
                        'string_pattern': row.get('String Pattern', '').strip(),
                        'best_for': row.get('Best For', '').strip(),
                        'standout_tech': row.get('Standout Tech', '').strip(),
                        'skill_level': row.get('Skill Level', '').strip(),
                        'affiliate_link': row.get('Link', '').strip()
                    }
                    rackets.append(racket)
            
            print(f"Loaded {len(rackets)} rackets from database")
            return rackets
            
        except Exception as e:
            print(f"Error loading rackets from Google Sheets: {e}")
            print("Using fallback racket data...")
            return self.get_fallback_rackets()

    def get_fallback_rackets(self) -> List[Dict]:
        """Fallback racket data if Google Sheets fails."""
        return [
            {
                'id': '1',
                'name': 'Babolat Pure Aero 2023',
                'type': 'Power',
                'weight': '300',
                'head_size': '100',
                'balance': '32.5',
                'string_pattern': '16x19',
                'best_for': 'Spin & Power',
                'standout_tech': 'AeroModular',
                'skill_level': 'Intermediate+',
                'affiliate_link': 'https://amzn.to/3JOKGWA'
            },
            {
                'id': '2',
                'name': 'Wilson Pro Staff RF97 v14',
                'type': 'Control',
                'weight': '339',
                'head_size': '97',
                'balance': '31.5',
                'string_pattern': '16x19',
                'best_for': 'Precision',
                'standout_tech': 'Braided Graphite',
                'skill_level': 'Advanced',
                'affiliate_link': 'https://www.amazon.com/Wilson-Staff-Performance-Tennis-Racket/dp/B0BV8C4ZWX/'
            }
        ]

    def generate_with_gpt4all(self, prompt: str, max_tokens: int = 500) -> str:
        """Generate content using GPT4All model."""
        if self.model is None:
            return self.generate_fallback_content(prompt)
        
        try:
            response = self.model.generate(prompt, max_tokens=max_tokens, temp=0.7)
            return response.strip()
        except Exception as e:
            print(f"Error generating with GPT4All: {e}")
            return self.generate_fallback_content(prompt)

    def generate_fallback_content(self, prompt: str) -> str:
        """Generate fallback content when GPT4All is not available."""
        if "top 10" in prompt.lower():
            return "Here are the top 10 tennis rackets that excel in their respective categories, offering exceptional performance for players of all skill levels."
        elif "utr" in prompt.lower():
            return "Improving your UTR rating requires consistent practice, proper technique, and strategic match play to see significant gains."
        elif "racket" in prompt.lower():
            return "This racket offers excellent performance characteristics that make it suitable for players seeking specific playing styles."
        else:
            return "Tennis improvement requires dedication, proper equipment, and consistent practice to reach your goals."

    def generate_top_10_content(self, theme: str) -> str:
        """Generate top 10 list content."""
        if "spin" in theme:
            rackets = [r for r in self.rackets if "spin" in r['best_for'].lower() or "power" in r['type'].lower()][:10]
            title = "Top 10 Tennis Rackets for Spin Players in 2024"
        elif "control" in theme:
            rackets = [r for r in self.rackets if "control" in r['type'].lower() or "precision" in r['best_for'].lower()][:10]
            title = "Top 10 Control Tennis Rackets for Precision Players"
        elif "power" in theme:
            rackets = [r for r in self.rackets if "power" in r['type'].lower()][:10]
            title = "Top 10 Power Tennis Rackets for Aggressive Players"
        elif "beginner" in theme:
            rackets = [r for r in self.rackets if "intermediate" in r['skill_level'].lower()][:10]
            title = "Top 10 Best Tennis Rackets for Beginners and Intermediate Players"
        else:
            rackets = random.sample(self.rackets, 10)
            title = "Top 10 Tennis Rackets Every Player Should Know About"

        prompt = f"""
        Write an engaging introduction for a blog post titled "{title}".
        Explain why these rackets are important for tennis players and what makes them special.
        Include information about how to choose the right racket for your playing style.
        Keep it under 200 words and make it SEO-friendly.
        """
        
        content = self.generate_with_gpt4all(prompt, max_tokens=300)
        
        # Add the top 10 list
        content += f"\n\n## {title}\n\n"
        
        for i, racket in enumerate(rackets, 1):
            content += f"### {i}. {racket['name']}\n\n"
            content += f"**Type:** {racket['type']} | **Weight:** {racket['weight']}g | **Head Size:** {racket['head_size']} in²\n\n"
            content += f"**Best For:** {racket['best_for']}\n\n"
            content += f"**Standout Technology:** {racket['standout_tech']}\n\n"
            content += f"**Skill Level:** {racket['skill_level']}\n\n"
            content += f"**Why It's Great:** This racket excels in {racket['best_for'].lower()} with its {racket['standout_tech']} technology, making it perfect for players seeking {racket['type'].lower()} characteristics.\n\n"
            content += f"**[Get the {racket['name']} here]({racket['affiliate_link']})**\n\n"
            content += "---\n\n"
        
        return content

    def generate_utr_improvement_content(self) -> str:
        """Generate UTR improvement guide content."""
        prompt = """
        Write a comprehensive guide on how to improve your UTR (Universal Tennis Rating) quickly and effectively.
        Include specific strategies, training methods, and mental approaches that help players see rapid improvement.
        Focus on practical, actionable advice that beginners and intermediate players can implement immediately.
        Keep it engaging and motivational. Aim for 400-500 words.
        """
        
        content = self.generate_with_gpt4all(prompt, max_tokens=600)
        
        # Add specific tips
        content += "\n\n## 5 Key Strategies to Improve Your UTR Fast\n\n"
        
        strategies = [
            {
                "title": "Consistent Match Play",
                "description": "Play at least 3-4 competitive matches per week. UTR is based on match results, so regular competition is essential."
            },
            {
                "title": "Targeted Practice Sessions",
                "description": "Focus on your weaknesses during practice. If you struggle with backhands, dedicate 30% of practice time to backhand drills."
            },
            {
                "title": "Mental Game Development",
                "description": "Work on staying calm under pressure and maintaining focus during crucial points. Mental toughness often determines match outcomes."
            },
            {
                "title": "Physical Conditioning",
                "description": "Improve your fitness to maintain consistent performance throughout long matches. Endurance training is crucial for UTR improvement."
            },
            {
                "title": "Equipment Optimization",
                "description": "Ensure your racket, strings, and other equipment are properly suited to your playing style and skill level."
            }
        ]
        
        for i, strategy in enumerate(strategies, 1):
            content += f"### {i}. {strategy['title']}\n\n"
            content += f"{strategy['description']}\n\n"
        
        return content

    def generate_individual_racket_review(self) -> str:
        """Generate individual racket review content."""
        racket = random.choice(self.rackets)
        
        prompt = f"""
        Write a detailed, in-depth review of the {racket['name']} tennis racket.
        Include analysis of its performance characteristics, who it's best suited for, and how it compares to similar rackets.
        Make it engaging and informative for tennis players looking to buy a new racket.
        Include specific details about the racket's technology and performance.
        Keep it under 400 words.
        """
        
        content = self.generate_with_gpt4all(prompt, max_tokens=500)
        
        # Add technical specifications
        content += f"\n\n## {racket['name']} - Technical Specifications\n\n"
        content += f"- **Type:** {racket['type']}\n"
        content += f"- **Weight:** {racket['weight']}g (unstrung)\n"
        content += f"- **Head Size:** {racket['head_size']} in²\n"
        content += f"- **Balance:** {racket['balance']} cm\n"
        content += f"- **String Pattern:** {racket['string_pattern']}\n"
        content += f"- **Best For:** {racket['best_for']}\n"
        content += f"- **Standout Technology:** {racket['standout_tech']}\n"
        content += f"- **Skill Level:** {racket['skill_level']}\n\n"
        
        # Add pros and cons
        content += "## Pros and Cons\n\n"
        content += "**Pros:**\n"
        content += f"- Excellent {racket['best_for'].lower()} performance\n"
        content += f"- Advanced {racket['standout_tech']} technology\n"
        content += f"- Suitable for {racket['skill_level'].lower()} players\n"
        content += "- Professional-grade construction\n\n"
        
        content += "**Cons:**\n"
        content += "- Higher price point\n"
        content += "- May require adjustment period\n"
        content += "- Not suitable for complete beginners\n\n"
        
        # Add affiliate link
        content += f"## Where to Buy\n\n"
        content += f"Ready to try the {racket['name']}? **[Get it here with our affiliate link]({racket['affiliate_link']})** and support AcePlan while getting your new racket!\n\n"
        
        return content

    def generate_blog_post(self, theme: str = None) -> str:
        """Generate a complete blog post with the specified theme."""
        if theme is None:
            theme = random.choice(self.content_themes)
        
        # Generate title and content based on theme
        if theme.startswith("top_10"):
            title = self.get_title_for_theme(theme)
            content = self.generate_top_10_content(theme)
        elif theme == "improve_utr_fast":
            title = "How to Improve Your UTR Rating Fast: 5 Proven Strategies"
            content = self.generate_utr_improvement_content()
        elif theme == "individual_racket_review":
            title = f"Complete Review: {random.choice(self.rackets)['name']} Tennis Racket"
            content = self.generate_individual_racket_review()
        else:
            title = self.get_title_for_theme(theme)
            content = self.generate_generic_content(theme)
        
        # Generate meta description
        meta_description = self.generate_meta_description(title, content[:100])
        
        # Combine all sections
        blog_post = f"""# {title}

**Meta Description:** {meta_description}

---

{content}

---

## Conclusion

Whether you're looking to improve your UTR rating, find the perfect racket, or enhance your tennis game, the right approach and equipment make all the difference. 

For more comprehensive tennis resources, equipment reviews, and training guides, visit [AcePlan](https://aceplan.me) and explore our extensive 100-racket database to find the perfect equipment for your game.

Our database includes detailed specifications, reviews, and affiliate links to help you make informed purchasing decisions while supporting our platform.

---

**Keywords:** {', '.join(random.sample(self.seo_keywords, 6))}
**Category:** Tennis Equipment & Training
**Generated:** {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**Website:** https://aceplan.me
**Database:** https://docs.google.com/spreadsheets/d/1BDcm92RBg6Wnh63XlN5ktkOWz9tUQ1ZRAjJhouCaUos/edit?gid=0#gid=0
**Racket Database:** 100+ tennis rackets with detailed specifications and affiliate links
"""
        
        return blog_post

    def get_title_for_theme(self, theme: str) -> str:
        """Get appropriate title for content theme."""
        titles = {
            "top_10_spin_rackets": "Top 10 Tennis Rackets for Spin Players in 2024: Ultimate Guide",
            "top_10_control_rackets": "Top 10 Control Tennis Rackets for Precision Players",
            "top_10_power_rackets": "Top 10 Power Tennis Rackets for Aggressive Players",
            "top_10_beginner_rackets": "Top 10 Best Tennis Rackets for Beginners and Intermediate Players",
            "tennis_technique_guide": "Essential Tennis Techniques Every Player Should Master",
            "equipment_comparison": "Tennis Equipment Comparison: Finding Your Perfect Match",
            "player_success_story": "Inspiring Tennis Success Stories: From Beginner to Advanced",
            "tennis_training_tips": "Pro Tennis Training Tips: Improve Your Game Today"
        }
        return titles.get(theme, "Complete Tennis Guide: Equipment, Training, and Tips")

    def generate_generic_content(self, theme: str) -> str:
        """Generate generic content for other themes."""
        prompt = f"""
        Write an engaging, informative blog post about {theme.replace('_', ' ')} in tennis.
        Make it beginner-friendly but informative, include practical tips and advice.
        Keep it around 400-500 words and make it SEO-optimized.
        """
        
        content = self.generate_with_gpt4all(prompt, max_tokens=600)
        
        # Add AcePlan references
        content += f"\n\nFor more tennis tips, equipment reviews, and training guides, visit [AcePlan](https://aceplan.me) and explore our comprehensive 100-racket database."
        
        return content

    def generate_meta_description(self, title: str, content_preview: str) -> str:
        """Generate SEO meta description."""
        description = f"Discover {title.lower()}. {content_preview}... Learn tennis tips, equipment reviews, and training guides at AcePlan."
        return description[:160]

    def save_post(self, content: str, filename: str = None) -> str:
        """Save the blog post to a file."""
        if filename is None:
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"tennis_blog_post_{timestamp}.txt"
        
        filepath = os.path.join(self.output_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Blog post saved: {filepath}")
        return filepath

    def generate_scheduled_post(self, time_of_day: str) -> str:
        """Generate a post for a specific time of day with appropriate theme."""
        # Different themes for different times
        morning_themes = ["top_10_spin_rackets", "top_10_control_rackets", "tennis_technique_guide"]
        afternoon_themes = ["individual_racket_review", "improve_utr_fast", "equipment_comparison"]
        evening_themes = ["player_success_story", "tennis_training_tips", "top_10_beginner_rackets"]
        
        if "morning" in time_of_day or "9am" in time_of_day:
            theme = random.choice(morning_themes)
        elif "afternoon" in time_of_day or "12pm" in time_of_day or "3pm" in time_of_day:
            theme = random.choice(afternoon_themes)
        else:  # evening
            theme = random.choice(evening_themes)
        
        content = self.generate_blog_post(theme)
        
        # Create filename with time info
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"tennis_blog_{time_of_day}_{timestamp}.txt"
        
        return self.save_post(content, filename)

def main():
    """Main function to run the enhanced blog generator."""
    print("AcePlan Enhanced Tennis Blog Generator")
    print("=====================================")
    print("Website: https://aceplan.me")
    print("Database: https://docs.google.com/spreadsheets/d/1BDcm92RBg6Wnh63XlN5ktkOWz9tUQ1ZRAjJhouCaUos/edit?gid=0#gid=0")
    print()
    
    # Initialize generator
    generator = EnhancedTennisBlogGenerator()
    
    # Menu for user interaction
    while True:
        print("\nOptions:")
        print("1. Generate single blog post")
        print("2. Generate morning post (9am style)")
        print("3. Generate afternoon post (12pm/3pm style)")
        print("4. Generate evening post (5pm/7pm style)")
        print("5. Generate batch of posts")
        print("6. Exit")
        
        choice = input("\nEnter your choice (1-6): ").strip()
        
        if choice == '1':
            content = generator.generate_blog_post()
            generator.save_post(content)
            
        elif choice == '2':
            generator.generate_scheduled_post("9am")
            
        elif choice == '3':
            generator.generate_scheduled_post("3pm")
            
        elif choice == '4':
            generator.generate_scheduled_post("7pm")
            
        elif choice == '5':
            try:
                count = int(input("Enter number of posts to generate: "))
                if count > 0:
                    for i in range(count):
                        theme = random.choice(generator.content_themes)
                        content = generator.generate_blog_post(theme)
                        generator.save_post(content)
                        time.sleep(2)  # Small delay between posts
                else:
                    print("Please enter a positive number.")
            except ValueError:
                print("Please enter a valid number.")
                
        elif choice == '6':
            print("Thank you for using AcePlan Enhanced Tennis Blog Generator!")
            break
            
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
