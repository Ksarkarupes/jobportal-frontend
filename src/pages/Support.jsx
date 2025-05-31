import { useState } from "react";
import { toast } from "react-toastify";

export default function Support() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(
        "https://proactive-caring-production.up.railway.app/support",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit support message.");
      }

      toast.success(
        "Your query has been recorder. We will get back to you soon. Thank-you for your patience!"
      );
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Need Help? We’re Here for You
        </h2>

        {/* FAQ Section */}
        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">FAQs</h3>
          <ul className="space-y-4">
            <li>
              <p className="font-medium text-gray-800">
                🔸 How do I apply for a job?
              </p>
              <p className="text-gray-600 ml-4">
                Go to the job listings, click "Apply", and confirm your
                application.
              </p>
            </li>
            <li>
              <p className="font-medium text-gray-800">
                🔸 I can’t log in to my account. What should I do?
              </p>
              <p className="text-gray-600 ml-4">
                Make sure your credentials are correct. If the issue persists,
                use the contact form below.
              </p>
            </li>
            <li>
              <p className="font-medium text-gray-800">
                🔸 Can I update a job post after publishing?
              </p>
              <p className="text-gray-600 ml-4">
                Yes, employers can edit or delete their own job posts anytime
                from the dashboard.
              </p>
            </li>
          </ul>
        </section>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              required
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              required
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
              placeholder="Describe your issue or question"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl shadow-md hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
