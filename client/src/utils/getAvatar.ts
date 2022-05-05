export default function getAvatar(text: string | null | undefined) {
  return `https://ui-avatars.com/api/?background=c7d2fe&color=1e293b&name=${text || ''}`;
}
