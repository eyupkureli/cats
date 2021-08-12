/* eslint-disable no-redeclare */
/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import {
  Card,
  Button,
  CardImg,
  CardGroup,
  CardBody,
  ListGroup,
  ListGroupItem,
  Badge,
  Col,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";

import { BiHappy, BiAngry, BiHeart } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon,
} from "react-share";

class Cat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: props.score,
      popoverOpen: false,
    };
  }

  toggle = () => {
    let newpopoverOpen = !this.state.popoverOpen;
    this.setState({ popoverOpen: newpopoverOpen });
  };

  onClickFavourite = (catId, favourite, favouriteId) => {
    if (favourite === "0") {
      var myHeaders = new Headers();
      myHeaders.append("x-api-key", "cdbfbcaf-5f5f-4abf-9f4d-fc5974aacf9c");
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({ image_id: catId, sub_id: "cat1.jpg" });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        //redirect: 'follow'
      };

      fetch("https://api.thecatapi.com/v1/favourites/", requestOptions)
        .then((response) => response.json())
        .then((result) => window.location.reload(false))
        .catch((error) => {console.log("error", error); alert ("Cat image could not be marked as favourite!")});
    } else {
      var myHeaders = new Headers();
      myHeaders.append("x-api-key", "cdbfbcaf-5f5f-4abf-9f4d-fc5974aacf9c");

      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        //redirect: "follow",
      };

      fetch(
        "https://api.thecatapi.com/v1/favourites/" + favouriteId,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => window.location.reload(false))
        .catch((error) => console.log("error", error));
    }
  };

  onClickVote = (catId, vote) => {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "cdbfbcaf-5f5f-4abf-9f4d-fc5974aacf9c");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ image_id: catId, value: vote });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      //redirect: 'follow'
    };

    fetch("https://api.thecatapi.com/v1/votes", requestOptions)
      .then((response) => response.json())
      .then((result) =>
        /*console.log(result)*/ this.setState({
          score: this.state.score + (vote === 1 ? 1 : -1),
        })
      )
      .catch((error) => {console.log("error", error); alert ("Vote could not be sent!")});
  };

  render() {
    return (
      <Col>
        <CardGroup
          style={{ maxWidth: 300, minWidth: 200, marginRight: "1rem" }}
        >
          <Card>
            <CardImg
              width="100%"
              height="300"
              src={this.props.url}
              alt="Card image cap"
            />
            <CardBody>
              <div style={{ display: "flex" }}>
                <Button
                  color="success"
                  style={{ marginRight: "auto" }}
                  outline
                  onClick={() => this.onClickVote(this.props.id, 1)}
                >
                  <BiHappy /> Love it!
                </Button>
                <Button
                  color="danger"
                  style={{ marginLeft: "auto" }}
                  outline
                  onClick={() => this.onClickVote(this.props.id, 0)}
                >
                  <BiAngry />
                  Nope it!
                </Button>
              </div>
              <br></br>
              <div>
                <ListGroup style={{ textAlign: "center" }}>
                  <ListGroupItem className="justify-content-between">
                    Score <Badge color="warning">{this.state.score}</Badge>
                  </ListGroupItem>
                  <ListGroupItem className="justify-content-between">
                    <Button
                      style={{ marginRight: "1rem" }}
                      outline
                      color="danger"
                      onClick={() =>
                        this.onClickFavourite(
                          this.props.id,
                          this.props.favourite,
                          this.props.favouriteId
                        )
                      }
                    >
                      {this.props.favourite === "1" && <FcLike />}
                      {this.props.favourite === "0" && <BiHeart />}
                    </Button>
                    <Button
                      style={{
                        marginLeft: "1rem",
                        display: this.props.sharedisplay,
                      }}
                      outline
                      color="primary"
                      id="Popover1"
                    >
                      Share
                    </Button>
                    <Popover
                      placement="bottom"
                      isOpen={this.state.popoverOpen}
                      target="Popover1"
                      toggle={this.toggle}
                    >
                      <PopoverHeader>Share with friends!</PopoverHeader>
                      <PopoverBody>
                        <FacebookShareButton url={this.props.url} >
                          <FacebookIcon size={30} borderRadius={100} />
                        </FacebookShareButton>
                        <WhatsappShareButton url={this.props.url}>
                          <WhatsappIcon size={30} borderRadius={100} />
                        </WhatsappShareButton>

                        <TwitterShareButton url={this.props.url}>
                          <TwitterIcon size={30} borderRadius={100} />
                        </TwitterShareButton>

                        <PinterestShareButton url={this.props.url}>
                          <PinterestIcon size={30} borderRadius={100} />
                        </PinterestShareButton>
                      </PopoverBody>
                    </Popover>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </CardBody>
          </Card>
        </CardGroup>
      </Col>
    );
  }
}

export default Cat;
