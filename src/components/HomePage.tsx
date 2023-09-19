import { Component } from "react";
import { CartItem, Product } from "../App";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import DetailsPopup from "./DetailsPopup";

interface Props {
  addToCart: (item: CartItem) => void;
}

interface IState {
  loading: boolean;
  products: Product[];
}

class HomePage extends Component<Props, IState> {
  state: IState = { loading: true, products: [] };

  async fetchProducts() {
    await fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => this.setState({ products: json }));
    this.setState({ loading: false });
  }

  async componentDidMount() {
    await this.fetchProducts();
  }

  render() {
    return (
      <>
        {this.state.loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner />
          </div>
        ) : (
          <Container>
            <Row className="m-4">
              {this.state.products?.map((product ,index) => (
                <Col key={index}>
                  <Card
                    style={{
                      width: "18rem",
                      height: "40rem",
                    }}
                    className="mb-2 "
                  >
                    <Card.Img
                      variant="top"
                      src={product.image}
                      style={{ height: 350 }}
                    />
                    <Card.Body>
                      <Row>
                        <Col xs={12}>
                          <Card.Title>{product.title}</Card.Title>
                          <Card.Text>Category : {product.category}</Card.Text>
                          <Card.Text>Price : {product.price} $</Card.Text>
                          <Card.Text>Rate : {product.rating.rate}</Card.Text>
                        </Col>
                        <Col xs={12}>
                          <DetailsPopup
                            product={product}
                            addToCart={this.props.addToCart}
                          />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </>
    );
  }
}

export default HomePage;
