import Image from "next/image";
import logo from "@/assets/logo.png";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl">
        <div className="flex justify-center mb-10">
          <Image src={logo} alt="logo" width={100} height={100} />
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <h1 className="text-3xl font-bold text-gray-950 dark:text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
            Last Updated: February 16, 2026
          </p>

          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Fugazi Labs, LLC ("Fugazi," "we," "us," or "our") values your privacy. This Privacy Policy explains how we collect, use, and protect personal information when you access or use the Fugazi platform, including our website, applications, and related services (collectively, the "Services").
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            1. Information We Collect
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            We collect only the information necessary to operate and secure the Services:
          </p>
          <h3 className="text-lg font-medium text-gray-950 dark:text-white mt-6 mb-3">
            a. Information You Provide
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 mb-4 space-y-2 ml-4">
            <li>Mobile phone number (for account authentication and security)</li>
            <li>Email address (if provided)</li>
            <li>Account credentials and profile information</li>
          </ul>
          <h3 className="text-lg font-medium text-gray-950 dark:text-white mt-6 mb-3">
            b. Automatically Collected Information
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 mb-6 ml-4">
            <li>Device and browser information</li>
            <li>IP address</li>
            <li>Log and usage data related to platform access</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            2. How We Use Information
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Fugazi uses personal information solely for operational and security purposes, including to:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 mb-6 ml-4 space-y-2">
            <li>Verify user identity via one-time passcodes (OTP)</li>
            <li>Deliver account authentication and security notifications</li>
            <li>Prevent fraud and unauthorized access</li>
            <li>Maintain platform integrity and reliability</li>
            <li>Comply with legal and regulatory obligations</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            3. SMS & Phone Number Usage
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Fugazi collects mobile phone numbers only for account authentication, security verification, and transactional notifications.
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 mb-4 ml-4 space-y-2">
            <li>Phone numbers are used to deliver one-time passcodes and account-related alerts</li>
            <li>Fugazi does not send marketing or promotional SMS messages</li>
            <li>Fugazi does not sell, rent, or share phone numbers with third parties for marketing purposes</li>
            <li>Users may opt out of SMS messages at any time by replying STOP</li>
            <li>Help is available by replying HELP or contacting support</li>
            <li>Standard message and data rates may apply.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            4. Information Sharing
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Fugazi does not sell or share personal information for advertising or marketing.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            We may share limited information only with:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 mb-6 ml-4 space-y-2">
            <li>Service providers that support authentication, infrastructure, or security (under strict confidentiality obligations)</li>
            <li>Legal or regulatory authorities if required by law</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            5. Data Security
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            We implement reasonable administrative, technical, and organizational safeguards to protect personal information against unauthorized access, disclosure, alteration, or destruction.
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            6. Data Retention
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Personal information is retained only for as long as necessary to:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 mb-6 ml-4 space-y-2">
            <li>Provide the Services</li>
            <li>Meet security requirements</li>
            <li>Comply with applicable laws</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            7. Your Rights
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Depending on your location, you may have rights to:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 mb-4 ml-4 space-y-2">
            <li>Access, correct, or delete your personal information</li>
            <li>Withdraw consent where applicable</li>
            <li>Request information about how your data is used</li>
          </ul>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Requests can be made by contacting us at the email below.
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            8. Changes to This Policy
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised "Last Updated" date.
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            9. Contact Us
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            If you have questions about this Privacy Policy or our data practices, contact:
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Fugazi Labs, LLC
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Email: <a href="mailto:support@fugazi.fun" className="text-[#52D593] hover:underline">support@fugazi.fun</a>
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            10. California & European Privacy Rights
          </h2>
          <h3 className="text-lg font-medium text-gray-950 dark:text-white mt-6 mb-3">
            a. California Privacy Rights (CCPA/CPRA)
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            If you are a California resident, you have the right to:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 mb-4 ml-4 space-y-2">
            <li>Request disclosure of the personal information Fugazi collects, uses, or discloses</li>
            <li>Request deletion of your personal information, subject to legal and operational requirements</li>
            <li>Opt out of the sale or sharing of personal information (note: Fugazi does not sell personal information)</li>
          </ul>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Fugazi does not sell or share personal information for cross-context behavioral advertising.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Requests may be submitted by contacting us at <a href="mailto:support@fugazi.fun" className="text-[#52D593] hover:underline">support@fugazi.fun</a>. We may verify your identity before processing requests.
          </p>

          <h3 className="text-lg font-medium text-gray-950 dark:text-white mt-6 mb-3">
            b. European Privacy Rights (GDPR)
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have the right to:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 mb-4 ml-4 space-y-2">
            <li>Access your personal data</li>
            <li>Request correction or deletion of your personal data</li>
            <li>Object to or restrict certain processing activities</li>
            <li>Withdraw consent where processing is based on consent</li>
            <li>Request data portability, where applicable</li>
          </ul>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Fugazi processes personal data only where a lawful basis exists, including user consent, contractual necessity, or compliance with legal obligations.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-8">
            Requests may be submitted to <a href="mailto:support@fugazi.fun" className="text-[#52D593] hover:underline">support@fugazi.fun</a>.
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            Do Not Sell or Share My Personal Information
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Fugazi does not sell or share personal information, including for cross-context behavioral advertising, as those terms are defined under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA).
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            As a result, Fugazi does not offer an opt-out mechanism for the sale or sharing of personal information, because no such activity occurs.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            California residents may still exercise their other privacy rights, including the right to access or delete personal information, by contacting us at <a href="mailto:support@fugazi.fun" className="text-[#52D593] hover:underline">support@fugazi.fun</a>
          </p>
        </div>
      </div>
    </div>
  );
}
