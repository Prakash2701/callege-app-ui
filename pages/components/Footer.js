import React from 'react';
import { Container, Button } from 'react-bootstrap';

const Footer = () => {
  return (
    
      <footer className="text-center text-white mt-5 fixed-bottom" style={{ backgroundColor: '#f1f1f1' }}>
        {/* Grid container */}
        <Container className="pt-1">
          {/* Section: Social media */}
          <section className="mb-1">
            {/* Facebook */}
            <Button
              variant="link"
              size="lg"
              className="text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="bi bi-facebook"></i>
            </Button>

            {/* Twitter */}
            <Button
              variant="link"
              size="lg"
              className="text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="bi bi-twitter"></i>
            </Button>

            {/* Google */}
            <Button
              variant="link"
              size="lg"
              className="text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="bi bi-google"></i>
            </Button>

            {/* Instagram */}
            <Button
              variant="link"
              size="lg"
              className="text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="bi bi-instagram"></i>
            </Button>

            {/* Linkedin */}
            <Button
              variant="link"
              size="lg"
              className="text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="bi bi-linkedin"></i>
            </Button>

            {/* Github */}
            <Button
              variant="link"
              size="lg"
              className="text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="bi bi-github"></i>
            </Button>
          </section>
          {/* Section: Social media */}
        </Container>
        
      </footer>
    
  );
};

export default Footer;
