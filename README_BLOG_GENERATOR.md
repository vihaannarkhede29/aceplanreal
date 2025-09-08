x# AcePlan Tennis Blog Generator with GPT4All

## Overview

This automated system generates beginner-to-intermediate tennis blog posts using GPT4All (local, free AI model). Each post is SEO-optimized, includes all required sections, and is ready for publishing.

## Features

### ✅ Complete Blog Post Structure
- **Gear Highlight**: Detailed racket analysis (e.g., Tecnifibre TFight 295)
- **Drill Advice**: Step-by-step footwork drill instructions
- **Player Story**: Inspiring journey of young players reaching 10 UTR
- **New Section**: Bonus tips, related drills, or racket recommendations

### ✅ SEO Optimization
- Keywords: tennis drills, best tennis racket, improve footwork, AcePlan
- Internal links to AcePlan (https://aceplan.me)
- Meta descriptions (1-2 sentences)
- SEO-optimized titles and content structure

### ✅ Automation Features
- **GPT4All Integration**: Local, free AI model for content generation
- **Randomization**: Fresh content with varied rackets, drills, and stories
- **Timestamped Files**: Automatic naming (blog_YYYYMMDDHHMMSS.txt)
- **Batch Generation**: Create multiple posts at once
- **Cron Integration**: Automated daily/weekly generation

## Installation

### 1. Install Dependencies

```bash
# Install Python dependencies
pip install -r requirements.txt

# Install GPT4All (if not already installed)
pip install gpt4all
```

### 2. Download GPT4All Model

The script will automatically download the model on first run, or you can download manually:

```bash
# The script uses 'orca-mini-3b-gguf2-q4_0.gguf' by default
# This is a lightweight, fast model suitable for blog generation
```

## Usage

### Quick Start

```bash
# Generate a single blog post
python gpt4all-blog-generator.py

# Generate daily post
python automated-blog-scheduler.py --daily

# Generate weekly batch (7 posts)
python automated-blog-scheduler.py --weekly

# Generate custom number of posts
python automated-blog-scheduler.py --count 10
```

### Interactive Mode

```bash
# Run the main generator interactively
python gpt4all-blog-generator.py

# Run the scheduler interactively
python automated-blog-scheduler.py
```

### Automation Setup

```bash
# Create cron job setup script
python automated-blog-scheduler.py --setup-cron

# This creates run-daily-blog.sh for cron integration
```

## File Structure

```
tennis-racket-finder/
├── gpt4all-blog-generator.py      # Main blog generator
├── automated-blog-scheduler.py    # Automation and scheduling
├── requirements.txt               # Python dependencies
├── run-daily-blog.sh             # Cron job script (created)
├── generated_posts/              # Output directory
│   ├── daily_tennis_post_20241201.txt
│   ├── tennis_blog_post_20241201_143022.txt
│   └── ...
├── blog_generator.log            # Log file
└── README_BLOG_GENERATOR.md      # This file
```

## Blog Post Structure

Each generated post includes:

### 1. Meta Information
- SEO-optimized title
- Meta description (160 characters max)
- Keywords and categories

### 2. Gear Highlight Section
- Detailed racket analysis
- Technical specifications
- Pros and cons
- Performance characteristics
- Internal link to AcePlan

### 3. Drill Advice Section
- Step-by-step instructions
- Focus areas and benefits
- Duration and equipment needed
- Beginner-friendly explanations

### 4. Player Story Section
- Inspiring success stories
- Training routines and schedules
- Key factors for improvement
- Motivational content

### 5. Bonus Section
- Additional tips or drills
- Related racket recommendations
- Complementary training advice

### 6. Conclusion
- Summary of key points
- Call-to-action for AcePlan
- SEO-optimized closing

## Content Randomization

The system ensures fresh content through:

- **Racket Selection**: Random from 100+ racket database
- **Drill Variety**: Different footwork drills each time
- **Player Stories**: Multiple inspiring success stories
- **Bonus Content**: Varied tips, drills, and recommendations
- **Title Templates**: Multiple SEO-optimized title formats

## SEO Features

### Keywords Integration
- Primary: tennis drills, best tennis racket, improve footwork, AcePlan
- Secondary: tennis training, tennis equipment, tennis technique, tennis tips
- Long-tail: tennis racket guide, tennis practice, tennis improvement

### Internal Linking
- AcePlan website (https://aceplan.me)
- 100-racket database references
- Related content suggestions

### Technical SEO
- Meta descriptions under 160 characters
- Proper heading structure (H1, H2, H3)
- Keyword density optimization
- Readable content formatting

## Automation Options

### Daily Generation
```bash
# Generate one post per day
python automated-blog-scheduler.py --daily
```

### Weekly Batch
```bash
# Generate 7 posts for the week
python automated-blog-scheduler.py --weekly
```

### Custom Batch
```bash
# Generate any number of posts
python automated-blog-scheduler.py --count 25
```

### Cron Job Setup
```bash
# Create cron script
python automated-blog-scheduler.py --setup-cron

# Add to crontab for daily 6 AM generation
crontab -e
# Add: 0 6 * * * /Users/VR/AcePlan/tennis-racket-finder/run-daily-blog.sh
```

## Maintenance

### Cleanup Old Posts
```bash
# Remove posts older than 30 days
python automated-blog-scheduler.py --cleanup 30
```

### Log Monitoring
```bash
# View generation logs
tail -f blog_generator.log
```

### Model Management
- GPT4All models are cached locally
- Models can be updated by reinstalling gpt4all
- Fallback to template-based generation if model fails

## Troubleshooting

### Common Issues

1. **GPT4All Model Not Loading**
   - Check internet connection for initial download
   - Verify model file exists in GPT4All directory
   - Script falls back to template generation

2. **Permission Errors**
   - Ensure write permissions for output directory
   - Check file permissions for generated posts

3. **Memory Issues**
   - Use smaller GPT4All model if needed
   - Reduce batch size for large generations

### Performance Tips

- **Model Selection**: orca-mini-3b is fast and efficient
- **Batch Size**: Generate 5-10 posts at a time for best performance
- **Cleanup**: Regularly clean old posts to save disk space

## Customization

### Adding New Rackets
Edit the `load_rackets()` method in `gpt4all-blog-generator.py` to add more rackets.

### Adding New Drills
Edit the `load_drills()` method to include additional footwork drills.

### Modifying Player Stories
Update the `player_stories` list with new success stories.

### SEO Keywords
Modify the `seo_keywords` list to include additional keywords.

## Output Examples

### Sample Blog Post Title
"Master Your Tennis Game: Tecnifibre TFight 295 Review and Essential Footwork Drills"

### Sample Meta Description
"Discover the Tecnifibre TFight 295 tennis racket's exceptional spin and control capabilities. Learn essential footwork drills and inspiring player success stories at AcePlan."

### Sample File Name
`tennis_blog_post_20241201_143022.txt`

## Support

For issues or questions:
- Check the log file: `blog_generator.log`
- Review the troubleshooting section
- Ensure all dependencies are installed
- Verify GPT4All model is properly loaded

## License

This project is part of AcePlan (https://aceplan.me) and follows the same licensing terms.

---

**Generated by AcePlan Tennis Blog Generator**  
**Website: https://aceplan.me**  
**Racket Database: 100+ tennis rackets with detailed specifications**
