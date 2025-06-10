export const faqData = [
  {
    question: 'How do I create an order on our app?',
    answer: [
      'Add a warehouse and complete the required documents (PAN or GST number).',
      'Go to "Create Order" and select the warehouse.',
      "Enter the seller's name and address for the shipping label.",
      'Then, go to "Drop Details" to enter the recipient’s name, address, and contact information.',
      'Provide product info such as weight, measurements, and the price of the product.',
      'Click "Create" to finalize the order.',
    ],
  },
  {
    question: 'How do I ship an order?',
    answer: [
      'Create an Order: First, ensure you have created an order.',
      'Access Manifest Orders: Go to the "Manifest Order" tab under "Create Order" and find the order you wish to ship.',
      'Select Payment Option: Choose the payment option and select a shipping vendor based on the best price and rating.',
      'Complete Payment: Proceed to the payment gateway to complete your payment.',
      'Download Shipping Label: Go to "My Dashboard" > "Orders" to find your order, download the shipping label, and attach it to your package.',
      'Await Pickup: Wait for the pickup team to collect your order.',
    ],
  },
  {
    question: 'How do I register for Blitzships?',
    answer: [
      'Go to our official website at [www.Blitzships.com](http://www.Blitzships.com).',
      'Click on the "Login" or "Sign Up" page.',
      'Enter your personal details, such as name, email address, and phone number.',
      'Check your email for a verification link and click it to confirm your registration.',
      'Once verified, log in with your credentials and complete additional documents, such as PAN and GST numbers.',
    ],
  },
  {
    question: 'Why do I need to provide my PAN and GST details?',
    answer: [
      'Providing your PAN and GST details is necessary for compliance with tax regulations and to ensure smooth processing of payments and services. These details help us verify your business identity and are solely required for billing purposes at the end of the month.',
    ],
  },
  {
    question: 'How do I print a shipping label?',
    answer: [
      'Log in to your Blitzships account.',
      'Navigate to Dashboard > Orders.',
      'Select the order for which you want to print the label.',
      'Click on the "Print Shipping Label" option.',
      'Review the label details and confirm.',
      'Download the label file if necessary.',
      'Open the downloaded file and print it using your printer.',
      'If you encounter any issues, please contact our customer support for assistance at info@Blitzships.com.',
    ],
  },
  {
    question: 'What is NDR?',
    answer: [
      'NDR stands for Non-Delivery Report.',
      'It is a notification indicating that a delivery attempt was made but the package was not successfully delivered to the recipient.',
      'This report provides details about why the delivery failed and often includes instructions on how to resolve the issue or arrange for a redelivery.',
    ],
  },
  {
    question: 'How should I act on an NDR (Non-Delivery Report)?',
    answer: [
      'First, check the NDR list on your Dashboard by navigating to Dashboard > NDR. Review the details to understand the reason for non-delivery. Based on this information, take the necessary actions, such as updating the recipient’s availability, address, or phone number. After making the required changes, click "Reattempt" to schedule a new delivery attempt for the next day.',
      'If you need further assistance, please contact our customer support team at info@Blitzships.com.',
    ],
  },
  {
    question: 'When will I receive my COD payment?',
    answer: [
      `We remit COD payments on a weekly basis. Payments are processed every Friday, so you will receive the accumulated COD payments for products delivered from Monday to Sunday of the current week on the following week's Friday.`,
    ],
  },
  {
    question: 'I did not receive my COD payment. What should I do?',
    answer: [
      'Check for Bill Pendency: Verify if there are any pending issues related to weight discrepancies, returns to origin, or other reasons that might affect payment.',
      'Clear Pendency: Resolve any outstanding issues or invoices and send the updated information to info@Blitzships.com.',
      'Contact Customer Support: If your payment is still delayed after taking the above steps, call our customer support representatives for further assistance.',
      'We are committed to resolving any issues and ensuring your payment is processed promptly.',
    ],
  },
  {
    question: 'What is RTO and do we need to pay for it?',
    answer: [
      'RTO stands for Return to Origin. It occurs when a delivery attempt fails and the package is returned to the sender. Common reasons for RTO include incorrect address details, recipient unavailability, or refusal of delivery.',
      'As for payment:',
      'Charges: The cost of RTO is entirely liable on you. Charges may vary depending on the specific courier vendors involved.',
      'Responsibility: Please review your service agreement or contact customer support for detailed information on how RTO charges are applied and managed. If you have further questions or need assistance, please reach out to our customer support team at info@Blitzships.com.',
    ],
  },
  {
    question:
      'What is the Rate Calculator and how does it work? Is there any grade category?',
    answer: [
      'The Rate Calculator is a tool provided by Blitzships to calculate the rates charged by different vendors for a particular pair of pincodes. It considers features such as COD/PPD and weight charges to give you accurate shipping cost estimates.',
      'Grade Categories: Yes, we offer four categories based on the volume of your business:',
      'Silver: No limit on the number of parcels.',
      'Gold: For up to 100 parcels per month.',
      'Diamond: For 300 to 800 parcels per month.',
      'Platinum: For over 1000 parcels per month.',
      'These categories help tailor services and rates according to your shipping needs.',
      'If you need assistance or have more questions about the Rate Calculator, please contact our customer support team at info@Blitzships.com.',
    ],
  },
  {
    question:
      'What compensation am I entitled to if my goods are delivered in a damaged condition?',
    answer: [
      `In the event of lost, damaged, pilfered, tampered, or leaked goods, Blitzships is liable to pay compensation up to a maximum of Rs. 2,500 or 50% of the goods' value, whichever is lower, for both forward and reverse shipments. Please ensure that you file your complaint within 20 days of delivery through a ticket in the Support section at Blitzships to be eligible for compensation.`,
    ],
  },
  {
    question:
      'What are the customer standards or grades, and how can we upgrade our status to a higher grade?',
    answer: [
      `The customer standards or grades are categorized as follows:`,
      'Silver: No limit on the number of parcels.',
      'Gold: For up to 100 parcels per month.',
      'Diamond: For 300 to 800 parcels per month.',
      'Platinum: For over 1,000 parcels per month.',
      'These categories help tailor services and rates according to your shipping needs. To upgrade your plan, please call our customer support and provide the number of parcels you deliver per month to get certified for the appropriate category.',
    ],
  },
];

