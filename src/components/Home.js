import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import './Home.css';

function Home  ()  {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <div className="home-container">
      <motion.div className="progress-bar" style={{ scaleX }} />
      
      <section className="hero-section">
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="main-title"
          >
            <span className="title-main">Find Your Place</span>
            <span className="title-accent">Where dreams meet doors.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hero-subtitle"
          >
            Exclusive Properties, Just for you !
          </motion.p>
          {/* <div className="search-container">
            <div className="search-group">
              <input type="text" placeholder="Enter location..." />
              <select>
                <option>Property Type</option>
                <option>Luxury Villa</option>
                <option>Penthouse</option>
                <option>Estate</option>
                <option>Mansion</option>
              </select>
              <button className="search-btn">Discover Now</button>
            </div>
          </div> */}
        </div>
      </section>

      <section className="stats-section" ref={ref}>
        <div className="stats-container">
          {[
            { value: 2500, label: "Exclusive Properties", suffix: "+" },
            { value: 1800, label: "Satisfied Clients", suffix: "+" },
            { value: 150, label: "Expert Agents", suffix: "" },
            { value: 98, label: "Client Satisfaction", suffix: "%" }
          ].map((stat, index) => (
            <motion.div 
              className="stat-box"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              {inView && (
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  separator=","
                  suffix={stat.suffix}
                  className="stat-number"
                />
              )}
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="featured-grid">
        <div className="section-header">
          <h2 className="section-title">Curated Collection</h2>
          <p className="section-subtitle">Handpicked Properties</p>
        </div>
        <div className="bento-grid">
          <motion.div 
            className="bento-item large"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811" alt="Luxury Villa" />
            <div className="bento-content">
              <p>Beverly Hills</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="bento-item"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750" alt="Modern House" />
            <div className="bento-content">
              <p>Manhattan</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="bento-item tall"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9" alt="Penthouse" />
            <div className="bento-content">
              <p>Downtown LA</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* <section className="lifestyle-section">
        <div className="section-header">
          <h2 className="section-title">Luxury Amenities</h2>
          <p className="section-subtitle">Experience Unparalleled Comfort</p>
        </div>
        <div className="amenities-grid">
          {[
            { icon: "🏊‍♂️", title: "Infinity Pool", desc: "Panoramic Views" },
            { icon: "🏋️‍♂️", title: "Private Gym", desc: "State-of-the-art Equipment" },
            { icon: "🎾", title: "Sports Court", desc: "Professional Grade" },
            { icon: "🚘", title: "Valet Parking", desc: "24/7 Service" },
            { icon: "🛡️", title: "Smart Security", desc: "Advanced Systems" },
            { icon: "🌺", title: "Landscaped Gardens", desc: "Serene Environment" }
          ].map((item, index) => (
            <motion.div 
              className="amenity-card"
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="amenity-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-header">
          <h2 className="section-title">Client Stories</h2>
          <p className="section-subtitle">Experiences of Luxury</p>
        </div>
        <div className="testimonials-grid">
          {[
            {
              text: "The attention to detail and luxury amenities exceeded our expectations. A truly remarkable property.",
              author: "Alexandra Thompson",
              position: "CEO, Global Ventures",
              image: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
            },
            {
              text: "Found our dream estate through their exceptional service. The team's expertise is unmatched.",
              author: "Michael Chen",
              position: "Tech Entrepreneur",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            },
            {
              text: "Their portfolio of luxury properties is simply outstanding. A seamless experience from start to finish.",
              author: "Isabella Martinez",
              position: "Interior Designer",
              image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="testimonial-content">
                <span className="quote-mark">"</span>
                <p>{testimonial.text}</p>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.author} />
                  <div>
                    <h4>{testimonial.author}</h4>
                    <p>{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="locations-section"> */}
        {/* <div className="section-header">
          <h2 className="section-title">Prime Locations</h2>
          <p className="section-subtitle">Discover Luxury Properties Worldwide</p>
        </div>
        <div className="locations-grid">
          {[
            { city: "Beverly Hills", properties: "45", image: "https://images.unsplash.com/photo-1532408840957-031d8034aeef" },
            { city: "Manhattan", properties: "38", image: "https://images.unsplash.com/photo-1522083165195-3424ed129620" },
            { city: "Miami", properties: "29", image: "https://images.unsplash.com/photo-1535498730771-e735b998cd64" },
            { city: "London", properties: "42", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad" }
          ].map((location, index) => (
            <motion.div
              key={index}
              className="location-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
            >
              <img src={location.image} alt={location.city} />
              <div className="location-info">
                <h3>{location.city}</h3>
                <p>{location.properties} Luxury Properties</p>
              </div>
            </motion.div>
          ))}
        </div> */}
      {/* </section> */}

      <section className="cta-section">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Experience Unparalleled Experience</h2>
          {/* <p>Schedule a private consultation with our luxury real estate experts</p>
          <div className="cta-buttons">
            <button className="cta-button primary">Schedule Viewing</button>
            <button className="cta-button secondary">Learn More</button>
          </div> */}
        </motion.div>
      </section>

      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-brand">
            {/* <h3>LuxuryHaven</h3> */}
            <p>Where Extraordinary Living Begins</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
 
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#about">About Us</a>
              <a href="#team">Our Team</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;