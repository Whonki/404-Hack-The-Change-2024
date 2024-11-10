// About.jsx
import './About.css';

const About = () => (
  <div className="container">
    <section className="section">
      <h1 className="title">About Us</h1>
      <div className="grid-container">
        <p>
          We are a group of developers aiming at removing the limits of lawyers being horrendously expensive, far, and unable to empathize with their clients, or unable to communicate clearly enough due to a language barrier.
        </p>
        <div>
          <h2 className="subtitle">Our Story</h2>
          <p className="text-gray text-block">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="text-gray">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div>
          <h2 className="subtitle">Our Mission</h2>
          <p className="text-gray text-block">
            We aim at making everything legal more easily accessible to everyone, and more safer for all.
          </p>
          <div className="core-values">
            <h3 className="font-semibold mb-2">Core Values</h3>
            <ul className="list-style">
              <li>Total privacy between lawyer and client</li>
              <li>Friendly and easily accessible clients</li>
              <li>Similar backgrounds as the client (IT'S YOU!)</li>
              <li>Integrity and transparency</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default About;
