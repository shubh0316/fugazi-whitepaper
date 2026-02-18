"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PrivacyPolicyPage() {
  const router = useRouter();
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);

  const handleContinue = () => {
    router.push("/login");
  };

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
            Fugazi collects mobile phone numbers solely to control access to the Fugazi whitepaper and to perform account authentication and security verification. Phone numbers are used only to deliver one-time verification codes to users whose numbers have been approved in advance.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Access to the Fugazi whitepaper is limited to an approved list of mobile phone numbers maintained by Fugazi. Only approved numbers are permitted to receive verification codes. Submission of a mobile phone number alone does not guarantee access.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            By requesting a verification code, approved users consent to receive transactional SMS messages strictly for identity verification and access control purposes.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Fugazi does not send marketing or promotional SMS messages and does not sell, rent, or share phone numbers with third parties for marketing purposes.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Users may opt out of SMS messages at any time by replying STOP.
          </p>

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
            Email: <a href="mailto:support@fugazi.fun" className="text-[#30C67B] hover:underline">support@fugazi.fun</a>
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
            Requests may be submitted by contacting us at <a href="mailto:support@fugazi.fun" className="text-[#30C67B] hover:underline">support@fugazi.fun</a>. We may verify your identity before processing requests.
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
            Requests may be submitted to <a href="mailto:support@fugazi.fun" className="text-[#30C67B] hover:underline">support@fugazi.fun</a>.
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
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-8">
            California residents may still exercise their other privacy rights, including the right to access or delete personal information, by contacting us at <a href="mailto:support@fugazi.fun" className="text-[#30C67B] hover:underline">support@fugazi.fun</a>
          </p>

          <h1 className="text-3xl font-bold text-gray-950 dark:text-white mt-12 mb-2">
            Fugazi SMS Terms & Conditions
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
            Last Updated: February 16, 2026
          </p>

          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            These SMS Terms & Conditions ("SMS Terms") govern the delivery of text messages sent by Fugazi Labs, LLC ("Fugazi," "we," "us") in connection with account authentication and security services.
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            Program Description
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Fugazi sends SMS messages solely to deliver one-time verification codes used to control access to the Fugazi whitepaper. Messages are strictly transactional and non-marketing.
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            Opt-In
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Access to SMS verification is limited to mobile phone numbers approved in advance by Fugazi. Approved users receive SMS messages only after requesting a one-time verification code. By requesting a verification code, approved users consent to receive transactional SMS messages for identity verification and access control purposes.
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            Message Frequency
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Message frequency varies and is limited to verification attempts initiated by the user. No recurring or promotional messages are sent.
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            Costs
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Message and data rates may apply depending on your mobile carrier and plan. Fugazi does not charge for SMS messages but is not responsible for carrier fees.
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            Opt-Out
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            You may opt out of receiving SMS messages at any time by replying STOP to any message. After opting out, you will no longer receive SMS authentication messages.
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            Help
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            For help, reply HELP to any message or contact us at <a href="mailto:support@fugazi.fun" className="text-[#30C67B] hover:underline">support@fugazi.fun</a>.
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            Supported Carriers
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            SMS delivery is subject to carrier availability. Fugazi is not responsible for delayed or undelivered messages.
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            Privacy
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Your use of SMS services is subject to our Privacy Policy, available at:
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            <a href="https://whitepaper.fugazi.fun/privacy" className="text-[#30C67B] hover:underline">https://whitepaper.fugazi.fun/privacy</a>
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            Contact Information
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            Fugazi Labs, LLC
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Email: <a href="mailto:support@fugazi.fun" className="text-[#30C67B] hover:underline">support@fugazi.fun</a>
          </p>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedPrivacyPolicy}
              onChange={(e) => setAcceptedPrivacyPolicy(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-[#30C67B] focus:ring-[#30C67B] focus:ring-2"
            />
            <span className="text-xs text-gray-700 dark:text-gray-300">
              I accept the privacy policy
            </span>
          </label>
          {acceptedPrivacyPolicy && (
            <Button
              onClick={handleContinue}
              className="mt-6 w-full hover:text-black"
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
