export default function About() {
  return (
    <div className="bg-white min-h-[80vh] py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            About Monoblog
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            We are on a mission to create a calm, beautiful space for reading and writing on the modern web.
          </p>
        </div>

        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-gray-900 hover:prose-a:text-gray-600 prose-img:rounded-3xl">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000" 
            alt="Team working together" 
            className="w-full aspect-video object-cover shadow-xl shadow-gray-200/50 mb-12"
          />
          
          <div className="grid md:grid-cols-2 gap-12 items-start mt-12 text-gray-800 leading-relaxed font-serif text-lg">
            <div>
              <h2 className="text-3xl font-sans mt-0 font-bold mb-4">Our Story</h2>
              <p className="mb-4">
                Founded in 2026, Monoblog started as a simple idea: what if a publishing platform prioritized typography, whitespace, and human-centric design over endless feeds and intrusive advertisements?
              </p>
              <p>
                We believed that writers deserve a pristine canvas to share their ideas, and readers deserve a respectful, distraction-free environment to consume them. That's why we built this platform from the ground up to be beautifully minimal and incredibly fast.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-sans mt-0 font-bold mb-6">Our Values</h2>
              <ul className="space-y-6 list-none pl-0">
                <li className="flex gap-4">
                  <span className="font-bold text-gray-900 mt-1">01.</span>
                  <div>
                    <strong className="block font-sans text-gray-900 mb-1 text-xl">Clarity over Clutter</strong>
                    <span className="text-gray-600">We say no to popups, chaotic sidebars, and confusing navigation. Less is definitely more.</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-gray-900 mt-1">02.</span>
                  <div>
                    <strong className="block font-sans text-gray-900 mb-1 text-xl">Empower Creators</strong>
                    <span className="text-gray-600">We give writers the best tools to format their text beautifully without needing to be designers.</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-gray-900 mt-1">03.</span>
                  <div>
                    <strong className="block font-sans text-gray-900 mb-1 text-xl">Built to Last</strong>
                    <span className="text-gray-600">Using modern technologies and sustainable practices to ensure our platform stands the test of time.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
