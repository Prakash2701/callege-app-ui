import Header from './header';
import Container from 'react-bootstrap/Container';
export default function Layout({ children }) {
  return( <div>
    
    <Header/>
    <main><div style={{marginTop:"5rem",marginBottom:"10rem"}}>{children}</div></main>
   
    </div>

    );
}