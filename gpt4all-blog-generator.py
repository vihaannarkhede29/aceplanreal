#!/usr/bin/env python3
"""
AcePlan Tennis Blog Post Generator with GPT4All
==============================================

This script automatically generates SEO-optimized tennis blog posts using GPT4All
(local, free AI model) that include all required sections:
- Gear Highlight: Specific racket analysis
- Drill Advice: Step-by-step footwork drill
- Player Story: Young player's journey to 10 UTR
- New Section: Bonus tip, drill, or racket recommendation

Features:
- Uses GPT4All for local, free AI generation
- SEO optimized with keywords and internal links
- Randomized content for freshness
- Timestamped file saving
- Beginner-to-intermediate focused content

Author: AcePlan Team
Website: https://aceplan.me
"""

import os
import json
import random
import datetime
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

class TennisBlogGenerator:
    def __init__(self, output_dir: str = "generated_posts", model_name: str = "orca-mini-3b-gguf2-q4_0.gguf"):
        """
        Initialize the blog post generator with GPT4All.
        
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
        
        # Load racket and drill data
        self.rackets = self.load_rackets()
        self.drills = self.load_drills()
        
        # Player story templates
        self.player_stories = [
            {
                "name": "Sarah Chen",
                "age": 16,
                "location": "California",
                "starting_utr": 3.5,
                "current_utr": 10.2,
                "timeframe": "18 months",
                "routine": "Daily 2-hour practice sessions, 3x weekly fitness training, weekend tournaments",
                "key_factors": ["Consistent daily practice", "Professional coaching", "Mental training", "Tournament experience"]
            },
            {
                "name": "Marcus Rodriguez",
                "age": 17,
                "location": "Texas",
                "starting_utr": 4.0,
                "current_utr": 10.5,
                "timeframe": "2 years",
                "routine": "Morning practice 6 AM, afternoon matches, evening fitness, weekly lessons",
                "key_factors": ["Early morning discipline", "Match play focus", "Physical conditioning", "Technical refinement"]
            },
            {
                "name": "Emma Thompson",
                "age": 15,
                "location": "Florida",
                "starting_utr": 3.0,
                "current_utr": 10.0,
                "timeframe": "20 months",
                "routine": "School tennis team, private lessons, weekend tournaments, summer camps",
                "key_factors": ["Team environment", "Structured coaching", "Competitive exposure", "Year-round training"]
            }
        ]
        
        # SEO keywords
        self.seo_keywords = [
            "tennis drills", "best tennis racket", "improve footwork", "AcePlan",
            "tennis training", "tennis equipment", "tennis technique", "tennis tips",
            "tennis racket guide", "tennis practice", "tennis improvement", "tennis coaching"
        ]

    def ensure_output_directory(self):
        """Create output directory if it doesn't exist."""
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)
            print(f"Created output directory: {self.output_dir}")

    def load_rackets(self) -> List[Dict]:
        """Load racket data from the existing rackets.ts file."""
        # This would normally parse the TypeScript file, but for now we'll use a subset
        return [
            {
                "name": "Tecnifibre TFight 295",
                "brand": "Tecnifibre",
                "weight": "10.4 oz",
                "headSize": "98 sq in",
                "stiffness": "Medium-Stiff",
                "level": "Intermediate-Advanced",
                "description": "Precision control racket with excellent spin potential and power",
                "pros": ["Exceptional spin", "Great power", "Excellent control", "Professional quality"],
                "cons": ["Requires good technique", "Higher price point"],
                "category": "control"
            },
            {
                "name": "Babolat Pure Aero 2023",
                "brand": "Babolat",
                "weight": "10.6 oz",
                "headSize": "100 sq in",
                "stiffness": "Stiff",
                "level": "Intermediate-Advanced",
                "description": "Revolutionary spin racket with AeroModular technology",
                "pros": ["Exceptional spin potential", "AeroModular technology", "Great for aggressive players"],
                "cons": ["Stiff feel may not suit everyone", "Higher price point"],
                "category": "power"
            },
            {
                "name": "Wilson Pro Staff RF97 v14",
                "brand": "Wilson",
                "weight": "12.0 oz",
                "headSize": "97 sq in",
                "stiffness": "Stiff",
                "level": "Advanced",
                "description": "Roger Federer's signature racket with exceptional precision",
                "pros": ["Exceptional control", "Professional quality", "Great for advanced players"],
                "cons": ["Heavy weight requires strength", "Small head size", "High price point"],
                "category": "control"
            },
            {
                "name": "Head Radical MP 2021",
                "brand": "Head",
                "weight": "11.2 oz",
                "headSize": "98 sq in",
                "stiffness": "Medium",
                "level": "Intermediate-Advanced",
                "description": "Versatile all-around racket with balanced performance",
                "pros": ["Excellent versatility", "Balanced performance", "Quality construction"],
                "cons": ["May not excel in any one area", "Higher price point"],
                "category": "all-around"
            },
            {
                "name": "Yonex EZONE 100",
                "brand": "Yonex",
                "weight": "10.6 oz",
                "headSize": "100 sq in",
                "stiffness": "Medium-Stiff",
                "level": "Intermediate",
                "description": "Versatile power racket with Isometric design",
                "pros": ["Isometric design for larger sweet spot", "Great spin and comfort", "Versatile performance"],
                "cons": ["May lack power for some players", "Higher price point"],
                "category": "power"
            }
        ]

    def load_drills(self) -> List[Dict]:
        """Load drill data from the existing drills.ts file."""
        return [
            {
                "name": "Split-Step Footwork Drill",
                "category": "footwork",
                "difficulty": "beginner",
                "duration": 15,
                "description": "Master the split-step for better court movement and reaction time",
                "instructions": [
                    "Start in ready position at the baseline",
                    "Have a partner or coach feed balls to different court positions",
                    "Perform a small hop (split-step) as the ball is being hit",
                    "Land with feet shoulder-width apart, knees slightly bent",
                    "Push off explosively toward the ball's direction",
                    "Focus on quick, light steps and maintaining balance",
                    "Practice for 3 sets of 10 repetitions each"
                ],
                "focus": ["Reaction time", "Balance", "Explosive movement", "Court positioning"],
                "benefits": "Improves reaction time, court coverage, and overall movement efficiency"
            },
            {
                "name": "Ladder Agility Drill",
                "category": "footwork",
                "difficulty": "beginner",
                "duration": 20,
                "description": "Enhance footwork speed and coordination with ladder drills",
                "instructions": [
                    "Set up an agility ladder on the court",
                    "Start with basic in-and-out pattern through each rung",
                    "Keep feet light and quick, landing on balls of feet",
                    "Progress to side-to-side movements",
                    "Add tennis-specific movements like cross-steps",
                    "Practice for 2 minutes, rest 1 minute, repeat 3 times"
                ],
                "focus": ["Speed", "Coordination", "Agility", "Foot placement"],
                "benefits": "Develops quick feet, better coordination, and tennis-specific movement patterns"
            },
            {
                "name": "Shadow Tennis Drill",
                "category": "footwork",
                "difficulty": "intermediate",
                "duration": 25,
                "description": "Practice footwork patterns without a ball to improve muscle memory",
                "instructions": [
                    "Start at the baseline in ready position",
                    "Simulate receiving shots to different court positions",
                    "Practice proper footwork for forehand, backhand, and volleys",
                    "Focus on split-step timing and recovery steps",
                    "Move as if playing a real point",
                    "Practice for 5 minutes, focusing on smooth, efficient movement"
                ],
                "focus": ["Muscle memory", "Movement patterns", "Timing", "Recovery"],
                "benefits": "Builds muscle memory for proper footwork and improves movement efficiency"
            }
        ]

    def generate_with_gpt4all(self, prompt: str, max_tokens: int = 500) -> str:
        """
        Generate content using GPT4All model.
        
        Args:
            prompt (str): The prompt to generate content from
            max_tokens (int): Maximum number of tokens to generate
            
        Returns:
            str: Generated content
        """
        if self.model is None:
            return self.generate_fallback_content(prompt)
        
        try:
            # Generate content with GPT4All
            response = self.model.generate(prompt, max_tokens=max_tokens, temp=0.7)
            return response.strip()
        except Exception as e:
            print(f"Error generating with GPT4All: {e}")
            return self.generate_fallback_content(prompt)

    def generate_fallback_content(self, prompt: str) -> str:
        """Generate fallback content when GPT4All is not available."""
        # Simple template-based generation as fallback
        if "racket" in prompt.lower():
            return "This racket offers excellent performance for intermediate players, combining power and control for versatile play."
        elif "drill" in prompt.lower():
            return "This drill focuses on improving fundamental tennis skills through consistent practice and proper technique."
        elif "player" in prompt.lower():
            return "This player's dedication and structured training routine led to significant improvement in their tennis game."
        else:
            return "Tennis improvement requires dedication, proper technique, and consistent practice to reach your goals."

    def generate_meta_description(self, title: str, content_preview: str) -> str:
        """Generate SEO meta description."""
        description = f"Discover {title.lower()}. {content_preview[:100]}... Learn tennis tips, drills, and equipment recommendations at AcePlan."
        return description[:160]  # Keep under 160 characters for SEO

    def generate_gear_highlight(self, racket: Dict) -> str:
        """Generate gear highlight section for a specific racket."""
        prompt = f"""
        Write a detailed analysis of the {racket['name']} tennis racket. Explain why it's great for:
        1. Spin generation and control
        2. Power and shot depth
        3. Overall control and precision
        
        Include specific technical details about weight ({racket['weight']}), head size ({racket['headSize']}), and stiffness ({racket['stiffness']}).
        Make it beginner-friendly but informative. Keep it under 200 words.
        """
        
        content = self.generate_with_gpt4all(prompt, max_tokens=300)
        
        # Add internal link to AcePlan
        content += f"\n\nFor more detailed racket reviews and our complete 100-racket database, visit [AcePlan](https://aceplan.me) to find the perfect racket for your game."
        
        return content

    def generate_drill_advice(self, drill: Dict) -> str:
        """Generate step-by-step drill advice."""
        prompt = f"""
        Write a beginner-friendly explanation of the {drill['name']} tennis drill. 
        Explain why this drill is important for improving footwork and tennis performance.
        Provide clear, actionable steps that a beginner can follow.
        Include tips for proper form and common mistakes to avoid.
        Keep it under 250 words and make it engaging.
        """
        
        content = self.generate_with_gpt4all(prompt, max_tokens=400)
        
        # Add the detailed instructions
        content += f"\n\n**Step-by-Step Instructions:**\n"
        for i, instruction in enumerate(drill['instructions'], 1):
            content += f"{i}. {instruction}\n"
        
        content += f"\n**Focus Areas:** {', '.join(drill['focus'])}\n"
        content += f"**Duration:** {drill['duration']} minutes\n"
        content += f"**Benefits:** {drill['benefits']}"
        
        return content

    def generate_player_story(self, story: Dict) -> str:
        """Generate player success story."""
        prompt = f"""
        Write an inspiring story about {story['name']}, a {story['age']}-year-old tennis player from {story['location']} 
        who improved from UTR {story['starting_utr']} to UTR {story['current_utr']} in {story['timeframe']}.
        
        Emphasize their training routine: {story['routine']}
        Key factors in their success: {', '.join(story['key_factors'])}
        
        Make it motivational and relatable for other young tennis players. Include specific details about their journey.
        Keep it under 300 words.
        """
        
        content = self.generate_with_gpt4all(prompt, max_tokens=500)
        
        # Add AcePlan reference
        content += f"\n\n{story['name']}'s story shows that with the right training routine and dedication, significant improvement is possible. For personalized training plans and equipment recommendations, visit [AcePlan](https://aceplan.me)."
        
        return content

    def generate_new_section(self) -> str:
        """Generate bonus tip, drill, or racket recommendation."""
        section_types = ["bonus_tip", "related_drill", "racket_recommendation"]
        section_type = random.choice(section_types)
        
        if section_type == "bonus_tip":
            prompt = """
            Write a practical tennis tip that beginners and intermediate players can immediately apply to improve their game.
            Focus on a specific aspect like mental game, nutrition, recovery, or equipment care.
            Make it actionable and valuable. Keep it under 150 words.
            """
        elif section_type == "related_drill":
            drill = random.choice(self.drills)
            prompt = f"""
            Write about a related tennis drill that complements the {drill['name']} mentioned earlier.
            Explain how this drill works together with the main drill to improve overall tennis performance.
            Keep it under 150 words.
            """
        else:  # racket_recommendation
            racket = random.choice(self.rackets)
            prompt = f"""
            Write a brief recommendation for the {racket['name']} as an alternative or complementary racket choice.
            Explain why this racket might be suitable for different playing styles or skill levels.
            Keep it under 150 words.
            """
        
        content = self.generate_with_gpt4all(prompt, max_tokens=250)
        
        # Add AcePlan link
        content += f"\n\nFor more tennis tips, drills, and equipment reviews, explore our comprehensive resources at [AcePlan](https://aceplan.me)."
        
        return content

    def generate_blog_post(self) -> str:
        """Generate a complete blog post with all required sections."""
        # Select random content
        racket = random.choice(self.rackets)
        drill = random.choice([d for d in self.drills if d['category'] == 'footwork'])
        player_story = random.choice(self.player_stories)
        
        # Generate title
        title_templates = [
            f"Master Your Tennis Game: {racket['name']} Review and Essential Footwork Drills",
            f"Tennis Improvement Guide: {racket['name']} Analysis and Proven Training Methods",
            f"From Beginner to Advanced: {racket['name']} and the Path to Tennis Excellence",
            f"Tennis Equipment and Training: {racket['name']} Review with Expert Drills",
            f"Complete Tennis Guide: {racket['name']} Review, Drills, and Success Stories"
        ]
        title = random.choice(title_templates)
        
        # Generate meta description
        meta_description = self.generate_meta_description(title, f"Learn about the {racket['name']} racket, essential footwork drills, and inspiring player success stories.")
        
        # Generate content sections
        gear_highlight = self.generate_gear_highlight(racket)
        drill_advice = self.generate_drill_advice(drill)
        player_story_content = self.generate_player_story(player_story)
        new_section = self.generate_new_section()
        
        # Combine all sections
        blog_post = f"""# {title}

**Meta Description:** {meta_description}

---

## Gear Highlight: {racket['name']}

{gear_highlight}

---

## Drill Advice: {drill['name']}

{drill_advice}

---

## Player Story: {player_story['name']}'s Journey to UTR {player_story['current_utr']}

{player_story_content}

---

## Bonus Section

{new_section}

---

## Conclusion

Whether you're just starting your tennis journey or looking to take your game to the next level, the right equipment, proper training, and dedication are key to success. The {racket['name']} offers excellent performance for players seeking {racket['category']} characteristics, while the {drill['name']} provides a solid foundation for improving your footwork.

{player_story['name']}'s story demonstrates that with consistent practice and the right approach, significant improvement is achievable. Remember, every great tennis player started as a beginner.

For more comprehensive tennis resources, equipment reviews, and training guides, visit [AcePlan](https://aceplan.me) and explore our extensive 100-racket database to find the perfect equipment for your game.

---

**Keywords:** {', '.join(random.sample(self.seo_keywords, 6))}
**Category:** Tennis Equipment & Training
**Generated:** {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**Website:** https://aceplan.me
**Racket Database:** 100+ tennis rackets with detailed specifications and reviews
"""
        
        return blog_post

    def save_post(self, content: str, filename: str = None) -> str:
        """
        Save the blog post to a file.
        
        Args:
            content (str): Blog post content
            filename (str): Custom filename (optional)
            
        Returns:
            str: Path to saved file
        """
        if filename is None:
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"tennis_blog_post_{timestamp}.txt"
        
        filepath = os.path.join(self.output_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Blog post saved: {filepath}")
        return filepath

    def generate_daily_post(self) -> str:
        """
        Generate and save a daily blog post.
        
        Returns:
            str: Path to saved file
        """
        print("Generating daily tennis blog post with GPT4All...")
        
        # Generate the post
        content = self.generate_blog_post()
        
        # Create filename with date
        date_str = datetime.datetime.now().strftime("%Y%m%d")
        filename = f"daily_tennis_post_{date_str}.txt"
        
        # Save the post
        filepath = self.save_post(content, filename)
        
        print(f"Daily post generated successfully: {filename}")
        return filepath

    def generate_batch_posts(self, count: int = 5) -> List[str]:
        """
        Generate multiple blog posts.
        
        Args:
            count (int): Number of posts to generate
            
        Returns:
            List[str]: List of file paths for generated posts
        """
        print(f"Generating {count} tennis blog posts with GPT4All...")
        
        filepaths = []
        
        for i in range(count):
            print(f"Generating post {i+1}/{count}...")
            
            # Generate the post
            content = self.generate_blog_post()
            
            # Create filename with timestamp
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"tennis_blog_post_{timestamp}_{i+1}.txt"
            
            # Save the post
            filepath = self.save_post(content, filename)
            filepaths.append(filepath)
            
            # Small delay between posts
            time.sleep(2)
        
        print(f"Batch generation completed: {len(filepaths)} posts generated")
        return filepaths

def main():
    """
    Main function to run the blog post generator.
    """
    print("AcePlan Tennis Blog Post Generator with GPT4All")
    print("==============================================")
    print("Website: https://aceplan.me")
    print("Racket Database: 100+ tennis rackets")
    print()
    
    # Initialize generator
    generator = TennisBlogGenerator()
    
    # Menu for user interaction
    while True:
        print("\nOptions:")
        print("1. Generate single blog post")
        print("2. Generate daily post")
        print("3. Generate batch of posts (5)")
        print("4. Generate custom number of posts")
        print("5. Exit")
        
        choice = input("\nEnter your choice (1-5): ").strip()
        
        if choice == '1':
            content = generator.generate_blog_post()
            generator.save_post(content)
            
        elif choice == '2':
            generator.generate_daily_post()
            
        elif choice == '3':
            generator.generate_batch_posts(5)
            
        elif choice == '4':
            try:
                count = int(input("Enter number of posts to generate: "))
                if count > 0:
                    generator.generate_batch_posts(count)
                else:
                    print("Please enter a positive number.")
            except ValueError:
                print("Please enter a valid number.")
                
        elif choice == '5':
            print("Thank you for using AcePlan Tennis Blog Generator!")
            break
            
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
