import { ChecklistTask } from "@/types/checklist";

export const CHECKLIST_DATA: ChecklistTask[] = [
  // ─── LEGAL & IMMIGRATION ───────────────────────────────────────────────
  {
    id: "legal-001",
    title: "Collect your BRP (Biometric Residence Permit)",
    description: "Your BRP is your official proof of immigration status in the UK. You must collect it within 10 days of arriving.",
    category: "legal",
    phase: "week1",
    priority: "critical",
    estimatedMinutes: 60,
    instructions: [
      "Check your decision letter for the collection address (usually a Post Office near your university).",
      "Bring your passport and decision letter to the Post Office.",
      "Your BRP contains your immigration status, leave expiry date, and work restrictions.",
      "Sign the back of your BRP immediately once you receive it.",
    ],
    tips: [
      "If you cannot collect in time, call the Home Office helpline: 0800 678 1767.",
      "Do NOT delay — fines can apply for late collection.",
      "Keep your decision letter safe even after collecting your BRP.",
    ],
    links: [
      { label: "Find your BRP collection point", url: "https://www.gov.uk/biometric-residence-permits" },
      { label: "Home Office: 0800 678 1767", url: "https://www.gov.uk/contact-ukvi-inside-outside-uk" },
    ],
  },
  {
    id: "legal-002",
    title: "Register with the Police (if required)",
    description: "Some visa types require police registration within 7 days of arrival. Check your visa/decision letter.",
    category: "legal",
    phase: "week1",
    priority: "critical",
    estimatedMinutes: 120,
    instructions: [
      "Check your decision letter or visa sticker for the police registration condition.",
      "If required, book an appointment at your local Police Station's Overseas Visitors Records Office.",
      "Bring: passport, BRP, 2 passport photos, £34 cash/card, university letter, proof of address.",
      "Receive a Police Registration Certificate — keep this safe.",
    ],
    tips: [
      "London residents: Metropolitan Police Overseas Visitors Registration office.",
      "You must update the police if you change address, course, or extend your visa.",
    ],
    links: [
      { label: "Metropolitan Police Registration", url: "https://www.met.police.uk/advice/advice-and-information/ov/ov/overseas-visitors/registering-with-the-police/" },
    ],
  },
  {
    id: "legal-003",
    title: "Understand your visa conditions",
    description: "Know what you can and cannot do on your Student Visa.",
    category: "legal",
    phase: "week1",
    priority: "critical",
    estimatedMinutes: 30,
    instructions: [
      "Log in to the UKVI online account to view your visa status.",
      "Note your work restrictions: up to 20 hours/week during term time.",
      "Note that unpaid voluntary work is generally permitted.",
      "Your dependants (if any) have the same work rights.",
    ],
    tips: [
      "You cannot access public funds (benefits, council housing) on a Student Visa.",
      "Keep your BRP safe — it is a legal document.",
    ],
    links: [
      { label: "UKVI Student Visa Guide", url: "https://www.gov.uk/student-visa" },
    ],
  },
  {
    id: "legal-004",
    title: "Open a UK bank account",
    description: "A UK bank account is essential for receiving your student loan, paying rent, and living expenses.",
    category: "legal",
    phase: "week1",
    priority: "critical",
    estimatedMinutes: 90,
    instructions: [
      "See the full Bank Account Guide in the Finance section for step-by-step instructions.",
      "Prepare: passport, BRP, university offer letter, proof of UK address (university accommodation letter or tenancy agreement).",
      "Some banks allow you to start your application online before arriving.",
    ],
    tips: [
      "Monzo, Starling, and Revolut are popular with students — easy to open online.",
      "Student overdrafts are available but check the limit and interest rates.",
    ],
  },
  {
    id: "legal-005",
    title: "Register with your university",
    description: "Complete your university enrolment and collect your student ID card.",
    category: "legal",
    phase: "week1",
    priority: "critical",
    estimatedMinutes: 60,
    instructions: [
      "Complete online enrolment on your university portal before arrival.",
      "Attend in-person registration if required.",
      "Collect your student ID card — you'll need it for the library, discounts, and more.",
      "Set up your university email and activate your student portal.",
    ],
  },
  {
    id: "legal-006",
    title: "Notify university of arrival",
    description: "Confirm your arrival to your university so they can update your record and support you.",
    category: "legal",
    phase: "week1",
    priority: "important",
    estimatedMinutes: 15,
    instructions: [
      "Log into your student portal and complete the arrival confirmation form.",
      "Update your contact details and UK address.",
      "This activates your access to student services.",
    ],
  },

  // ─── FINANCE & BANKING ──────────────────────────────────────────────────
  {
    id: "finance-001",
    title: "Get a UK SIM card",
    description: "You'll need a UK phone number for banking, NHS, and daily life. Compare deals before buying.",
    category: "finance",
    phase: "week1",
    priority: "critical",
    estimatedMinutes: 45,
    instructions: [
      "Buy a SIM on arrival: major providers include EE, O2, Three, Vodafone.",
      "Compare PAYG (pay-as-you-go) vs monthly SIM-only deals.",
      "Popular budget options: Smarty, iD Mobile, Tesco Mobile.",
      "You'll need your passport to purchase a SIM.",
      "Consider an eSIM if your phone supports it — can activate before arrival.",
    ],
    tips: [
      "Many providers offer student discounts — check with your university.",
      "Check data limits: 10–30GB is usually sufficient for students.",
    ],
    links: [
      { label: "Compare UK SIM deals", url: "https://www.uswitch.com/sim-only/" },
    ],
  },
  {
    id: "finance-002",
    title: "Set up your UK budget",
    description: "Know your expected income and expenses before spending. Use our Budget Planner.",
    category: "finance",
    phase: "week1",
    priority: "critical",
    estimatedMinutes: 30,
    instructions: [
      "Calculate your monthly income: scholarship, loan, part-time work, family support.",
      "List your fixed expenses: rent, utilities, transport pass.",
      "Use the NewstartUK Budget Planner to track your spending.",
    ],
    tips: [
      "Student bank accounts often offer free railcards or overdrafts.",
      "Set a weekly spending limit to avoid running out of money.",
    ],
  },
  {
    id: "finance-003",
    title: "Apply for a student railcard",
    description: "Save 1/3 on all UK train travel with a 16–25 Railcard.",
    category: "finance",
    phase: "week2",
    priority: "important",
    estimatedMinutes: 20,
    instructions: [
      "Apply online at railcard.co.uk or at your nearest train station.",
      "Cost: £30 for 1 year (or £70 for 3 years).",
      "You'll need a passport photo and proof of student status.",
      "The railcard saves 1/3 on all train tickets — pays for itself quickly.",
    ],
    tips: [
      "Digital railcard is available — no need to carry a physical card.",
    ],
    links: [
      { label: "Apply for 16–25 Railcard", url: "https://www.railcard.co.uk/" },
    ],
  },
  {
    id: "finance-004",
    title: "Set up direct debits for bills",
    description: "If you're in private rental, set up direct debits for council tax, utilities, and internet.",
    category: "finance",
    phase: "week3-6",
    priority: "important",
    estimatedMinutes: 30,
    instructions: [
      "Contact your utility providers to set up direct debit payments.",
      "Register for council tax exemption (students are exempt).",
      "Set up your internet — most providers require a minimum 12-month contract.",
    ],
    tips: [
      "Use comparison sites to find the best energy/internet deals.",
    ],
  },

  // ─── HEALTH & NHS ───────────────────────────────────────────────────────
  {
    id: "health-001",
    title: "Register with a GP (General Practitioner)",
    description: "A GP is your first point of contact for all medical issues in the UK. Register as soon as you arrive.",
    category: "health",
    phase: "week1",
    priority: "critical",
    estimatedMinutes: 60,
    instructions: [
      "Find a GP surgery near your accommodation via the NHS Find a GP tool.",
      "You can register even before you have a UK address proof — use your university address.",
      "Bring: passport, BRP, proof of address (university letter), NHS number (if available).",
      "You'll receive an NHS number — keep it safe.",
    ],
    tips: [
      "You can register with any GP, not necessarily the one closest to you.",
      "In an emergency, go to A&E (Accident & Emergency) at your local hospital.",
    ],
    links: [
      { label: "Find a GP near you", url: "https://www.nhs.uk/service-search/find-a-gp" },
    ],
  },
  {
    id: "health-002",
    title: "Register with a dentist",
    description: "NHS dental care is subsidised. Find an NHS dentist for regular check-ups.",
    category: "health",
    phase: "week2",
    priority: "important",
    estimatedMinutes: 30,
    instructions: [
      "Search for NHS dentists accepting new patients near you.",
      "Register as an NHS patient — costs are subsidised (check-up ~£25, filling ~£70).",
      "Note: NHS dental treatment is not free unless you qualify for specific exemptions.",
    ],
    tips: [
      "University dental schools offer discounted treatment by students under supervision.",
    ],
    links: [
      { label: "Find an NHS Dentist", url: "https://www.nhs.uk/service-search/find-a-dentist" },
    ],
  },
  {
    id: "health-003",
    title: "Understand NHS services & when to use them",
    description: "Know the difference between NHS 111, A&E, GP, and Pharmacies.",
    category: "health",
    phase: "week1",
    priority: "important",
    estimatedMinutes: 20,
    instructions: [
      "111: Call 111 for non-emergency medical advice (free, 24/7).",
      "A&E: Only for serious emergencies (chest pain, severe bleeding, unconsciousness).",
      "GP: For ongoing health issues, prescriptions, referrals.",
      "Pharmacy: For minor ailments — no appointment needed.",
    ],
    tips: [
      "The NHS App lets you book GP appointments, order prescriptions, and view your health record.",
    ],
    links: [
      { label: "Download the NHS App", url: "https://www.nhs.uk/nhs-app/" },
    ],
  },
  {
    id: "health-004",
    title: "Set up NHS prescription prepayment (if needed)",
    description: "If you need regular medication, the Prescription Prepayment Certificate (PPC) saves money.",
    category: "health",
    phase: "week2",
    priority: "optional",
    estimatedMinutes: 10,
    instructions: [
      "If you need 3+ prescriptions per month, a PPC costs ~£11/month.",
      "Apply online at nhsbsa.nhs.uk or call 0300 330 1341.",
    ],
    tips: [
      "Some students qualify for free NHS prescriptions — check your entitlement.",
    ],
  },

  // ─── TRANSPORT ─────────────────────────────────────────────────────────
  {
    id: "transport-001",
    title: "Set up an Oyster card (London) or get a travel card",
    description: "London's public transport is integrated via the Oyster card. Or get a monthly travel card.",
    category: "transport",
    phase: "week1",
    priority: "critical",
    estimatedMinutes: 30,
    instructions: [
      "In London: Buy an Oyster card at any Tube station (£5 deposit).",
      "Load a Travelcard or contactless pay-as-you-go credit.",
      "As a student, you may qualify for an 18+ Student Oyster card (30% off monthly travel).",
      "Outside London: Look into local bus passes and rail discounts.",
    ],
    tips: [
      "Contactless payments (Apple/Google Pay) work the same as Oyster in London.",
      "Use the Citymapper app for real-time transport routing.",
    ],
    links: [
      { label: "Apply for Student Oyster", url: "https://tfl.gov.uk/ fares/metrocard-fares/18-plus-student-oyster-photocard" },
      { label: "Citymapper App", url: "https://citymapper.com/london" },
    ],
  },
  {
    id: "transport-002",
    title: "Learn UK road rules and pedestrian safety",
    description: "UK roads and pedestrian crossings may differ from your home country.",
    category: "transport",
    phase: "week1",
    priority: "important",
    estimatedMinutes: 20,
    instructions: [
      "Remember: UK drives on the LEFT side of the road.",
      "Use pedestrian crossings — do not cross randomly on busy roads.",
      "Cyclists often use the road — check both directions.",
      "If cycling, wear a helmet and use bike lights at night.",
    ],
  },
  {
    id: "transport-003",
    title: "Explore your local area",
    description: "Familiarise yourself with your local area: nearest bus stop, train station, supermarket, pharmacy.",
    category: "transport",
    phase: "week2",
    priority: "optional",
    estimatedMinutes: 60,
    instructions: [
      "Walk or cycle around your local area with Google Maps or Citymapper.",
      "Note: nearest bus stop, tube/train station, GP surgery, supermarket, police station.",
      "Save offline maps of your area in Google Maps.",
    ],
  },

  // ─── HOUSING ────────────────────────────────────────────────────────────
  {
    id: "housing-001",
    title: "Secure your accommodation",
    description: "Confirm your university accommodation or find private rental if needed.",
    category: "housing",
    phase: "week1",
    priority: "critical",
    estimatedMinutes: 90,
    instructions: [
      "University halls: Confirm your room booking and move-in date.",
      "Private rental: Sign your tenancy agreement and pay deposit/advance rent.",
      "Deposits must be protected in a government-approved scheme within 30 days (Tenant Fees Act).",
    ],
    tips: [
      "Always view accommodation in person or via video before committing.",
      "Ask about: bills included? internet speed? heating costs?",
    ],
  },
  {
    id: "housing-002",
    title: "Set up internet at your accommodation",
    description: "Most UK rentals require you to set up your own internet. Plan ahead.",
    category: "housing",
    phase: "week2",
    priority: "important",
    estimatedMinutes: 30,
    instructions: [
      "Check what providers serve your building (BT, Sky, Virgin, TalkTalk).",
      "Allow 2–3 weeks for installation — order early.",
      "Most providers require a credit check and 12-month contract.",
      "Consider a mobile Wi-Fi hotspot as a backup.",
    ],
    tips: [
      "Compare deals at uswitch.com or broadbandchoices.co.uk",
    ],
  },
  {
    id: "housing-003",
    title: "Get contents insurance",
    description: "Protect your belongings in case of theft, fire, or damage.",
    category: "housing",
    phase: "week3-6",
    priority: "optional",
    estimatedMinutes: 20,
    instructions: [
      "Check if your university halls have insurance included.",
      "For private rentals, buy contents insurance — from ~£10/month.",
      "Popular providers: Endsleigh, Cover4Students, Admiral.",
    ],
    tips: [
      "Document your belongings (photos, receipts) for easier claims.",
    ],
  },

  // ─── SOCIAL & CULTURAL ──────────────────────────────────────────────────
  {
    id: "social-001",
    title: "Attend your university's fresher's week",
    description: "Fresher's Week is the best way to meet people, join societies, and settle into university life.",
    category: "social",
    phase: "week1",
    priority: "important",
    estimatedMinutes: 180,
    instructions: [
      "Attend the Fresher's Fair — sign up for clubs, societies, and sports teams.",
      "Join 1–3 societies relevant to your interests or culture.",
      "Attend social events — start conversations, exchange numbers.",
      "Join international student groups — they understand what you're going through.",
    ],
    tips: [
      "Don't overcommit to too many societies — start with 1–3.",
      "WhatsApp group chats are the primary way UK students organise.",
    ],
  },
  {
    id: "social-002",
    title: "Open a UK streaming & TV account",
    description: "Set up accounts for BBC iPlayer (free), Netflix, Spotify, and Amazon Prime Student.",
    category: "social",
    phase: "week2",
    priority: "optional",
    estimatedMinutes: 20,
    instructions: [
      "BBC iPlayer is free and licensed — no account needed for live TV.",
      "Amazon Prime Student: Free 6-month trial, then discounted at £4.49/month.",
      "Spotify Student: Half-price premium with free Hulu.",
    ],
    links: [
      { label: "Amazon Prime Student", url: "https://www.amazon.co.uk/prime-student" },
      { label: "Spotify Student", url: "https://www.spotify.com/uk/student/" },
    ],
  },
  {
    id: "social-003",
    title: "Register with your embassy or high commission",
    description: "Register with your home country's embassy in the UK for consular support.",
    category: "social",
    phase: "week3-6",
    priority: "optional",
    estimatedMinutes: 15,
    instructions: [
      "Search for your country's embassy or high commission in London.",
      "Register online — some embassies have an online citizen registration system.",
      "This helps in emergencies, document replacement, and travel advice.",
    ],
    tips: [
      "Your embassy can issue emergency travel documents if your passport is lost/stolen.",
    ],
  },
];

export const CATEGORY_META = {
  legal:     { label: "Legal & Immigration",     color: "text-red-400",   bg: "bg-red-500/10",   border: "border-red-500/30" },
  finance:   { label: "Finance & Banking",      color: "text-green-400", bg: "bg-green-500/10",  border: "border-green-500/30" },
  health:    { label: "Health & NHS",            color: "text-pink-400",  bg: "bg-pink-500/10",  border: "border-pink-500/30" },
  transport: { label: "Transport",               color: "text-blue-400",  bg: "bg-blue-500/10",  border: "border-blue-500/30" },
  housing:   { label: "Housing",                 color: "text-yellow-400",bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
  social:    { label: "Social & Cultural",       color: "text-purple-400",bg: "bg-purple-500/10", border: "border-purple-500/30" },
} as const;
