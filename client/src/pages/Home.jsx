// Home Page
const Home = () => (
    <div className="max-w-6xl mx-auto p-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our Website</h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover amazing products and services that will transform your experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Feature One</h3>
            <p className="text-gray-600">
              Explore our innovative solutions designed for you.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Feature Two</h3>
            <p className="text-gray-600">
              Experience world-class service and support.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Feature Three</h3>
            <p className="text-gray-600">
              Join thousands of satisfied customers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );

  export default Home;