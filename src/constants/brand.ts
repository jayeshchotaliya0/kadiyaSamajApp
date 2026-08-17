export const BRAND = {
  name: "Prajabandhan",
  shortName: "PB",
  tagline: "Trusted Matrimony for Kadiya Kumbhar / Prajapati",
  community: "Kadiya Kumbhar / Prajapati",
  email: "hello@prajabandhan.in",
  phone: "+91 98765 43210",
  address: "Ahmedabad, Gujarat, India",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/profiles", label: "Find Matches" },
  { href: "/success-stories", label: "Success Stories" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
] as const;

export const STATS = [
  { label: "Profiles", value: "10,000+" },
  { label: "Verified Members", value: "5,000+" },
  { label: "Successful Matches", value: "1,000+" },
  { label: "Community Focused", value: "100%" },
] as const;

export const WHY_CHOOSE_US = [
  {
    title: "Community Focused",
    description: "Built exclusively for the Kadiya Kumbhar / Prajapati community.",
    icon: "Users",
  },
  {
    title: "Verified Profiles",
    description: "Thoughtful verification cues so families can browse with confidence.",
    icon: "BadgeCheck",
  },
  {
    title: "Privacy Friendly",
    description: "You control what you share. Contact actions stay intentional.",
    icon: "Shield",
  },
  {
    title: "Easy Search",
    description: "Filter by city, education, occupation, surname and more.",
    icon: "Search",
  },
  {
    title: "Family Friendly",
    description: "A warm experience designed for families and relatives alike.",
    icon: "HeartHandshake",
  },
  {
    title: "Trusted Platform",
    description: "A premium matrimonial space rooted in community values.",
    icon: "Sparkles",
  },
] as const;

export const OCCUPATION_OPTIONS = [
  "Business",
  "Doctor",
  "Civil Engineer",
  "Software Engineer",
  "Government Job",
  "Private Job",
  "Teacher",
  "Accountant",
  "Lawyer",
  "Other",
] as const;

export const ADMIN_NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/men", label: "Men", icon: "User" },
  { href: "/admin/women", label: "Women", icon: "UserRound" },
  { href: "/admin/children", label: "Children", icon: "Baby" },
  { href: "/admin/business", label: "Business Profiles", icon: "Briefcase" },
  { href: "/admin/doctors", label: "Doctor Profiles", icon: "Stethoscope" },
  { href: "/admin/civil-engineers", label: "Civil Engineers", icon: "HardHat" },
  { href: "/admin/software-engineers", label: "Software Engineers", icon: "Code2" },
  { href: "/admin/jobs", label: "Job Profiles", icon: "BriefcaseBusiness" },
  { href: "/admin/locations", label: "Locations", icon: "MapPin" },
  { href: "/admin/states", label: "States", icon: "Map" },
  { href: "/admin/cities", label: "Cities", icon: "Building2" },
  { href: "/admin/surnames", label: "Surnames", icon: "Tags" },
  { href: "/admin/gotra", label: "Gotra", icon: "GitBranch" },
  { href: "/admin/community", label: "Community", icon: "UsersRound" },
  { href: "/admin/education", label: "Education", icon: "GraduationCap" },
  { href: "/admin/degrees", label: "Degree", icon: "BookOpen" },
  { href: "/admin/occupations", label: "Occupations", icon: "Briefcase" },
  { href: "/admin/job-types", label: "Job Type", icon: "Layers" },
  { href: "/admin/marital-status", label: "Marital Status", icon: "Heart" },
  { href: "/admin/mother-tongue", label: "Mother Tongue", icon: "Languages" },
  { href: "/admin/success-stories", label: "Success Stories", icon: "Sparkles" },
  { href: "/admin/settings", label: "Settings", icon: "Settings" },
] as const;
