import type { ScamAlert } from "@/types";

export const SCAM_ALERTS: ScamAlert[] = [
  {
    id: "scam-001",
    title: "Fake Landlord Deposits",
    type: "housing",
    headline: "Someone asks you to pay a deposit before you have seen the property.",
    description:
      "This is one of the most common scams targeting international students. A scammer lists a property that does not exist or is not theirs, takes a deposit, and disappears.",
    redFlags: [
      "The property is advertised at a price far below market rate.",
      "You are asked to pay a deposit before viewing or signing a contract.",
      "The landlord is 'abroad' and cannot meet you in person.",
      "You are asked to transfer money to an overseas bank account.",
      "There is pressure to pay quickly — 'other people are interested'.",
    ],
    safeActions: [
      "Always view a property in person before paying anything.",
      "Use your university's accommodation service to find verified properties.",
      "If you cannot view in person, ask the university or a trusted friend to view for you.",
      "Never transfer money to an overseas account for a UK rental.",
      "If in doubt, walk away — there will be other properties.",
    ],
  },
  {
    id: "scam-002",
    title: "Job and Employment Scams",
    type: "jobs",
    headline: "A job offer promises guaranteed employment or asks you to pay a fee.",
    description:
      "Scammers create fake job listings targeting students who need money. They may promise guaranteed work, offer high salaries, or ask for an upfront fee to 'process' your application.",
    redFlags: [
      "You are asked to pay a fee to apply for or secure the job.",
      "The salary offered is significantly higher than market rates.",
      "The employer is reluctant to meet in person or provide a company address.",
      "You receive an offer very quickly without a formal interview.",
      "You are asked for your bank details before a contract is signed.",
    ],
    safeActions: [
      "Only use your university careers service or well-known job platforms (Indeed, LinkedIn).",
      "Research the company on Companies House before applying.",
      "Never pay money to get a job — this is always a scam.",
      "Never give bank details before you have a signed employment contract.",
      "If something feels wrong, speak to your university careers service.",
    ],
  },
  {
    id: "scam-003",
    title: "Fake Official Letters",
    type: "documents",
    headline: "You receive a letter or email claiming to be from a bank, council, or government agency.",
    description:
      "Scammers send convincing letters or emails pretending to be from banks (about your account), councils (about council tax), HMRC (about a tax rebate), or UKVI (about your visa). They aim to steal money or personal details.",
    redFlags: [
      "The letter or email asks you to transfer money immediately.",
      "You are asked for your bank details, password, or PIN.",
      "There is pressure to act quickly without thinking.",
      "The sender's email address does not match the official domain.",
      "You were not expecting a communication from this organisation.",
    ],
    safeActions: [
      "Your bank, council, and government agencies will never ask for your PIN or password by email.",
      "If in doubt, call the organisation directly using the number on their official website.",
      "Do not click links in suspicious emails — go directly to the official website.",
      "Forward suspicious emails to the organisation they claim to be from.",
      "Report to Action Fraud at actionfraud.police.uk.",
    ],
  },
  {
    id: "scam-004",
    title: "Document Phishing",
    type: "documents",
    headline: "Someone asks you to share or verify your passport, visa, or personal documents.",
    description:
      "Phishing scams target students' personal documents. Scammers may pose as employers, landlords, or service providers and ask you to send copies of your passport, BRP, or bank statements.",
    redFlags: [
      "Someone asks for your passport or visa documents without a clear official reason.",
      "The request comes from an informal or unverified source.",
      "You are asked to send documents via email or messaging app rather than an official portal.",
      "The request feels urgent and there is pressure to respond quickly.",
    ],
    safeActions: [
      "Only share your passport, BRP, or bank details with official, verified organisations.",
      "Ask why the documents are needed and how they will be stored.",
      "Use secure document sharing methods — not email attachments.",
      "Your university or employer will never need your full bank details by email.",
      "If in doubt, speak to your university's international office.",
    ],
  },
  {
    id: "scam-005",
    title: "Too-Good-to-Be-True Accommodation",
    type: "housing",
    headline: "A property is advertised at an unbelievably low price with an urgent deadline.",
    description:
      "Scammers lure students with properties that look perfect and are priced far below market value. They create urgency ('other students are about to book') and ask for a deposit before you have time to think.",
    redFlags: [
      "The price is too good to be true for the location.",
      "There are stock photos instead of real photos of the property.",
      "You are asked to pay quickly without a viewing.",
      "The landlord cannot be met in person.",
      "The listing uses the same photos as another property in a different city.",
    ],
    safeActions: [
      "If the price seems too low for the area, it probably is.",
      "Always view the property in person before paying.",
      "Use reputable letting agents or your university's accommodation service.",
      "Search the address on Google — if it appears on multiple listings, it is likely a scam.",
      "Do not feel pressured — a legitimate landlord will not rush you.",
    ],
  },
  {
    id: "scam-006",
    title: "People Offering to 'Help' for a Fee",
    type: "general",
    headline: "Someone offers to help you with your visa, bank account, or documents — for a price.",
    description:
      "Individuals or companies may approach international students offering to 'help' with visa renewals, bank account opening, or document processing — for a significant fee. These services are often unnecessary or fraudulent.",
    redFlags: [
      "Someone offers to 'speed up' your visa or BRP collection for a fee.",
      "They claim to have a special relationship with the Home Office, banks, or universities.",
      "They ask for payment upfront before any service is provided.",
      "They have no verifiable address, website, or professional credentials.",
      "They suggest you do not need to do anything — they will 'handle it'.",
    ],
    safeActions: [
      "Your university international office can help with visa and BRP questions — for free.",
      "Bank accounts can be opened directly with banks — you do not need a 'helper'.",
      "Never share your documents with someone who is not an official representative.",
      "If someone offers to 'help' for a fee and you did not ask, it is likely a scam.",
      "Genuine official help does not require payment and does not come from cold contacts.",
    ],
  },
];

export function getRandomScamAlert(): ScamAlert {
  const index = Math.floor(Math.random() * SCAM_ALERTS.length);
  return SCAM_ALERTS[index];
}
