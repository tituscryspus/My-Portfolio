export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  businessName,
  tagline,
  description,
  descriptionCta,
  sections,
  email,
  phone,
  whatsapp,
  location,
  social,
  logo,
  heroImage,
  teamImage,
  workspaceImage,
  officeImage,
  founder
}`;

export const servicesQuery = `*[_type == "service"] | order(order asc){
  _id,
  icon,
  title,
  description
}`;

export const projectsQuery = `*[_type == "project"] | order(order asc){
  _id,
  title,
  description,
  image,
  tags,
  category,
  liveUrl,
  githubUrl,
  featured
}`;

export const statsQuery = `*[_type == "stat"] | order(order asc){
  value,
  label
}`;
