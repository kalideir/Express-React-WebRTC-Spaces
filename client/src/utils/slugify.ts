export default function slugify(text: string | null) {
  if (!text) return '';
  return text.trim().split(' ').join('-');
}
