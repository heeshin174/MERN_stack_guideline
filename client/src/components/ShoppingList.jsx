import React, { useState, useEffect } from "react";
import { Button, Container, ListGroup, ListGroupItem } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");

  const getItems = async () => {
    try {
      const res = await fetch("api/items");
      const jsonData = await res.json();
      setItems(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const haddleAddForm = async (e) => {
    e.preventDefault();
    try {
      const body = { itemName };
      const res = await fetch("api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Container>
      <Button color="dark" style={{ marrginBottom: "2rem" }}>
        Add Item
      </Button>

      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map((item) => (
            <CSSTransition key={item.id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button className="remove-btn" color="danger" size="sm">
                  Delete Item
                </Button>
                {item.name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default ShoppingList;
