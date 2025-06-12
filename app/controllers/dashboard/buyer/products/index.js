import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProductsController extends Controller {
    @tracked searchQuery = '';
    @tracked selectedCategory = '';
    @tracked selectedColor = '';

    get filteredProducts() {
    let query = this.searchQuery.trim().toLowerCase();

    return this.model.filter(product => {
        let nameMatch = product.name.toLowerCase().includes(query);
        let brandMatch = product.brand?.toLowerCase().includes(query);
        let categoryMatch = this.selectedCategory === '' || product['product-details']?.category === this.selectedCategory;
        let colorMatch = this.selectedColor === '' || product['product-details']?.color === this.selectedColor;

        return (nameMatch || brandMatch) && categoryMatch && colorMatch;
    });
    }

    @action
    updateSearchQuery(event) {
    this.searchQuery = event.target.value;
    }

    @action
    updateCategoryFilter(event) {
    this.selectedCategory = event.target.value;
    }

    @action
    updateColorFilter(event) {
    this.selectedColor = event.target.value;
    }

    
}
