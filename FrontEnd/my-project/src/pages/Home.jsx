import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>



<main class="p-6 max-w-7xl mx-auto">
    <section class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">Key Features</h2>
        <ul class="space-y-4">
            <li class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-xl font-bold">Efficient Tracking</h3>
                <p class="mt-2">Monitor all your arrears in one place. Our system provides a comprehensive view of outstanding payments, ensuring nothing falls through the cracks.</p>
            </li>
            <li class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-xl font-bold">Automated Notifications</h3>
                <p class="mt-2">Receive timely reminders for upcoming and overdue payments. Stay informed and avoid late fees with automated notifications sent directly to your inbox or mobile device.</p>
            </li>
            <li class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-xl font-bold">Detailed Reports</h3>
                <p class="mt-2">Generate detailed reports to gain insights into your financial status. Our reporting tools help you understand trends and make informed decisions.</p>
            </li>
            <li class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-xl font-bold">User-Friendly Interface</h3>
                <p class="mt-2">Navigate our intuitive interface with ease. Whether you are a financial expert or a beginner, our platform is designed for users of all levels.</p>
            </li>
            <li class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-xl font-bold">Secure and Reliable</h3>
                <p class="mt-2">Rest assured that your data is secure with us. Our system uses the latest security protocols to protect your information and ensure reliable access whenever you need it.</p>
            </li>
        </ul>
    </section>

    <section class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">How It Works</h2>
        <ol class="list-decimal list-inside bg-white p-4 rounded-lg shadow-md space-y-2">
            <li><strong>Register and Set Up Your Account</strong>: Sign up with your email and set up your account in just a few steps.</li>
            <li><strong>Add Your Arrears</strong>: Enter details of outstanding payments, including due dates and amounts.</li>
            <li><strong>Track and Manage</strong>: Monitor your arrears, receive notifications, and generate reports to stay on top of your finances.</li>
            <li><strong>Stay Informed</strong>: Use our tools to keep track of your financial health and make timely payments.</li>
        </ol>
    </section>

    <section class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">Why Choose Us?</h2>
        <ul class="space-y-4">
            <li class="bg-white p-4 rounded-lg shadow-md">
                <p><strong>Comprehensive Solution</strong>: From tracking to reporting, we cover all aspects of arrear management.</p>
            </li>
            <li class="bg-white p-4 rounded-lg shadow-md">
                <p><strong>Customer Support</strong>: Our dedicated support team is here to help you with any questions or issues.</p>
            </li>
            <li class="bg-white p-4 rounded-lg shadow-md">
                <p><strong>Scalable for Any Size</strong>: Whether you are an individual or a large organization, our system adapts to your needs.</p>
            </li>
        </ul>
    </section>

    <section class="mt-8 text-center">
        <h2 class="text-2xl font-semibold mb-4">Get Started Today</h2>
        <p class="mb-4">Join the many satisfied users who have taken control of their finances with our Arrear Management System. Sign up now and experience the difference!</p>
        {/* <a href="/signup" class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Sign Up Now</a> */}
   <Link to={`/signup`} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Sign Up Now</Link>
    </section>
</main>

    </div>
  )
}

export default Home