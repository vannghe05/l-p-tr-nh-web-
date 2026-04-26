
async function fetchModel(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Lỗi HTTP: " + response.status);
    }
    const data = await response.json();
    return { data: data };
  } catch (err) {
    console.error("Fetch error: ", err);
    throw err; 
  }
}

export default fetchModel;