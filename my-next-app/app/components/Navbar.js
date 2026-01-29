// components/Navbar.js
import Link from "next/link";
const Navbar = () => {
 return (
   <nav style={{ padding: "10px", backgroundColor: "#333", color: "#fff" }}>
     <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}>
       <li style={{ marginRight: "15px" }}>
         <Link href="/home" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
       </li>
       <li style={{ marginRight: "15px" }}>
         <Link href="/about" style={{ color: "#fff", textDecoration: "none" }}>About</Link>
       </li>
       <li>
         <Link href="/contact" style={{ color: "#fff", textDecoration: "none" }}>Contact</Link>
       </li>
     </ul>
   </nav>
 );
};
export default Navbar;