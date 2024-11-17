import { Link } from "lucide-react";

export default function Page() {
    return (
        <div className="h-screen w-full mt-10 flex justify-center items-center">
            <div className="bg-gray-50 p-8 text-center w-full py-72">
                <h1 className="text-4xl font-bold mb-4">Think, plan, and track all in one place</h1>
                <p className="text-gray-600 mb-6">Efficiently manage your tasks and boost productivity.</p>
                <a href="design/steps/measurements"><button className="bg-blue-600 text-white px-6 py-3 rounded-md">Customize</button></a>
                <div className="flex justify-center mt-8 space-x-6">
                    <div className="p-4 bg-white shadow-md rounded-md">Reminders</div>
                    <div className="p-4 bg-white shadow-md rounded-md">100+ Integrations</div>
                </div>
            </div>
        </div>

    );
};

