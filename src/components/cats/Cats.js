/* eslint-disable no-undef */
import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import Cat from "./Cat";

class Cats extends Component {

  isFavourite = (catId) => {                                                                                              
    let allImageIds = this.props.favCatList.map((fav) =>{
      return fav.image.id
    });

    return allImageIds.includes(catId);
  }

  getFavouriteId = (catId) => {                                                                                           
    let allFavouriteIds = this.props.favCatList.filter((fav) => fav.image.id === catId).map((fav) =>{
      return fav.id
    });

    return allFavouriteIds[0];
  }
  render() {
  
    return (
     

      <Container>
  
        <Row xs="1" sm="2" md="4">
          {this.props.catList.map((cat) => (
            <Cat
              url={cat.url}
              id={cat.id}
              score={cat.score}
              sharedisplay={cat.sharedisplay}
              favourite={this.props.favourite === "1" || this.isFavourite(cat.id) ? "1" : "0"}
              favouriteId={cat.favouriteId ? cat.favouriteId : this.getFavouriteId(cat.id)}
            />
          ))}
        </Row>
      </Container>
    );
  }
}

export default Cats;
