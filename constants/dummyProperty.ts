export interface PropertyTypes {
  id: number
  title: string
  location: string
  price: number
  type: "Apartment" | "House" | "Villa" | "Condo" | "Land" | "Commercial"
  status: "For Sale" | "For Rent"
  bedrooms: number
  bathrooms: number
  area: number
  featured: boolean
  image: string
  description: string
}

export const properties: PropertyTypes[] = [
  {
    id: 1,
    title: "Modern Family Villa",
    location: "Negombo, Western Province",
    price: 4500,
    type: "Villa",
    status: "For Sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    featured: true,
    image: "/image1.jpg",
    description:
      "A spacious modern villa featuring an open-plan living area, private garden, and rooftop terrace with sea views.",
  },
  {
    id: 2,
    title: "Cozy Downtown Apartment",
    location: "Colombo 03",
    price: 1850,
    type: "Apartment",
    status: "For Rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 950,
    featured: false,
    image: "/image2.jpg",
    description:
      "A comfortable two-bedroom apartment located in the heart of the city, close to shopping and business districts.",
  },
  {
    id: 3,
    title: "Luxury Beachfront House",
    location: "Bentota, Southern Province",
    price: 720000,
    type: "House",
    status: "For Sale",
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    featured: true,
    image: "/image3.jpg",
    description:
      "An exquisite beachfront property offering direct ocean access, a private pool, and expansive outdoor entertaining spaces.",
  },
  {
    id: 4,
    title: "Compact Studio Condo",
    location: "Kandy",
    price: 95000,
    type: "Condo",
    status: "For Sale",
    bedrooms: 1,
    bathrooms: 1,
    area: 480,
    featured: false,
    image: "/image4.jpg",
    description:
      "A well-designed studio condo ideal for young professionals, featuring modern finishes and city views.",
  },
  {
    id: 5,
    title: "Commercial Office Space",
    location: "Colombo 02",
    price: 550000,
    type: "Commercial",
    status: "For Sale",
    bedrooms: 2,
    bathrooms: 2,
    area: 5000,
    featured: false,
    image: "/image5.jpg",
    description:
      "Prime commercial space suitable for offices or retail, located in a high-traffic business district.",
  },
  {
    id: 6,
    title: "Suburban Family Home",
    location: "Negombo, Western Province",
    price: 3200,
    type: "House",
    status: "For Rent",
    bedrooms: 3,
    bathrooms: 2,
    area: 2100,
    featured: false,
    image: "/image6.jpg",
    description:
      "A charming family home in a quiet suburban neighborhood, with a large backyard and modern kitchen.",
  },
  {
    id: 7,
    title: "Vacant Residential Land",
    location: "Kurunegala",
    price: 120000,
    type: "Land",
    status: "For Sale",
    bedrooms: 3,
    bathrooms: 5,
    area: 15000,
    featured: false,
    image: "/image7.jpg",
    description:
      "A generous plot of residential land ready for development, located near main roads and utilities.",
  },
  {
    id: 8,
    title: "Penthouse with City Views",
    location: "Colombo 05",
    price: 6800,
    type: "Apartment",
    status: "For Rent",
    bedrooms: 3,
    bathrooms: 3,
    area: 2800,
    featured: true,
    image: "/image8.jpg",
    description:
      "An elegant penthouse offering panoramic city views, premium finishes, and access to building amenities.",
  },
  {
    id: 9,
    title: "Lakeside Cottage",
    location: "Kandy",
    price: 275000,
    type: "House",
    status: "For Sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    featured: false,
    image: "/image9.jpg",
    description:
      "A peaceful cottage nestled beside the lake, perfect for a quiet retreat with scenic mountain views.",
  },
  {
    id: 10,
    title: "Gated Community Villa",
    location: "Colombo 07",
    price: 890000,
    type: "Villa",
    status: "For Sale",
    bedrooms: 5,
    bathrooms: 5,
    area: 5200,
    featured: true,
    image: "/image10.jpg",
    description:
      "An expansive villa in a secure gated community, complete with a private pool, garden, and staff quarters.",
  },
  {
    id: 11,
    title: "Affordable Rental Apartment",
    location: "Negombo, Western Province",
    price: 6500,
    type: "Apartment",
    status: "For Rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 620,
    featured: false,
    image: "/image11.jpg",
    description:
      "A budget-friendly apartment close to the beach, ideal for singles or small families.",
  },
  {
    id: 12,
    title: "Commercial Retail Building",
    location: "Galle",
    price: 410000,
    type: "Commercial",
    status: "For Sale",
    bedrooms: 0,
    bathrooms: 3,
    area: 3600,
    featured: false,
    image: "/image12.jpg",
    description:
      "A well-located retail building with high foot traffic, suitable for shops, showrooms, or offices.",
  },
]

export default properties
