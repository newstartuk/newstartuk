import type { DocHelperResponse } from "@/types";

// Pre-written responses for common document types.
// This is the MVP Document Helper — replace with OpenAI API call in MVP+.
export const DOC_HELPER_RESPONSES: Record<string, DocHelperResponse> = {
  tenancy: {
    plainEnglish:
      "A tenancy agreement is a contract between you and your landlord. It sets out: how much rent you pay, when it is due, how long the tenancy lasts, what deposits you have paid, who is responsible for repairs, and what you can and cannot do in the property. By signing it, you are agreeing to these terms — so read it carefully before you sign.",
    missingFields: [
      "Your full name and the landlord's full name",
      "The property address (must be the full UK address)",
      "The start and end date of the tenancy",
      "The monthly or weekly rent amount",
      "The deposit amount (capped at 5 weeks' rent for properties under £50,000/year)",
      "The deposit protection scheme name (must be on the agreement)",
      "The notice period — how much notice either side must give to end the tenancy",
      "Which bills are included in the rent and which are not",
      "Who is responsible for repairs — look for the phrase 'tenant responsibilities'",
    ],
    keyTerms: [
      { term: "Assured Shorthold Tenancy (AST)", meaning: "The most common type of private rental tenancy in England. It gives you the right to live in the property for a fixed period." },
      { term: "Deposit", meaning: "Money you pay upfront that is held as security. By law it must be protected in a government-approved scheme." },
      { term: "Inventory", meaning: "A list of everything in the property at the start and end of your tenancy — used to check for damage." },
      { term: "Notice period", meaning: "How much notice you (or the landlord) must give to end the tenancy." },
      { term: "Rent in advance", meaning: "You usually pay your first month's rent before moving in." },
    ],
    safeNextSteps: [
      "Read the full agreement before signing — do not be rushed.",
      "Take photos of everything in the property before signing the inventory.",
      "Check the deposit protection scheme is listed — your deposit is legally protected.",
      "Ask the landlord to explain anything you do not understand.",
      "Keep a copy of everything you sign.",
      "Seek advice from Shelter, Citizens Advice, or your university's housing advice service if unsure.",
    ],
  },
  council_tax: {
    plainEnglish:
      "Council tax is a local tax that helps pay for local services — bin collections, roads, libraries, and the police and fire services. In England, it is charged on most residential properties. As a full-time student, you are exempt from council tax — but you must tell your local council and prove you are a student.",
    missingFields: [
      "Your full name and the property address",
      "Your student status — you need a letter from your university confirming you are a full-time student",
      "The names and dates of birth of all adults living in the property",
      "Whether the property is wholly occupied by students",
    ],
    keyTerms: [
      { term: "Council Tax band", meaning: "Properties are assigned a band (A–H) based on value. Higher bands pay more council tax." },
      { term: "Council Tax exemption", meaning: "Full-time students are exempt from council tax. The exemption must be claimed — it is not automatic." },
      { term: "Single person discount", meaning: "If only one adult lives in a property, they can claim a 25% discount." },
      { term: "Council Tax support", meaning: "If you are on a low income, you may be able to claim help with council tax." },
      { term: "Student", meaning: "For council tax purposes, a student is someone on a full-time course lasting at least one year, with at least 21 hours of study per week." },
    ],
    safeNextSteps: [
      "Contact your local council (gov.uk/find-your-local-council) and tell them you are a student.",
      "Get a student status letter from your university — use this as proof.",
      "Submit the letter to the council and ask for written confirmation of your exemption.",
      "Do not ignore any council tax letters you receive — always respond even if you think you are exempt.",
      "If you live with non-students, seek advice — council tax rules become more complex.",
      "Keep copies of all letters and correspondence.",
    ],
  },
  student_status_letter: {
    plainEnglish:
      "A student status letter (sometimes called an enrollment letter or student confirmation letter) is an official letter from your university confirming that you are a registered student. You need this letter to prove your student status to banks, councils, landlords, and other official bodies.",
    missingFields: [
      "Your full name as registered at the university",
      "Your student ID number",
      "The course name and start and expected end date",
      "The university's name and contact details",
      "The signature of an authorised university official",
      "The university's official stamp or letterhead",
    ],
    keyTerms: [
      { term: "CAS (Confirmation of Acceptance for Studies)", meaning: "A document you receive before you travel. It confirms your university place. You need it to apply for your student visa. It is different from a student status letter." },
      { term: "Enrollment", meaning: "The formal process of registering as a student at your university. You must complete enrollment before you can get a student status letter." },
      { term: "Student status letter", meaning: "An official letter confirming you are a current student. Used for council tax exemption, bank accounts, and NI number applications." },
    ],
    safeNextSteps: [
      "Request the letter through your student portal or the international student office.",
      "Specify what you need the letter for — banks and councils may need specific wording.",
      "Allow 3–5 working days for processing.",
      "Check all details on the letter before using it — name, course, dates.",
      "If the letter is for council tax, check your council's website for any specific requirements.",
      "Keep digital and physical copies.",
    ],
  },
  bank_letter: {
    plainEnglish:
      "A bank letter is a letter from your bank confirming your account details and your status as an account holder. Some banks provide this automatically; others require you to request it. Banks may ask for this letter when you are opening a new account or to verify your identity and address.",
    missingFields: [
      "Your full name as it appears on your account",
      "Your account number (the 8-digit number — not your card number)",
      "Your sort code (the 6-digit number shown as XX-XX-XX)",
      "The date the account was opened",
      "Your address as registered with the bank",
      "The bank's name, address, and contact details",
      "An official bank signature or stamp",
    ],
    keyTerms: [
      { term: "Sort code", meaning: "A 6-digit code that identifies your bank and branch. Shown as XX-XX-XX." },
      { term: "Account number", meaning: "An 8-digit number that uniquely identifies your account." },
      { term: "Statement", meaning: "A document showing all transactions in your account over a period of time. You can download this from your bank's app or website." },
      { term: "Bank letter vs statement", meaning: "A bank letter is an official confirmation letter. A bank statement is a transaction history. Some organisations require one, some the other — check what they need." },
    ],
    safeNextSteps: [
      "Log into your online banking or app to request an account summary or letter.",
      "Most UK banks can provide this digitally — check your app first.",
      "If you need a physical letter, visit a branch or contact your bank.",
      "Check what format the requesting organisation needs — digital or physical.",
      "Some banks charge for printed letters — check before requesting.",
      "Keep copies of all bank letters you receive.",
    ],
  },
  nhs_registration: {
    plainEnglish:
      "Registering with a GP (General Practitioner — your local doctor) gives you access to the NHS. NHS GP services are free for everyone in the UK, regardless of nationality. To register, you fill in a form (GMS1), provide your address, and the GP surgery will confirm your registration.",
    missingFields: [
      "Your full name and date of birth",
      "Your UK address (your term-time address — this is important)",
      "Your previous address in your home country",
      "Your previous GP's name and address (so medical records can be transferred)",
      "Details of any ongoing medical conditions or medications you take",
      "Your NHS number (if you have been registered before — if not, you will receive one after registration)",
    ],
    keyTerms: [
      { term: "GP (General Practitioner)", meaning: "Your local doctor — your first point of contact for non-emergency medical care in the UK." },
      { term: "NHS number", meaning: "A unique 10-digit number that identifies your NHS health records. You receive this after registering with a GP." },
      { term: "NHS App", meaning: "An app that lets you book GP appointments, order prescriptions, view your health records, and more. Download it from your app store." },
      { term: "GMS1 form", meaning: "The form you fill in to register with a GP. Available from the GP surgery or nhs.uk." },
      { term: "Walk-in centre", meaning: "A medical centre where you can see a doctor without an appointment. For minor injuries and illnesses only." },
    ],
    safeNextSteps: [
      "Use the NHS 'Find a GP' service at nhs.uk/service-search/find-a-gp to find GPs near your term-time address.",
      "Check if the GP is accepting new patients — some are full.",
      "Fill in the GMS1 form and submit it to the GP surgery.",
      "You do not need to pay anything and you do not need your visa or BRP.",
      "Once registered, book a new patient health check — this is free.",
      "Download the NHS App to manage appointments online.",
    ],
  },
};

export function getDocHelperResponse(
  documentType: string
): DocHelperResponse | null {
  const type = documentType.toLowerCase().trim();
  return DOC_HELPER_RESPONSES[type] ?? null;
}

export function getAvailableDocTypes(): { type: string; label: string }[] {
  return [
    { type: "tenancy", label: "Tenancy Agreement" },
    { type: "council_tax", label: "Council Tax Letter" },
    { type: "student_status_letter", label: "Student Status Letter" },
    { type: "bank_letter", label: "Bank Letter / Statement" },
    { type: "nhs_registration", label: "NHS Registration Form" },
  ];
}
