import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../Components/Filter.css'

const FilterModal = ({
  show,
  handleClose,
  ingredients = [],
  cuisines = [],
  selectedCuisines = [],
  selectedIngredients = [],
  handleFilterChange,
}) => {
  const handleIngredientChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    handleFilterChange(selectedCuisines, selectedOptions);
  };

  const handleCuisineChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    handleFilterChange(selectedOptions, selectedIngredients);
  };

  return (
    <Modal show={show} onHide={handleClose} className="filter-modal">
      <Modal.Header closeButton>
        <Modal.Title>Filter Recipes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Ingredients</h5>
        <Form.Group>
          <Form.Select multiple onChange={handleIngredientChange} className="filter-dropdown">
            {ingredients.map((ingredient) => (
              <option key={ingredient} value={ingredient}>
                {ingredient}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <h5 className="mt-3">Cuisines</h5>
        <Form.Group>
          <Form.Select multiple onChange={handleCuisineChange} className="filter-dropdown">
            {cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose} className="filter-button">
          Close
        </Button>
        <Button variant="primary" onClick={handleClose} className="filter-button">
          Apply Filters
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
