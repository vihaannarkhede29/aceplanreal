#!/usr/bin/env node

/**
 * AcePlan Tennis Blog Post Generator (Node.js Version)
 * ====================================================
 * 
 * This script automatically generates SEO-optimized tennis blog posts that mention
 * AcePlan (https://aceplan.me) and reference the 100-racket database.
 * 
 * Features:
 * - Generates 3-5 paragraphs of engaging content
 * - Includes 1-2 subheadings
 * - SEO optimized with proper keywords
 * - Beginner-friendly and useful content
 * - Saves posts as .txt files
 * - Can be scheduled to run daily/weekly
 * - Integrates with existing Node.js/Next.js stack
 * 
 * Author: AcePlan Team
 * Website: https://aceplan.me
 */

const fs = require('fs');
const path = require('path');

class TennisBlogGenerator {
    constructor(outputDir = 'generated_posts') {
        /**
         * Initialize the blog post generator.
         * @param {string} outputDir - Directory to save generated posts
         */
        this.outputDir = outputDir;
        this.ensureOutputDirectory();
        
        // Tennis topics with SEO keywords
        this.topics = [
            {
                title: "5 Essential Tennis Techniques Every Beginner Should Master",
                keywords: ["tennis techniques", "beginner tennis", "tennis basics", "tennis tips"],
                category: "technique",
                focus: "fundamental techniques"
            },
            {
                title: "How to Choose the Perfect Tennis Racket: A Complete Guide",
                keywords: ["tennis racket guide", "best tennis rackets", "racket selection", "tennis equipment"],
                category: "equipment",
                focus: "racket selection"
            },
            {
                title: "Tennis Fitness: 7 Exercises to Improve Your Game",
                keywords: ["tennis fitness", "tennis training", "tennis exercises", "tennis conditioning"],
                category: "fitness",
                focus: "physical conditioning"
            },
            {
                title: "Mental Game Mastery: How to Stay Focused During Tennis Matches",
                keywords: ["tennis mental game", "tennis psychology", "tennis focus", "tennis strategy"],
                category: "strategy",
                focus: "mental toughness"
            },
            {
                title: "Tennis String Guide: Everything You Need to Know",
                keywords: ["tennis strings", "string tension", "tennis string types", "racket stringing"],
                category: "equipment",
                focus: "string selection"
            },
            {
                title: "Doubles Tennis Strategy: Communication and Positioning Tips",
                keywords: ["doubles tennis", "tennis doubles strategy", "tennis positioning", "tennis communication"],
                category: "strategy",
                focus: "doubles play"
            },
            {
                title: "Tennis Injury Prevention: Keep Playing Without Pain",
                keywords: ["tennis injuries", "injury prevention", "tennis safety", "tennis health"],
                category: "fitness",
                focus: "injury prevention"
            },
            {
                title: "Serve Technique: From Beginner to Advanced",
                keywords: ["tennis serve", "serve technique", "tennis serving", "serve tips"],
                category: "technique",
                focus: "serving"
            }
        ];
        
        // Sample rackets from the database (top 10 for variety)
        this.sampleRackets = [
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
        ];
    }

