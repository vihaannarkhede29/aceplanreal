#!/usr/bin/env python3
"""
AcePlan Website Blog Generator
=============================

This script generates tennis blog posts and automatically publishes them to your website.
It integrates with your existing blog system and publishes posts to https://aceplan.me/articles

Features:
- Generates unique, SEO-optimized tennis blog posts
- Automatically publishes to your website
- Uses your real racket database with affiliate links
- Integrates with your existing blog system

Author: AcePlan Team
Website: https://aceplan.me
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

class WebsiteBlogGenerator:
    def __init__(self, model_name: str = "orca-mini-3b-gguf2-q4_0.gguf"):
        """
        Initialize the website blog generator.
        
        Args:
            model_name (str): GPT4All model to use
        """
        self.model_name = model_name
        self.model = None
        
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
        
        # Website API endpoint
        self.website_api = "http://localhost:3000/api/articles/publish"  # Change to your actual domain
        
        # SEO keywords
        self.seo_keywords = [
            "tennis drills", "best tennis racket", "improve footwork", "AcePlan",
            "tennis training", "tennis equipment", "tennis technique", "tennis tips",
            "tennis racket guide", "tennis practice", "tennis improvement", "tennis coaching",
            "UTR improvement", "tennis spin rackets", "tennis control rackets", "tennis power rackets"
        ]

    def load_rackets_from_sheets(self) -> List[Dict]:
        """Load racket data from Google Sheets CSV export."""
        sheets_url = "https://docs.google.com/spreadsheets/d/1BDcm92RBg6Wnh63XlN5ktkOWz9tUQ1ZRAjJhouCaUos/export?format=csv&gid=0"
        
        try:
            print("Loading racket data from Google Sheets...")
            response = requests.get(sheets_url)
            response.raise_for_status()
            
            csv_data = csv.DictReader(io.StringIO(response.text))
            rackets = []
            
            for row in csv_data:
                if row.get('Name') and row.get('Name').strip():
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

    def generate_blog_post(self, theme: str = None) -> Dict[str, Any]:
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
        
        # Add conclusion
        content += "\n\n## Conclusion\n\n"
        content += "Whether you're looking to improve your UTR rating, find the perfect racket, or enhance your tennis game, the right approach and equipment make all the difference.\n\n"
        content += "For more comprehensive tennis resources, equipment reviews, and training guides, visit [AcePlan](https://aceplan.me) and explore our extensive 100-racket database to find the perfect equipment for your game.\n\n"
        content += "Our database includes detailed specifications, reviews, and affiliate links to help you make informed purchasing decisions while supporting our platform.\n"
        
        return {
            'title': title,
            'content': content,
            'category': self.get_category_for_theme(theme),
            'tags': self.get_tags_for_theme(theme)
        }

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

    def get_category_for_theme(self, theme: str) -> str:
        """Get category for theme."""
        categories = {
            "top_10_spin_rackets": "equipment",
            "top_10_control_rackets": "equipment",
            "top_10_power_rackets": "equipment",
            "top_10_beginner_rackets": "equipment",
            "improve_utr_fast": "training",
            "individual_racket_review": "equipment",
            "tennis_technique_guide": "technique",
            "equipment_comparison": "equipment",
            "player_success_story": "inspiration",
            "tennis_training_tips": "training"
        }
        return categories.get(theme, "equipment")

    def get_tags_for_theme(self, theme: str) -> List[str]:
        """Get tags for theme."""
        tag_map = {
            "top_10_spin_rackets": ["tennis rackets", "spin", "top 10", "equipment"],
            "top_10_control_rackets": ["tennis rackets", "control", "precision", "top 10"],
            "top_10_power_rackets": ["tennis rackets", "power", "aggressive", "top 10"],
            "top_10_beginner_rackets": ["tennis rackets", "beginner", "intermediate", "top 10"],
            "improve_utr_fast": ["UTR", "improvement", "training", "strategy"],
            "individual_racket_review": ["tennis racket", "review", "equipment", "analysis"],
            "tennis_technique_guide": ["technique", "fundamentals", "training", "tips"],
            "equipment_comparison": ["equipment", "comparison", "tennis gear", "review"],
            "player_success_story": ["success story", "inspiration", "tennis journey", "motivation"],
            "tennis_training_tips": ["training", "tips", "improvement", "practice"]
        }
        return tag_map.get(theme, ["tennis", "tips", "guide"])

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

    def publish_to_website(self, blog_post: Dict[str, Any]) -> bool:
        """Publish blog post to the website."""
        try:
            print(f"Publishing '{blog_post['title']}' to website...")
            
            # Prepare the data for the API
            data = {
                'title': blog_post['title'],
                'content': blog_post['content'],
                'category': blog_post['category'],
                'tags': blog_post['tags']
            }
            
            # Make the API call
            response = requests.post(self.website_api, json=data, timeout=30)
            
            if response.status_code == 200:
                result = response.json()
                print(f"✅ Successfully published: {result['article']['title']}")
                print(f"   Slug: {result['article']['slug']}")
                print(f"   ID: {result['article']['id']}")
                return True
            else:
                print(f"❌ Failed to publish: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            print(f"❌ Error publishing to website: {e}")
            return False

    def generate_and_publish(self, theme: str = None) -> bool:
        """Generate a blog post and publish it to the website."""
        try:
            # Generate the blog post
            blog_post = self.generate_blog_post(theme)
            
            # Publish to website
            success = self.publish_to_website(blog_post)
            
            if success:
                print(f"🎉 Blog post '{blog_post['title']}' generated and published successfully!")
                return True
            else:
                print(f"❌ Failed to publish blog post '{blog_post['title']}'")
                return False
                
        except Exception as e:
            print(f"❌ Error generating and publishing blog post: {e}")
            return False

def main():
    """Main function to run the website blog generator."""
    print("AcePlan Website Blog Generator")
    print("=============================")
    print("Website: https://aceplan.me")
    print("Database: https://docs.google.com/spreadsheets/d/1BDcm92RBg6Wnh63XlN5ktkOWz9tUQ1ZRAjJhouCaUos/edit?gid=0#gid=0")
    print()
    
    # Initialize generator
    generator = WebsiteBlogGenerator()
    
    # Menu for user interaction
    while True:
        print("\nOptions:")
        print("1. Generate and publish single blog post")
        print("2. Generate and publish morning post (9am style)")
        print("3. Generate and publish afternoon post (12pm/3pm style)")
        print("4. Generate and publish evening post (5pm/7pm style)")
        print("5. Generate and publish batch of posts")
        print("6. Exit")
        
        choice = input("\nEnter your choice (1-6): ").strip()
        
        if choice == '1':
            generator.generate_and_publish()
            
        elif choice == '2':
            morning_themes = ["top_10_spin_rackets", "top_10_control_rackets", "tennis_technique_guide"]
            theme = random.choice(morning_themes)
            generator.generate_and_publish(theme)
            
        elif choice == '3':
            afternoon_themes = ["individual_racket_review", "improve_utr_fast", "equipment_comparison"]
            theme = random.choice(afternoon_themes)
            generator.generate_and_publish(theme)
            
        elif choice == '4':
            evening_themes = ["player_success_story", "tennis_training_tips", "tennis_technique_guide"]
            theme = random.choice(evening_themes)
            generator.generate_and_publish(theme)
            
        elif choice == '5':
            try:
                count = int(input("Enter number of posts to generate and publish: "))
                if count > 0:
                    for i in range(count):
                        theme = random.choice(generator.content_themes)
                        generator.generate_and_publish(theme)
                        time.sleep(2)  # Small delay between posts
                else:
                    print("Please enter a positive number.")
            except ValueError:
                print("Please enter a valid number.")
                
        elif choice == '6':
            print("Thank you for using AcePlan Website Blog Generator!")
            break
            
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
