import React, { useState } from 'react';
import Header from '../../components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import './landing.css';
import Card from '../../components/cards';
import { testimonials } from '../../components/TestimonialsData';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: {
      duration: 0.5,
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const imageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5 } }
};

const slideVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: -100, transition: { duration: 0.5 } }
};

function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="landing--page">
      
      <main className="main-content">
        <motion.section 
          className="hero--section mt-20"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <motion.img 
            src='images/hero-image.jpg' 
            alt="blue flower" 
            className="hero--image"
            variants={imageVariants}
          />
          <motion.p className="hero--text" variants={itemVariants}>
            A sound mind is a peaceful mind
          </motion.p>
        </motion.section>

        <motion.p 
          className="service--title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1 } }}
        >
          Services offered
        </motion.p>

        <motion.section 
          className="cards--section"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card 
              imgUrl='images/service-image-teens.jpg' 
              altText="Smiling teen" 
              imgTitle="Teens"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card 
              imgUrl='images/service-image-couples.jpg' 
              altText="Couple holding hands" 
              imgTitle="Couples"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card 
              imgUrl='images/service-image-individual.jpg' 
              altText="A person standing"
              imgTitle="Individuals"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card 
              imgUrl='images/service-image-medication.png' 
              altText="A girl appearing to take medication"
              imgTitle="Medication"
            />
          </motion.div>
        </motion.section>

        <motion.section 
          className="testimonials--section"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 variants={itemVariants}>What Our Users Say</motion.h2>
          <motion.div className="testimonials--container flex items-center justify-center" variants={containerVariants}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={testimonials[currentIndex].id}
                className="testimonial--card"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <p className="testimonial--text">"{testimonials[currentIndex].text}"</p>
                <p className="testimonial--author">- {testimonials[currentIndex].author}</p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <div className="testimonial-button flex items-center justify-center">
            <button onClick={prevTestimonial} className='mr-8'>Previous</button>
            <button onClick={nextTestimonial} className='ml-8'>Next</button>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default LandingPage;