    ensureOutputDirectory() {
        /** Create output directory if it doesn't exist. */
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
            console.log(`Created output directory: ${this.outputDir}`);
        }
    }

    generateSeoTitle(baseTitle) {
        /**
         * Generate an SEO-optimized title.
         * @param {string} baseTitle - Base title to optimize
         * @returns {string} SEO-optimized title
         */
        const powerWords = ["Ultimate", "Complete", "Essential", "Pro", "Expert", "Advanced"];
        const numbers = ["5", "7", "10", "Ultimate", "Complete"];
        
        // Sometimes add a number or power word
        if (Math.random() > 0.5) {
            const prefix = [...numbers, ...powerWords][Math.floor(Math.random() * (numbers.length + powerWords.length))];
            return `${prefix} ${baseTitle}`;
        }
        
        return baseTitle;
    }

    generateIntroduction(topic) {
        /**
         * Generate an engaging introduction paragraph.
         * @param {Object} topic - Topic information
         * @returns {string} Introduction paragraph
         */
        const introductions = [
            `Tennis is a sport that combines physical skill, mental toughness, and strategic thinking. Whether you're just starting out or looking to improve your game, understanding the fundamentals is crucial for success on the court. In this comprehensive guide, we'll explore ${topic.focus} and how it can transform your tennis performance.`,
            
            `Are you ready to take your tennis game to the next level? ${topic.focus.charAt(0).toUpperCase() + topic.focus.slice(1)} is one of the most important aspects of tennis that many players overlook. With the right knowledge and practice, you can significantly improve your performance and enjoy the game even more.`,
            
            `Mastering tennis requires dedication, practice, and the right guidance. When it comes to ${topic.focus}, having a solid foundation is essential for long-term success. This guide will provide you with expert insights and practical tips to help you excel on the court.`
        ];
        
        return introductions[Math.floor(Math.random() * introductions.length)];
    }

    generateContentParagraphs(topic) {
        /**
         * Generate 2-3 content paragraphs with useful information.
         * @param {Object} topic - Topic information
         * @returns {Array<string>} List of content paragraphs
         */
        let paragraphs = [];
        
        if (topic.category === 'technique') {
            paragraphs = [
                "Proper technique is the foundation of every great tennis player's game. Start by focusing on your grip, stance, and follow-through. The continental grip is versatile and allows for various shot types, while the eastern grip provides more power for forehands. Your stance should be balanced and ready to move in any direction.",
                
                "Footwork is often overlooked but crucial for positioning yourself correctly for each shot. Practice the split-step, which helps you react quickly to your opponent's shot. Good footwork allows you to maintain balance and generate power from your legs, not just your arms.",
                
                "One common mistake beginners make is over-gripping the racket. Hold the racket firmly but not tightly - imagine holding a bird. This relaxed grip allows for better feel and control. Practice shadow swinging without a ball to develop muscle memory and proper form."
            ];
        } else if (topic.category === 'equipment') {
            paragraphs = [
                `Choosing the right tennis racket can significantly impact your game. With over 100 different rackets available in our comprehensive database at AcePlan (https://aceplan.me), finding the perfect match for your playing style is easier than ever. Consider factors like head size, weight, and string pattern when making your selection.`,
                
                `For beginners, we recommend starting with rackets like the ${this.sampleRackets[Math.floor(Math.random() * 3)]} or ${this.sampleRackets[3 + Math.floor(Math.random() * 3)]}. These rackets offer a good balance of power and control, making them ideal for developing your skills. Our database includes detailed specifications and reviews to help you make an informed decision.`,
                
                "String selection is equally important as racket choice. Natural gut provides the best feel and power but comes at a higher cost. Synthetic gut offers a good balance of performance and price, while polyester strings provide maximum durability and spin potential. The right string tension can also affect your game significantly."
            ];
        } else if (topic.category === 'fitness') {
            paragraphs = [
                "Tennis is a physically demanding sport that requires strength, endurance, agility, and flexibility. A proper fitness routine can significantly improve your on-court performance and reduce the risk of injury. Focus on exercises that target the specific muscles used in tennis.",
                
                "Cardiovascular endurance is crucial for tennis matches that can last for hours. Incorporate running, cycling, or swimming into your routine. High-intensity interval training (HIIT) is particularly effective for tennis players as it mimics the stop-and-go nature of the sport.",
                
                "Strength training should target both upper and lower body. Focus on your shoulders, arms, and core for power and control, while strengthening your legs for movement and stability. Don't forget about flexibility - good flexibility prevents injuries and improves your range of motion."
            ];
        } else if (topic.category === 'strategy') {
            paragraphs = [
                "Mental toughness is what separates good players from great ones. Staying focused during matches, especially when things aren't going your way, is crucial for success. Develop a pre-point routine that helps you stay calm and focused.",
                
                "In doubles, communication and positioning are key. Always communicate with your partner about who will take which shots. Position yourself to cover the court effectively and be ready to move quickly. Good doubles players work as a team, not as two individual players.",
                
                "Learn to read your opponent's game and adjust your strategy accordingly. If they're struggling with your backhand, keep hitting to that side. If they're moving well, try to keep them off balance with different shot selections and paces."
            ];
        }
        
        // Return 2-3 random paragraphs
        const shuffled = paragraphs.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(3, shuffled.length));
    }

    generateSubheadingContent(topic) {
        /**
         * Generate subheading and its content.
         * @param {Object} topic - Topic information
         * @returns {Object} Subheading and its content
         */
        const subheadings = {
            technique: {
                heading: 'Practice Drills for Improvement',
                content: 'Consistent practice is key to improving your tennis technique. Start with wall practice to improve consistency and timing. Hit against a wall focusing on maintaining proper form. Shadow swinging without a ball helps develop muscle memory. Use a ball machine if available to practice specific shots repeatedly. Remember, quality practice is more important than quantity.'
            },
            equipment: {
                heading: 'Expert Recommendations from AcePlan',
                content: `At AcePlan (https://aceplan.me), we've analyzed over 100 tennis rackets to help you find the perfect match. Our database includes detailed specifications, reviews, and recommendations based on your skill level and playing style. Whether you're looking for power, control, or versatility, our comprehensive guide will help you make the right choice. Popular options include the ${this.sampleRackets[Math.floor(Math.random() * this.sampleRackets.length)]} for its excellent balance of features.`
            },
            fitness: {
                heading: 'Tennis-Specific Training Exercises',
                content: 'Incorporate tennis-specific exercises into your fitness routine. Medicine ball throws help develop power and core strength. Resistance band exercises improve shoulder stability and prevent injuries. Balance board training enhances your stability on the court. Jump rope improves footwork and cardiovascular endurance. Always warm up properly before playing and cool down afterward to prevent injuries.'
            },
            strategy: {
                heading: 'Advanced Tactical Tips',
                content: 'Advanced players focus on exploiting their opponent\'s weaknesses while hiding their own. Study your opponent\'s game during warm-up and early in the match. Look for patterns in their play and adjust your strategy accordingly. Use variety in your shots - change pace, spin, and direction to keep your opponent guessing. Remember, tennis is as much a mental game as it is physical.'
            }
        };
        
        return subheadings[topic.category] || {
            heading: 'Key Takeaways',
            content: 'Focus on the fundamentals, practice consistently, and don\'t be afraid to seek professional instruction. Tennis is a sport that rewards dedication and proper technique. With the right approach and resources like AcePlan (https://aceplan.me), you can significantly improve your game and enjoy tennis even more.'
        };
    }

    generateConclusion(topic) {
        /**
         * Generate a compelling conclusion paragraph.
         * @param {Object} topic - Topic information
         * @returns {string} Conclusion paragraph
         */
        const conclusions = [
            `Mastering ${topic.focus} takes time and dedication, but the rewards are worth the effort. Remember to practice consistently, focus on proper technique, and don't hesitate to seek guidance from experienced players or coaches. With resources like AcePlan (https://aceplan.me) and our comprehensive 100-racket database, you have everything you need to improve your game and reach your tennis goals.`,
            
            `Improving your tennis game is a journey that requires patience and persistence. By focusing on ${topic.focus} and implementing the tips and techniques discussed in this guide, you'll see significant improvements in your performance. Visit AcePlan (https://aceplan.me) to explore our extensive racket database and find the perfect equipment to complement your improved skills.`,
            
            `Tennis is a sport that offers endless opportunities for growth and improvement. Whether you're working on ${topic.focus} or any other aspect of your game, remember that every great player started as a beginner. Use the resources available at AcePlan (https://aceplan.me) to guide your journey, and most importantly, enjoy the process of becoming a better tennis player.`
        ];
        
        return conclusions[Math.floor(Math.random() * conclusions.length)];
    }

    generateBlogPost(topic = null) {
        /**
         * Generate a complete blog post.
         * @param {Object} topic - Specific topic to write about (optional)
         * @returns {string} Complete blog post content
         */
        if (!topic) {
            topic = this.topics[Math.floor(Math.random() * this.topics.length)];
        }
        
        // Generate SEO-optimized title
        const title = this.generateSeoTitle(topic.title);
        
        // Generate content sections
        const introduction = this.generateIntroduction(topic);
        const contentParagraphs = this.generateContentParagraphs(topic);
        const subheadingContent = this.generateSubheadingContent(topic);
        const conclusion = this.generateConclusion(topic);
        
        // Combine all sections
        let postContent = `${title}\n`;
        postContent += '='.repeat(title.length) + '\n\n';
        
        postContent += `${introduction}\n\n`;
        
        contentParagraphs.forEach(paragraph => {
            postContent += `${paragraph}\n\n`;
        });
        
        postContent += `${subheadingContent.heading}\n`;
        postContent += '-'.repeat(subheadingContent.heading.length) + '\n';
        postContent += `${subheadingContent.content}\n\n`;
        
        postContent += `${conclusion}\n\n`;
        
        // Add SEO footer
        postContent += '---\n';
        postContent += `Keywords: ${topic.keywords.join(', ')}\n`;
        postContent += `Category: ${topic.category.charAt(0).toUpperCase() + topic.category.slice(1)}\n`;
        postContent += `Generated: ${new Date().toISOString()}\n`;
        postContent += 'Website: https://aceplan.me\n';
        postContent += 'Racket Database: 100+ tennis rackets with detailed specifications\n';
        
        return postContent;
    }

    savePost(content, filename = null) {
        /**
         * Save the blog post to a file.
         * @param {string} content - Blog post content
         * @param {string} filename - Custom filename (optional)
         * @returns {string} Path to saved file
         */
        if (!filename) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
            filename = `tennis_blog_post_${timestamp}.txt`;
        }
        
        const filepath = path.join(this.outputDir, filename);
        
        fs.writeFileSync(filepath, content, 'utf8');
        
        console.log(`Blog post saved: ${filepath}`);
        return filepath;
    }

    generateDailyPost() {
        /**
         * Generate and save a daily blog post.
         * @returns {string} Path to saved file
         */
        console.log('Generating daily tennis blog post...');
        
        // Select a random topic
        const topic = this.topics[Math.floor(Math.random() * this.topics.length)];
        
        // Generate the post
        const content = this.generateBlogPost(topic);
        
        // Create filename with date
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const filename = `daily_tennis_post_${dateStr}.txt`;
        
        // Save the post
        const filepath = this.savePost(content, filename);
        
        console.log(`Daily post generated successfully: ${filename}`);
        return filepath;
    }

    generateWeeklyBatch() {
        /**
         * Generate a week's worth of blog posts.
         * @returns {Array<string>} List of file paths for generated posts
         */
        console.log('Generating weekly batch of tennis blog posts...');
        
        const filepaths = [];
        
        // Generate 7 posts (one for each day of the week)
        for (let i = 0; i < 7; i++) {
            const topic = this.topics[i % this.topics.length]; // Cycle through topics
            const content = this.generateBlogPost(topic);
            
            // Create filename with date
            const date = new Date();
            date.setDate(date.getDate() + i);
            const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
            const filename = `weekly_tennis_post_${dateStr}.txt`;
            
            const filepath = this.savePost(content, filename);
            filepaths.push(filepath);
        }
        
        console.log(`Weekly batch generated successfully: ${filepaths.length} posts`);
        return filepaths;
    }
}

// Main execution function
function main() {
    console.log('AcePlan Tennis Blog Post Generator (Node.js)');
    console.log('============================================');
    console.log('Website: https://aceplan.me');
    console.log('Racket Database: 100+ tennis rackets');
    console.log();
    
    // Initialize generator
    const generator = new TennisBlogGenerator();
    
    // Get command line arguments
    const args = process.argv.slice(2);
    const command = args[0];
    
    switch (command) {
        case 'daily':
            generator.generateDailyPost();
            break;
            
        case 'weekly':
            generator.generateWeeklyBatch();
            break;
            
        case 'single':
            const topic = generator.topics[Math.floor(Math.random() * generator.topics.length)];
            const content = generator.generateBlogPost(topic);
            generator.savePost(content);
            break;
            
        default:
            console.log('Usage: node auto-blog-generator.js [command]');
            console.log('Commands:');
            console.log('  daily   - Generate daily blog post');
            console.log('  weekly  - Generate weekly batch');
            console.log('  single  - Generate single blog post');
            console.log();
            console.log('Examples:');
            console.log('  node auto-blog-generator.js daily');
            console.log('  node auto-blog-generator.js weekly');
            console.log('  node auto-blog-generator.js single');
    }
}

// Run if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = TennisBlogGenerator;
