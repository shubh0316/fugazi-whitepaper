"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { CloseIcon } from "@/icons/close-icon";
import { useRouter } from "next/navigation";

export default function TermsAndConditionsPage() {
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
            Terms &amp; Conditions
          </h1>
          <p className="text-xs text-[#C15F3C] mb-1">Version  1.0</p>
          <p className="text-xs text-[#C15F3C] mb-8">Updated 04/27/2026</p>

          {/* Body */}
          <div className="space-y-6 text-sm text-[#F7F6F2]/80 leading-relaxed">

            <Section title="1. Acceptance of Terms">
              <p>These Terms and Conditions ("Terms") govern your access to and use of the Augle platform, including the Augle website, web application, mobile application, APIs, and all associated services (collectively, the "Platform"), operated by Augle, Inc. ("Augle," "we," "us," or "our").</p>
              <p>By creating an account, accessing, or using the Platform in any way, you ("User" or "you") agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Platform.</p>
              <p>If you are accessing the Platform on behalf of an organization, you represent and warrant that you have authority to bind that organization to these Terms.</p>
            </Section>

            <Section title="2. Description of Service">
              <p>Augle is a multi-agent AI deliberation platform that employs a structured ensemble of AI agents to conduct in-depth research and analysis of questions submitted by Users. The Platform currently offers two product modes:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li><strong className="text-[#F7F6F2]">Markets Mode:</strong> Research and analysis focused on prediction market questions from platforms such as Polymarket and Kalshi.</li>
                <li><strong className="text-[#F7F6F2]">Academia Mode:</strong> Research and analysis focused on academic, professional, and institutional research questions (forthcoming).</li>
              </ul>
              <p>Sessions are conducted through a seven-agent ensemble operating across three structured deliberation phases. Session outputs are for informational and research purposes only.</p>
            </Section>

            <Section title="3. Eligibility">
              <p>To use Augle, you must:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                <li>Be at least 18 years of age;</li>
                <li>Have the legal capacity to enter into binding contracts;</li>
                <li>Not be located in a jurisdiction where use of AI research tools or prediction market analysis is prohibited;</li>
                <li>Not be a person or entity subject to applicable sanctions programs.</li>
              </ul>
              <p>Augle reserves the right to refuse service to any person or entity at its sole discretion.</p>
            </Section>

            <Section title="4. Account Registration">
              <SubSection title="4.1 Account Creation">
                <p>To access paid features of the Platform, you must create an account by providing a display name, valid email address, and password, or by authenticating through a supported third-party provider (e.g., Google OAuth). You are responsible for maintaining the confidentiality of your login credentials.</p>
              </SubSection>
              <SubSection title="4.2 Account Accuracy">
                <p>You agree to provide accurate and complete information during registration and to keep your account information current. Augle is not liable for any loss or damage arising from your failure to maintain accurate account information.</p>
              </SubSection>
              <SubSection title="4.3 Account Security">
                <p>You are solely responsible for all activities that occur under your account. You must notify Augle immediately at <a href="mailto:legal@augle.com" className="text-[#C15F3C] hover:underline">legal@augle.com</a> if you suspect unauthorized access to your account. Augle reserves the right to suspend or terminate accounts that appear to be compromised.</p>
              </SubSection>
              <SubSection title="4.4 One Account Per User">
                <p>You may not create multiple accounts for the purpose of circumventing Platform limits, credits policies, or free session entitlements. Augle reserves the right to merge or terminate duplicate accounts.</p>
              </SubSection>
            </Section>

            <Section title="5. Credits, Payments & Refunds">
              <SubSection title="5.1 Credit System">
                <p>The Platform operates on a prepaid credit system. Credits are purchased in bundles and consumed per session based on the selected depth:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                  <li><strong className="text-[#F7F6F2]">Rapid (1 credit):</strong> Single-phase exploration — Cartographer and Synthesizer agents only.</li>
                  <li><strong className="text-[#F7F6F2]">Standard (3 credits):</strong> Full three-phase deliberation with the complete seven-agent ensemble.</li>
                  <li><strong className="text-[#F7F6F2]">Deep (6 credits):</strong> Full deliberation plus extended expert interjection analysis.</li>
                </ul>
              </SubSection>
              <SubSection title="5.2 Credit Bundles">
                <p>Credit bundles are offered at the following rates (subject to change with notice):</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                  <li>10 credits for $2.00 ($0.20 / credit)</li>
                  <li>30 credits for $5.40 ($0.18 / credit)</li>
                  <li>50 credits for $8.00 ($0.16 / credit)</li>
                </ul>
              </SubSection>
              <SubSection title="5.3 Credit Expiration">
                <p>Credits do not expire and are not subject to any recurring charges. Purchased credits are associated with your account and are non-transferable.</p>
              </SubSection>
              <SubSection title="5.4 Free Sessions">
                <p>New Users are entitled to one (1) free Standard-depth session upon first use of the Platform. Free sessions are limited to one per user account. Augle reserves the right to modify or discontinue the free session offer at any time.</p>
              </SubSection>
              <SubSection title="5.5 Refund Policy">
                <p>Credits are automatically returned to your account balance in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                  <li>Low Confidence / Insufficient Finding — Rapid: Full refund (1 credit).</li>
                  <li>Low Confidence / Insufficient Finding — Standard: 2 of 3 credits returned.</li>
                  <li>Low Confidence / Insufficient Finding — Deep: 4 of 6 credits returned.</li>
                  <li>User-aborted session with no active flag: Same schedule as above.</li>
                  <li>User-aborted session with active Critical flag: Full refund (all credits). Augle absorbs this cost.</li>
                  <li>User-aborted session with active Moderate flag: Same schedule as low-confidence.</li>
                </ul>
                <p className="mt-2">Credits returned under this policy are credited to your account balance. No cash refunds are issued for purchased credits except where required by applicable law.</p>
              </SubSection>
              <SubSection title="5.6 Payment Processing">
                <p>All payment transactions are processed by third-party payment processors. Augle does not store full payment card information. By providing payment information, you agree to the applicable payment processor's terms and conditions.</p>
              </SubSection>
              <SubSection title="5.7 Taxes">
                <p>You are responsible for all applicable taxes associated with your purchase of credits, except where Augle is required by law to collect and remit such taxes.</p>
              </SubSection>
            </Section>

            <Section title="6. Acceptable Use">
              <SubSection title="6.1 Permitted Use">
                <p>You may use the Platform for lawful research, analysis, and informational purposes. You agree to use the Platform in accordance with these Terms and all applicable laws and regulations.</p>
              </SubSection>
              <SubSection title="6.2 Prohibited Conduct">
                <p>You agree not to:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                  <li>Use the Platform for any unlawful purpose or in violation of any applicable regulations;</li>
                  <li>Attempt to reverse-engineer, decompile, disassemble, or otherwise derive source code or agent architectures from the Platform;</li>
                  <li>Use automated scripts, bots, or other methods to create accounts, submit sessions, or manipulate Platform metrics;</li>
                  <li>Attempt to circumvent any access controls, security measures, or rate limits;</li>
                  <li>Use the Platform to generate research outputs intended to manipulate prediction market prices or defraud other market participants;</li>
                  <li>Represent Augle's AI-generated research outputs as the work of a licensed financial advisor, attorney, physician, or other regulated professional;</li>
                  <li>Reproduce, distribute, or commercially exploit session outputs in bulk without express written permission from Augle;</li>
                  <li>Upload, submit, or transmit malicious code, harmful content, or material that violates third-party intellectual property rights;</li>
                  <li>Attempt to access other users' accounts, session data, or private information;</li>
                  <li>Interfere with or disrupt the integrity or performance of the Platform or its underlying systems.</li>
                </ul>
              </SubSection>
            </Section>

            <Section title="7. Intellectual Property">
              <SubSection title="7.1 Augle Platform">
                <p>The Platform, including its software, agent architecture, design, branding, trademarks, logos, and all associated technology, is the exclusive intellectual property of Augle, Inc. and its licensors. Nothing in these Terms transfers any ownership rights to you.</p>
              </SubSection>
              <SubSection title="7.2 Session Outputs">
                <p>Augle grants you a limited, non-exclusive, non-transferable, revocable license to use session outputs generated on your account for personal research and informational purposes. This license does not include the right to resell, republish, or commercially distribute session outputs.</p>
              </SubSection>
              <SubSection title="7.3 User-Submitted Content">
                <p>By submitting questions or interjections into the Platform, you grant Augle a worldwide, royalty-free, perpetual, irrevocable, sublicensable license to use, store, process, analyze, and exploit your submitted content — including in combination with AI-generated session outputs, evidence nodes, confidence grades, and deliberation records — for any lawful purpose. This includes, without limitation: (a) operating and improving the Platform; (b) training, fine-tuning, and evaluating AI models by Augle or its licensees; (c) building, maintaining, and commercially licensing structured research and reasoning datasets to third parties; and (d) publishing aggregated or anonymized findings derived from session content. Augle will not attribute session content to you personally in any commercial or public use without your separate consent.</p>
              </SubSection>
              <SubSection title="7.4 Feedback">
                <p>Any feedback, suggestions, or ideas you provide regarding the Platform may be used by Augle without restriction, compensation, or attribution to you.</p>
              </SubSection>
            </Section>

            <Section title="8. Disclaimers">
              <SubSection title="8.1 Not Financial or Professional Advice">
                <p>AUGLE IS A RESEARCH AND ANALYSIS TOOL. NOTHING ON THE PLATFORM CONSTITUTES FINANCIAL ADVICE, INVESTMENT ADVICE, LEGAL ADVICE, MEDICAL ADVICE, OR ANY OTHER FORM OF PROFESSIONAL ADVICE. SESSION OUTPUTS ARE PROVIDED FOR INFORMATIONAL PURPOSES ONLY. YOU SHOULD NOT RELY ON AUGLE OUTPUTS AS THE BASIS FOR ANY FINANCIAL, LEGAL, MEDICAL, OR OTHER CONSEQUENTIAL DECISIONS WITHOUT INDEPENDENT PROFESSIONAL CONSULTATION.</p>
              </SubSection>
              <SubSection title="8.2 No Warranty">
                <p>THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, OR NON-INFRINGEMENT. AUGLE DOES NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR THAT ANY PARTICULAR RESEARCH OUTPUT WILL BE ACCURATE OR RELIABLE.</p>
              </SubSection>
              <SubSection title="8.3 AI Limitations">
                <p>AI-generated research outputs may contain errors, omissions, or outdated information. Augle's deliberation engine is designed to surface uncertainty and calibrate confidence, but it cannot guarantee accuracy. You acknowledge and accept the inherent limitations of AI-generated analysis.</p>
              </SubSection>
              <SubSection title="8.4 Prediction Market Disclaimer">
                <p>Augle does not operate any prediction market and is not affiliated with Polymarket, Kalshi, or any other prediction market platform. Use of Augle's research outputs in connection with prediction market participation is at your sole risk.</p>
              </SubSection>
            </Section>

            <Section title="9. Limitation of Liability">
              <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, AUGLE, INC., ITS OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF DATA, LOSS OF GOODWILL, OR BUSINESS INTERRUPTION, ARISING FROM OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE PLATFORM, EVEN IF AUGLE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
              <p>IN NO EVENT SHALL AUGLE'S TOTAL AGGREGATE LIABILITY TO YOU FOR ANY CLAIM ARISING FROM OR RELATED TO THESE TERMS OR THE PLATFORM EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID TO AUGLE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED U.S. DOLLARS ($100).</p>
            </Section>

            <Section title="10. Indemnification">
              <p>You agree to indemnify, defend, and hold harmless Augle, Inc. and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or in connection with: (a) your use of the Platform; (b) your violation of these Terms; (c) your violation of any third-party rights; or (d) any content you submit to the Platform.</p>
            </Section>

            <Section title="11. Termination">
              <SubSection title="11.1 By You">
                <p>You may terminate your account at any time by selecting the account deletion option in your account settings (Danger Zone). Upon deletion, your personal data will be handled in accordance with our Privacy Policy.</p>
              </SubSection>
              <SubSection title="11.2 By Augle">
                <p>Augle reserves the right to suspend or terminate your account and access to the Platform at any time, with or without notice, for any violation of these Terms or for any other reason at Augle's sole discretion.</p>
              </SubSection>
              <SubSection title="11.3 Effect of Termination">
                <p>Upon termination, your right to access the Platform ceases immediately. Unused credits are non-refundable upon termination for cause. Sections that by their nature should survive termination (including Sections 7, 8, 9, 10, and 13) shall survive.</p>
              </SubSection>
            </Section>

            <Section title="12. Modifications to Terms">
              <p>Augle reserves the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on the Platform and updating the effective date. Your continued use of the Platform after the effective date of any modification constitutes your acceptance of the modified Terms.</p>
            </Section>

            <Section title="13. Governing Law & Dispute Resolution">
              <SubSection title="13.1 Governing Law">
                <p>These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.</p>
              </SubSection>
              <SubSection title="13.2 Informal Resolution">
                <p>Before initiating any formal dispute, you agree to contact Augle at <a href="mailto:legal@augle.com" className="text-[#C15F3C] hover:underline">legal@augle.com</a> to attempt to resolve the matter informally within thirty (30) days.</p>
              </SubSection>
              <SubSection title="13.3 Arbitration">
                <p>Any unresolved dispute arising from or related to these Terms shall be resolved through binding arbitration administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules, except as noted in Section 13.4.</p>
              </SubSection>
              <SubSection title="13.4 Exceptions to Arbitration">
                <p>Either party may seek injunctive or other equitable relief in a court of competent jurisdiction to prevent irreparable harm, without waiving the right to arbitrate underlying claims.</p>
              </SubSection>
              <SubSection title="13.5 Class Action Waiver">
                <p>YOU WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION AGAINST AUGLE.</p>
              </SubSection>
            </Section>

            <Section title="14. General Provisions">
              <SubSection title="14.1 Entire Agreement">
                <p>These Terms, together with the Privacy Policy and Terms of Service, constitute the entire agreement between you and Augle regarding your use of the Platform.</p>
              </SubSection>
              <SubSection title="14.2 Severability">
                <p>If any provision of these Terms is found to be unenforceable, that provision shall be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall continue in full force and effect.</p>
              </SubSection>
              <SubSection title="14.3 No Waiver">
                <p>Augle's failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.</p>
              </SubSection>
              <SubSection title="14.4 Assignment">
                <p>You may not assign your rights or obligations under these Terms without Augle's prior written consent. Augle may assign these Terms in connection with a merger, acquisition, or sale of assets.</p>
              </SubSection>
            </Section>

            <Section title="15. Contact">
              <p className="mb-1"><strong className="text-[#F7F6F2]">Augle, Inc.</strong></p>
              <p>Email: <a href="mailto:legal@augle.com" className="text-[#C15F3C] hover:underline">legal@augle.com</a></p>
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
