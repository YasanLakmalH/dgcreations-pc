export default function Page() {
    return (
        <div className="h-screen mt-10 flex justify-center items-center overflow-hidden relative">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 bg-grid-white/[0.05] animate-[pulse_4s_ease-in-out_infinite]" />
            
            {/* Floating Elements */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-purple-500/10 rounded-full animate-float"
                        style={{
                            width: `${Math.random() * 100 + 50}px`,
                            height: `${Math.random() * 100 + 50}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${Math.random() * 10 + 5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Content Section */}
            <div className="relative z-10 p-4 sm:p-8 text-center w-full py-16 sm:py-24 md:py-32">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-black">
                    Transform Your Space with Personalized Designs!
                </h1>
                <p className="text-black mb-6 text-base sm:text-lg">
                    Explore endless design possibilities and craft a pantry that&apos;s uniquely yours—let&apos;s get started!
                </p>
                <a href="design/steps/measurements">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-md text-base sm:text-lg">
                        Customize
                    </button>
                </a>
            </div>
        </div>
    );
}
