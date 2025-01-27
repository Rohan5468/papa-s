import React, { useState, useEffect } from 'react';
import {
  Phone,
  Clock,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Menu as MenuIcon,
  Mail,
  X,
} from 'lucide-react';

// Menu data
const menuItems = {
  vegPizza: [
    {
      name: 'Veggie Delights',
      price: 'Rs. 580/660',
      description: 'Fresh tomatoes, mozzarella, basil',
      image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80',
      ingredients: ['Fresh Tomatoes', 'Mozzarella', 'Basil', 'Olive Oil', 'Italian Herbs'],
      size: '9 inches, 12 inches',
      preparationTime: '15-20 minutes',
      spicyLevel: 'Mild',
      bestSeller: true
    },
    {
      name: 'Pizza Marinara',
      price: 'Rs.430/470',
      description: 'Olive Oil, Tomato Sauce, Mozarella Cheese',
    },
    {
      name: 'Pizza Margherita',
      price: 'Rs.430/470',
      description: 'Olive Oil,Fresh Totato, Tomato Sauce, Mozarella Cheese',
      size: '9 inches, 12 inches',
    },
  ],
  chickenPizza: [
    {
      name: "Chicken Supreme",
      price: 'Rs.760/880',
      description: 'Our signature pizza with special marinated chicken',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80',
      ingredients: ['Marinated Chicken', 'Special Sauce', 'Mozzarella', 'Bell Peppers', 'Onions', 'Fresh Basil'],
      size: '9 inches, 12 inches',
      preparationTime: '20-25 minutes',
      spicyLevel: 'Medium',
      bestSeller: true
    },
    {
      name: 'Standard Chicken',
      price: 'Rs.520/600',
      description: 'Oil, Tomato sauce, Mozarella Chees, Topped with Grilled Chicken',
    },
  ],
  premiumNonVegPizza: [
    {
      name: "Supper Papa's",
      price: 'Rs. 910/1050',
      description: 'Our signature pizza with special marinated chicken',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80',
      ingredients: ['Premium Chicken', 'Special Papa\'s Sauce', 'Extra Mozzarella', 'Mixed Bell Peppers', 'Red Onions', 'Fresh Herbs'],
      size: '9 inches, 12 inches',
      preparationTime: '25-30 minutes',
      spicyLevel: 'Hot',
      bestSeller: true
    },
    {
      name: 'Pepperoni Pizza',
      price: 'Rs.630/720',
      description: 'Loaded with various premium meats',
    },
  ],
  fromthechef: [
    {
      name: 'Chicken Chilli',
      price: 'Rs.350',
    },
    {
      name: 'Chips Chilli',
      price: 'Rs.275',
    },
  ],
  fryer: [
    {
      name: 'French Fries',
      price: 'Rs.250',
    },
    {
      name: 'Spicy Chicken Wings',
      price: 'Rs.300',
    },
  ],
  breakfast: [
    {
      name: "Papa's Breakfast Set",
      price: 'Rs.550',
      description: 'Sausage, Bacon, Egg, Phaparko Roti, Hash Brown (Honey or Maple Syrup), Tea or Coffee',
    },
  ],
  sandwiches: [
    {
      name: 'Grilled Chicken Sandwich',
      price: 'Rs.300',
      description: 'Cooked with Herbs, Served with Butteted Potatos, Carrot',
    },
  ],
  burgers: [
    {
      name: 'Grilled Chicken Burger',
      price: 'Rs.495',
      description: 'Filleted Chicken Breast, Grilled on a Pan with Cheese, BBQ Sauce served with Fries, A Choice of Sauce',
    },
  ],
  coffee: [
    {
      name: 'Espresso',
      price: 'Rs. 120',
    },
    {
      name: 'Cappuccino',
      price: 'Rs. 220',
    },
  ],
};

