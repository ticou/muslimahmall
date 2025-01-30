// utils/slugify.js

/**
 * Convertit une chaîne de caractères en slug d'URL
 * - Convertit en minuscules
 * - Remplace les accents
 * - Remplace les caractères spéciaux par des tirets
 * - Supprime les tirets multiples
 * - Supprime les tirets au début et à la fin
 *
 * @param {string} text - Le texte à convertir en slug
 * @param {Object} options - Options de configuration
 * @param {boolean} options.lower - Convertir en minuscules (défaut: true)
 * @param {string} options.separator - Séparateur à utiliser (défaut: '-')
 * @returns {string} Le slug généré
 */
export const slugify = (
  text: string,
  options: { lower?: boolean; separator?: string } = {}
) => {
  const { lower = true, separator = "-" } = options;

  // Table de conversion des caractères accentués
  const accentMap: { [key: string]: string } = {
    à: "a",
    á: "a",
    â: "a",
    ã: "a",
    ä: "a",
    å: "a",
    è: "e",
    é: "e",
    ê: "e",
    ë: "e",
    ì: "i",
    í: "i",
    î: "i",
    ï: "i",
    ò: "o",
    ó: "o",
    ô: "o",
    õ: "o",
    ö: "o",
    ù: "u",
    ú: "u",
    û: "u",
    ü: "u",
    ý: "y",
    ÿ: "y",
    ñ: "n",
    ç: "c",
    œ: "oe",
    æ: "ae",
    // Majuscules
    À: "A",
    Á: "A",
    Â: "A",
    Ã: "A",
    Ä: "A",
    Å: "A",
    È: "E",
    É: "E",
    Ê: "E",
    Ë: "E",
    Ì: "I",
    Í: "I",
    Î: "I",
    Ï: "I",
    Ò: "O",
    Ó: "O",
    Ô: "O",
    Õ: "O",
    Ö: "O",
    Ù: "U",
    Ú: "U",
    Û: "U",
    Ü: "U",
    Ý: "Y",
    Ñ: "N",
    Ç: "C",
    Œ: "OE",
    Æ: "AE",
  };

  // Fonction pour remplacer les accents
  const removeAccents = (str: string) => {
    return str
      .split("")
      .map((char) => accentMap[char] || char)
      .join("");
  };

  const slug = text
    // Convertir en minuscules si demandé
    .split("")
    .map((char) => (lower ? char.toLowerCase() : char))
    .join("")
    // Supprimer les accents
    .split("")
    .map((char) => removeAccents(char))
    .join("")
    // Remplacer les caractères spéciaux par le séparateur
    .replace(/[^a-zA-Z0-9]/g, separator)
    // Supprimer les séparateurs multiples
    .replace(new RegExp(`${separator}+`, "g"), separator)
    // Supprimer les séparateurs au début et à la fin
    .replace(new RegExp(`^${separator}|${separator}$`, "g"), "");

  return slug;
};

/**
 * Vérifie si une chaîne est déjà un slug valide
 * @param {string} text - Le texte à vérifier
 * @returns {boolean} True si c'est un slug valide
 */
export const isValidSlug = (text: string) => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(text);
};

/**
 * Génère un slug unique en ajoutant un suffixe numérique si nécessaire
 * @param {string} baseSlug - Le slug de base
 * @param {Array<string>} existingSlugs - Liste des slugs existants
 * @returns {string} Un slug unique
 */
export const generateUniqueSlug = (
  baseSlug: string,
  existingSlugs: Array<string>
) => {
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }

  let counter = 1;
  let newSlug = `${baseSlug}-${counter}`;

  while (existingSlugs.includes(newSlug)) {
    counter++;
    newSlug = `${baseSlug}-${counter}`;
  }

  return newSlug;
};
