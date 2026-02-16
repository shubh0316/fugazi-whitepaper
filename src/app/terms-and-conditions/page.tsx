import Image from "next/image";
import logo from "@/assets/logo.png";

export default function TermsAndConditionsPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl">
        <div className="flex justify-center mb-10">
          <Image src={logo} alt="logo" width={100} height={100} />
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <h1 className="text-3xl font-bold text-gray-950 dark:text-white mb-2">
            Fugazi SMS Terms & Conditions
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
            Last Updated: February 16, 2026
          </p>

          <p className="text-sm text-gray-700 dark:text-gray-300 mb-8">
            These SMS Terms & Conditions ("SMS Terms") govern the delivery of text messages sent by Fugazi Labs, LLC ("Fugazi," "we," "us") in connection with account authentication and security services.
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            Program Description
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Fugazi sends SMS messages solely for account authentication, identity verification, and security-related notifications, including one-time passcodes (OTP). Messages are strictly transactional and non-marketing.
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            Opt-In
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Users opt in to receive SMS messages by providing their mobile phone number during Fugazi account registration and explicitly consenting via an unchecked checkbox. SMS consent is required to complete account setup.
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            Message Frequency
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Message frequency varies based on user activity and security events. Users will receive messages only when authentication or account verification is required.
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
            For help, reply HELP to any message or contact us at <a href="mailto:support@fugazi.fun" className="text-[#52D593] hover:underline">support@fugazi.fun</a>.
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
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Your use of SMS services is subject to our <a href="/privacy-policy" className="text-[#52D593] hover:underline">Privacy Policy</a>, available at: <a href="https://whitepaper.fugazi.fun/privacy-policy" className="text-[#52D593] hover:underline">https://whitepaper.fugazi.fun/privacy</a>
          </p>

          <h2 className="text-xl font-semibold text-gray-950 dark:text-white mt-8 mb-4">
            Contact Information
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Fugazi Labs, LLC
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Email: <a href="mailto:support@fugazi.fun" className="text-[#52D593] hover:underline">support@fugazi.fun</a>
          </p>
        </div>
      </div>
    </div>
  );
}
