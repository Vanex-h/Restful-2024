export const parseJwt = (token: string) => {
  try {
    const data = Buffer.from(token.split('.')[1], 'base64').toString('binary');
    return JSON.parse(data)
  } catch (e) {
    return null;
  }
}
