export const updateCatalog = async () => {
  try {
    const catalogUrl = process.env.CATALOG_URL || "http://catalog:3001/catalog";
    const catalogResponse = await fetch(catalogUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!catalogResponse.ok) {
      console.error(
        "[ERROR] Catalog service updateStock failed with status: ",
        catalogResponse.status,
      );
      return false;
    }
  } catch (error) {
    console.error("[ERROR] Catalog service is unreachable.");
    return false;
  }

  return true;
};
