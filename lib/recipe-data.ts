export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  dietary: string[];
  rating: number;
}

export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Classic Chicken Parmesan',
    description: 'Crispy breaded chicken breast topped with marinara sauce and melted mozzarella cheese. A comforting Italian-American classic.',
    image: 'https://images.pexels.com/photos/7792755/pexels-photo-7792755.jpeg?auto=compress&cs=tinysrgb&w=600',
    ingredients: [
      '2 boneless chicken breasts',
      '1 cup breadcrumbs',
      '1/2 cup parmesan cheese, grated',
      '2 eggs',
      '2 cups marinara sauce',
      '1 cup mozzarella cheese, shredded',
      '2 tbsp olive oil',
      'Salt and pepper to taste',
      'Fresh basil for garnish'
    ],
    instructions: [
      'Preheat oven to 425°F (220°C).',
      'Pound chicken breasts to 1/4 inch thickness.',
      'Mix breadcrumbs and parmesan cheese in a shallow dish.',
      'Beat eggs in another shallow dish.',
      'Season chicken with salt and pepper, then dip in eggs and coat with breadcrumb mixture.',
      'Heat olive oil in an oven-safe skillet and sear chicken until golden, about 3 minutes per side.',
      'Top chicken with marinara sauce and mozzarella cheese.',
      'Bake for 15-20 minutes until chicken is cooked through and cheese is melted.',
      'Garnish with fresh basil and serve immediately.'
    ],
    prepTime: 15,
    cookTime: 25,
    servings: 2,
    difficulty: 'Medium',
    dietary: ['gluten-free option'],
    rating: 4.8
  },
  {
    id: '2',
    name: 'Vegetarian Buddha Bowl',
    description: 'A nourishing bowl packed with roasted vegetables, quinoa, avocado, and a tahini dressing. Perfect for a healthy and satisfying meal.',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
    ingredients: [
      '1 cup quinoa',
      '2 cups sweet potato, cubed',
      '1 cup broccoli florets',
      '1 cup chickpeas',
      '1 avocado, sliced',
      '2 cups spinach',
      '1/4 cup tahini',
      '2 tbsp lemon juice',
      '1 tbsp honey',
      '2 cloves garlic, minced',
      'Olive oil',
      'Salt and pepper'
    ],
    instructions: [
      'Cook quinoa according to package directions.',
      'Preheat oven to 400°F (200°C).',
      'Toss sweet potato cubes with olive oil, salt, and pepper. Roast for 20 minutes.',
      'Add broccoli and chickpeas to the baking sheet, roast for another 15 minutes.',
      'Make dressing by whisking together tahini, lemon juice, honey, garlic, and a pinch of salt.',
      'Massage spinach with a little olive oil until wilted.',
      'Assemble bowls with quinoa, roasted vegetables, spinach, and avocado.',
      'Drizzle with tahini dressing and serve.'
    ],
    prepTime: 15,
    cookTime: 35,
    servings: 4,
    difficulty: 'Easy',
    dietary: ['vegetarian', 'vegan option', 'gluten-free'],
    rating: 4.6
  },
  {
    id: '3',
    name: 'Creamy Mushroom Risotto',
    description: 'Rich and creamy Arborio rice cooked with mixed mushrooms, white wine, and parmesan cheese. An elegant Italian comfort dish.',
    image: 'https://images.pexels.com/photos/17166888/pexels-photo-17166888.jpeg?auto=compress&cs=tinysrgb&w=600',
    ingredients: [
      '1 1/2 cups Arborio rice',
      '4 cups warm chicken or vegetable broth',
      '1 lb mixed mushrooms, sliced',
      '1 medium onion, diced',
      '3 cloves garlic, minced',
      '1/2 cup white wine',
      '1/2 cup parmesan cheese, grated',
      '3 tbsp butter',
      '2 tbsp olive oil',
      'Fresh thyme',
      'Salt and white pepper'
    ],
    instructions: [
      'Heat broth in a saucepan and keep warm.',
      'Sauté mushrooms in olive oil until golden, season with salt and pepper. Set aside.',
      'In the same pan, melt 1 tbsp butter and sauté onion until translucent.',
      'Add garlic and rice, stirring for 2 minutes until rice is lightly toasted.',
      'Pour in wine and stir until absorbed.',
      'Add warm broth one ladle at a time, stirring constantly until absorbed before adding more.',
      'Continue for 18-20 minutes until rice is creamy and al dente.',
      'Stir in mushrooms, remaining butter, parmesan, and thyme.',
      'Season with salt and white pepper, serve immediately.'
    ],
    prepTime: 10,
    cookTime: 35,
    servings: 4,
    difficulty: 'Medium',
    dietary: ['vegetarian option', 'gluten-free'],
    rating: 4.7
  },
  {
    id: '4',
    name: 'Spicy Thai Basil Stir Fry',
    description: 'Quick and flavorful stir fry with ground chicken, Thai basil, chilies, and aromatic spices. Served over steamed rice.',
    image: 'https://images.pexels.com/photos/769969/pexels-photo-769969.jpeg?auto=compress&cs=tinysrgb&w=600',
    ingredients: [
      '1 lb ground chicken',
      '3 cups Thai basil leaves',
      '4 Thai chilies, sliced',
      '4 cloves garlic, minced',
      '2 shallots, sliced',
      '3 tbsp fish sauce',
      '2 tbsp soy sauce',
      '1 tbsp brown sugar',
      '2 tbsp vegetable oil',
      'Steamed jasmine rice for serving',
      'Fried eggs (optional)'
    ],
    instructions: [
      'Heat oil in a large wok or skillet over high heat.',
      'Add garlic, shallots, and chilies, stir-fry for 30 seconds until fragrant.',
      'Add ground chicken and cook, breaking it up, until no longer pink.',
      'Stir in fish sauce, soy sauce, and brown sugar.',
      'Add Thai basil leaves and stir-fry until wilted.',
      'Taste and adjust seasoning as needed.',
      'Serve immediately over steamed rice.',
      'Top with fried eggs if desired.'
    ],
    prepTime: 10,
    cookTime: 10,
    servings: 4,
    difficulty: 'Easy',
    dietary: ['gluten-free option', 'dairy-free'],
    rating: 4.5
  },
  {
    id: '5',
    name: 'Mediterranean Salmon with Lemon Herbs',
    description: 'Pan-seared salmon fillet with Mediterranean herbs, cherry tomatoes, olives, and a bright lemon sauce.',
    image: 'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=600',
    ingredients: [
      '4 salmon fillets (6oz each)',
      '2 cups cherry tomatoes, halved',
      '1/2 cup kalamata olives',
      '1/4 cup capers',
      '1 lemon, juiced and zested',
      '3 tbsp olive oil',
      '3 cloves garlic, minced',
      '1 tsp dried oregano',
      'Fresh dill and parsley',
      'Salt and black pepper'
    ],
    instructions: [
      'Season salmon fillets with salt, pepper, and oregano.',
      'Heat 2 tbsp olive oil in a large skillet over medium-high heat.',
      'Sear salmon skin-side up for 4 minutes, then flip and cook for 3-4 minutes more.',
      'Remove salmon and set aside.',
      'Add remaining oil to the pan, sauté garlic for 30 seconds.',
      'Add cherry tomatoes, olives, and capers, cook for 3 minutes.',
      'Stir in lemon juice and zest, cook for 1 minute.',
      'Return salmon to the pan, spoon sauce over fish.',
      'Garnish with fresh herbs and serve immediately.'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'Medium',
    dietary: ['gluten-free', 'dairy-free', 'keto-friendly'],
    rating: 4.9
  },
  {
    id: '6',
    name: 'Classic Beef Tacos',
    description: 'Seasoned ground beef in soft tortillas with fresh toppings. A crowd-pleasing Mexican favorite that\'s perfect for weeknight dinners.',
    image: 'https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg?auto=compress&cs=tinysrgb&w=600',
    ingredients: [
      '1 lb ground beef',
      '8 small flour tortillas',
      '1 packet taco seasoning',
      '1 cup lettuce, shredded',
      '1 cup cheddar cheese, shredded',
      '2 tomatoes, diced',
      '1/2 cup sour cream',
      '1/4 cup red onion, diced',
      'Fresh cilantro',
      'Lime wedges',
      '1 avocado, sliced'
    ],
    instructions: [
      'Cook ground beef in a large skillet over medium-high heat until browned.',
      'Drain excess fat and add taco seasoning with 2/3 cup water.',
      'Simmer for 5 minutes until thickened.',
      'Warm tortillas in a dry skillet or microwave.',
      'Prepare all toppings in separate bowls.',
      'Fill tortillas with seasoned beef.',
      'Top with lettuce, cheese, tomatoes, onion, and cilantro.',
      'Serve with sour cream, avocado slices, and lime wedges.',
      'Let everyone customize their own tacos.'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'Easy',
    dietary: ['gluten-free option'],
    rating: 4.4
  },
  {
    id: '7',
    name: 'Butternut Squash Soup',
    description: 'Velvety smooth soup made with roasted butternut squash, coconut milk, and warming spices. Perfect for cold days.',
    image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=600',
    ingredients: [
      '3 lbs butternut squash, peeled and cubed',
      '1 large onion, diced',
      '3 cloves garlic, minced',
      '1 inch fresh ginger, grated',
      '4 cups vegetable broth',
      '1 can coconut milk',
      '1 tsp ground cumin',
      '1/2 tsp cinnamon',
      'Pinch of nutmeg',
      '2 tbsp olive oil',
      'Salt and pepper',
      'Pumpkin seeds for garnish'
    ],
    instructions: [
      'Preheat oven to 400°F (200°C).',
      'Toss butternut squash with 1 tbsp olive oil, salt, and pepper.',
      'Roast for 25-30 minutes until tender and lightly caramelized.',
      'Heat remaining oil in a large pot, sauté onion until softened.',
      'Add garlic and ginger, cook for 1 minute until fragrant.',
      'Add roasted squash, broth, cumin, cinnamon, and nutmeg.',
      'Bring to a boil, then simmer for 15 minutes.',
      'Blend soup until smooth using an immersion blender.',
      'Stir in coconut milk and season with salt and pepper.',
      'Serve hot, garnished with pumpkin seeds.'
    ],
    prepTime: 15,
    cookTime: 45,
    servings: 6,
    difficulty: 'Easy',
    dietary: ['vegan', 'gluten-free', 'dairy-free'],
    rating: 4.6
  },
  {
    id: '8',
    name: 'Honey Garlic Glazed Chicken Thighs',
    description: 'Juicy chicken thighs with a sticky honey garlic glaze. Simple ingredients create maximum flavor in this one-pan dinner.',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600',
    ingredients: [
      '8 bone-in chicken thighs',
      '1/3 cup honey',
      '4 cloves garlic, minced',
      '3 tbsp soy sauce',
      '2 tbsp apple cider vinegar',
      '1 tbsp olive oil',
      '1 tsp ground ginger',
      '1/2 tsp red pepper flakes',
      'Green onions for garnish',
      'Sesame seeds',
      'Salt and pepper'
    ],
    instructions: [
      'Preheat oven to 425°F (220°C).',
      'Season chicken thighs with salt and pepper.',
      'Heat olive oil in an oven-safe skillet over medium-high heat.',
      'Sear chicken skin-side down for 5 minutes until golden.',
      'Flip chicken and sear for another 3 minutes.',
      'Whisk together honey, garlic, soy sauce, vinegar, ginger, and red pepper flakes.',
      'Pour glaze over chicken in the skillet.',
      'Transfer to oven and bake for 25-30 minutes until cooked through.',
      'Baste with pan juices halfway through cooking.',
      'Garnish with green onions and sesame seeds before serving.'
    ],
    prepTime: 10,
    cookTime: 40,
    servings: 4,
    difficulty: 'Easy',
    dietary: ['gluten-free option', 'dairy-free'],
    rating: 4.7
  },
  {
    id: '9',
    name: 'Caprese Salad with Burrata',
    description: 'Fresh tomatoes, creamy burrata cheese, and basil leaves drizzled with balsamic glaze. A simple yet elegant Italian appetizer.',
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=600',
    ingredients: [
      '4 large ripe tomatoes, sliced',
      '8 oz burrata cheese',
      '1 bunch fresh basil leaves',
      '3 tbsp extra virgin olive oil',
      '2 tbsp balsamic vinegar',
      '1 tsp honey',
      'Sea salt and cracked black pepper',
      'Microgreens for garnish (optional)'
    ],
    instructions: [
      'Arrange tomato slices on a large platter.',
      'Season tomatoes with sea salt and let sit for 10 minutes.',
      'Tear burrata into chunks and distribute over tomatoes.',
      'Scatter fresh basil leaves around the platter.',
      'Make balsamic glaze by simmering vinegar and honey until reduced by half.',
      'Drizzle olive oil over the salad.',
      'Add dots of balsamic glaze around the plate.',
      'Season with cracked black pepper.',
      'Garnish with microgreens if desired.',
      'Serve immediately at room temperature.'
    ],
    prepTime: 15,
    cookTime: 5,
    servings: 4,
    difficulty: 'Easy',
    dietary: ['vegetarian', 'gluten-free'],
    rating: 4.8
  },
  {
    id: '10',
    name: 'Korean Kimchi Fried Rice',
    description: 'Spicy and tangy fried rice made with fermented kimchi, vegetables, and topped with a fried egg. Comfort food with probiotics.',
    image: 'https://images.pexels.com/photos/5737485/pexels-photo-5737485.jpeg?auto=compress&cs=tinysrgb&w=600',
    ingredients: [
      '3 cups cooked day-old rice',
      '1 1/2 cups kimchi, chopped',
      '4 green onions, sliced',
      '2 cloves garlic, minced',
      '2 tbsp kimchi juice',
      '2 tbsp vegetable oil',
      '2 tbsp soy sauce',
      '1 tsp sesame oil',
      '4 eggs',
      '1 tsp sugar',
      'Sesame seeds',
      'Nori sheets, cut into strips'
    ],
    instructions: [
      'Heat 1 tbsp vegetable oil in a large wok or skillet.',
      'Stir-fry garlic for 30 seconds until fragrant.',
      'Add chopped kimchi and cook for 3-4 minutes.',
      'Add cold rice, breaking up any clumps.',
      'Stir in kimchi juice, soy sauce, and sugar.',
      'Cook, stirring frequently, for 5-6 minutes until rice is heated through.',
      'Push rice to one side of the pan.',
      'Add remaining oil and crack eggs into the empty space.',
      'Scramble eggs and mix into the rice.',
      'Stir in half the green onions and sesame oil.',
      'Serve topped with remaining green onions, sesame seeds, and nori strips.'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'Easy',
    dietary: ['vegetarian option', 'gluten-free option', 'dairy-free'],
    rating: 4.3
  },
  {
    id: '11',
    name: 'Lemon Herb Roasted Chicken',
    description: 'Whole roasted chicken with fresh herbs, lemon, and garlic. A classic Sunday dinner that fills the house with amazing aromas.',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=600',
    ingredients: [
      '1 whole chicken (4-5 lbs)',
      '2 lemons, sliced',
      '4 sprigs fresh rosemary',
      '4 sprigs fresh thyme',
      '6 cloves garlic, smashed',
      '3 tbsp olive oil',
      '2 tbsp butter, softened',
      '1 tbsp salt',
      '1 tsp black pepper',
      '1 tsp paprika',
      '2 lbs baby potatoes'
    ],
    instructions: [
      'Preheat oven to 425°F (220°C).',
      'Pat chicken dry and season inside and out with salt and pepper.',
      'Stuff cavity with lemon slices, herb sprigs, and garlic.',
      'Rub skin with softened butter and season with paprika.',
      'Place chicken breast-side up in a roasting pan.',
      'Toss potatoes with olive oil, salt, and pepper, arrange around chicken.',
      'Roast for 20 minutes, then reduce heat to 375°F (190°C).',
      'Continue roasting for 35-45 minutes until internal temp reaches 165°F.',
      'Let chicken rest for 10 minutes before carving.',
      'Serve with roasted potatoes and pan juices.'
    ],
    prepTime: 15,
    cookTime: 75,
    servings: 6,
    difficulty: 'Medium',
    dietary: ['gluten-free', 'dairy-free option'],
    rating: 4.9
  },
  {
    id: '12',
    name: 'Chocolate Avocado Mousse',
    description: 'Rich and creamy chocolate mousse made with ripe avocados. A healthy dessert that\'s surprisingly indulgent and dairy-free.',
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600',
    ingredients: [
      '3 ripe avocados',
      '1/3 cup unsweetened cocoa powder',
      '1/3 cup maple syrup',
      '2 tbsp almond milk',
      '1 tsp vanilla extract',
      'Pinch of salt',
      'Fresh berries for topping',
      'Whipped cream (optional)',
      'Dark chocolate shavings',
      'Mint leaves for garnish'
    ],
    instructions: [
      'Scoop avocado flesh into a food processor.',
      'Add cocoa powder, maple syrup, almond milk, vanilla, and salt.',
      'Process until completely smooth and creamy, about 2-3 minutes.',
      'Scrape down sides as needed to ensure even mixing.',
      'Taste and adjust sweetness if needed.',
      'Transfer to serving glasses or bowls.',
      'Refrigerate for at least 2 hours to set.',
      'Before serving, top with fresh berries and chocolate shavings.',
      'Garnish with mint leaves if desired.',
      'Serve chilled.'
    ],
    prepTime: 10,
    cookTime: 0,
    servings: 4,
    difficulty: 'Easy',
    dietary: ['vegan', 'dairy-free', 'gluten-free'],
    rating: 4.2
  }
];