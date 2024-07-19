import Box from "@mui/material/Box";
import { CardContent, List, ListItem, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetOrderByUserIdQuery } from "../slices/api";

function ScrollList() {
  const user = useSelector((state) => state.auth.credentials.users);
  const { isLoading } = useGetOrderByUserIdQuery(user.id);
  const orders = useSelector((state) => state.orders);
  console.log(orders);
  return (
    <Box className="scrollBox">
      <CardContent>
        <h3 className="orders">Order History</h3>
      </CardContent>
      <List>
        <h1>ID:</h1>
        <h1>Customer ID:</h1>
        <h1>Product ID:</h1>
        <h1>Ordered at:</h1>
        <h1>Price:</h1>
        {isLoading ? (
          <h1>Loading Orders...</h1>
        ) : (
          orders.map((i) => (
            <ListItem key={i.key}>
              <ListItemText primary={i.id} className="orderId" />
              <ListItemText primary={i.customer_id} className="customerId" />
              <ListItemText primary={i.product_id} className="productId" />
              <ListItemText primary={i.ordered_at} className="date" />
              <ListItemText
                primary={i.quantity === 0 ? i.quantity + 1 : i.quantity}
                className="quantity"
              />
              <ListItemText
                primary={
                  i.price === 0.0 ? "Trouble fetching price..." : `$${i.price}`
                }
                className="quantity"
              />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
}
export default ScrollList;
