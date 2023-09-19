import { Component } from "react";
import { CartItem } from "../App";
import {
    Button,
    Card,
    Modal,
    Badge,
    Image,
    Table,
  } from "react-bootstrap";
interface Props {
  cartItems: CartItem[];
}
import { TfiShoppingCart } from "react-icons/Tfi";

interface State {
  show: boolean;
}

class CartPopup extends Component<Props, State> {
  state = { show: false };
  render() {
    const totalPrice = this.props.cartItems.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );
    return (
      <>
        <Button variant="primary" onClick={() => this.setState({show:true})}>
          <Badge bg="success">{this.props.cartItems.length}</Badge>{" "}
          <TfiShoppingCart size={30} />
        </Button>
        <Modal
          size="lg"
          show={this.state.show}
          onHide={() => this.setState({show:false})}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.cartItems.length == 0 ? (
              <Card.Text style={{ textAlign: "center" }}>
                Please buy somethings
              </Card.Text>
            ) : (
              <Table responsive>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Image style={{ width: 75 }} src={item.product.image} />
                      </td>
                      <td>
                        <b>{item.product.title}</b>
                      </td>
                      <td>
                        <b>{item.quantity}</b>
                      </td>
                      <td>
                        <b>{item.product.price} $</b>
                      </td>
                      <td>
                        <b>{item.product.price * item.quantity} $</b>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
            <Modal.Title>Total price: {totalPrice} $</Modal.Title>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({show:false})}>
              Close
            </Button>
            <Button variant="primary">Payment</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default CartPopup;
