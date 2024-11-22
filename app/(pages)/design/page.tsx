
export default function Page() {
    return (
        <div className="h-screen mt-10 flex justify-center items-center overflow-hidden">
            {/* Animated Background Pattern */}
            <div className=" inset-0 bg-grid-white/[0.05] animate-[pulse_4s_ease-in-out_infinite]" />
            {/* Floating Elements */}
            <div>
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
            <div className="p-8 text-center w-full py-72 z-10">
                <h1 className="text-4xl font-bold mb-4 text-black">Transform Your Space with Personalized Designs!</h1>
                <p className="text-black mb-6"> Explore endless design possibilities and craft a pantry that&apos;s uniquely yours—let&apos;s get started!
                    .</p>
                <a href="design/steps/measurements"><button className="bg-blue-600 text-white px-6 py-3 rounded-md">Customize</button></a>
            </div>
        </div>

    );
};

