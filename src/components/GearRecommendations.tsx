'use client';

import { ExternalLink } from 'lucide-react';

interface GearItem {
  name: string;
  description: string;
  price: string;
  category: string;
  affiliateLink: string;
  bestFor: string[];
}

interface GearRecommendationsProps {
  skillLevel: string;
  trainingDays: string;
}

export default function GearRecommendations({ skillLevel, trainingDays }: GearRecommendationsProps) {
  const gearItems: GearItem[] = [
    // Tennis Balls
    {
      name: "Wilson Championship Tennis Balls (72 Balls - 24 Cans)",
      description: "Professional-grade tennis balls perfect for practice and matches",
      price: "$79.99",
      category: "Tennis Balls",
      affiliateLink: "https://amzn.to/41JwNiu",
      bestFor: ["All skill levels", "Practice sessions", "Match play"]
    },
    {
      name: "Penn Championship Tennis Balls (72 Balls - 24 Cans)",
      description: "Durable tennis balls with excellent bounce and feel",
      price: "$69.99",
      category: "Tennis Balls",
      affiliateLink: "https://amzn.to/476LZtK",
      bestFor: ["Beginners", "Practice", "Cost-effective"]
    },
    
    // Ball Machines
    {
      name: "Spinshot Player Tennis Ball Machine (Best Seller Ball Machine in the World)",
      description: "Portable ball machine with adjustable speed, spin, and elevation",
      price: "$549.99",
      category: "Ball Machine",
      affiliateLink: "https://amzn.to/41OavvW",
      bestFor: ["Intermediate to Advanced", "Solo practice", "Consistent training"]
    },
    {
      name: "Lobster Elite Two Tennis Ball Machine",
      description: "Professional ball machine with remote control and programmable drills",
      price: "$1,199.99",
      category: "Ball Machine",
      affiliateLink: "https://amzn.to/3HtOID3",
      bestFor: ["Advanced players", "Serious training", "Club use"]
    },
    
    // Training Aids
    {
      name: "Tennis Training Cones (Set of 10)",
      description: "Bright orange cones for footwork drills and court positioning",
      price: "$19.99",
      category: "Training Aids",
      affiliateLink: "https://amzn.to/3V6UQEj",
      bestFor: ["Footwork drills", "Agility training", "All skill levels"]
    },
    {
      name: "Tennis Resistance Bands Set",
      description: "Elastic bands for strength training and warm-up exercises",
      price: "$16.99",
      category: "Training Aids",
      affiliateLink: "https://amzn.to/41Jx1Gm",
      bestFor: ["Strength training", "Warm-up", "Injury prevention"]
    },
    {
      name: "Tennis Ball Hopper (150 Ball Capacity)",
      description: "Large capacity ball hopper for easy ball collection and storage",
      price: "$79.99",
      category: "Training Aids",
      affiliateLink: "https://amzn.to/41d9kWM",
      bestFor: ["Ball collection", "Practice sessions", "Coaching"]
    },
    
    // Grips and Accessories
    {
      name: "Wilson Pro Overgrip (30 Pack)",
      description: "Premium overgrips for enhanced grip and comfort",
      price: "$29.99",
      category: "Grips",
      affiliateLink: "https://amzn.to/41d9kWM",
      bestFor: ["Grip enhancement", "Sweat absorption", "All players"]
    },
    {
      name: "Tennis Dampener Set (10 Pack)",
      description: "Vibration dampeners to reduce racket vibration and improve feel",
      price: "$9.99",
      category: "Accessories",
      affiliateLink: "https://amzn.to/3Jri19L",
      bestFor: ["Vibration reduction", "Comfort", "All skill levels"]
    },
    
    // Court Equipment
    {
      name: "Portable Tennis Net",
      description: "Easy-to-setup portable net for practice anywhere",
      price: "$129.99",
      category: "Court Equipment",
      affiliateLink: "https://amzn.to/45FZeyT",
      bestFor: ["Home practice", "Backyard tennis", "Portable setup"]
    },
    {
      name: "Tennis Court Tape",
      description: "High-visibility tape for marking court lines and targets",
      price: "$24.99",
      category: "Court Equipment",
      affiliateLink: "https://amzn.to/3UF8Chk",
      bestFor: ["Court marking", "Target practice", "Training drills"]
    }
  ];

  const getRecommendedGear = () => {
    let recommendations = gearItems;
    
    // Filter based on skill level
    if (skillLevel.includes('Beginner')) {
      recommendations = recommendations.filter(item => 
        !item.name.includes('Professional') && 
        !item.name.includes('Elite') &&
        item.price !== "$1,299.99"
      );
    } else if (skillLevel.includes('Advanced')) {
      recommendations = recommendations.filter(item => 
        !item.name.includes('Basic') && 
        !item.name.includes('Starter')
      );
    }
    
    // Filter based on training frequency
    if (trainingDays.includes('1-2')) {
      recommendations = recommendations.filter(item => 
        !item.name.includes('Ball Machine') || 
        item.price === "$599.99"
      );
    }
    
    return recommendations.slice(0, 6); // Return top 6 recommendations
  };

  const recommendedGear = getRecommendedGear();

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Recommended Training Gear
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Complete your tennis setup with these essential training equipment and accessories
        </p>
      </div>

      {/* Partnership Message */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Partnership Update</h3>
          <p className="text-blue-700 mb-3">
            We're working on partnerships to bring you better deals soon! Stay tuned for exclusive discounts and special offers.
          </p>
          <div className="text-sm text-blue-600">
            <p>• Prices are subject to change</p>
            <p>• Amazon affiliate widgets coming soon for direct purchase</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedGear.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-3">
                {item.category}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
            
            <div className="mb-4">
              <span className="text-2xl font-bold text-green-600">{item.price}</span>
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Best For:</h4>
              <div className="flex flex-wrap gap-1">
                {item.bestFor.map((use, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {use}
                  </span>
                ))}
              </div>
            </div>
            
            <a
              href={item.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 font-semibold"
            >
              <span>View on Amazon</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>

      {/* SwingVision Button */}
      <div className="text-center mt-12">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">🎾 SwingVision Integration</h3>
          <p className="text-gray-600 mb-6">
            Professional-grade tennis analysis and coaching with SwingVision's advanced video technology
          </p>
          <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
            <span className="mr-2">🚀</span>
            SwingVision - Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}
