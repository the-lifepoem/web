export type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDocument = {
  title: string;
  description: string;
  intro?: string;
  crossLinkLabel?: string;
  crossLinkPath?: "privacy" | "terms";
  sections: LegalSection[];
  closingNote?: string;
};
