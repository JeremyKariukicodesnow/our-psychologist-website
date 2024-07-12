import React from 'react'
import Header from '../../components/Header';
import "./landing.css"
import Card from '../../components/cards';
import { testimonials } from '../../components/TestimonialsData';

function LandingPage() {
  return (
    
    <div className="landing--page">
      <Header />
      <main className="main-content">
        <section className="hero--section">
           <img src='../../assets/images/hero-image.jpg' alt="blue flower" className="hero--image" />
           <p className="hero--text">A sound mind is a peaceful mind</p>
        </section>

    <p className="service--title">Services offered</p>

    <section className="cards--section">
      <Card 
      imgUrl='../../assets/images/service-image-teens.jpg' altText="Smiling teen" 
      imgTitle="Teens"
      />
      <Card 
      imgUrl='../../assets/images/service-image-couples.jpg' altText="Couple holding hands" 
      imgTitle="Couples"
      />
      <Card 
      imgUrl='../../assets/images/service-image-individual.jpg' altText="A person standing"
      imgTitle="Individuals"
      />
      <Card 
      imgUrl='../../assets/images/service-image-medication.png' altText="A girl appearing to take medication"
      imgTitle="Medication"
      />
    </section>

    <section className="testimonials--section">
                    <h2>What Our Users Say</h2>
                    <div className="testimonials--container">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="testimonial--card">
                                <p className="testimonial--text">"{testimonial.text}"</p>
                                <p className="testimonial--author">- {testimonial.author}</p>
                            </div>
                        ))}
                        </div>
      </section>
  
      </main>
      </div>
  )
}

export default LandingPage;