"use client";

import { useState, useEffect, useMemo } from 'react';
import { Search, Plus, X, Clock, Users, ChefHat, Heart, Star, Filter, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AIRecipeGenerator } from '@/components/ai-recipe-generator';
import { recipes, type Recipe } from '@/lib/recipe-data';

export default function RecipeSuggestionApp() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [timeFilter, setTimeFilter] = useState<string>('all');
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('recipeFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedIngredients = localStorage.getItem('recentIngredients');
    if (savedIngredients) {
      setIngredients(JSON.parse(savedIngredients));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('recentIngredients', JSON.stringify(ingredients));
  }, [ingredients]);

  // Smart recipe matching algorithm
  const calculateRecipeScore = (recipe: Recipe, availableIngredients: string[]) => {
    if (availableIngredients.length === 0) return 1;
    
    const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
    const available = availableIngredients.map(ing => ing.toLowerCase());
    
    let matchCount = 0;
    let partialMatches = 0;
    
    available.forEach(ingredient => {
      const exactMatch = recipeIngredients.some(recipeIng => 
        recipeIng.includes(ingredient) || ingredient.includes(recipeIng)
      );
      if (exactMatch) matchCount++;
      
      const partialMatch = recipeIngredients.some(recipeIng => 
        recipeIng.split(' ').some(word => ingredient.includes(word) || word.includes(ingredient))
      );
      if (partialMatch && !exactMatch) partialMatches++;
    });
    
    const matchRatio = matchCount / Math.max(recipeIngredients.length, 1);
    const availabilityRatio = matchCount / Math.max(available.length, 1);
    const partialBonus = partialMatches * 0.3;
    
    return (matchRatio * 0.6 + availabilityRatio * 0.4 + partialBonus);
  };

  // Filter and sort recipes
  const processedRecipes = useMemo(() => {
    let filtered = recipes.filter(recipe => {
      if (dietaryFilter !== 'all' && !recipe.dietary.includes(dietaryFilter)) return false;
      if (difficultyFilter !== 'all' && recipe.difficulty !== difficultyFilter) return false;
      if (timeFilter !== 'all') {
        const time = recipe.prepTime + recipe.cookTime;
        switch (timeFilter) {
          case 'quick': return time <= 30;
          case 'medium': return time > 30 && time <= 60;
          case 'long': return time > 60;
          default: return true;
        }
      }
      return true;
    });

    return filtered
      .map(recipe => ({
        ...recipe,
        score: calculateRecipeScore(recipe, ingredients)
      }))
      .sort((a, b) => b.score - a.score);
  }, [ingredients, dietaryFilter, difficultyFilter, timeFilter]);

  useEffect(() => {
    setFilteredRecipes(processedRecipes);
  }, [processedRecipes]);

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(ing => ing !== ingredient));
  };

  const toggleFavorite = (recipeId: string) => {
    setFavorites(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addIngredient();
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

  const getMatchPercentage = (recipe: Recipe & { score: number }) => {
    return Math.round(recipe.score * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Recipe Suggestion App
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us what ingredients you have, and we'll suggest perfect recipes for you using smart matching
          </p>
        </div>

        {/* Ingredient Input */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-orange-500" />
              Your Ingredients
            </h2>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Enter an ingredient (e.g., chicken, tomatoes, basil)"
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <Button onClick={addIngredient} className="bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4" />
                Add
              </Button>
              {ingredients.length > 0 && (
                <Button 
                  onClick={() => setShowAIGenerator(true)}
                  className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  AI Recipe
                </Button>
              )}
            </div>
            
            {ingredients.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gradient-to-r from-orange-100 to-red-100 text-gray-800 px-3 py-1 text-sm hover:from-orange-200 hover:to-red-200 transition-all duration-200"
                  >
                    {ingredient}
                    <button
                      onClick={() => removeIngredient(ingredient)}
                      className="ml-2 hover:text-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-700">Filters:</span>
              </div>
              
              <Select value={dietaryFilter} onValueChange={setDietaryFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Diet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Diets</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                  <SelectItem value="dairy-free">Dairy-Free</SelectItem>
                </SelectContent>
              </Select>

              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Time</SelectItem>
                  <SelectItem value="quick">≤ 30 min</SelectItem>
                  <SelectItem value="medium">30-60 min</SelectItem>
                  <SelectItem value="long">> 60 min</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Recipe Results */}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Recipe Suggestions ({filteredRecipes.length})
          </h2>
          {ingredients.length > 0 && (
            <p className="text-gray-600">
              Recipes are sorted by ingredient match percentage
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border-0 bg-white/90 backdrop-blur-sm"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="aspect-video bg-gradient-to-br from-orange-200 to-red-200 relative overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                    className="bg-white/80 hover:bg-white/90 p-2"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(recipe.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                      }`}
                    />
                  </Button>
                </div>
                {ingredients.length > 0 && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-green-500 text-white font-semibold">
                      {getMatchPercentage(recipe)}% match
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{recipe.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
                
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {recipe.prepTime + recipe.cookTime} min
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {recipe.servings}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {recipe.rating}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  <Badge className={getDifficultyColor(recipe.difficulty)}>
                    {recipe.difficulty}
                  </Badge>
                  {recipe.dietary.slice(0, 2).map((diet) => (
                    <Badge key={diet} variant="outline" className="text-xs">
                      {diet}
                    </Badge>
                  ))}
                </div>

                <Separator className="mb-3" />
                
                <div>
                  <p className="text-xs text-gray-500 mb-1">Key ingredients:</p>
                  <p className="text-sm text-gray-700 line-clamp-1">
                    {recipe.ingredients.slice(0, 3).join(', ')}
                    {recipe.ingredients.length > 3 && '...'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No recipes found</h3>
            <p className="text-gray-500">Try adjusting your filters or add some ingredients</p>
          </div>
        )}

        {/* Recipe Detail Modal */}
        <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedRecipe && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedRecipe.name}</DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedRecipe.image}
                      alt={selectedRecipe.name}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Prep: {selectedRecipe.prepTime}min
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Cook: {selectedRecipe.cookTime}min
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {selectedRecipe.servings} servings
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={getDifficultyColor(selectedRecipe.difficulty)}>
                        {selectedRecipe.difficulty}
                      </Badge>
                      {selectedRecipe.dietary.map((diet) => (
                        <Badge key={diet} variant="outline">
                          {diet}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-gray-600 mb-6">{selectedRecipe.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Ingredients</h3>
                    <ul className="space-y-1 mb-6">
                      {selectedRecipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span className={
                            ingredients.some(ing => 
                              ingredient.toLowerCase().includes(ing.toLowerCase()) ||
                              ing.toLowerCase().includes(ingredient.toLowerCase())
                            ) ? 'font-medium text-green-700' : ''
                          }>
                            {ingredient}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="font-semibold text-lg mb-3">Instructions</h3>
                    <ol className="space-y-3">
                      {selectedRecipe.instructions.map((instruction, index) => (
                        <li key={index} className="text-sm text-gray-700 flex gap-3">
                          <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* AI Recipe Generator Modal */}
        <Dialog open={showAIGenerator} onOpenChange={setShowAIGenerator}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <AIRecipeGenerator 
              availableIngredients={ingredients}
              onClose={() => setShowAIGenerator(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}