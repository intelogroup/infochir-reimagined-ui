
import { RhcaArticle } from "../types";
import { volumes2024 } from "./years/2024";
import { volumes2023 } from "./years/2023";
import { volumes2022 } from "./years/2022";
import { volumes2021 } from "./years/2021";

// Flatten all articles from all volumes into a single array
export const mockArticles: RhcaArticle[] = [
  ...volumes2024.flatMap(volume => volume.articles),
  ...volumes2023.flatMap(volume => volume.articles),
  ...volumes2022.flatMap(volume => volume.articles),
  ...volumes2021.flatMap(volume => volume.articles),
  // Add a few example articles with real PDFs from our bucket
  {
    id: "23-12-1",
    title: "Rétrospective 2023 des avancées chirurgicales",
    abstract: "Synthèse des progrès majeurs en chirurgie au cours de l'année...",
    authors: ["Dr. Marie Lambert", "Dr. Jean-Marc Bernard"],
    publicationDate: "2023-12-15",
    date: "2023-12-15",
    specialty: "Chirurgie générale",
    category: "Rétrospective",
    source: "RHCA",
    volume: "12",
    pageNumber: "1-10",
    views: 245,
    downloads: 86,
    shares: 43,
    citations: 20,
    tags: ["Rétrospective", "Innovation"],
    imageUrl: "/placeholder.svg",
    pdfFileName: "RHCA_2023_12_retrospective_chirurgicale.pdf"
  },
  {
    id: "23-09-1",
    title: "Innovations en neurochirurgie 2023",
    abstract: "Les dernières avancées en neurochirurgie...",
    authors: ["Dr. Pierre Dubois"],
    publicationDate: "2023-09-15",
    date: "2023-09-15",
    specialty: "Neurochirurgie",
    category: "Innovation",
    source: "RHCA",
    volume: "9",
    pageNumber: "1-8",
    views: 230,
    downloads: 82,
    shares: 40,
    citations: 15,
    tags: ["Neurochirurgie", "Innovation"],
    imageUrl: "/placeholder.svg",
    pdfFileName: "RHCA_2023_09_neurochirurgie.pdf"
  },
  {
    id: "23-06-1",
    title: "Avancées en chirurgie vasculaire",
    abstract: "Les nouvelles techniques en chirurgie vasculaire...",
    authors: ["Dr. Sophie Bernard"],
    publicationDate: "2023-06-15",
    date: "2023-06-15",
    specialty: "Chirurgie vasculaire",
    category: "Innovation",
    source: "RHCA",
    volume: "6",
    pageNumber: "1-12",
    views: 280,
    downloads: 92,
    shares: 48,
    citations: 25,
    tags: ["Vasculaire", "Innovation"],
    imageUrl: "/placeholder.svg",
    pdfFileName: "RHCA_2023_06_anevrismes.pdf"
  },
  {
    id: "23-03-1",
    title: "Techniques de chirurgie mini-invasive",
    abstract: "État de l'art des techniques modernes...",
    authors: ["Dr. Claire Martin", "Dr. Paul Robert"],
    publicationDate: "2023-03-15",
    date: "2023-03-15",
    specialty: "Chirurgie générale",
    category: "Innovation",
    source: "RHCA",
    volume: "3",
    pageNumber: "1-15",
    views: 230,
    downloads: 82,
    shares: 40,
    citations: 15,
    tags: ["Mini-invasif", "Innovation"],
    imageUrl: "/placeholder.svg",
    pdfFileName: "RHCA_2023_03_mini_invasive.pdf"
  }
];
