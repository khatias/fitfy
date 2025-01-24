import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Privacy Policy
      </h1>

      <p className="text-gray-600 mb-4">Last updated: [Insert Date]</p>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6">
        1. Introduction
      </h2>
      <p className="text-gray-600 mb-4">
        Welcome to FITIFY. Your privacy is important to us. This
        Privacy Policy outlines how we collect, use, and protect your
        information when you use our website.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6">
        2. Information We Collect
      </h2>
      <p className="text-gray-600 mb-4">
        We may collect the following types of information:
      </p>
      <ul className="list-disc pl-5 text-gray-600 mb-4">
        <li>
          <strong className="font-semibold">Personal Information:</strong> Such
          as your name, email address, and contact details.
        </li>
        <li>
          <strong className="font-semibold">Non-Personal Information:</strong>{" "}
          Such as browser type, device information, and usage statistics.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6">
        3. How We Use Your Information
      </h2>
      <p className="text-gray-600 mb-4">
        We use the information we collect for purposes such as:
      </p>
      <ul className="list-disc pl-5 text-gray-600 mb-4">
        <li>Providing and maintaining our services.</li>
        <li>Improving user experience.</li>
        <li>Sending updates, offers, and promotional materials.</li>
        <li>Ensuring security and compliance with applicable laws.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6">
        4. Sharing Your Information
      </h2>
      <p className="text-gray-600 mb-4">
        We do not sell or rent your personal information. We may share your
        information with:
      </p>
      <ul className="list-disc pl-5 text-gray-600 mb-4">
        <li>Service providers that help us operate our website.</li>
        <li>Legal authorities, if required by law.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6">
        5. Your Rights
      </h2>
      <p className="text-gray-600 mb-4">You have the right to:</p>
      <ul className="list-disc pl-5 text-gray-600 mb-4">
        <li>Access, update, or delete your personal information.</li>
        <li>Opt-out of marketing communications.</li>
        <li>Request data portability.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6">6. Cookies</h2>
      <p className="text-gray-600 mb-4">
        We use cookies to enhance your browsing experience. You can manage your
        cookie preferences in your browser settings.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6">7. Security</h2>
      <p className="text-gray-600 mb-4">
        We take reasonable measures to protect your information from
        unauthorized access and misuse. However, no method of transmission over
        the internet is completely secure.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6">
        8. Changes to This Policy
      </h2>
      <p className="text-gray-600 mb-4">
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with an updated &quot;Last updated&quot; date.
      </p>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6">
        9. Contact Us
      </h2>
      <p className="text-gray-600 mb-4">
        If you have any questions about this Privacy Policy, please contact us
        at [Insert Contact Email].
      </p>
    </div>
  );
};

export default PrivacyPolicy;
