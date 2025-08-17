/**
 * PricingCard - A reusable pricing card component
 * 
 * Usage:
 * import PricingCard from './PricingCard.js';
 * 
 * const card = new PricingCard({
 *   title: "Pro Plan",
 *   price: "$19.99/month",
 *   features: ["Feature 1", "Feature 2"],
 *   buttonText: "Subscribe",
 *   isPopular: true,
 *   onButtonClick: (title, price) => console.log(`Selected: ${title}`)
 * });
 * 
 * document.body.appendChild(card.render());
 */

export default class PricingCard {
  constructor({
    title,
    price,
    features = [],
    buttonText = "Get Started",
    buttonStyle = "primary",
    isPopular = false,
    onButtonClick = null,
    customStyles = {}
  }) {
    this.title = title;
    this.price = price;
    this.features = features;
    this.buttonText = buttonText;
    this.buttonStyle = buttonStyle;
    this.isPopular = isPopular;
    this.onButtonClick = onButtonClick || this.defaultClickHandler;
    this.customStyles = customStyles;
    
    // Inject CSS if not already present
    this.injectStyles();
  }

  defaultClickHandler = () => {
    console.log(`${this.buttonText} clicked for ${this.title}`);
    alert(`You selected: ${this.title} for ${this.price}!`);
  }

  injectStyles() {
    if (document.getElementById('pricing-card-styles')) return;

    const style = document.createElement('style');
    style.id = 'pricing-card-styles';
    style.textContent = `
      .pricing-card {
        width: 320px;
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        box-sizing: border-box;
      }

      .pricing-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
      }

      .pricing-card.popular {
        border: 3px solid #ffd700;
        transform: scale(1.02);
      }

      .pricing-card.popular::before {
        content: "MOST POPULAR";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #ffd700, #ffed4e);
        color: #333;
        text-align: center;
        padding: 8px;
        font-size: 12px;
        font-weight: bold;
        letter-spacing: 1px;
      }

      .pricing-card.popular .card-header {
        padding-top: 40px;
      }

      .card-header {
        text-align: center;
        margin-bottom: 24px;
        padding-top: 0;
      }

      .card-title {
        font-size: 24px;
        font-weight: 700;
        color: #333;
        margin: 0 0 8px 0;
      }

      .card-price {
        font-size: 32px;
        font-weight: 800;
        color: #667eea;
        margin: 0;
      }

      .card-features {
        list-style: none;
        padding: 0;
        margin: 0 0 32px 0;
      }

      .card-features li {
        padding: 12px 0;
        border-bottom: 1px solid #f0f0f0;
        color: #555;
        position: relative;
        padding-left: 28px;
        font-size: 14px;
      }

      .card-features li::before {
        content: "✓";
        position: absolute;
        left: 0;
        top: 12px;
        color: #28a745;
        font-weight: bold;
        font-size: 16px;
      }

      .card-features li:last-child {
        border-bottom: none;
      }

      .card-button {
        width: 100%;
        padding: 16px 24px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-family: inherit;
      }

      .card-button.primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .card-button.primary:hover {
        background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
      }

      .card-button.secondary {
        background: white;
        color: #667eea;
        border: 2px solid #667eea;
      }

      .card-button.secondary:hover {
        background: #667eea;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
      }

      .card-button.success {
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        color: white;
      }

      .card-button.success:hover {
        background: linear-gradient(135deg, #218838 0%, #1ea080 100%);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(40, 167, 69, 0.4);
      }

      .card-button.danger {
        background: linear-gradient(135deg, #dc3545 0%, #e83e8c 100%);
        color: white;
      }

      .card-button.danger:hover {
        background: linear-gradient(135deg, #c82333 0%, #d91a72 100%);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(220, 53, 69, 0.4);
      }
    `;
    
    document.head.appendChild(style);
  }

  render() {
    const cardDiv = document.createElement('div');
    cardDiv.className = `pricing-card ${this.isPopular ? 'popular' : ''}`;
    
    // Apply custom styles if provided
    if (this.customStyles.card) {
      Object.assign(cardDiv.style, this.customStyles.card);
    }

    const featuresHTML = this.features.map(feature => `<li>${feature}</li>`).join('');
    
    cardDiv.innerHTML = `
      <div class="card-header">
        <h3 class="card-title">${this.title}</h3>
        <div class="card-price">${this.price}</div>
      </div>
      
      <ul class="card-features">
        ${featuresHTML}
      </ul>
      
      <button class="card-button ${this.buttonStyle}">
        ${this.buttonText}
      </button>
    `;

    // Add click event to button
    const button = cardDiv.querySelector('.card-button');
    button.addEventListener('click', () => this.onButtonClick(this.title, this.price));

    // Apply custom button styles if provided
    if (this.customStyles.button) {
      Object.assign(button.style, this.customStyles.button);
    }

    return cardDiv;
  }

  // Method to update card data dynamically
  updateCard({ title, price, features, buttonText, buttonStyle, isPopular }) {
    if (title !== undefined) this.title = title;
    if (price !== undefined) this.price = price;
    if (features !== undefined) this.features = features;
    if (buttonText !== undefined) this.buttonText = buttonText;
    if (buttonStyle !== undefined) this.buttonStyle = buttonStyle;
    if (isPopular !== undefined) this.isPopular = isPopular;
    
    return this;
  }

  // Static method to create multiple cards
  static createCards(cardsData, container) {
    if (!container) {
      throw new Error('Container element is required');
    }

    container.innerHTML = ''; // Clear existing content
    
    const cards = cardsData.map(cardData => {
      const card = new PricingCard(cardData);
      return card.render();
    });

    cards.forEach(card => container.appendChild(card));
    return cards;
  }

  // Static method to create a cards container with responsive layout
  static createCardsContainer(cardsData, parentElement, containerStyles = {}) {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.gap = '24px';
    container.style.justifyContent = 'center';
    container.style.maxWidth = '1200px';
    container.style.margin = '0 auto';
    
    // Apply custom container styles
    Object.assign(container.style, containerStyles);

    PricingCard.createCards(cardsData, container);
    
    if (parentElement) {
      parentElement.appendChild(container);
    }
    
    return container;
  }
}

// Export utility functions for common use cases
export const createPricingGrid = (plans, container, options = {}) => {
  return PricingCard.createCardsContainer(plans, container, options.containerStyles);
};

export const defaultPricingPlans = [
  {
    title: "Starter",
    price: "$9/month",
    features: [
      "1 GB Storage",
      "Basic Support",
      "Core Features",
      "Mobile App Access"
    ],
    buttonText: "Start Free Trial",
    buttonStyle: "secondary",
    isPopular: false
  },
  {
    title: "Professional",
    price: "$29/month",
    features: [
      "50 GB Storage",
      "Priority Support",
      "Advanced Features",
      "Mobile App Access",
      "Custom Integrations",
      "Analytics Dashboard"
    ],
    buttonText: "Choose Pro",
    buttonStyle: "primary",
    isPopular: true
  },
  {
    title: "Enterprise",
    price: "$99/month",
    features: [
      "Unlimited Storage",
      "24/7 Dedicated Support",
      "All Features",
      "Mobile App Access",
      "Custom Integrations",
      "Advanced Analytics",
      "Team Management",
      "API Access"
    ],
    buttonText: "Contact Sales",
    buttonStyle: "secondary",
    isPopular: false
  }
];