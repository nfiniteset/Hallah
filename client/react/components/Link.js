import { Link } from "react-router-dom";

export default function({ children, ...otherProps}) {
  return <Link style={{ textDecoration: "none" }} {...otherProps}>{children}</Link>
}