// Menu categories configuration
const menuCategories = [
  { id: 'vegPizza', title: 'Veg Pizza', items: menuItems.vegPizza },
  { id: 'chickenPizza', title: 'Chicken Pizza', items: menuItems.chickenPizza },
  { id: 'premiumNonVegPizza', title: 'Non-Veg Pizza Premium', items: menuItems.premiumNonVegPizza },
  { id: 'fromthechef', title: ' From the Chef', items: menuItems.fromthechef },
  { id: 'fryer', title: 'From the Fryer', items: menuItems.fryer },
  { id: 'breakfast', title: 'Daily Breakfast', items: menuItems.breakfast },
  { id: 'sandwiches', title: 'Sandwiches', items: menuItems.sandwiches },
  { id: 'burgers', title: 'Burger', items: menuItems.burgers },
  { id: 'coffee', title: 'Coffee', items: menuItems.coffee },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('vegPizza');
  const [isAtBottom, setIsAtBottom] = useState(false);

  const scrollToContact = () => {
    setActiveSection('home');
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      document
        .getElementById('contact')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const buffer = 50; // Buffer zone in pixels

          // Check if we're near the bottom
          if (scrollPosition + windowHeight >= documentHeight - buffer) {
            if (!isAtBottom) {
              setIsAtBottom(true);
              // Smoothly scroll to the exact bottom
              window.scrollTo({
                top: documentHeight - windowHeight,
                behavior: 'smooth'
              });
            }
          } else {
            setIsAtBottom(false);
          }

          lastScrollY = scrollPosition;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAtBottom]);

  const handleNavigation = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    setIsAtBottom(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPizzaModal = (pizza) => {
    setSelectedPizza(pizza);
    setIsModalOpen(true);
  };

  const popularPizzas = [
    menuItems.vegPizza[0],
    menuItems.chickenPizza[0],
    menuItems.premiumNonVegPizza[0],
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 flex items-center justify-between px-6 py-4 lg:px-12">
        <div
          className="text-3xl font-bold text-white cursor-pointer"
          onClick={() => handleNavigation('home')}
        >
          Papa's Pizza
        </div>
        <div className="hidden md:flex space-x-8 text-white">
          <button
            onClick={() => handleNavigation('menu')}
            className="hover:text-yellow-400 transition-all duration-300 hover:scale-105"
          >
            Menu
          </button>
          <button
            onClick={scrollToContact}
            className="hover:text-yellow-400 transition-all duration-300 hover:scale-105"
          >
            About
          </button>
          <button
            onClick={() => handleNavigation('contact')}
            className="hover:text-yellow-400 transition-all duration-300 hover:scale-105"
          >
            Contact
          </button>
        </div>
        <button
          className="md:hidden text-white z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-screen w-64 bg-black bg-opacity-95 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
        >
          <div className="flex flex-col items-center pt-20 space-y-8">
            <button
              onClick={() => handleNavigation('menu')}
              className="text-white text-xl hover:text-yellow-400 transition-all duration-300 hover:scale-105"
            >
              Menu
            </button>
            <button
              onClick={scrollToContact}
              className="text-white text-xl hover:text-yellow-400 transition-all duration-300 hover:scale-105"
            >
              About
            </button>
            <button
              onClick={() => handleNavigation('contact')}
              className="text-white text-xl hover:text-yellow-400 transition-all duration-300 hover:scale-105"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Pizza Modal */}
      {isModalOpen && selectedPizza && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedPizza.image}
                alt={selectedPizza.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{selectedPizza.name}</h3>
                <p className="text-xl font-bold text-yellow-600">{selectedPizza.price}</p>
              </div>
              {selectedPizza.bestSeller && (
                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                  Best Seller
                </span>
              )}
              <p className="text-gray-600 mt-4">{selectedPizza.description}</p>
              
              <div className="mt-6">
                <h4 className="font-semibold text-lg mb-2">Ingredients:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPizza.ingredients?.map((ingredient, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="font-semibold">Size</h4>
                  <p className="text-gray-600">{selectedPizza.size}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Preparation Time</h4>
                  <p className="text-gray-600">{selectedPizza.preparationTime}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Spicy Level</h4>
                  <p className="text-gray-600">{selectedPizza.spicyLevel}</p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pt-16">
        {/* Home Section */}
        {activeSection === 'home' && (
          <>
            <header className="relative h-screen">
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80"
                  alt="Pizza hero"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"></div>
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  Delicious Pizza
                </h1>
                <button
                  onClick={() => handleNavigation('contact')}
                  className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition transform hover:scale-110 mb-8 animate-bounce"
                >
                  Visit Us Now
                </button>
                <p className="text-xl text-white max-w-2xl">
                  Craving a cheesy, delicious pizza? 🍕 Indulge in the perfect
                  slice of heaven with Papa's Pizza!
                  <br /> Hand-crafted with love. Experience the taste of Naples
                  in every bite.
                </p>
              </div>
            </header>

            <section className="py-20 px-6 lg:px-12 bg-white">
              <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
                <div className="text-center">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                  <h3 className="text-xl font-semibold mb-2">
                    Fast and Delicious
                  </h3>
                  <p className="text-gray-600">
                    Prepared by expert chefs with passion and expertise
                  </p>
                </div>
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                  <h3 className="text-xl font-semibold mb-2">
                    Multiple Platform
                  </h3>
                  <p className="text-gray-600">
                    Find us in Pathao Food and Foodmandu
                  </p>
                </div>
                <div className="text-center">
                  <Phone className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                  <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                  <p className="text-gray-600">
                    Located in Lalitpur, Jawalakhel
                  </p>
                </div>
              </div>
            </section>

            <section className="py-20 px-6 lg:px-12 bg-gray-50">
              <h2 className="text-4xl font-bold text-center mb-12">
                Our Popular Pizzas
              </h2>
              <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                {popularPizzas.map((pizza, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {pizza.name}
                      </h3>
                      <p className="text-yellow-400 font-bold">{pizza.price}</p>
                      <button 
                        onClick={() => openPizzaModal(pizza)}
                        className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                      >
                        Full Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Menu Section */}
        {activeSection === 'menu' && (
          <section className="min-h-screen relative">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&q=80"
                alt="Menu background"
                className="w-full h-full object-cover fixed"
              />
              <div className="absolute inset-0 bg-black/75"></div>
            </div>
            <div className="relative z-10 py-20 px-6 lg:px-12">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12 text-white animate-fade-in">
                  Our Menu
                </h2>

                <div className="flex flex-wrap gap-4 justify-center mb-12">
                  {menuCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-6 py-2 rounded-full transition-all duration-300 ${
                        activeCategory === category.id
                          ? 'bg-yellow-400 text-black'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {category.title}
                    </button>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {menuCategories
                    .find((cat) => cat.id === activeCategory)
                    ?.items.map((item, index) => (
                      <div
                        key={index}
                        className="menu-item bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-xl font-semibold text-white">
                              {item.name}
                            </h4>
                            <p className="text-gray-300 mt-2">{item.description}</p>
                          </div>
                          <p className="text-yellow-400 font-bold">{item.price}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <section className="min-h-screen relative">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&q=80"
                alt="Contact background"
                className="w-full h-full object-cover fixed"
              />
              <div className="absolute inset-0 bg-black/75"></div>
            </div>
            <div className="relative z-10 py-20 px-6 lg:px-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-12 text-white animate-fade-in">
                  Contact Us
                </h2>
                <div className="grid gap-8">
                  <div className="contact-item bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20">
                    <a
                      href="tel:+9771234567890"
                      className="flex items-center justify-center gap-4 hover:text-yellow-400 transition-duration-300"
                    >
                      <Phone className="w-8 h-8 text-yellow-400" />
                      <p className="text-2xl text-white hover:text-yellow-400">
                        +977 9801103003
                      </p>
                    </a>
                  </div>
                  <div className="contact-item bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20">
                    <div className="flex items-center justify-center gap-4">
                      <Mail className="w-8 h-8 text-yellow-400" />
                      <p className="text-2xl text-white">
                        contact@papaspizza.com
                      </p>
                    </div>
                  </div>
                  <div className="contact-item bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20">
                    <div className="flex justify-center gap-8">
                      <a
                        href="https://www.facebook.com/profile.php?id=61563824227661"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-yellow-400 transition-all duration-300 hover:scale-110"
                      >
                        <Facebook className="w-10 h-10" />
                      </a>
                      <a
                        href="https://www.instagram.com/papas.pizza28/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-yellow-400 transition-all duration-300 hover:scale-110"
                      >
                        <Instagram className="w-10 h-10" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer
          id="contact"
          className="bg-black text-white py-12 px-6 lg:px-12"
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Papa's Pizza</h3>
              <p className="text-gray-400">Serving the best pizza</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Our Team</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
                  <p className="text-gray-400">CEO - Mr. ABC</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
                  <p className="text-gray-400">Manager - Mr. CDE</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
                  <p className="text-gray-400">Head Chef - Mr. FGH</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
                  <p className="text-gray-400">Kitchen Helper - Mr. YRI</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">More Staff</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
                  <p className="text-gray-400">Cashier - Mr. EHID</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
                  <p className="text-gray-400">Barista - Mr. HDJD</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0"></div>
                  <p className="text-gray-400">Waiter - Mr. HDJD</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex space-x-4">
                    <a
                      href="https://www.facebook.com/profile.php?id=61563824227661"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a
                      href="https://www.instagram.com/papas.pizza28/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                    <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            © 2024 Papa's Pizza. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;