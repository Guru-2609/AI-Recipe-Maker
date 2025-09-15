"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Bot, Sparkles, Clock, Users, ChefHat, Lightbulb } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface GeneratedRecipe {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tips: string[];
  cuisine: string;
}

interface AIRecipeGeneratorProps {
  availableIngredients: string[];
  onClose: () => void;
}

export function AIRecipeGenerator({ availableIngredients, onClose }: AIRecipeGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<GeneratedRecipe | null>(null);
  const [additionalRequests, setAdditionalRequests] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'ai', message: string}>>([]);

  const generateRecipe = async (customRequest?: string) => {
    setIsGenerating(true);
    
    // Add user message to chat
    if (customRequest) {
      setChatHistory(prev => [...prev, { type: 'user', message: customRequest }]);
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // AI-like recipe generation based on available ingredients
    const recipe = createIntelligentRecipe(availableIngredients, customRequest);
    setGeneratedRecipe(recipe);
    
    // Add AI response to chat
    setChatHistory(prev => [...prev, { 
      type: 'ai', 
      message: `I've created a delicious ${recipe.name} recipe using your available ingredients! This ${recipe.cuisine} dish combines ${availableIngredients.slice(0, 3).join(', ')} in a unique way.`
    }]);
    
    setIsGenerating(false);
  };

  const createIntelligentRecipe = (ingredients: string[], customRequest?: string): GeneratedRecipe => {
    // AI-like logic to create recipes based on ingredients
    const cuisineStyles = ['Italian', 'Asian', 'Mediterranean', 'Mexican', 'American', 'Indian', 'French'];
    const cookingMethods = ['Stir-fry', 'Roasted', 'Grilled', 'Braised', 'Sautéed', 'Baked'];
    const dishTypes = ['Bowl', 'Pasta', 'Curry', 'Salad', 'Soup', 'Skillet', 'Casserole'];

    // Analyze ingredients to determine best cooking method and cuisine
    const hasAsianIngredients = ingredients.some(ing => 
      ['soy sauce', 'ginger', 'garlic', 'rice', 'sesame', 'chili'].some(asian => 
        ing.toLowerCase().includes(asian)
      )
    );
    
    const hasItalianIngredients = ingredients.some(ing => 
      ['tomato', 'basil', 'cheese', 'pasta', 'olive oil'].some(italian => 
        ing.toLowerCase().includes(italian)
      )
    );

    const hasMexicanIngredients = ingredients.some(ing => 
      ['avocado', 'lime', 'cilantro', 'pepper', 'onion'].some(mexican => 
        ing.toLowerCase().includes(mexican)
      )
    );

    // Determine cuisine based on ingredients
    let cuisine = 'Fusion';
    if (hasAsianIngredients) cuisine = 'Asian';
    else if (hasItalianIngredients) cuisine = 'Italian';
    else if (hasMexicanIngredients) cuisine = 'Mexican';
    else cuisine = cuisineStyles[Math.floor(Math.random() * cuisineStyles.length)];

    // Generate recipe name
    const method = cookingMethods[Math.floor(Math.random() * cookingMethods.length)];
    const dishType = dishTypes[Math.floor(Math.random() * dishTypes.length)];
    const mainIngredient = ingredients[0] || 'Mixed Vegetable';
    
    const recipeName = `${method} ${mainIngredient} ${dishType}`;

    // Generate complementary ingredients
    const complementaryIngredients = generateComplementaryIngredients(ingredients, cuisine);
    
    // Create full ingredient list
    const fullIngredients = [
      ...ingredients.map(ing => `${Math.floor(Math.random() * 3) + 1} ${getRandomUnit()} ${ing}`),
      ...complementaryIngredients
    ];

    // Generate cooking instructions
    const instructions = generateCookingInstructions(ingredients, method, cuisine);
    
    // Generate cooking tips
    const tips = generateCookingTips(ingredients, cuisine);

    return {
      name: recipeName,
      description: `A delicious ${cuisine.toLowerCase()} fusion dish that perfectly combines ${ingredients.slice(0, 3).join(', ')} with aromatic spices and fresh ingredients. This recipe maximizes the flavors of your available ingredients while introducing complementary elements.`,
      ingredients: fullIngredients,
      instructions,
      prepTime: Math.floor(Math.random() * 20) + 10,
      cookTime: Math.floor(Math.random() * 40) + 15,
      servings: Math.floor(Math.random() * 4) + 2,
      difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)] as 'Easy' | 'Medium' | 'Hard',
      tips,
      cuisine
    };
  };

  const generateComplementaryIngredients = (baseIngredients: string[], cuisine: string): string[] => {
    const complementaryMap: Record<string, string[]> = {
      'Asian': ['2 tbsp soy sauce', '1 tbsp sesame oil', '2 cloves garlic, minced', '1 inch ginger, grated', '1 tsp rice vinegar'],
      'Italian': ['3 tbsp olive oil', '2 cloves garlic, minced', '1/4 cup parmesan cheese', 'Fresh basil leaves', 'Salt and pepper to taste'],
      'Mexican': ['1 lime, juiced', '1/4 cup cilantro, chopped', '1 tsp cumin', '1/2 tsp paprika', '1 jalapeño, diced'],
      'Mediterranean': ['3 tbsp olive oil', '1 lemon, juiced', '2 cloves garlic', 'Fresh herbs (oregano, thyme)', '1/4 cup feta cheese'],
      'Indian': ['1 tsp turmeric', '1 tsp cumin', '1 tsp coriander', '2 cloves garlic', '1 inch ginger'],
      'Fusion': ['2 tbsp olive oil', '2 cloves garlic', 'Salt and pepper', '1 tsp mixed herbs', '1 tbsp lemon juice']
    };

    return complementaryMap[cuisine] || complementaryMap['Fusion'];
  };

  const generateCookingInstructions = (ingredients: string[], method: string, cuisine: string): string[] => {
    const baseInstructions = [
      'Prepare all ingredients by washing, chopping, and measuring as needed.',
      'Heat oil in a large pan or wok over medium-high heat.',
    ];

    const methodInstructions: Record<string, string[]> = {
      'Stir-fry': [
        'Add aromatics (garlic, ginger) and cook for 30 seconds until fragrant.',
        `Add ${ingredients[0]} and stir-fry for 3-4 minutes until tender.`,
        'Add remaining vegetables and continue stir-frying for 2-3 minutes.',
        'Season with sauces and spices, toss to combine.',
        'Cook for another 1-2 minutes until everything is heated through.'
      ],
      'Roasted': [
        'Preheat oven to 425°F (220°C).',
        `Toss ${ingredients.join(', ')} with oil and seasonings.`,
        'Spread evenly on a baking sheet.',
        'Roast for 20-25 minutes, stirring halfway through.',
        'Cook until vegetables are tender and lightly caramelized.'
      ],
      'Sautéed': [
        'Add onions and cook until translucent, about 3 minutes.',
        `Add ${ingredients[0]} and cook for 5-6 minutes.`,
        'Add remaining ingredients and seasonings.',
        'Cook, stirring occasionally, until everything is tender.',
        'Adjust seasoning and serve hot.'
      ]
    };

    const endInstructions = [
      'Taste and adjust seasoning as needed.',
      'Garnish with fresh herbs if desired.',
      'Serve immediately while hot.'
    ];

    return [
      ...baseInstructions,
      ...(methodInstructions[method] || methodInstructions['Sautéed']),
      ...endInstructions
    ];
  };

  const generateCookingTips = (ingredients: string[], cuisine: string): string[] => {
    const generalTips = [
      'Prep all ingredients before you start cooking for smoother execution.',
      'Don\'t overcrowd the pan - cook in batches if necessary.',
      'Taste as you go and adjust seasonings to your preference.'
    ];

    const cuisineSpecificTips: Record<string, string[]> = {
      'Asian': ['High heat is key for good stir-frying', 'Add sauces at the end to prevent burning'],
      'Italian': ['Use good quality olive oil for best flavor', 'Fresh herbs should be added at the end'],
      'Mexican': ['Toast spices briefly to enhance their flavor', 'Fresh lime juice brightens the entire dish'],
      'Mediterranean': ['Let ingredients shine with simple seasonings', 'Room temperature ingredients blend better']
    };

    return [...generalTips, ...(cuisineSpecificTips[cuisine] || [])];
  };

  const getRandomUnit = (): string => {
    const units = ['cups', 'tbsp', 'tsp', 'oz', 'lbs', 'pieces', 'cloves'];
    return units[Math.floor(Math.random() * units.length)];
  };

  const handleCustomRequest = () => {
    if (additionalRequests.trim()) {
      generateRecipe(additionalRequests);
      setAdditionalRequests('');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Bot className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">AI Recipe Generator</h2>
          <Sparkles className="w-6 h-6 text-purple-600" />
        </div>
        <p className="text-gray-600">
          Let AI create a unique recipe using your available ingredients: {availableIngredients.join(', ')}
        </p>
      </div>

      {/* Chat History */}
      {chatHistory.length > 0 && (
        <Card className="bg-gray-50">
          <CardContent className="pt-4">
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {chatHistory.map((chat, index) => (
                <div key={index} className={`flex gap-3 ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${
                    chat.type === 'user' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-white border shadow-sm'
                  }`}>
                    <p className="text-sm">{chat.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Custom Request Input */}
      <Card>
        <CardContent className="pt-4">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Any specific preferences? (cuisine style, cooking method, dietary restrictions)
            </label>
            <Textarea
              placeholder="e.g., Make it spicy, vegetarian, quick to cook, Italian style..."
              value={additionalRequests}
              onChange={(e) => setAdditionalRequests(e.target.value)}
              className="min-h-20"
            />
            <div className="flex gap-2">
              <Button 
                onClick={() => generateRecipe(additionalRequests || undefined)}
                disabled={isGenerating}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Recipe
                  </>
                )}
              </Button>
              {additionalRequests && (
                <Button 
                  variant="outline" 
                  onClick={handleCustomRequest}
                  disabled={isGenerating}
                >
                  Send Request
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Recipe */}
      {generatedRecipe && (
        <Card className="border-purple-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl text-gray-900 mb-2">
                  {generatedRecipe.name}
                </CardTitle>
                <p className="text-gray-600 text-sm mb-3">{generatedRecipe.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {generatedRecipe.prepTime + generatedRecipe.cookTime} min
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {generatedRecipe.servings} servings
                  </div>
                  <div className="flex items-center gap-1">
                    <ChefHat className="w-4 h-4" />
                    {generatedRecipe.cuisine}
                  </div>
                </div>
              </div>
              <Badge className={getDifficultyColor(generatedRecipe.difficulty)}>
                {generatedRecipe.difficulty}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Ingredients */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-purple-600" />
                  Ingredients
                </h3>
                <ul className="space-y-2">
                  {generatedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span className={
                        availableIngredients.some(available => 
                          ingredient.toLowerCase().includes(available.toLowerCase())
                        ) ? 'font-medium text-green-700' : ''
                      }>
                        {ingredient}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Instructions</h3>
                <ol className="space-y-3">
                  {generatedRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="text-sm text-gray-700 flex gap-3">
                      <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Cooking Tips */}
            <Separator className="my-6" />
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Pro Tips
              </h3>
              <ul className="space-y-2">
                {generatedRecipe.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">💡</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6 pt-4 border-t">
              <Button 
                onClick={() => generateRecipe()}
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Another
              </Button>
              <Button 
                onClick={onClose}
                variant="outline"
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}