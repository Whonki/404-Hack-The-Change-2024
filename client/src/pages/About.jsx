// About Page
const About = () => (
    <div className="max-w-6xl mx-auto p-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2024, we've been committed to delivering excellence in everything we do.
              Our journey began with a simple idea: to make a difference in our industry.
            </p>
            <p className="text-gray-600">
              Today, we're proud to serve customers worldwide, maintaining the same dedication
              to quality and innovation that inspired us from the beginning.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              We strive to provide exceptional value to our customers through innovative
              solutions and unparalleled service.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Core Values</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Excellence in everything we do</li>
                <li>Customer satisfaction first</li>
                <li>Innovation and creativity</li>
                <li>Integrity and transparency</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  export default About