import Services from "./components/services";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      {/* Hero Section - Placeholder */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Seriaflow
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            AI Automation Agency untuk Bisnis Modern
          </p>
        </div>
      </section>

      {/* Services Section */}
      <Services />

      {/* Footer Placeholder */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2025 Seriaflow. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
