import React from 'react';
import './About.css';
import { motion } from 'framer-motion';

function About() {
  return (
    <motion.div
      className='about-container font-poppins'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className='hero-img'
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <img
          src="https://blog.darwinbox.com/hubfs/MicrosoftTeams-image%20%282%29-1.png"
          alt="ZOE Afya"
          className='float-image rounded-md ml-2'
        />
      </motion.div>
      <motion.div
        className='about-content'
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <h1 className='text-3xl font-bold text-center'>Welcome To ZOE AFYA</h1>
        <p className='text-2xl mt-2'>
          -At ZOE Afya, we believe in the power of a healthy mind. Our mission is to provide a safe and supportive space for individuals seeking to enhance their mental well-being. Whether you’re dealing with anxiety, depression, stress, or simply looking to maintain a positive mental state, we're here to help.
        </p>
      </motion.div>

      <motion.div
        className='m-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h2 className='text-3xl font-bold'>Our Story</h2>
        <p className='text-xl mt-2'>
          ZOE Afya was founded by Team 2 with a simple yet profound goal: to make mental health resources accessible to everyone. Inspired by personal experiences and the stories of countless others, we set out to create a platform that offers practical tools, expert advice, and a sense of community.
        </p>
        <div>
          <h3 className='text-2xl font-bold mt-4'>What we offer:</h3>
          <ul className='text-xl mt-2 list-disc list-inside'>
            <li><strong>Professional Help: </strong>Online therapy sessions with licensed professionals</li>
            <li>Self-help resources and tools</li>
            <li><strong>Expert Articles & Resources: </strong> Dive into our extensive library of articles, guides, and resources created by mental health professionals.</li>
          </ul>
        </div>
        <div>
          <h3 className='text-2xl font-bold mt-4'>Our Approach:</h3>
          <p className='text-xl'>- At ZOE Afya, we embrace a holistic approach to mental health. We understand that well-being is multifaceted, involving emotional, physical, and social dimensions. Our content and resources reflect this understanding, offering a comprehensive range of topics from mindfulness and meditation to physical fitness and nutrition.</p>
        </div>
        <div>
          <h3 className='text-2xl font-bold mt-4'>Join Us</h3>
          <p className='text-xl'>- We invite you to explore ZOE Afya and become a part of our community. Sign up for our <a href="register" className='hover opacity-80'>newsletter</a>, follow us on social media, and stay updated with the latest in mental health. Together, we can build a world where mental health is prioritized, understood, and nurtured.</p>
        </div>
        <div>
          <h3 className='text-2xl font-bold mt-4'>Reach Out To Us</h3>
          <p className='text-xl '>If you have any questions or if you feel overwhelmed and that nobody can understand what you are going through you can reach out to us <address className='inline'>email: zoeafya@gmail.com</address> or fill in this form <a href="contact-info" className='opacity-85'>Contact Us</a> and someone will reach out to you. Remember you are not alone and its not over yet.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default About;
