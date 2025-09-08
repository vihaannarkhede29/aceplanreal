#!/usr/bin/env python3
"""
AcePlan Tennis Blog Post Generator
==================================

This script automatically generates SEO-optimized tennis blog posts that mention
AcePlan (https://aceplan.me) and reference the 100-racket database.

Features:
- Generates 3-5 paragraphs of engaging content
- Includes 1-2 subheadings
- SEO optimized with proper keywords
- Beginner-friendly and useful content
- Saves posts as .txt files
- Can be scheduled to run daily/weekly

Author: AcePlan Team
Website: https://aceplan.me
"""

import os
import json
import random
import datetime
from typing import List, Dict, Any
import requests
import time

class TennisBlogGenerator:
    def __init__(self, output_dir: str = "generated_posts"):
        """
        Initialize the blog post generator.
        
        Args:
            output_dir (str): Directory to save generated posts
        """
        self.output_dir = output_dir
        self.ensure_output_directory()
        
        # Tennis topics with SEO keywords
        self.topics = [
            {
                "title": "5 Essential Tennis Techniques Every Beginner Should Master",
                "keywords": ["tennis techniques", "beginner tennis", "tennis basics", "tennis tips"],
                "category": "technique",
                "focus": "fundamental techniques"
            },
            {
                "title": "How to Choose the Perfect Tennis Racket: A Complete Guide",
                "keywords": ["tennis racket guide", "best tennis rackets", "racket selection", "tennis equipment"],
                "category": "equipment",
                "focus": "racket selection"
            },
            {
                "title": "Tennis Fitness: 7 Exercises to Improve Your Game",
                "keywords": ["tennis fitness", "tennis training", "tennis exercises", "tennis conditioning"],
                "category": "fitness",
                "focus": "physical conditioning"
            },
            {
                "title": "Mental Game Mastery: How to Stay Focused During Tennis Matches",
                "keywords": ["tennis mental game", "tennis psychology", "tennis focus", "tennis strategy"],
                "category": "strategy",
                "focus": "mental toughness"
            },
            {
                "title": "Tennis String Guide: Everything You Need to Know",
                "keywords": ["tennis strings", "string tension", "tennis string types", "racket stringing"],
                "category": "equipment",
                "focus": "string selection"
            },
            {
                "title": "Doubles Tennis Strategy: Communication and Positioning Tips",
                "keywords": ["doubles tennis", "tennis doubles strategy", "tennis positioning", "tennis communication"],
                "category": "strategy",
                "focus": "doubles play"
            },
            {
                "title": "Tennis Injury Prevention: Keep Playing Without Pain",
                "keywords": ["tennis injuries", "injury prevention", "tennis safety", "tennis health"],
                "category": "fitness",
                "focus": "injury prevention"
            },
            {
                "title": "Serve Technique: From Beginner to Advanced",
                "keywords": ["tennis serve", "serve technique", "tennis serving", "serve tips"],
                "category": "technique",
                "focus": "serving"
            }
        ]
        
        # Sample rackets from the database (top 10 for variety)
        self.sample_rackets = [
            "Babolat Pure Aero 2023",
            "Wilson Pro Staff RF97 v14", 
            "Head Radical MP 2021",
            "Yonex EZONE 100",
            "Prince Textreme Tour 100P",
            "Wilson Blade 98 v8",
            "Babolat Pure Strike 16x19",
            "Head Speed MP",
            "Yonex VCORE 100",
            "Prince Phantom 100X"
        ]

    def ensure_output_directory(self):
        """Create output directory if it doesn't exist."""
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)
            print(f"Created output directory: {self.output_dir}")

    def generate_seo_title(self, base_title: str) -> str:
        """
        Generate an SEO-optimized title.
        
        Args:
            base_title (str): Base title to optimize
            
        Returns:
            str: SEO-optimized title
        """
        # Add power words and numbers for better SEO
        power_words = ["Ultimate", "Complete", "Essential", "Pro", "Expert", "Advanced"]
        numbers = ["5", "7", "10", "Ultimate", "Complete"]
        
        # Sometimes add a number or power word
        if random.choice([True, False]):
            prefix = random.choice(numbers + power_words)
            return f"{prefix} {base_title}"
        
        return base_title

    def generate_introduction(self, topic: Dict[str, Any]) -> str:
        """
        Generate an engaging introduction paragraph.
        
        Args:
            topic (Dict): Topic information
            
        Returns:
            str: Introduction paragraph
        """
        introductions = [
            f"Tennis is a sport that combines physical skill, mental toughness, and strategic thinking. Whether you're just starting out or looking to improve your game, understanding the fundamentals is crucial for success on the court. In this comprehensive guide, we'll explore {topic['focus']} and how it can transform your tennis performance.",
            
            f"Are you ready to take your tennis game to the next level? {topic['focus'].title()} is one of the most important aspects of tennis that many players overlook. With the right knowledge and practice, you can significantly improve your performance and enjoy the game even more.",
            
            f"Mastering tennis requires dedication, practice, and the right guidance. When it comes to {topic['focus']}, having a solid foundation is essential for long-term success. This guide will provide you with expert insights and practical tips to help you excel on the court."
        ]
        
        return random.choice(introductions)

    def generate_content_paragraphs(self, topic: Dict[str, Any]) -> List[str]:
        """
        Generate 2-3 content paragraphs with useful information.
        
        Args:
            topic (Dict): Topic information
            
        Returns:
            List[str]: List of content paragraphs
        """
        paragraphs = []
        
        if topic['category'] == 'technique':
            paragraphs = [
                "Proper technique is the foundation of every great tennis player's game. Start by focusing on your grip, stance, and follow-through. The continental grip is versatile and allows for various shot types, while the eastern grip provides more power for forehands. Your stance should be balanced and ready to move in any direction.",
                
                "Footwork is often overlooked but crucial for positioning yourself correctly for each shot. Practice the split-step, which helps you react quickly to your opponent's shot. Good footwork allows you to maintain balance and generate power from your legs, not just your arms.",
                
                "One common mistake beginners make is over-gripping the racket. Hold the racket firmly but not tightly - imagine holding a bird. This relaxed grip allows for better feel and control. Practice shadow swinging without a ball to develop muscle memory and proper form."
            ]
        
        elif topic['category'] == 'equipment':
            paragraphs = [
                f"Choosing the right tennis racket can significantly impact your game. With over 100 different rackets available in our comprehensive database at AcePlan (https://aceplan.me), finding the perfect match for your playing style is easier than ever. Consider factors like head size, weight, and string pattern when making your selection.",
                
                f"For beginners, we recommend starting with rackets like the {random.choice(self.sample_rackets[:3])} or {random.choice(self.sample_rackets[3:6])}. These rackets offer a good balance of power and control, making them ideal for developing your skills. Our database includes detailed specifications and reviews to help you make an informed decision.",
                
                "String selection is equally important as racket choice. Natural gut provides the best feel and power but comes at a higher cost. Synthetic gut offers a good balance of performance and price, while polyester strings provide maximum durability and spin potential. The right string tension can also affect your game significantly."
            ]
        
        elif topic['category'] == 'fitness':
            paragraphs = [
                "Tennis is a physically demanding sport that requires strength, endurance, agility, and flexibility. A proper fitness routine can significantly improve your on-court performance and reduce the risk of injury. Focus on exercises that target the specific muscles used in tennis.",
                
                "Cardiovascular endurance is crucial for tennis matches that can last for hours. Incorporate running, cycling, or swimming into your routine. High-intensity interval training (HIIT) is particularly effective for tennis players as it mimics the stop-and-go nature of the sport.",
                
                "Strength training should target both upper and lower body. Focus on your shoulders, arms, and core for power and control, while strengthening your legs for movement and stability. Don't forget about flexibility - good flexibility prevents injuries and improves your range of motion."
            ]
        
        elif topic['category'] == 'strategy':
            paragraphs = [
                "Mental toughness is what separates good players from great ones. Staying focused during matches, especially when things aren't going your way, is crucial for success. Develop a pre-point routine that helps you stay calm and focused.",
                
                "In doubles, communication and positioning are key. Always communicate with your partner about who will take which shots. Position yourself to cover the court effectively and be ready to move quickly. Good doubles players work as a team, not as two individual players.",
                
                "Learn to read your opponent's game and adjust your strategy accordingly. If they're struggling with your backhand, keep hitting to that side. If they're moving well, try to keep them off balance with different shot selections and paces."
            ]
        
        # Return 2-3 random paragraphs
        return random.sample(paragraphs, min(3, len(paragraphs)))

    def generate_subheading_content(self, topic: Dict[str, Any]) -> Dict[str, str]:
        """
        Generate subheading and its content.
        
        Args:
            topic (Dict): Topic information
            
        Returns:
            Dict[str, str]: Subheading and its content
        """
        subheadings = {
            'technique': {
                'heading': 'Practice Drills for Improvement',
                'content': 'Consistent practice is key to improving your tennis technique. Start with wall practice to improve consistency and timing. Hit against a wall focusing on maintaining proper form. Shadow swinging without a ball helps develop muscle memory. Use a ball machine if available to practice specific shots repeatedly. Remember, quality practice is more important than quantity.'
            },
            'equipment': {
                'heading': 'Expert Recommendations from AcePlan',
                'content': f'At AcePlan (https://aceplan.me), we\'ve analyzed over 100 tennis rackets to help you find the perfect match. Our database includes detailed specifications, reviews, and recommendations based on your skill level and playing style. Whether you\'re looking for power, control, or versatility, our comprehensive guide will help you make the right choice. Popular options include the {random.choice(self.sample_rackets)} for its excellent balance of features.'
            },
            'fitness': {
                'heading': 'Tennis-Specific Training Exercises',
                'content': 'Incorporate tennis-specific exercises into your fitness routine. Medicine ball throws help develop power and core strength. Resistance band exercises improve shoulder stability and prevent injuries. Balance board training enhances your stability on the court. Jump rope improves footwork and cardiovascular endurance. Always warm up properly before playing and cool down afterward to prevent injuries.'
            },
            'strategy': {
                'heading': 'Advanced Tactical Tips',
                'content': 'Advanced players focus on exploiting their opponent\'s weaknesses while hiding their own. Study your opponent\'s game during warm-up and early in the match. Look for patterns in their play and adjust your strategy accordingly. Use variety in your shots - change pace, spin, and direction to keep your opponent guessing. Remember, tennis is as much a mental game as it is physical.'
            }
        }
        
        return subheadings.get(topic['category'], {
            'heading': 'Key Takeaways',
            'content': 'Focus on the fundamentals, practice consistently, and don\'t be afraid to seek professional instruction. Tennis is a sport that rewards dedication and proper technique. With the right approach and resources like AcePlan (https://aceplan.me), you can significantly improve your game and enjoy tennis even more.'
        })

    def generate_conclusion(self, topic: Dict[str, Any]) -> str:
        """
        Generate a compelling conclusion paragraph.
        
        Args:
            topic (Dict): Topic information
            
        Returns:
            str: Conclusion paragraph
        """
        conclusions = [
            f"Mastering {topic['focus']} takes time and dedication, but the rewards are worth the effort. Remember to practice consistently, focus on proper technique, and don't hesitate to seek guidance from experienced players or coaches. With resources like AcePlan (https://aceplan.me) and our comprehensive 100-racket database, you have everything you need to improve your game and reach your tennis goals.",
            
            f"Improving your tennis game is a journey that requires patience and persistence. By focusing on {topic['focus']} and implementing the tips and techniques discussed in this guide, you'll see significant improvements in your performance. Visit AcePlan (https://aceplan.me) to explore our extensive racket database and find the perfect equipment to complement your improved skills.",
            
            f"Tennis is a sport that offers endless opportunities for growth and improvement. Whether you're working on {topic['focus']} or any other aspect of your game, remember that every great player started as a beginner. Use the resources available at AcePlan (https://aceplan.me) to guide your journey, and most importantly, enjoy the process of becoming a better tennis player."
        ]
        
        return random.choice(conclusions)

    def generate_blog_post(self, topic: Dict[str, Any] = None) -> str:
        """
        Generate a complete blog post.
        
        Args:
            topic (Dict): Specific topic to write about (optional)
            
        Returns:
            str: Complete blog post content
        """
        if topic is None:
            topic = random.choice(self.topics)
        
        # Generate SEO-optimized title
        title = self.generate_seo_title(topic['title'])
        
        # Generate content sections
        introduction = self.generate_introduction(topic)
        content_paragraphs = self.generate_content_paragraphs(topic)
        subheading_content = self.generate_subheading_content(topic)
        conclusion = self.generate_conclusion(topic)
        
        # Combine all sections
        post_content = f"{title}\n"
        post_content += "=" * len(title) + "\n\n"
        
        post_content += f"{introduction}\n\n"
        
        for paragraph in content_paragraphs:
            post_content += f"{paragraph}\n\n"
        
        post_content += f"{subheading_content['heading']}\n"
        post_content += "-" * len(subheading_content['heading']) + "\n"
        post_content += f"{subheading_content['content']}\n\n"
        
        post_content += f"{conclusion}\n\n"
        
        # Add SEO footer
        post_content += "---\n"
        post_content += f"Keywords: {', '.join(topic['keywords'])}\n"
        post_content += f"Category: {topic['category'].title()}\n"
        post_content += f"Generated: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
        post_content += "Website: https://aceplan.me\n"
        post_content += "Racket Database: 100+ tennis rackets with detailed specifications\n"
        
        return post_content

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
        print("Generating daily tennis blog post...")
        
        # Select a random topic
        topic = random.choice(self.topics)
        
        # Generate the post
        content = self.generate_blog_post(topic)
        
        # Create filename with date
        date_str = datetime.datetime.now().strftime("%Y%m%d")
        filename = f"daily_tennis_post_{date_str}.txt"
        
        # Save the post
        filepath = self.save_post(content, filename)
        
        print(f"Daily post generated successfully: {filename}")
        return filepath

    def generate_weekly_batch(self) -> List[str]:
        """
        Generate a week's worth of blog posts.
        
        Returns:
            List[str]: List of file paths for generated posts
        """
        print("Generating weekly batch of tennis blog posts...")
        
        filepaths = []
        
        # Generate 7 posts (one for each day of the week)
        for i in range(7):
            topic = self.topics[i % len(self.topics)]  # Cycle through topics
            content = self.generate_blog_post(topic)
            
            # Create filename with date
            date = datetime.datetime.now() + datetime.timedelta(days=i)
            date_str = date.strftime("%Y%m%d")
            filename = f"weekly_tennis_post_{date_str}.txt"
            
            filepath = self.save_post(content, filename)
            filepaths.append(filepath)
            
            # Small delay between posts
            time.sleep(1)
        
        print(f"Weekly batch generated successfully: {len(filepaths)} posts")
        return filepaths

def main():
    """
    Main function to run the blog post generator.
    """
    print("AcePlan Tennis Blog Post Generator")
    print("==================================")
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
        print("3. Generate weekly batch")
        print("4. Exit")
        
        choice = input("\nEnter your choice (1-4): ").strip()
        
        if choice == '1':
            topic = random.choice(generator.topics)
            content = generator.generate_blog_post(topic)
            generator.save_post(content)
            
        elif choice == '2':
            generator.generate_daily_post()
            
        elif choice == '3':
            generator.generate_weekly_batch()
            
        elif choice == '4':
            print("Thank you for using AcePlan Tennis Blog Generator!")
            break
            
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
