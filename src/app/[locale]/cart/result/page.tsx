import { Link } from "@/i18n/routing";
const CartResult = () => {
  return (
    <div className="container">
      <h1>Thank you for your purchase!</h1>
      <p>Your order is confirmed. </p>

      <Link href="/">Go to home</Link>
    </div>
  );
};

export default CartResult;
