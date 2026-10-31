export type EventCategory =
  | "environment"
  | "education"
  | "health"
  | "food"
  | "elderly"
  | "animals"
  | "community";

export interface SocialEvent {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: EventCategory;
  date: string; // ISO
  durationHours: number;
  location: { name: string; city: string; address?: string };
  capacity: number;
  joined: number;
  organizer: { id: string; name: string };
  tags: string[];
  isFeatured?: boolean;
}

export const CATEGORY_META: Record<
  EventCategory,
  { label: string; emoji: string; chip: string; cover: string }
> = {
  environment: {
    label: "Environment",
    emoji: "🌿",
    chip: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/25",
    cover: "from-emerald-400/30 via-teal-400/15 to-emerald-700/30",
  },
  education: {
    label: "Education",
    emoji: "📚",
    chip: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/25",
    cover: "from-sky-400/30 via-blue-400/15 to-indigo-700/30",
  },
  health: {
    label: "Health",
    emoji: "🩺",
    chip: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/25",
    cover: "from-rose-400/30 via-pink-400/15 to-rose-700/30",
  },
  food: {
    label: "Food Drive",
    emoji: "🍲",
    chip: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25",
    cover: "from-amber-400/30 via-orange-400/15 to-amber-700/30",
  },
  elderly: {
    label: "Elderly Care",
    emoji: "🤝",
    chip: "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/25",
    cover: "from-violet-400/30 via-purple-400/15 to-violet-700/30",
  },
  animals: {
    label: "Animal Welfare",
    emoji: "🐾",
    chip: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/25",
    cover: "from-orange-400/30 via-red-400/15 to-orange-700/30",
  },
  community: {
    label: "Community",
    emoji: "🏘️",
    chip: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/25",
    cover: "from-cyan-400/30 via-teal-400/15 to-cyan-700/30",
  },
};

export const CATEGORIES = Object.keys(CATEGORY_META) as EventCategory[];

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function daysUntil(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  const d = Math.ceil(diff / 86_400_000);
  if (d <= 0) return "Today";
  if (d === 1) return "Tomorrow";
  return `In ${d} days`;
}

const DAY = 86_400_000;
const at = (days: number, hour = 9) => {
  const d = new Date(Date.now() + days * DAY);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

export const EVENTS: SocialEvent[] = [
  {
    id: "city-park-cleanup",
    title: "City Park Cleanup Drive",
    summary: "Join us to restore our local park — gloves, bags and snacks provided.",
    description:
      "We'll split into teams and clean up the riverside stretch of Central Park. Bring a reusable water bottle. All cleaning material, gloves, and refreshments are provided. Perfect for first-time volunteers and families.",
    category: "environment",
    date: at(4, 8),
    durationHours: 3,
    location: { name: "Central Park, Riverside Gate", city: "Dhaka" },
    capacity: 60,
    joined: 42,
    organizer: { id: "o1", name: "Green Dhaka" },
    tags: ["cleanup", "outdoors", "family-friendly"],
    isFeatured: true,
  },
  {
    id: "free-coding-bootcamp",
    title: "Free Coding Bootcamp for Teens",
    summary: "Teach the basics of web development to high-schoolers in your area.",
    description:
      "A weekend bootcamp introducing HTML, CSS and JavaScript to 14–18 year olds. We need mentors who can explain concepts patiently and guide small groups through a mini project.",
    category: "education",
    date: at(9, 10),
    durationHours: 5,
    location: { name: "Community Learning Center", city: "Dhaka" },
    capacity: 30,
    joined: 30,
    organizer: { id: "o2", name: "CodeForAll" },
    tags: ["mentoring", "tech", "youth"],
  },
  {
    id: "blood-donation-camp",
    title: "Blood Donation Camp",
    summary: "One donation can save up to three lives. Walk in or register ahead.",
    description:
      "Partnering with City Hospital to run a day-long blood donation camp. Medical staff on site, screening included. Donors receive a certificate and refreshments.",
    category: "health",
    date: at(2, 9),
    durationHours: 8,
    location: { name: "City Hospital Auditorium", city: "Dhaka" },
    capacity: 100,
    joined: 58,
    organizer: { id: "o3", name: "LifeDrop" },
    tags: ["health", "donation"],
    isFeatured: true,
  },
  {
    id: "winter-blanket-drive",
    title: "Winter Food & Blanket Drive",
    summary: "Help distribute warm meals and blankets to families in need.",
    description:
      "We're collecting and distributing blankets, warm clothing and hot meals across three neighborhoods. Volunteers help with sorting, packing and distribution routes.",
    category: "food",
    date: at(14, 15),
    durationHours: 4,
    location: { name: "Ward 12 Community Hall", city: "Chattogram" },
    capacity: 120,
    joined: 76,
    organizer: { id: "o4", name: "Warm Hands" },
    tags: ["winter", "distribution", "food"],
  },
  {
    id: "senior-citizens-visit",
    title: "Visit & Care: Senior Citizens Home",
    summary: "Spend an afternoon with elders — conversation, games and music.",
    description:
      "A gentle afternoon of company for the residents of Shanti Nibash. Bring a story, a song, or just your time. Board games and tea provided by the home.",
    category: "elderly",
    date: at(6, 16),
    durationHours: 2,
    location: { name: "Shanti Nibash Old Age Home", city: "Dhaka" },
    capacity: 25,
    joined: 12,
    organizer: { id: "o5", name: "Kindred Circle" },
    tags: ["elderly", "companionship"],
  },
  {
    id: "stray-animal-drive",
    title: "Stray Animal Feeding & Vaccination",
    summary: "Feed, vaccinate and rehome stray dogs and cats in the district.",
    description:
      "Working with local vets to run a free vaccination drive and feeding round. Volunteers assist with feeding, record-keeping and calm handling of animals.",
    category: "animals",
    date: at(11, 8),
    durationHours: 5,
    location: { name: "District Veterinary Ground", city: "Sylhet" },
    capacity: 40,
    joined: 23,
    organizer: { id: "o6", name: "Paws & Care" },
    tags: ["animals", "vaccination"],
  },
  {
    id: "tree-plantation",
    title: "Neighborhood Tree Plantation",
    summary: "Plant 500 native saplings along the new community road.",
    description:
      "A community plantation drive with saplings provided by the forest department. Learn proper planting and aftercare techniques from experts.",
    category: "environment",
    date: at(18, 7),
    durationHours: 4,
    location: { name: "New Community Road", city: "Dhaka" },
    capacity: 150,
    joined: 89,
    organizer: { id: "o1", name: "Green Dhaka" },
    tags: ["plantation", "climate"],
    isFeatured: true,
  },
  {
    id: "community-library",
    title: "Community Library Setup",
    summary: "Help sort, catalog and shelve 2,000 donated books.",
    description:
      "We're opening a free neighborhood library. Volunteers help sort donated books, label shelves, and set up a simple borrowing system. Lunch provided.",
    category: "community",
    date: at(21, 10),
    durationHours: 6,
    location: { name: "Ward 7 Community Center", city: "Khulna" },
    capacity: 35,
    joined: 19,
    organizer: { id: "o7", name: "Open Shelves" },
    tags: ["library", "books", "setup"],
  },
];

export function getEvent(id: string) {
  return EVENTS.find((e) => e.id === id);
}