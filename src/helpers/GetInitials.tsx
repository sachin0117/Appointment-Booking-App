

function getInitials(fullname: string) {
  if (!fullname) {
    return;
  }
  const parts = fullname.trim().split(' ').filter((part) => part !== '')
  if (parts.length === 0) {
    return;
  }
  const first = parts[0][0].toUpperCase();
  if (parts.length === 1) return first;
  const second = parts[1][0].toUpperCase();
  return first + second;
}

export {getInitials}