export const prohibitedItems = [
  'Industrial solvents',
  'Lithium batteries',
  'Magnetized materials',
  'Automobile batteries',
  'Infectious substances',
  'Bleach',
  'Flammable adhesives',
  'Dry ice (Carbon Dioxide, Solid)',
  'Dangerous Goods for transport by Air',
  'Alcohol',
  'Tobacco and tobacco related products',
  'Electronic cigarettes',
  'Poison',
  'Ketamine',
  'Foodstuff and liquor',
  'Any pornographic material',
  'Oil-based paint and thinners (flammable liquids)',
  'Insecticides, garden chemicals (fertilizers, poisons)',
  'Uncrossed (bearer) drafts / cheque, currency and coins',
  'Fuel for camp stoves, lanterns, torches or heating elements',
  'Any compound, liquid or gas that has toxic and/or infectious characteristics',
  'Any Aerosols, liquids and/or powders or any other flammable substances classified',
  'Firearms, explosives and military equipment',
  'Hazardous and radioactive material',
  'Machinery (chain saws, outboard engines containing fuel or that have contained fuel)',
  'Arms, ammunitions or any weapon with blade (including but not limited to air guns, flares, gunpowder, firework, knives, swords and antique weaponry)',
  'Precious stones, gems and jewellery (including but not limited to antiques, bullion (of any precious metal), diamonds, gold, silver, platinum, trophies related to animal hunting, semi-precious stones in any form including bricks)',
  'Any Hazardous chemical items (including but not limited to radioactive material, special chemicals, material, equipments and technologies (SCOMET) items, hazardous/chemical waste, corrosive items (acids), machines parts containing oil, grease, toner)',
  'Any Plants and its related products (including but not limited to oxidizing substances, sand/soils/ores, sandalwood, wood, wood pulp, edible oils, de-oiled groundnut, endangered species of plants and its parts, asbestos)',
  'Any Drugs and Medicines (including but not limited to cocaine, cannabis, LSD, morphine, opium, psychotropic substances, and such other drugs, poisonous goods, contraband such as illegal/illicit and counterfeit drugs)',
  'Any Animals and Human Body related items/product (including but not limited to livestock, cremated or disinterred human being’s remains, human being and any animal embryos, human being and any animal remains, human being and any animals corpses, organs/body parts of human being)',
];
