"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { CloseIcon } from "@/icons/close-icon";
import { useRouter } from "next/navigation";

export default function PrivacyPolicyPage() {
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-[#171613] flex flex-col">
      {/* Navbar — logo only, no auth button */}
      <div className="flex items-center px-6 py-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Augle" width={28} height={28} />
          <span className="text-[#F7F6F2] font-semibold text-sm">Augle</span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex justify-center px-6 py-10">
        <div className="w-full max-w-2xl relative">
          {/* Close button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="absolute -top-1 right-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <CloseIcon className="stroke-white w-4 h-4" />
          </button>

          {/* Title block */}
          <h1 className="text-2xl font-bold text-[#C15F3C] mb-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#C15F3C] mb-1">Version  1.0</p>
          <p className="text-xs text-[#C15F3C] mb-8">Updated 04/27/2026</p>

          {/* Body */}
          <div className="space-y-5 text-sm text-[#F7F6F2]/80 leading-relaxed">
            <p>
              Augle, Inc. ("Augle," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use the Augle platform ("Platform"). By using the Platform, you consent to the practices described in this Policy.
            </p>
            <p>
              If you have questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@augle.com" className="text-[#C15F3C] hover:underline">privacy@augle.com</a>.
            </p>

            <Section title="1. Information We Collect">
              <SubSection title="1.1 Information You Provide">
                <p>When you create an account or use the Platform, we collect:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                  <li><strong className="text-[#F7F6F2]">Display Name:</strong> A single display name field used to identify you within the Platform. Your first initial is used for your account avatar.</li>
                  <li><strong className="text-[#F7F6F2]">Email Address:</strong> Used for account authentication, email verification, and Platform communications.</li>
                  <li><strong className="text-[#F7F6F2]">Password:</strong> Stored in hashed, encrypted form. We never store plaintext passwords.</li>
                  <li><strong className="text-[#F7F6F2]">Authentication Data:</strong> If you use Google OAuth or another third-party provider, we receive basic profile information (name, email) from that provider.</li>
                  <li><strong className="text-[#F7F6F2]">Session Questions and Interjections:</strong> The research questions you submit and any context or interjection text you provide during sessions.</li>
                  <li><strong className="text-[#F7F6F2]">Payment Information:</strong> Credit card or payment data processed by our third-party payment processor. Augle does not store full card numbers, CVVs, or bank account details.</li>
                </ul>
              </SubSection>
              <SubSection title="1.2 Information Automatically Collected">
                <p>We automatically collect certain technical information when you use the Platform:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                  <li><strong className="text-[#F7F6F2]">Log Data:</strong> IP address, browser type and version, operating system, referring URLs, pages visited, and timestamps.</li>
                  <li><strong className="text-[#F7F6F2]">Device Information:</strong> Device type, screen resolution, and general hardware identifiers.</li>
                  <li><strong className="text-[#F7F6F2]">Session Metadata:</strong> Session depth, credits consumed, session status, phase outcomes, flag classifications, and confidence grades.</li>
                  <li><strong className="text-[#F7F6F2]">Usage Analytics:</strong> Feature interactions, navigation paths, and engagement patterns used to improve the Platform.</li>
                  <li><strong className="text-[#F7F6F2]">Cookies and Similar Technologies:</strong> See Section 6 for details.</li>
                  <li><strong className="text-[#F7F6F2]">Device Fingerprint:</strong> For users accessing the Platform without an account (guest sessions), we collect a hashed device fingerprint derived from browser type, operating system, screen resolution, and graphics renderer. This fingerprint is used solely to enforce one free session per device per 24-hour period and to prevent abuse of the free session entitlement. Device fingerprint data is not linked to your personal identity, is not sold or shared with third parties, and is not used for advertising purposes.</li>
                </ul>
              </SubSection>
              <SubSection title="1.3 Research Output Data">
                <p>Augle's deliberation engine produces structured research outputs including evidence nodes, agent verdicts, confidence grades, flag classifications, and Synthesizer conclusions. This structured data is associated with your account and session history.</p>
              </SubSection>
              <SubSection title="1.4 Accuracy and Calibration Data">
                <p>For sessions conducted against prediction market contracts that subsequently resolve, we store the Augle deliberation verdict alongside the actual contract outcome. This calibration record — matched verdict against ground truth — is one of Augle's core data assets. It is used to measure and improve the accuracy of the deliberation engine, to publish accuracy benchmarks, and may be commercially licensed to third parties as part of Augle's structured reasoning corpus. Calibration records are de-identified before any commercial use or external disclosure. By submitting a prediction market question and running a session, you consent to this data being collected, stored, and used as described.</p>
              </SubSection>
            </Section>

            <Section title="2. How We Use Your Information">
              <SubSection title="2.1 Platform Operation">
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Creating and managing your account;</li>
                  <li>Processing session requests and delivering research outputs;</li>
                  <li>Managing your credit balance and processing transactions;</li>
                  <li>Storing your session history for retrieval and re-export;</li>
                  <li>Delivering email verification and account security communications.</li>
                </ul>
              </SubSection>
              <SubSection title="2.2 Data Asset Development and Commercial Use">
                <p>Augle's long-term value as a company is grounded in the structured research and reasoning dataset produced as a byproduct of Platform operation. By using the Platform, you acknowledge and consent to the following uses of session data (excluding personally identifying information):</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                  <li>Training, fine-tuning, and evaluating AI models — by Augle or by third parties who license the dataset from Augle;</li>
                  <li>Building and maintaining a structured multi-agent reasoning corpus for internal research and external licensing;</li>
                  <li>Commercially licensing the reasoning corpus or calibration dataset, in whole or in part, to AI laboratories, enterprise clients, academic institutions, government agencies, or other third parties;</li>
                  <li>Publishing accuracy benchmarks, calibration analyses, and platform performance metrics derived from session data in aggregated or anonymized form;</li>
                  <li>Using session data as training input for proprietary or licensed AI reasoning models.</li>
                </ul>
                <p className="mt-2">Session data used for these purposes is stripped of direct personal identifiers (name, email, account ID) before use or disclosure.</p>
              </SubSection>
              <SubSection title="2.3 Communications">
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Sending transactional emails (account verification, credit receipts, session confirmations);</li>
                  <li>Sending product updates, feature announcements, and policy change notifications;</li>
                  <li>Responding to support inquiries and feedback submissions.</li>
                </ul>
                <p className="mt-2">You may opt out of non-transactional communications at any time using the unsubscribe link in any email or by contacting <a href="mailto:privacy@augle.com" className="text-[#C15F3C] hover:underline">privacy@augle.com</a>.</p>
              </SubSection>
              <SubSection title="2.4 Legal and Safety">
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Complying with applicable laws and legal processes;</li>
                  <li>Investigating and preventing fraud, abuse, and violations of our Terms;</li>
                  <li>Protecting the rights, safety, and property of Augle, our users, and the public.</li>
                </ul>
              </SubSection>
            </Section>

            <Section title="3. How We Share Your Information">
              <p className="mb-3">We do not sell your personal information. We share information only in the limited circumstances described below.</p>
              <SubSection title="3.1 Service Providers">
                <p>We share information with trusted third-party service providers who assist in operating the Platform, including cloud infrastructure providers, payment processors, email delivery services, and analytics providers. These providers are contractually bound to use your data only as directed by Augle.</p>
              </SubSection>
              <SubSection title="3.2 Legal Requirements">
                <p>We may disclose your information if required to do so by law, court order, or governmental authority, or if we believe in good faith that such disclosure is necessary to protect our rights, your safety, or the safety of others.</p>
              </SubSection>
              <SubSection title="3.3 Business Transfers">
                <p>In the event of a merger, acquisition, financing, or sale of all or substantially all of Augle's assets, your information may be transferred as part of that transaction. We will provide notice of any such transfer and the applicable privacy practices.</p>
              </SubSection>
              <SubSection title="3.4 Structured Session Data and Commercial Licensing">
                <p>Augle may license, sell, or otherwise transfer structured session data — including agent deliberations, evidence node classifications, confidence grades, Guardian flag records, Contrarian objections, Synthesizer verdicts, and calibration outcomes — to third parties for research, commercial, and AI development purposes. Before any such transfer, session data is de-identified by removing or hashing direct personal identifiers. Third-party licensees of de-identified session data are contractually prohibited from attempting to re-identify individual users.</p>
              </SubSection>
              <SubSection title="3.5 With Your Consent">
                <p>We may share your information with third parties when you have given us explicit consent to do so.</p>
              </SubSection>
            </Section>

            <Section title="4. Data Retention">
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong className="text-[#F7F6F2]">Account Data:</strong> Retained until you delete your account.</li>
                <li><strong className="text-[#F7F6F2]">Session Data:</strong> Retained in your account history until you delete individual sessions or your account. Structured session metadata (anonymized) may be retained indefinitely for calibration and research purposes.</li>
                <li><strong className="text-[#F7F6F2]">Payment Records:</strong> Retained for the period required by applicable tax and financial recordkeeping laws.</li>
                <li><strong className="text-[#F7F6F2]">Log Data:</strong> Typically retained for 90 days for security and debugging purposes.</li>
              </ul>
              <p className="mt-2">Upon account deletion, your personal information will be deleted or anonymized within a commercially reasonable timeframe, except where retention is required by law or for legitimate business purposes.</p>
            </Section>

            <Section title="5. Your Rights and Choices">
              <SubSection title="5.1 Access and Portability">
                <p>You may request a copy of the personal information we hold about you. We will provide this in a machine-readable format where technically feasible.</p>
              </SubSection>
              <SubSection title="5.2 Correction">
                <p>You may update your display name directly in your account settings. For other corrections, contact <a href="mailto:privacy@augle.com" className="text-[#C15F3C] hover:underline">privacy@augle.com</a>.</p>
              </SubSection>
              <SubSection title="5.3 Deletion">
                <p>You may request deletion of your account and associated personal data via the account settings Danger Zone. See Section 4 for retention exceptions.</p>
              </SubSection>
              <SubSection title="5.4 Opt-Out of Marketing">
                <p>You may opt out of marketing emails at any time. You cannot opt out of transactional and security-related communications.</p>
              </SubSection>
              <SubSection title="5.5 California Residents (CCPA/CPRA)">
                <p>California residents have additional rights under the California Consumer Privacy Act, including the right to know, delete, correct, and opt out of the sale or sharing of personal information. Augle does not sell or share personal information for cross-context behavioral advertising. To exercise your rights, contact <a href="mailto:privacy@augle.com" className="text-[#C15F3C] hover:underline">privacy@augle.com</a>.</p>
              </SubSection>
              <SubSection title="5.6 EEA/UK Residents (GDPR)">
                <p>If you are located in the European Economic Area or United Kingdom, our legal basis for processing your personal information includes: (a) performance of our contract with you; (b) our legitimate interests in operating and improving the Platform; and (c) your consent where applicable. You may lodge a complaint with your local data protection authority.</p>
              </SubSection>
            </Section>

            <Section title="6. Cookies and Tracking Technologies">
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong className="text-[#F7F6F2]">Strictly Necessary Cookies:</strong> Required for authentication, session management, and Platform security. Cannot be disabled.</li>
                <li><strong className="text-[#F7F6F2]">Analytics Cookies:</strong> Used to understand how users interact with the Platform. May be disabled via your browser settings or a cookie consent mechanism.</li>
                <li><strong className="text-[#F7F6F2]">Preference Cookies:</strong> Store your Platform preferences (e.g., legal disclaimer acknowledgment, session defaults).</li>
              </ul>
              <p className="mt-2">You can control cookie settings through your browser. Disabling certain cookies may limit Platform functionality.</p>
            </Section>

            <Section title="7. Data Security">
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Passwords stored using strong cryptographic hashing;</li>
                <li>TLS/HTTPS encryption for all data in transit;</li>
                <li>Access controls limiting employee access to personal data on a need-to-know basis;</li>
                <li>Regular security reviews and vulnerability assessments.</li>
              </ul>
              <p className="mt-2">No method of transmission over the Internet or electronic storage is 100% secure. Augle cannot guarantee absolute security and is not responsible for unauthorized access resulting from your failure to protect your credentials.</p>
            </Section>

            <Section title="8. Children's Privacy">
              <p>The Platform is not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected information from a minor, please contact us immediately at <a href="mailto:privacy@augle.com" className="text-[#C15F3C] hover:underline">privacy@augle.com</a> and we will delete that information.</p>
            </Section>

            <Section title="9. Third-Party Links and Services">
              <p>The Platform may reference or link to third-party services such as Polymarket or Kalshi. Augle is not responsible for the privacy practices of any third-party sites or services. We encourage you to review the privacy policies of any third parties you interact with.</p>
            </Section>

            <Section title="10. Changes to This Policy">
              <p>We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated Policy on the Platform and updating the effective date. Your continued use of the Platform after such changes constitutes your acceptance of the revised Policy.</p>
            </Section>

            <Section title="11. Contact Us">
              <p className="mb-1"><strong className="text-[#F7F6F2]">Augle, Inc.</strong></p>
              <p>Privacy inquiries: <a href="mailto:privacy@augle.com" className="text-[#C15F3C] hover:underline">privacy@augle.com</a></p>
              <p>General contact: <a href="mailto:legal@augle.com" className="text-[#C15F3C] hover:underline">legal@augle.com</a></p>
              <p>Website: augle.com</p>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[#F7F6F2] font-semibold mb-3">{title}</h2>
      <div className="text-[#F7F6F2]/80 space-y-3">{children}</div>
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <h3 className="text-[#F7F6F2]/90 font-medium mb-1">{title}</h3>
      <div className="text-[#F7F6F2]/70 space-y-2">{children}</div>
    </div>
  );
}
