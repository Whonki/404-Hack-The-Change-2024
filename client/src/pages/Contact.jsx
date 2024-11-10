// Contact.jsx
import './Contact.css';

const Contact = () => (
  <div className="container">
    <section className="section">
      <h1 className="title">Contact Us</h1>
      <div className="grid-container">
        <div>
          <h2 className="subtitle">Get in Touch</h2>
          <p className="text-gray">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="subtitle">Address</h3>
              <p className="text-gray">123 Business Street</p>
              <p className="text-gray">City, State 12345</p>
            </div>
            <div>
              <h3 className="subtitle">Email</h3>
              <p className="text-gray">contact@example.com</p>
            </div>
            <div>
              <h3 className="subtitle">Phone</h3>
              <p className="text-gray">(123) 456-7890</p>
            </div>
          </div>
        </div>
        <div>
          <form className="space-y-4">
            <div>
              <label className="label">Name</label>
              <input type="text" className="input" placeholder="Your name" />
            </div>
            <div>
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="your@email.com" />
            </div>
            <div>
              <label className="label">Message</label>
              <textarea className="textarea" rows="4" placeholder="Your message"></textarea>
            </div>
            <button type="submit" className="button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
);

export default Contact;
