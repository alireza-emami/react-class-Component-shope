import { Component } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { CartItem, Product } from "../App";

interface Props {
  product: Product;
  addToCart: (item: CartItem) => void;
}

interface State {
  show: boolean;
  quantity: number;
}

class DetailsPopup extends Component<Props, State> {
  state: State = { show: false, quantity: 1 };
  render() {
    const onBuyButtonClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      const product = this.props.product;
      const quantity = this.state.quantity;
      this.props.addToCart({ product, quantity });
      this.setState({ show: false });
      toast.success("Your purchase has been successfully registered!");
    };

    return (
      <Container>
        <div>
          <Toaster />
        </div>
        <Row>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              className="d-flex"
              style={{ alignItems: "center", justifyContent: "end" }}
              variant="primary"
              onClick={() => this.setState({ show: true })}
            >
              Details
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Modal
              size="lg"
              show={this.state.show}
              onHide={() => this.setState({ show: false })}
              animation={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>{this.props.product.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col>
                    <Card.Text style={{ padding: 16 }}>
                      <strong>Category :</strong> {this.props.product.category}
                      <br />
                      <strong>Description</strong> :{" "}
                      {this.props.product.description}
                      <br />
                      <strong>Price</strong> : {this.props.product.price}
                      <br />
                      <strong>Rrice</strong> : {this.props.product.rating.rate}
                      <br />
                      <strong>Count</strong> : {this.props.product.rating.count}
                      <br />
                      <strong>Quantity</strong> : &nbsp;
                      <input
                        style={{ width: 50 }}
                        type="number"
                        onChange={(e) =>
                          this.setState({ quantity: +e.target.value })
                        }
                        value={this.state.quantity}
                      />
                    </Card.Text>
                  </Col>
                  <Col xs={6} md={4}>
                    <Image
                      className="w-100"
                      src={this.props.product.image}
                      rounded
                    />
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => this.setState({ show: false })}
                >
                  Close
                </Button>
                <Button onClick={onBuyButtonClick} variant="primary">
                  buy
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DetailsPopup;
